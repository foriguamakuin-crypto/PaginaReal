import { useEffect, useRef, useState } from 'react';
import { Loader2, X } from 'lucide-react';

export interface WompiConfig {
  publicKey: string;
  currency: string;
  amountInCents: number;
  reference: string;
  signature: string;
  redirectUrl: string;
  customerEmail: string | null;
}

interface WompiWidgetProps {
  config: WompiConfig;
  onClose: () => void;
}

export default function WompiWidget({ config, onClose }: WompiWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.async = true;
    script.setAttribute('data-render', 'button');
    script.setAttribute('data-public-key', config.publicKey);
    script.setAttribute('data-currency', config.currency);
    script.setAttribute('data-amount-in-cents', String(config.amountInCents));
    script.setAttribute('data-reference', config.reference);
    script.setAttribute('data-signature:integrity', config.signature);
    script.setAttribute('data-redirect-url', config.redirectUrl);

    if (config.customerEmail) {
      script.setAttribute('data-customer-data:email', config.customerEmail);
    }

    script.onload = () => setLoaded(true);
    script.onerror = () => {
      setError('No se pudo cargar el widget de Wompi. Verifica tu conexión e inténtalo de nuevo.');
    };

    containerRef.current.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [config]);

  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      {error ? (
        <>
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Error al cargar el pago</h3>
          <p className="text-dark-400 text-sm max-w-md mb-8">{error}</p>
          <button onClick={onClose} className="btn-gold">
            Volver al checkout
          </button>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-6">
            {loaded ? null : <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />}
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            {loaded ? 'Pago seguro con Wompi' : 'Preparando pago seguro...'}
          </h3>
          <p className="text-dark-400 text-sm max-w-md mb-8">
            {loaded
              ? 'Pulsa el botón para abrir el widget de pago.'
              : 'Estamos cargando el widget de pago de Wompi. Espera un momento.'}
          </p>
          <div ref={containerRef} className="wompi-widget-container min-h-[50px] flex items-center justify-center" />
          {loaded && (
            <button
              onClick={onClose}
              className="mt-6 text-dark-500 hover:text-dark-300 text-xs transition-colors"
            >
              Cancelar y volver
            </button>
          )}
        </>
      )}
    </div>
  );
}
