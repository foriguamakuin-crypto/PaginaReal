import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Award, Truck, Heart, Star, ChevronRight, ArrowRight } from 'lucide-react';
import { featuredProducts, getProductImage, getStartingPrice, categoryLabels, typeLabels } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

const benefits = [
  {
    icon: Shield,
    title: 'Garantía de Calidad',
    desc: 'Materiales premium seleccionados para resistir el uso diario con máxima durabilidad.',
  },
  {
    icon: Award,
    title: 'Diseño Premium',
    desc: 'Cada pieza está diseñada con atención al detalle, combinando estética y funcionalidad.',
  },
  {
    icon: Truck,
    title: 'Envíos a Todo Colombia',
    desc: 'Entregas rápidas y seguras en cualquier ciudad del país. Rastreo en tiempo real.',
  },
  {
    icon: Heart,
    title: 'Hecho con Amor',
    desc: 'Productos pensados para el bienestar y la comodidad de tu mascota.',
  },
];

const testimonials = [
  {
    name: 'Laura Mendoza',
    text: 'La calidad de los arneses MOXX es impresionante. Mi golden retriever está cómodo y se ve espectacular.',
    rating: 5,
  },
  {
    name: 'Carlos Rivera',
    text: 'Pedí la correa Executive y superó mis expectativas. Los acabados en dorado son de otro nivel.',
    rating: 5,
  },
  {
    name: 'Ana Gómez',
    text: 'Mi gata nunca había aceptado un arnés hasta que probamos el Feline Grace. Perfecto ajuste.',
    rating: 5,
  },
];

export default function Home() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: typeof featuredProducts[0]) => {
    const firstSize = product.sizes[0];
    const firstColor = product.colors[0].name;
    addItem(product, firstSize.name, firstColor, 1, firstSize.price);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/4588435/pexels-photo-4588435.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Perro con arnés premium"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
        </div>

        <div className="relative section-padding max-w-7xl mx-auto w-full py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <p className="text-gold-400 text-sm font-semibold tracking-[0.3em] uppercase mb-6">
              MOXX — Accesorios Premium
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Tu mascota necesita{' '}
              <span className="gold-text-gradient">estilo, comodidad</span> y{' '}
              <span className="gold-text-gradient">seguridad.</span>
            </h1>
            <p className="mt-6 text-lg text-dark-300 max-w-lg leading-relaxed">
              Arnés, correas y collares diseñados para perros y gatos que merecen lo mejor.
              La calidad premium que tu compañero merece.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/catalogo" className="btn-gold">
                Ver Catálogo
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/catalogo" className="btn-outline">
                Comprar Ahora
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold-500/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Por qué elegirnos
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              La diferencia MOXX
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold-500/20 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-5 group-hover:bg-gold-500/20 transition-colors">
                  <b.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{b.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4"
          >
            <div>
              <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                Destacados
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Productos Premium
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-2"
            >
              Ver todo el catálogo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden bg-dark-900 border border-white/5 hover:border-gold-500/20 transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-xs text-gold-400 font-medium tracking-wide uppercase mb-2">
                    {categoryLabels[product.category]} — {typeLabels[product.type]}
                  </p>
                  <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                  <p className="text-dark-400 text-sm line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold gold-text-gradient">
                      {formatPrice(getStartingPrice(product))}
                      {product.sizes.length > 1 && (
                        <span className="text-xs text-dark-500 font-normal ml-1">desde</span>
                      )}
                    </span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="btn-gold text-xs px-5 py-2.5"
                    >
                      {addedId === product.id ? 'Agregado ✓' : 'Agregar al Carrito'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Banner */}
      <section className="relative h-[500px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Gato con collar premium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-950/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-padding max-w-3xl"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              Diseñado para quienes exigen lo <span className="gold-text-gradient">mejor</span>
            </h2>
            <p className="text-dark-300 text-lg mb-8 max-w-xl mx-auto">
              Cada producto MOXX es una pieza de artesanía moderna, pensada para la comodidad de tu mascota y el orgullo de su dueño.
            </p>
            <Link to="/nosotros" className="btn-outline">
              Conoce nuestra historia
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Testimonios
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Lo que dicen nuestros clientes
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-dark-200 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 font-semibold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-dark-500 text-xs">Cliente MOXX</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding py-24 bg-dark-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              ¿Listo para elevar el estilo de tu <span className="gold-text-gradient">mascota</span>?
            </h2>
            <p className="text-dark-400 text-lg mb-10 max-w-2xl mx-auto">
              Descubre nuestra colección completa de arneses, correas y collares premium.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/catalogo" className="btn-gold">
                Explorar Catálogo
              </Link>
              <Link to="/contacto" className="btn-outline">
                Contáctanos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
