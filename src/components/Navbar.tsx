import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/catalogo', label: 'Cat\u00E1logo' },
  { path: '/tallas', label: 'Gu\u00EDa de Tallas' },
  { path: '/envios', label: 'Env\u00EDos y Pagos' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark-950/95 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-padding max-w-7xl mx-auto flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-[0.2em] gold-text-gradient">
            MOXX
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-gold-400'
                  : 'text-dark-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-dark-300 hover:text-white transition-colors"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-dark-950 bg-gold-500 rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-dark-300 hover:text-white transition-colors"
            aria-label="Men\u00FA"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-dark-950/98 backdrop-blur-xl border-t border-white/5"
          >
            <div className="section-padding py-6 flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide uppercase py-2 ${
                    location.pathname === link.path
                      ? 'text-gold-400'
                      : 'text-dark-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
