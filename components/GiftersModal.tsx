'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface PresenteAssinado {
  id: string;
  nome: string;
  quemAssinou: string;
}

export default function GiftersModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [presentes, setPresentes] = useState<PresenteAssinado[] | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (!open) return;
    setErro(false);
    (async () => {
      try {
        const snap = await Promise.race([
          getDocs(collection(db, 'presentes')),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout ao buscar presentes')), 10000),
          ),
        ]);
        const data = snap.docs
          .filter((d) => d.data().assinado)
          .map((d) => ({
            id: d.id,
            nome: d.data().nome || d.id.replace(/-/g, ' '),
            quemAssinou: String(d.data().quemAssinou ?? '').trim(),
          }))
          .sort((a, b) => a.quemAssinou.localeCompare(b.quemAssinou, 'pt-BR'));
        setPresentes(data);
      } catch (err) {
        console.error('Erro ao buscar presentes:', err);
        setErro(true);
      }
    })();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark/45 backdrop-blur-[6px] flex items-center justify-center z-[200] p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-bg p-[clamp(2rem,5vw,3rem)_clamp(1.5rem,5vw,2.5rem)] rounded-lg max-w-[520px] w-full max-h-[85vh] overflow-y-auto text-center shadow-[0_20px_50px_rgba(92,61,46,0.2)]"
          >
            <p className="font-montserrat text-[0.6rem] tracking-[0.4em] uppercase text-caramel mb-3">Com gratidão</p>
            <h2 className="font-garamond font-normal text-[clamp(1.3rem,3vw,1.8rem)] text-dark mb-6">
              Quem nos presenteou
            </h2>

            {erro ? (
              <p className="font-poppins text-[0.85rem] font-light text-cappuccino py-6">
                Não foi possível carregar agora. Tente novamente em instantes.
              </p>
            ) : presentes === null ? (
              <p className="font-poppins text-[0.85rem] font-light text-cappuccino py-6">Carregando…</p>
            ) : presentes.length === 0 ? (
              <p className="font-poppins text-[0.85rem] font-light text-cappuccino py-6">
                Nenhum presente escolhido ainda.
              </p>
            ) : (
              <ul className="list-none text-left">
                {presentes.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-baseline justify-between gap-4 border-b border-creamy py-3"
                  >
                    <span className="font-poppins text-[0.85rem] font-light text-text-muted">{p.nome}</span>
                    <span className="font-garamond text-[1.05rem] italic text-dark text-right">
                      {p.quemAssinou || '—'}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={onClose}
              className="font-montserrat text-[0.65rem] tracking-[0.25em] uppercase px-[1.375rem] py-[0.6rem] bg-caramel text-white border-none rounded-[2px] cursor-pointer inline-flex items-center justify-center whitespace-nowrap mt-6"
            >
              Fechar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
