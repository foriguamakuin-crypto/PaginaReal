import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, CreditCard, Loader2, Check, Lock, MapPin, User } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { getProductImage } from '../data/products';
import { supabase } from '../lib/supabase';

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerForm {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

const emptyForm: CustomerForm = {
  name: '',
  email: '',
  phone: '',
  city: '',
  address: '',
  notes: '',
};

export default function Checkout({ isOpen, onClose }: CheckoutProps) {
  const { items, totalPrice, clearCart, setIsCartOpen } = useCart();
  const [form, setForm] = useState<CustomerForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const subtotal = totalPrice;
  const shipping = 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (submitting) return;
    setForm(emptyForm);
    setErrors({});
    setCreatedOrderId(null);
    onClose();
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof CustomerForm, string>> = {};
    if (!form.name.trim()) next.name = 'Ingresa tu nombre completo';
    if (!form.email.trim()) {
      next.email = 'Ingresa tu correo electrónico';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Correo electrónico inválido';
    }
    if (!form.phone.trim()) {
      next.phone = 'Ingresa tu teléfono';
    } else if (!/^[\d+\s()-]{7,}$/.test(form.phone)) {
      next.phone = 'Teléfono inválido';
    }
    if (!form.city.trim()) next.city = 'Ingresa tu ciudad';
    if (!form.address.trim()) next.address = 'Ingresa tu dirección completa';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name as keyof CustomerForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleContinueToPayment = async () => {
    if (!validate() || items.length === 0) return;
    setSubmitting(true);

    try {
      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          customer_name: form.name.trim(),
          customer_email: form.email.trim(),
          customer_phone: form.phone.trim(),
          customer_city: form.city.trim(),
          customer_address: form.address.trim(),
          notes: form.notes.trim() || null,
          subtotal,
          shipping,
          total,
          status: 'pending',
        })
        .select('id')
        .single();

      if (error || !order) {
        throw new Error(error?.message ?? 'No se pudo crear el pedido');
      }

      const orderItems = items.map(i => ({
        order_id: order.id,
        product_id: i.product.id,
        product_name: i.product.name,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
        unit_price: i.unitPrice,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw new Error(itemsError.message);

      setCreatedOrderId(order.id);
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        address:
          err instanceof Error
            ? `Error al preparar el pedido: ${err.message}`
            : 'Error al preparar el pedido',
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinishSuccess = () => {
    clearCart();
    setIsCartOpen(false);
    handleClose();
  };

  const inputClass = (field: keyof CustomerForm) =>
    `w-full px-4 py-3 bg-dark-950 border rounded-xl text-white text-sm placeholder-dark-600 focus:outline-none transition-colors ${
      errors[field]
        ? 'border-red-500/50 focus:border-red-500'
        : 'border-white/10 focus:border-gold-500/50'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] flex items-center justify-center p-4 sm:p-6 lg:p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] bg-dark-950 rounded-3xl border border-white/10 z-[95] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
              <h2 className="text-lg font-semibold tracking-wide uppercase text-white flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gold-500" />
                Finalizar Compra
              </h2>
              <button
                onClick={handleClose}
                disabled={submitting}
                className="p-2 text-dark-400 hover:text-white transition-colors disabled:opacity-40"
                aria-label="Cerrar checkout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 min-h-0 overflow-y-auto"
            >
              {createdOrderId ? (
                <div className="flex flex-col items-center justify-center text-center py-20 px-6">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6"
                  >
                    <Check className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Pedido preparado correctamente
                  </h3>
                  <p className="text-dark-400 text-sm max-w-md mb-2">
                    Hemos registrado tu pedido con el número:
                  </p>
                  <p className="text-gold-400 font-mono text-lg mb-1">
                    {createdOrderId.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-dark-500 text-xs max-w-sm mb-8">
                    La pasarela de pago Wompi se integrará próximamente. Por ahora tu pedido
                    queda guardado como <span className="text-dark-300">pendiente de pago</span>.
                  </p>
                  <button onClick={handleFinishSuccess} className="btn-gold">
                    Entendido
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  {/* Customer Info */}
                  <div className="lg:col-span-3 p-6 lg:p-10 lg:border-r border-white/10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          Información del Cliente
                        </h3>
                        <p className="text-xs text-dark-500">
                          Completa tus datos para continuar al pago
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="text-xs text-dark-400 font-medium uppercase tracking-wide mb-2 block">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className={inputClass('name')}
                          placeholder="Tu nombre y apellido"
                        />
                        {errors.name && (
                          <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs text-dark-400 font-medium uppercase tracking-wide mb-2 block">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={inputClass('email')}
                            placeholder="tu@email.com"
                          />
                          {errors.email && (
                            <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-xs text-dark-400 font-medium uppercase tracking-wide mb-2 block">
                            Teléfono
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className={inputClass('phone')}
                            placeholder="+57 300 000 0000"
                          />
                          {errors.phone && (
                            <p className="text-xs text-red-400 mt-1.5">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs text-dark-400 font-medium uppercase tracking-wide mb-2 block">
                            Ciudad
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className={inputClass('city')}
                            placeholder="Bogotá"
                          />
                          {errors.city && (
                            <p className="text-xs text-red-400 mt-1.5">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-xs text-dark-400 font-medium uppercase tracking-wide mb-2 block">
                            Dirección completa
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className={inputClass('address')}
                            placeholder="Calle 00 # 00-00, Barrio"
                          />
                          {errors.address && (
                            <p className="text-xs text-red-400 mt-1.5">{errors.address}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-dark-400 font-medium uppercase tracking-wide mb-2 block">
                          Observaciones del pedido
                          <span className="text-dark-600 font-normal ml-1 normal-case tracking-normal">
                            (opcional)
                          </span>
                        </label>
                        <textarea
                          name="notes"
                          value={form.notes}
                          onChange={handleChange}
                          rows={3}
                          className={`${inputClass('notes')} resize-none`}
                          placeholder="Instrucciones de entrega, referencias, etc."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-2 p-6 lg:p-10 bg-dark-900/40">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          Resumen del Pedido
                        </h3>
                        <p className="text-xs text-dark-500">
                          {items.length} {items.length === 1 ? 'producto' : 'productos'}
                        </p>
                      </div>
                    </div>

                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center text-center py-12">
                        <ShoppingBag className="w-10 h-10 text-dark-700 mb-3" />
                        <p className="text-dark-500 text-sm">Tu carrito está vacío</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-1">
                          {items.map(item => (
                            <div
                              key={`${item.product.id}-${item.size}-${item.color}`}
                              className="flex gap-3 pb-4 border-b border-white/5 last:border-0"
                            >
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-dark-900 flex-shrink-0">
                                <img
                                  src={getProductImage(item.product, item.color)}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-white truncate">
                                  {item.product.name}
                                </h4>
                                <p className="text-xs text-dark-400 mt-0.5">
                                  Color: {item.color}
                                  <span className="mx-1.5 text-dark-600">·</span>
                                  Talla: {item.size}
                                </p>
                                <div className="flex items-center justify-between mt-1.5">
                                  <span className="text-xs text-dark-500">
                                    Cant: {item.quantity}
                                  </span>
                                  <span className="text-sm font-semibold text-gold-400">
                                    {formatPrice(item.unitPrice * item.quantity)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/10">
                          <div className="flex items-center justify-between">
                            <span className="text-dark-400 text-sm">Subtotal</span>
                            <span className="text-white text-sm font-medium">
                              {formatPrice(subtotal)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-dark-400 text-sm">Envío</span>
                            <span className="text-gold-400 text-sm font-medium">
                              Calculado al finalizar
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <span className="text-white font-semibold">Total</span>
                            <span className="text-xl font-bold gold-text-gradient">
                              {formatPrice(total)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={handleContinueToPayment}
                          disabled={submitting}
                          className="btn-gold w-full mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Preparando pedido...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4 mr-2" />
                              Continuar al Pago
                            </>
                          )}
                        </button>

                        <div className="flex items-center justify-center gap-2 mt-4 text-dark-500 text-xs">
                          <Lock className="w-3 h-3" />
                          Pago seguro mediante Wompi (próximamente)
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
