import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dog, Cat, Ruler } from 'lucide-react';

const dogSizes = [
  { size: 'XS', neck: '20-28 cm', chest: '28-38 cm', weight: '1-3 kg', breed: 'Chihuahua, Yorkshire' },
  { size: 'S', neck: '28-35 cm', chest: '38-48 cm', weight: '3-7 kg', breed: 'Poodle, Frenchie pequeño' },
  { size: 'M', neck: '35-45 cm', chest: '48-60 cm', weight: '7-15 kg', breed: 'Beagle, Cocker, Frenchie' },
  { size: 'L', neck: '45-55 cm', chest: '60-75 cm', weight: '15-30 kg', breed: 'Labrador, Golden, Pastor' },
  { size: 'XL', neck: '55-65 cm', chest: '75-95 cm', weight: '30-50 kg', breed: 'Rottweiler, Akita, Mastín' },
];

const catSizes = [
  { size: 'XS', neck: '18-22 cm', chest: '24-30 cm', weight: '1-2 kg', breed: 'Gatitos hasta 4 meses' },
  { size: 'S', neck: '22-26 cm', chest: '30-36 cm', weight: '2-4 kg', breed: 'Gatos pequeños (Siamés, Abisinio)' },
  { size: 'M', neck: '26-30 cm', chest: '36-44 cm', weight: '4-6 kg', breed: 'Gatos medianos (Común Europeo, Bengala)' },
];

function MeasurementCard({ icon: Icon, title, desc }: { icon: typeof Dog; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 p-6 rounded-xl bg-dark-900 border border-white/5">
      <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-gold-400" />
      </div>
      <div>
        <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
        <p className="text-dark-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function SizeGuide() {
  const [activeTab, setActiveTab] = useState<'dog' | 'cat'>('dog');

  const sizes = activeTab === 'dog' ? dogSizes : catSizes;

  return (
    <div className="min-h-screen bg-dark-950 pt-24 pb-24">
      <div className="section-padding max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Información Importante
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Guía de Tallas
          </h1>
          <p className="text-dark-400 max-w-xl">
            Encuentra la talla perfecta para tu mascota. Sigue nuestras instrucciones de medición para asegurar el mejor ajuste.
          </p>
        </motion.div>

        {/* How to Measure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Cómo Medir</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MeasurementCard
              icon={Ruler}
              title="Circunferencia del Cuello"
              desc="Mide alrededor del cuello de tu mascota, justo donde colocarías el collar. Deja espacio para dos dedos de holgura."
            />
            <MeasurementCard
              icon={Ruler}
              title="Circunferencia del Pecho"
              desc="Mide alrededor del pecho, justo detrás de las patas delanteras. Es la medida más importante para arneses."
            />
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 p-6 rounded-xl bg-gold-500/5 border border-gold-500/10"
        >
          <h3 className="text-sm font-semibold text-gold-400 uppercase tracking-wide mb-3">
            Consejos Importantes
          </h3>
          <ul className="space-y-2 text-dark-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-gold-400 mt-1">•</span>
              Usa una cinta métrica flexible, no una regla rígida.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-400 mt-1">•</span>
              Mide a tu mascota de pie, en posición natural.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-400 mt-1">•</span>
              Si tu mascota está entre dos tallas, elige la talla mayor.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-400 mt-1">•</span>
              Para arneses, la medida del pecho es la más importante.
            </li>
          </ul>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTab('dog')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'dog'
                ? 'bg-gold-500 text-dark-950'
                : 'bg-dark-900 text-dark-400 border border-white/10 hover:border-gold-500/30'
            }`}
          >
            <Dog className="w-4 h-4" /> Perros
          </button>
          <button
            onClick={() => setActiveTab('cat')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'cat'
                ? 'bg-gold-500 text-dark-950'
                : 'bg-dark-900 text-dark-400 border border-white/10 hover:border-gold-500/30'
            }`}
          >
            <Cat className="w-4 h-4" /> Gatos
          </button>
        </div>

        {/* Table */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-white/5 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-900">
                  <th className="text-left text-xs font-semibold text-gold-400 uppercase tracking-wider px-6 py-4">
                    Talla
                  </th>
                  <th className="text-left text-xs font-semibold text-gold-400 uppercase tracking-wider px-6 py-4">
                    Cuello
                  </th>
                  <th className="text-left text-xs font-semibold text-gold-400 uppercase tracking-wider px-6 py-4">
                    Pecho
                  </th>
                  <th className="text-left text-xs font-semibold text-gold-400 uppercase tracking-wider px-6 py-4">
                    Peso Aprox.
                  </th>
                  <th className="text-left text-xs font-semibold text-gold-400 uppercase tracking-wider px-6 py-4">
                    Ejemplos
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((row, i) => (
                  <tr
                    key={row.size}
                    className={`border-t border-white/5 ${i % 2 === 0 ? 'bg-dark-950' : 'bg-dark-900/50'}`}
                  >
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gold-500/10 text-gold-400 font-bold text-sm">
                        {row.size}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white text-sm">{row.neck}</td>
                    <td className="px-6 py-4 text-white text-sm font-medium">{row.chest}</td>
                    <td className="px-6 py-4 text-dark-400 text-sm">{row.weight}</td>
                    <td className="px-6 py-4 text-dark-400 text-sm">{row.breed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <p className="text-dark-500 text-sm mt-6 text-center">
          ¿Tienes dudas sobre tu talla?{' '}
          <a href="/contacto" className="text-gold-400 hover:text-gold-300 transition-colors">
            Contáctanos
          </a>{' '}
          y te ayudamos.
        </p>
      </div>
    </div>
  );
}
