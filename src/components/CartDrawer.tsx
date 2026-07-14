import { useCart } from '../hooks/useCart';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProductImage } from '../data/products';

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    const lines = items.map(
      i =>
        `- ${i.product.name} | Talla: ${i.size} | Color: ${i.color} | Cant: ${i.quantity} | ${formatPrice(i.unitPrice * i.quantity)}`
    );
    const message = `Hola MOXX, quiero realizar un pedido:\n\n${lines.join('\n')}\n\n*Total: ${formatPrice(totalPrice)}*`;
    const url = `https://wa.me/573203177677?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-dark-950 border-l border-white/10 z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-lg font-semibold tracking-wide uppercase text-white flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gold-500" />
                Tu Carrito
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-dark-400 hover:text-white transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-12 h-12 text-dark-700 mb-4" />
                  <p className="text-dark-400 text-sm">Tu carrito está vacío</p>
                  <Link
                    to="/catalogo"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-gold mt-6"
                  >
                    Ver Catálogo
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item, idx) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 pb-6 border-b border-white/5"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-dark-900 flex-shrink-0">
                        <img
                          src={getProductImage(item.product, item.color)}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-dark-400 mt-1">
                          Talla: {item.size}
                          {item.color !== 'Default' && <span className="ml-2">· Color: {item.color}</span>}
                        </p>
                        <p className="text-sm font-semibold text-gold-400 mt-1">
                          {formatPrice(item.unitPrice)}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-2 border border-white/10 rounded">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                              }
                              className="p-1.5 text-dark-400 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm text-white w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                              }
                              className="p-1.5 text-dark-400 hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.size, item.color)}
                            className="p-1.5 text-dark-500 hover:text-red-400 transition-colors"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-dark-400 text-sm">Subtotal</span>
                  <span className="text-white font-semibold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-400 text-sm">Envío</span>
                  <span className="text-gold-400 text-sm font-medium">Calculado al finalizar</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-xl font-bold gold-text-gradient">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <button onClick={handleCheckout} className="btn-gold w-full">
                  Finalizar Pedido por WhatsApp
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-dark-500 hover:text-dark-300 transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
