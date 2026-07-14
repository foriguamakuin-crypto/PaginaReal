import { motion } from 'framer-motion';
import { Gem, Heart, Target, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Gem,
    title: 'Calidad Premium',
    desc: 'Seleccionamos materiales de la más alta calidad: cuero italiano, aluminio aeroespacial, neoprono de alta densidad y mallas transpirables 3D.',
  },
  {
    icon: Heart,
    title: 'Bienestar Animal',
    desc: 'Cada diseño prioriza la comodidad y seguridad de tu mascota. Arnés ergonómicos, collares con cierre de seguridad y materiales hipoalergénicos.',
  },
  {
    icon: Target,
    title: 'Diseño Especializado',
    desc: 'No hacemos productos genéricos. Cada pieza está diseñada específicamente para la anatomía de perros o gatos, con tallas precisas y ajustes óptimos.',
  },
  {
    icon: Sparkles,
    title: 'Estilo Inigualable',
    desc: 'Combinamos funcionalidad con estética premium. Detalles dorados, acabados impecables y un diseño que destaca donde vaya tu mascota.',
  },
];

const stats = [
  { value: '5,000+', label: 'Mascotas Felices' },
  { value: '100%', label: 'Productos Premium' },
  { value: '15+', label: 'Diseños Exclusivos' },
  { value: '4.9', label: 'Calificación Promedio' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-dark-950 pt-24 pb-24">
      <div className="section-padding max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Nuestra Historia
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Nosotros
          </h1>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Una marca nacida del amor por las <span className="gold-text-gradient">mascotas</span>
              </h2>
              <div className="space-y-4 text-dark-300 leading-relaxed">
                <p>
                  MOXX nació con una idea simple: las mascotas merecen accesorios que combinen calidad, diseño y funcionalidad. No queríamos crear más productos genéricos; queríamos crear piezas que reflejaran el vínculo especial entre una mascota y su dueño.
                </p>
                <p>
                  Cada producto MOXX es el resultado de meses de investigación, pruebas con mascotas reales y un compromiso inquebrantable con la excelencia. Desde la selección de materiales hasta el empaque final, cada detalle está pensado para superar expectativas.
                </p>
                <p>
                  Hoy, MOXX es una marca reconocida por quienes exigen lo mejor para sus compañeros. No vendemos simples accesorios: vendemos tranquilidad, estilo y la certeza de que tu mascota está en las mejores manos.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/4588437/pexels-photo-4588437.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Perro feliz con collar premium"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-dark-900 border border-white/5"
              >
                <p className="text-3xl lg:text-4xl font-bold gold-text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-dark-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-dark-900 border border-white/5 hover:border-gold-500/20 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
