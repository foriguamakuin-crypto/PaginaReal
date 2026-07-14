import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-white/5">
      <div className="section-padding max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <span className="text-2xl font-bold tracking-[0.2em] gold-text-gradient">
              MOXX
            </span>
            <p className="mt-4 text-dark-400 text-sm leading-relaxed">
              Accesorios premium para mascotas. Diseño, calidad y estilo para quienes aman a sus compañeros.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/moxxoficial/" target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-gold-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-gold-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-white mb-4">
              Navegación
            </h3>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Inicio' },
                { path: '/catalogo', label: 'Catálogo' },
                { path: '/tallas', label: 'Guía de Tallas' },
                { path: '/envios', label: 'Envíos y Pagos' },
                { path: '/nosotros', label: 'Nosotros' },
                { path: '/contacto', label: 'Contacto' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-dark-400 text-sm hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-white mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-dark-400 text-sm">
                <Phone className="w-4 h-4 text-gold-500" />
                +57 320 317 7677
              </li>
              <li className="flex items-center gap-3 text-dark-400 text-sm">
                <Mail className="w-4 h-4 text-gold-500" />
                moxxoficial@gmail.com
              </li>
              <li className="flex items-center gap-3 text-dark-400 text-sm">
                <MapPin className="w-4 h-4 text-gold-500" />
                Colombia
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide uppercase text-white mb-4">
              Horario
            </h3>
            <ul className="space-y-2 text-dark-400 text-sm">
              <li>Lunes - Viernes: 9am - 6pm</li>
              <li>Sábado: 10am - 4pm</li>
              <li>Domingo: Cerrado</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-dark-500 text-xs">
            © {new Date().getFullYear()} MOXX. Todos los derechos reservados.
          </p>
          <p className="text-dark-500 text-xs">
            Diseñado con excelencia en Colombia.
          </p>
        </div>
      </div>
    </footer>
  );
}
