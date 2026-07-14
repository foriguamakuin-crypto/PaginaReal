import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, Loader2, ArrowRight } from 'lucide-react';

type Status = 'loading' | 'success' | 'pending' | 'error';

export default function PaymentResult() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('');

  const orderId = params.get('order') ?? '';
  const transactionId = params.get('id') ?? '';

  useEffect(() => {
    if (!orderId && !transactionId) {
      setStatus('error');
      setMessage('No se encontró información del pago.');
      return;
    }

    (async () => {
      try {
        const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/wompi-verify`;
        const res = await fetch(functionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            transactionId: transactionId || undefined,
            reference: orderId || undefined,
          }),
        });

        if (!res.ok) {
          throw new Error('No se pudo verificar el pago.');
        }

        const data = await res.json();

        if (data.status === 'paid') {
          setStatus('success');
          setMessage('¡Tu pago fue aprobado! Hemos registrado tu pedido correctamente.');
        } else {
          setStatus('pending');
          setMessage(
            'Tu pago está pendiente o no fue aprobado. Tu pedido queda registrado como pendiente.'
          );
        }
      } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Error al verificar el pago.');
      }
    })();
  }, [orderId, transactionId]);

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        {status === 'loading' && (
          <>
            <div className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-gold-400 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Verificando pago...</h1>
            <p className="text-dark-400 text-sm">
              Estamos confirmando el estado de tu transacción con Wompi.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-green-400" />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mb-3">¡Pago aprobado!</h1>
            <p className="text-dark-400 text-sm mb-2">{message}</p>
            {orderId && (
              <p className="text-gold-400 font-mono text-sm mb-8">
                Pedido: {orderId.slice(0, 8).toUpperCase()}
              </p>
            )}
            <Link to="/" className="btn-gold inline-flex items-center">
              Volver al inicio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </>
        )}

        {status === 'pending' && (
          <>
            <div className="w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-yellow-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Pago pendiente</h1>
            <p className="text-dark-400 text-sm mb-8">{message}</p>
            <Link to="/" className="btn-gold inline-flex items-center">
              Volver al inicio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
              <X className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Error</h1>
            <p className="text-dark-400 text-sm mb-8">{message}</p>
            <Link to="/" className="btn-gold inline-flex items-center">
              Volver al inicio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}
