import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Dog, Cat, Check, X, ChevronRight, ChevronLeft } from 'lucide-react';
import {
  products,
  typeLabels,
  categoryLabels,
  getProductImage,
  getStartingPrice,
  getSizeOption,
} from '../data/products';
import { useCart } from '../hooks/useCart';
import { Product } from '../types';

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'Única'];

function sortSizes(sizes: { name: string }[]) {
  return [...sizes].sort(
    (a, b) => sizeOrder.indexOf(a.name) - sizeOrder.indexOf(b.name)
  );
}

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'dog' | 'cat'>('all');
  const [activeType, setActiveType] = useState<'all' | 'harness' | 'leash' | 'collar'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedMsg, setAddedMsg] = useState(false);
  const { addItem, setIsCartOpen } = useCart();

  const scrollContentRef = useRef<HTMLDivElement>(null);
  const scrollDetailsRef = useRef<HTMLDivElement>(null);

  // Lock background scroll while modal is open and reset internal scroll to top
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        if (scrollContentRef.current) scrollContentRef.current.scrollTop = 0;
        if (scrollDetailsRef.current) scrollDetailsRef.current.scrollTop = 0;
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchType = activeType === 'all' || p.type === activeType;
      const matchSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchType && matchSearch;
    });
  }, [activeCategory, activeType, searchQuery]);

  const currentSizeOption = selectedProduct ? getSizeOption(selectedProduct, selectedSize) : undefined;
  const currentPrice = currentSizeOption?.price ?? 0;
  const currentImages = selectedProduct
    ? selectedProduct.colors.find(c => c.name === selectedColor)?.images ?? []
    : [];

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    const firstSize = sortSizes(product.sizes)[0];
    setSelectedSize(firstSize.name);
    setSelectedColor(product.colors[0].name);
    setActiveImageIdx(0);
    setQuantity(1);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setAddedMsg(false);
  };

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    setActiveImageIdx(0);
  };

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedSize || !selectedColor) return;
    addItem(selectedProduct, selectedSize, selectedColor, quantity, currentPrice);
    setAddedMsg(true);
    setTimeout(() => {
      setAddedMsg(false);
      closeProduct();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-dark-950 pt-24 pb-24">
      <div className="section-padding max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Colección Completa
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Catálogo MOXX
          </h1>
          <p className="text-dark-400 max-w-xl">
            Explora nuestra colección de arneses, correas y collares premium diseñados para perros y gatos.
          </p>
        </motion.div>

        {/* Category Banner */}
        <AnimatePresence mode="wait">
          {activeCategory === 'dog' && (
            <motion.div
              key="dog-banner"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="mb-10 overflow-hidden rounded-[20px] border border-white/10 shadow-2xl"
              style={{ height: 'clamp(200px, 30vw, 320px)' }}
            >
              <img
                src="/images/catalog/WhatsApp_Image_2026-07-14_at_3.11.29_PM.jpeg"
                alt="Perros MOXX"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          )}
          {activeCategory === 'cat' && (
            <motion.div
              key="cat-banner"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="mb-10 overflow-hidden rounded-[20px] border border-white/10 shadow-2xl"
              style={{ height: 'clamp(200px, 30vw, 320px)' }}
            >
              <img
                src="/images/catalog/gatrosss.jpeg"
                alt="Gatos MOXX"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="mb-10 space-y-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-11 pr-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white text-sm placeholder-dark-500 focus:outline-none focus:border-gold-500/50 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <SlidersHorizontal className="w-4 h-4 text-gold-400" />
              <span className="text-xs font-semibold tracking-wide uppercase text-dark-300">
                Filtrar por
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-gold-500 text-dark-950'
                    : 'bg-dark-900 text-dark-400 border border-white/10 hover:border-gold-500/30'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setActiveCategory('dog')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === 'dog'
                    ? 'bg-gold-500 text-dark-950'
                    : 'bg-dark-900 text-dark-400 border border-white/10 hover:border-gold-500/30'
                }`}
              >
                <Dog className="w-4 h-4" /> Perros
              </button>
              <button
                onClick={() => setActiveCategory('cat')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === 'cat'
                    ? 'bg-gold-500 text-dark-950'
                    : 'bg-dark-900 text-dark-400 border border-white/10 hover:border-gold-500/30'
                }`}
              >
                <Cat className="w-4 h-4" /> Gatos
              </button>
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-3">
            {(['all', 'harness', 'leash', 'collar'] as const).map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeType === t
                    ? 'bg-white/10 text-gold-400 border border-gold-500/30'
                    : 'bg-transparent text-dark-500 border border-white/5 hover:border-white/10'
                }`}
              >
                {t === 'all' ? 'Todos los tipos' : typeLabels[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-dark-500 text-sm mb-6">
          {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'} encontrados
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group rounded-2xl overflow-hidden bg-dark-900 border border-white/5 hover:border-gold-500/20 transition-all duration-500 cursor-pointer"
                onClick={() => openProduct(product)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={getProductImage(product)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-dark-950/80 text-white backdrop-blur-sm border border-white/10">
                      {categoryLabels[product.category]}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[10px] text-gold-400 font-semibold tracking-[0.15em] uppercase mb-1">
                    {typeLabels[product.type]}
                  </p>
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold gold-text-gradient">
                    {formatPrice(getStartingPrice(product))}
                    {product.sizes.length > 1 && (
                      <span className="text-xs text-dark-500 font-normal ml-1">desde</span>
                    )}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-dark-500 text-lg">No se encontraron productos con estos filtros.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveType('all');
                setSearchQuery('');
              }}
              className="btn-gold mt-6"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProduct}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80] flex items-center justify-center p-4 sm:p-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] bg-dark-950 rounded-3xl border border-white/10 z-[90] overflow-hidden flex flex-col"
            >
              <button
                onClick={closeProduct}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-dark-950/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-dark-400 hover:text-white hover:border-gold-500/30 transition-all"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              <div ref={scrollContentRef} className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
                {/* Image */}
                <div className="lg:w-1/2 aspect-square lg:aspect-auto flex-shrink-0 relative bg-dark-900">
                  {currentImages.length > 0 ? (
                    <>
                      <img
                        src={currentImages[activeImageIdx]}
                        alt={`${selectedProduct.name} - ${selectedColor}`}
                        className="w-full h-full object-cover"
                      />
                      {currentImages.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setActiveImageIdx(idx =>
                                idx === 0 ? currentImages.length - 1 : idx - 1
                              )
                            }
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-dark-950/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold-500 hover:text-dark-950 transition-all"
                            aria-label="Imagen anterior"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() =>
                              setActiveImageIdx(idx =>
                                idx === currentImages.length - 1 ? 0 : idx + 1
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-dark-950/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold-500 hover:text-dark-950 transition-all"
                            aria-label="Imagen siguiente"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {currentImages.map((_, idx) => (
                              <span
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                  idx === activeImageIdx ? 'bg-gold-500 w-4' : 'bg-white/30'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                      <div className="w-24 h-24 rounded-full bg-gold-500/10 flex items-center justify-center mb-4">
                        <Dog className="w-10 h-10 text-gold-400/60" />
                      </div>
                      <p className="text-dark-400 text-sm">Próximamente fotografía</p>
                      <p className="text-dark-600 text-xs mt-1">
                        {selectedColor}
                      </p>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div ref={scrollDetailsRef} className="lg:w-1/2 p-8 lg:p-10 flex flex-col lg:overflow-y-auto lg:min-h-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-gold-500/10 text-gold-400 border border-gold-500/20">
                        {categoryLabels[selectedProduct.category]}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-white/5 text-dark-400 border border-white/10">
                        {typeLabels[selectedProduct.type]}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-3xl font-bold gold-text-gradient mb-6">
                      {formatPrice(currentPrice)}
                    </p>
                    <p className="text-dark-300 text-sm leading-relaxed mb-8">
                      {selectedProduct.description}
                    </p>

                    {/* Size Selector / One Size */}
                    <div className="mb-6">
                      <label className="text-sm font-semibold text-white mb-3 block">
                        {selectedProduct.oneSize ? 'Talla' : 'Seleccionar Talla'}
                      </label>
                      {selectedProduct.oneSize ? (
                        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-semibold">
                          <Check className="w-4 h-4" />
                          Talla única{selectedProduct.sizeLabel ? ` · ${selectedProduct.sizeLabel}` : ''}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {sortSizes(selectedProduct.sizes).map(size => (
                            <button
                              key={size.name}
                              onClick={() => setSelectedSize(size.name)}
                              className={`w-12 h-12 rounded-lg text-sm font-semibold transition-all duration-300 ${
                                selectedSize === size.name
                                  ? 'bg-gold-500 text-dark-950 border border-gold-500'
                                  : 'bg-dark-900 text-dark-400 border border-white/10 hover:border-gold-500/30'
                              }`}
                            >
                              {size.name}
                            </button>
                          ))}
                        </div>
                      )}
                      {currentSizeOption?.measurement && (
                        <p className="text-xs text-dark-400 mt-3">
                          Medida: <span className="text-gold-400 font-medium">{currentSizeOption.measurement}</span>
                        </p>
                      )}
                    </div>

                    {/* Color Selector */}
                    <div className="mb-8">
                      <label className="text-sm font-semibold text-white mb-3 block">
                        {selectedProduct.colors.length > 6 ? 'Diseño' : 'Color'}
                        <span className="text-dark-400 font-normal ml-2">· {selectedColor}</span>
                      </label>
                      <div className="flex flex-wrap gap-2.5">
                        {selectedProduct.colors.map(color => (
                          <button
                            key={color.name}
                            onClick={() => handleColorChange(color.name)}
                            title={color.name}
                            className={`group relative w-9 h-9 rounded-full transition-all duration-300 ${
                              selectedColor === color.name
                                ? 'ring-2 ring-gold-500 ring-offset-2 ring-offset-dark-950 scale-110'
                                : 'ring-1 ring-white/10 hover:ring-gold-500/40'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            aria-label={color.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quantity + Add to Cart */}
                    <div className="mb-2">
                      <label className="text-sm font-semibold text-white mb-3 block">
                        Cantidad
                      </label>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            className="w-10 h-10 rounded-lg bg-dark-900 border border-white/10 text-dark-400 hover:text-white transition-colors flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="text-white font-semibold w-8 text-center">{quantity}</span>
                          <button
                            onClick={() => setQuantity(q => q + 1)}
                            className="w-10 h-10 rounded-lg bg-dark-900 border border-white/10 text-dark-400 hover:text-white transition-colors flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        {addedMsg ? (
                          <div className="flex items-center gap-2 text-gold-400 font-semibold">
                            <Check className="w-5 h-5" /> Agregado
                          </div>
                        ) : (
                          <button onClick={handleAddToCart} className="btn-gold flex-1 min-w-[180px]">
                            Agregar · {formatPrice(currentPrice * quantity)}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-white/10">
                    <button
                      onClick={() => setIsCartOpen(true)}
                      className="w-full text-center text-sm text-dark-400 hover:text-white transition-colors py-2"
                    >
                      Ver carrito
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
