"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Presente {
  id: string;
  nome: string;
  categoria: string;
  assinado: boolean;
  quemAssinou: string;
}

function CategoryIcon({ cat }: { cat: string }) {
  const key = cat.toLowerCase().replace(/\s/g, "");
  const s = {
    stroke: "var(--cappuccino)",
    strokeWidth: "1.2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };
  const icons: Record<string, React.ReactNode> = {
    cozinha: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...{ fill: "none" }}>
        <path d="M6 2v6a4 4 0 0 0 8 0V2" {...s} />
        <line x1="10" y1="2" x2="10" y2="8" {...s} />
        <path d="M18 2c0 0 2 2 2 6s-2 6-2 6" {...s} />
        <line x1="6" y1="14" x2="18" y2="14" {...s} />
        <rect x="4" y="14" width="16" height="8" rx="1" {...s} />
      </svg>
    ),
    sala: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...{ fill: "none" }}>
        <rect x="2" y="9" width="6" height="10" rx="2" {...s} />
        <rect x="16" y="9" width="6" height="10" rx="2" {...s} />
        <path d="M8 11H16V19H8z" {...s} />
        <path d="M2 13h20" {...s} />
        <path d="M8 19v2M16 19v2" {...s} />
      </svg>
    ),
    banheiro: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...{ fill: "none" }}>
        <path d="M4 12h16v4a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6v-4z" {...s} />
        <path d="M4 12V6a2 2 0 0 1 4 0v1" {...s} />
        <line x1="2" y1="12" x2="22" y2="12" {...s} />
      </svg>
    ),
    quarto: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...{ fill: "none" }}>
        <rect x="2" y="14" width="20" height="7" rx="1" {...s} />
        <path d="M2 14v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" {...s} />
        <path d="M7 8V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2" {...s} />
        <line x1="2" y1="18" x2="2" y2="21" {...s} />
        <line x1="22" y1="18" x2="22" y2="21" {...s} />
      </svg>
    ),
    lavanderia: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...{ fill: "none" }}>
        <rect x="2" y="2" width="20" height="20" rx="2" {...s} />
        <circle cx="12" cy="13" r="5" {...s} />
        <circle cx="12" cy="13" r="2" {...s} />
        <line x1="5" y1="5" x2="5" y2="5" {...{ ...s, strokeWidth: "2" }} />
        <line x1="8" y1="5" x2="8" y2="5" {...{ ...s, strokeWidth: "2" }} />
      </svg>
    ),
    luademel: (
      <svg width="22" height="22" viewBox="0 0 24 24" {...{ fill: "none" }}>
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
          {...s}
        />
      </svg>
    ),
  };
  return (
    <>
      {icons[key] ?? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 12V22H4V12"
            stroke="var(--cappuccino)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 7H2v5h20V7z"
            stroke="var(--cappuccino)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22V7"
            stroke="var(--cappuccino)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"
            stroke="var(--cappuccino)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"
            stroke="var(--cappuccino)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ── Minimalist SVG icons ───────────────────────────────────

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8.5" stroke="var(--caramel)" />
      <polyline points="5,9 8,12 13,6" stroke="var(--caramel)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8.5" stroke="var(--cappuccino)" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <polyline points="2,5 7,10 12,5" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <polyline points="2,10 7,5 12,10" stroke="var(--text-muted)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="var(--cappuccino)" strokeWidth="1.2" />
      <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="var(--cappuccino)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconGift() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="18" height="14" rx="1" stroke="var(--caramel)" strokeWidth="1.2" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="var(--caramel)" strokeWidth="1.2" />
      <line x1="12" y1="8" x2="12" y2="22" stroke="var(--caramel)" strokeWidth="1.2" />
      <path d="M12 8C12 8 9 2 6 4C4 5 5 8 12 8Z" stroke="var(--caramel)" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M12 8C12 8 15 2 18 4C20 5 19 8 12 8Z" stroke="var(--caramel)" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function IconPix() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L14.5 7H20L15.5 10.5L17 16L12 12.5L7 16L8.5 10.5L4 7H9.5L12 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 3L21 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10V20H9V15H15V20H19V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Component ──────────────────────────────────────────────

export default function Presentes() {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemToSign, setItemToSign] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<"pix" | "casa" | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "presentes"));
        const data: Presente[] = snap.docs.map((d) => ({
          id: d.id,
          nome: d.data().nome || d.id.replace(/-/g, " "),
          categoria: (d.data().categoria ?? "").trim().toLowerCase(),
          assinado: d.data().assinado ?? false,
          quemAssinou: d.data().quemAssinou ?? "",
        }));
        setPresentes(data);
        const cats = Array.from(new Set(data.map((p) => p.categoria)));
        setExpandedCategories(Object.fromEntries(cats.map((c) => [c, false])));
      } catch (err) {
        console.error("Erro ao buscar presentes:", err);
      }
    })();
  }, []);

  const categorias = Array.from(new Set(presentes.map((p) => p.categoria)));

  const filtrados = presentes.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? p.categoria === selectedCategory : true),
  );

  const toggleCategory = (cat: string) =>
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const toggleItem = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id));
    setNome("");
  };

  const abrirModal = (id: string) => {
    if (!nome.trim()) return;
    setItemToSign(id);
    setSelectedMethod(null);
    setShowModal(true);
  };

  const confirmarAssinatura = async () => {
    if (!nome.trim() || !selectedMethod) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, "presentes", itemToSign!), {
        assinado: true,
        quemAssinou: nome,
      });
      setPresentes((prev) =>
        prev.map((p) =>
          p.id === itemToSign ? { ...p, assinado: true, quemAssinou: nome } : p,
        ),
      );
      setShowModal(false);
      setNome("");
      setExpandedItem(null);
      setShowThankYou(true);
    } catch (err) {
      console.error("Erro ao assinar presente:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-24 min-h-screen bg-bg"
      >
        {/* Header */}
        <section className="text-center py-16 px-8">
          <p className="font-montserrat text-[0.65rem] tracking-[0.5em] uppercase text-caramel mb-4">Sarah &amp; Carlo</p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-garamond font-light text-[clamp(2rem,6vw,3.8rem)] text-dark mb-6"
          >
            Lista de Presentes
          </motion.h1>
          <div className="divider" />
        </section>

        {/* Search & Filter */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-[860px] mx-auto mb-10 px-8 flex flex-wrap gap-4 items-center"
        >
          {/* Search input */}
          <label className="flex-1 min-w-[220px] flex items-center gap-[0.625rem] border border-beige rounded-full px-4 bg-white cursor-text">
            <IconSearch />
            <input
              type="text"
              placeholder="Buscar presente…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="font-poppins text-[0.82rem] font-light py-[0.625rem] border-none bg-transparent text-dark outline-none w-full"
            />
          </label>

          {/* Category select */}
          <div className="relative min-w-[190px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="font-poppins text-[0.82rem] font-light py-[0.625rem] pl-[1.125rem] pr-[2.25rem] border border-beige rounded-full bg-white text-dark outline-none appearance-none cursor-pointer w-full"
            >
              <option value="">Todas as categorias</option>
              {categorias.map((c) => (
                <option key={c} value={c} className="bg-bg">
                  {capitalize(c)}
                </option>
              ))}
            </select>
            <span className="absolute right-[0.875rem] top-1/2 -translate-y-1/2 pointer-events-none">
              <IconChevronDown />
            </span>
          </div>
        </motion.section>

        {/* Categories */}
        <section className="max-w-[860px] mx-auto mb-24 px-8">
          {categorias.map((cat) => {
            const itens = filtrados.filter((p) => p.categoria === cat);
            if (selectedCategory && selectedCategory !== cat) return null;
            if (itens.length === 0 && searchQuery) return null;
            const isExpanded = selectedCategory ? true : expandedCategories[cat];

            return (
              <div key={cat} className="border-b border-beige mb-2">
                {/* Category header */}
                <div
                  onClick={() => toggleCategory(cat)}
                  className="flex items-center justify-between cursor-pointer py-5"
                >
                  <div className="flex items-center gap-[0.875rem]">
                    <CategoryIcon cat={cat} />
                    <h2 className="font-garamond font-normal text-[clamp(1.2rem,2.5vw,1.6rem)] text-dark">
                      {capitalize(cat)}
                    </h2>
                    <span className="font-montserrat text-[0.6rem] tracking-[0.2em] text-cappuccino">
                      {itens.filter((i) => i.assinado).length}/{itens.length}
                    </span>
                  </div>
                  {isExpanded ? <IconChevronUp /> : <IconChevronDown />}
                </div>

                {/* Items */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28 }}
                      className="list-none overflow-hidden"
                    >
                      {itens.map((item) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                          className="border-b border-creamy py-[0.875rem]"
                        >
                          <div
                            onClick={() => !item.assinado && toggleItem(item.id)}
                            className={`flex items-center gap-[0.875rem] ${item.assinado ? "cursor-default" : "cursor-pointer"}`}
                          >
                            <span className="flex-shrink-0">
                              {item.assinado ? <IconCheck /> : <IconCircle />}
                            </span>
                            <span className={`font-poppins text-[0.88rem] font-light tracking-[0.01em] ${item.assinado ? "text-cappuccino line-through" : "text-text-muted"}`}>
                              {item.nome}
                            </span>
                          </div>

                          <AnimatePresence>
                            {expandedItem === item.id && !item.assinado && (
                              <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.25 }}
                                className="flex gap-[0.625rem] mt-3 pl-7"
                              >
                                <input
                                  type="text"
                                  placeholder="Seu nome"
                                  value={nome}
                                  onChange={(e) => setNome(e.target.value)}
                                  onKeyDown={(e) => e.key === "Enter" && abrirModal(item.id)}
                                  className="font-poppins text-[0.82rem] font-light py-[0.625rem] pl-[0.875rem] border border-beige rounded-full bg-white text-dark outline-none flex-1"
                                />
                                <button
                                  onClick={() => abrirModal(item.id)}
                                  className="font-montserrat text-[0.65rem] tracking-[0.25em] uppercase px-[1.375rem] py-[0.6rem] bg-caramel text-white border-none rounded-[2px] cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
                                >
                                  Assinar
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {presentes.length === 0 && (
            <p className="text-center text-cappuccino font-poppins text-[0.85rem] py-20">
              Carregando presentes…
            </p>
          )}
        </section>
      </motion.main>

      <Footer />

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/45 backdrop-blur-[6px] flex items-center justify-center z-[200] p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="bg-bg p-[clamp(2rem,5vw,3rem)_clamp(1.5rem,5vw,2.5rem)] rounded-lg max-w-[480px] w-full max-h-[85vh] overflow-y-auto text-center shadow-[0_20px_50px_rgba(92,61,46,0.2)]"
            >
              <div className="mx-auto mb-5 w-7">
                <IconGift />
              </div>
              <h2 className="font-garamond font-normal text-[clamp(1.2rem,3vw,1.7rem)] text-dark mb-2">Como deseja presentear?</h2>
              <p className="font-poppins text-[0.85rem] font-light text-text-muted leading-[1.75]">
                Ao confirmar, o item será marcado como escolhido.
              </p>

              <div className="flex gap-3 justify-center my-7 flex-wrap">
                <button
                  onClick={() => setSelectedMethod("pix")}
                  className={`flex flex-col items-center p-4 border rounded-[2px] min-w-[130px] transition-all duration-[180ms] font-montserrat text-[0.62rem] tracking-[0.2em] uppercase ${selectedMethod === "pix" ? "border-caramel bg-caramel/5 text-caramel" : "border-beige bg-transparent text-text-muted"}`}
                >
                  <IconPix />
                  <span className="mt-2">Transferência / PIX</span>
                </button>
                <button
                  onClick={() => setSelectedMethod("casa")}
                  className={`flex flex-col items-center p-4 border rounded-[2px] min-w-[130px] transition-all duration-[180ms] font-montserrat text-[0.62rem] tracking-[0.2em] uppercase ${selectedMethod === "casa" ? "border-caramel bg-caramel/5 text-caramel" : "border-beige bg-transparent text-text-muted"}`}
                >
                  <IconHome />
                  <span className="mt-2">Entregar em Casa</span>
                </button>
              </div>

              <AnimatePresence>
                {selectedMethod === "pix" && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4">
                    <p className="font-poppins text-[0.85rem] font-light text-text-muted leading-[1.75]">
                      Chave PIX: <strong className="text-dark">— a definir —</strong>
                    </p>
                    <p className="font-poppins text-[0.78rem] font-light text-text-muted leading-[1.75] mt-[0.4rem]">
                      QR Code disponível em breve.
                    </p>
                  </motion.div>
                )}
                {selectedMethod === "casa" && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-4">
                    <p className="font-poppins text-[0.85rem] font-medium text-dark leading-[1.75] mb-[0.35rem]">
                      Endereço para entrega:
                    </p>
                    <p className="font-poppins text-[0.85rem] font-light text-text-muted leading-[1.75]">
                      — a definir —
                    </p>
                    <p className="font-poppins text-[0.78rem] font-light text-text-muted leading-[1.75] mt-[0.4rem]">
                      Entre em contato para combinar.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-3 justify-center mt-5 flex-wrap">
                <button
                  onClick={() => setShowModal(false)}
                  className="font-montserrat text-[0.65rem] tracking-[0.25em] uppercase px-[1.375rem] py-[0.6rem] bg-transparent text-text-muted border border-beige rounded-[2px] cursor-pointer inline-flex items-center justify-center whitespace-nowrap"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarAssinatura}
                  disabled={!selectedMethod || loading}
                  className={`font-montserrat text-[0.65rem] tracking-[0.25em] uppercase px-[1.375rem] py-[0.6rem] bg-caramel text-white border-none rounded-[2px] inline-flex items-center justify-center whitespace-nowrap transition-opacity ${!selectedMethod ? "opacity-45 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    "Confirmar"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thank You Modal */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/45 backdrop-blur-[6px] flex items-center justify-center z-[200] p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="bg-bg p-[clamp(2rem,5vw,3rem)_clamp(1.5rem,5vw,2.5rem)] rounded-lg max-w-[480px] w-full text-center shadow-[0_20px_50px_rgba(92,61,46,0.2)]"
            >
              <div className="mx-auto mb-5 w-7">
                <IconGift />
              </div>
              <h2 className="font-garamond font-normal text-[clamp(1.2rem,3vw,1.7rem)] text-dark mb-2">Muito obrigado!</h2>
              <p className="font-poppins text-[0.85rem] font-light text-text-muted leading-[1.75]">
                Sua generosidade significa muito para nós. Que Deus abençoe você ricamente!
              </p>
              <button
                onClick={() => setShowThankYou(false)}
                className="font-montserrat text-[0.65rem] tracking-[0.25em] uppercase px-[1.375rem] py-[0.6rem] bg-caramel text-white border-none rounded-[2px] cursor-pointer inline-flex items-center justify-center whitespace-nowrap mt-6"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
