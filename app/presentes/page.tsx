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
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="8.5" stroke="var(--caramel)" />
      <polyline
        points="5,9 8,12 13,6"
        stroke="var(--caramel)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCircle() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="8.5" stroke="var(--beige)" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <polyline
        points="2,5 7,10 12,5"
        stroke="var(--text-muted)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevronUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <polyline
        points="2,10 7,5 12,10"
        stroke="var(--text-muted)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle
        cx="6.5"
        cy="6.5"
        r="5.5"
        stroke="var(--cappuccino)"
        strokeWidth="1.2"
      />
      <line
        x1="10.5"
        y1="10.5"
        x2="14"
        y2="14"
        stroke="var(--cappuccino)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconGift() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="8"
        width="18"
        height="14"
        rx="1"
        stroke="var(--caramel)"
        strokeWidth="1.2"
      />
      <line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        stroke="var(--caramel)"
        strokeWidth="1.2"
      />
      <line
        x1="12"
        y1="8"
        x2="12"
        y2="22"
        stroke="var(--caramel)"
        strokeWidth="1.2"
      />
      <path
        d="M12 8C12 8 9 2 6 4C4 5 5 8 12 8Z"
        stroke="var(--caramel)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M12 8C12 8 15 2 18 4C20 5 19 8 12 8Z"
        stroke="var(--caramel)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPix() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L14.5 7H20L15.5 10.5L17 16L12 12.5L7 16L8.5 10.5L4 7H9.5L12 2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHome() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12L12 3L21 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 10V20H9V15H15V20H19V10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Component ──────────────────────────────────────────────

export default function Presentes() {
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemToSign, setItemToSign] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<"pix" | "casa" | null>(
    null,
  );
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
          categoria: d.data().categoria ?? "",
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
        style={{ paddingTop: "6rem", minHeight: "100vh" }}
      >
        {/* Header */}
        <section style={{ textAlign: "center", padding: "4rem 2rem 2rem" }}>
          <p style={labelStyle}>Sarah &amp; Carlo</p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 6vw, 3.8rem)",
              color: "var(--dark)",
              marginBottom: "1.5rem",
            }}
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
          style={{
            maxWidth: 860,
            margin: "2.5rem auto",
            padding: "0 2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "stretch",
          }}
        >
          {/* Search input */}
          <label style={searchWrapStyle}>
            <IconSearch />
            <input
              type="text"
              placeholder="Buscar presente…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchInputStyle}
            />
          </label>

          {/* Category select */}
          <div style={selectWrapStyle}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={selectInputStyle}
            >
              <option value="">Todas as categorias</option>
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {capitalize(c)}
                </option>
              ))}
            </select>
            <span
              style={{
                position: "absolute",
                right: "0.875rem",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <IconChevronDown />
            </span>
          </div>
        </motion.section>

        {/* Categories */}
        <section
          style={{ maxWidth: 860, margin: "0 auto 6rem", padding: "0 2rem" }}
        >
          {categorias.map((cat) => {
            const itens = filtrados.filter((p) => p.categoria === cat);
            if (selectedCategory && selectedCategory !== cat) return null;
            if (itens.length === 0 && searchQuery) return null;
            const isExpanded = selectedCategory
              ? true
              : expandedCategories[cat];

            return (
              <div
                key={cat}
                style={{
                  borderBottom: "1px solid var(--beige)",
                  marginBottom: "0.5rem",
                }}
              >
                {/* Category header */}
                <div
                  onClick={() => toggleCategory(cat)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    padding: "1.25rem 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.875rem",
                    }}
                  >
                    <CategoryIcon cat={cat} />
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 400,
                        fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                        color: "var(--dark)",
                      }}
                    >
                      {capitalize(cat)}
                    </h2>
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                        color: "var(--cappuccino)",
                      }}
                    >
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
                      style={{ listStyle: "none", overflow: "hidden" }}
                    >
                      {itens.map((item) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                          style={{
                            borderBottom: "1px solid var(--fg)",
                            padding: "0.875rem 0",
                          }}
                        >
                          <div
                            onClick={() =>
                              !item.assinado && toggleItem(item.id)
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.875rem",
                              cursor: item.assinado ? "default" : "pointer",
                            }}
                          >
                            <span style={{ flexShrink: 0 }}>
                              {item.assinado ? <IconCheck /> : <IconCircle />}
                            </span>
                            <span
                              style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "0.88rem",
                                fontWeight: 300,
                                color: item.assinado
                                  ? "var(--cappuccino)"
                                  : "var(--text-muted)",
                                textDecoration: item.assinado
                                  ? "line-through"
                                  : "none",
                                letterSpacing: "0.01em",
                              }}
                            >
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
                                style={{
                                  display: "flex",
                                  gap: "0.625rem",
                                  marginTop: "0.75rem",
                                  paddingLeft: "1.75rem",
                                }}
                              >
                                <input
                                  type="text"
                                  placeholder="Seu nome"
                                  value={nome}
                                  onChange={(e) => setNome(e.target.value)}
                                  onKeyDown={(e) =>
                                    e.key === "Enter" && abrirModal(item.id)
                                  }
                                  style={{
                                    ...searchInputStyle,
                                    flex: 1,
                                    paddingLeft: "0.875rem",
                                  }}
                                />
                                <button
                                  onClick={() => abrirModal(item.id)}
                                  style={btnPrimaryStyle}
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
            <p
              style={{
                textAlign: "center",
                color: "var(--cappuccino)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.85rem",
                padding: "5rem 0",
              }}
            >
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
            style={overlayStyle}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              style={modalStyle}
            >
              <div style={{ margin: "0 auto 1.25rem", width: 28 }}>
                <IconGift />
              </div>
              <h2 style={modalTitleStyle}>Como deseja presentear?</h2>
              <p style={modalTextStyle}>
                Ao confirmar, o item será marcado como escolhido.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  justifyContent: "center",
                  margin: "1.75rem 0",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => setSelectedMethod("pix")}
                  style={methodBtnStyle(selectedMethod === "pix")}
                >
                  <IconPix />
                  <span style={{ marginTop: "0.5rem" }}>
                    Transferência / PIX
                  </span>
                </button>
                <button
                  onClick={() => setSelectedMethod("casa")}
                  style={methodBtnStyle(selectedMethod === "casa")}
                >
                  <IconHome />
                  <span style={{ marginTop: "0.5rem" }}>Entregar em Casa</span>
                </button>
              </div>

              <AnimatePresence>
                {selectedMethod === "pix" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ marginBottom: "1rem" }}
                  >
                    <p style={modalTextStyle}>
                      Chave PIX:{" "}
                      <strong style={{ color: "var(--dark)" }}>
                        — a definir —
                      </strong>
                    </p>
                    <p
                      style={{
                        ...modalTextStyle,
                        fontSize: "0.78rem",
                        marginTop: "0.4rem",
                      }}
                    >
                      QR Code disponível em breve.
                    </p>
                  </motion.div>
                )}
                {selectedMethod === "casa" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ marginBottom: "1rem" }}
                  >
                    <p
                      style={{
                        ...modalTextStyle,
                        fontWeight: 500,
                        color: "var(--dark)",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Endereço para entrega:
                    </p>
                    <p style={modalTextStyle}>— a definir —</p>
                    <p
                      style={{
                        ...modalTextStyle,
                        fontSize: "0.78rem",
                        marginTop: "0.4rem",
                      }}
                    >
                      Entre em contato para combinar.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  justifyContent: "center",
                  marginTop: "1.25rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => setShowModal(false)}
                  style={btnSecondaryStyle}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarAssinatura}
                  disabled={!selectedMethod || loading}
                  style={{
                    ...btnPrimaryStyle,
                    opacity: !selectedMethod ? 0.45 : 1,
                    cursor: !selectedMethod ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters
                      style={{ animation: "spin 1s linear infinite" }}
                    />
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
            style={overlayStyle}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              style={modalStyle}
            >
              <div style={{ margin: "0 auto 1.25rem", width: 28 }}>
                <IconGift />
              </div>
              <h2 style={modalTitleStyle}>Muito obrigado!</h2>
              <p style={modalTextStyle}>
                Sua generosidade significa muito para nós. Que Deus abençoe você
                ricamente!
              </p>
              <button
                onClick={() => setShowThankYou(false)}
                style={{ ...btnPrimaryStyle, marginTop: "1.5rem" }}
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: var(--cappuccino); }
        select option { background: var(--bg); }
      `}</style>
    </>
  );
}

// ── Styles ─────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "0.65rem",
  letterSpacing: "0.5em",
  textTransform: "uppercase",
  color: "var(--caramel)",
  marginBottom: "1rem",
};

const searchWrapStyle: React.CSSProperties = {
  flex: 1,
  minWidth: 220,
  display: "flex",
  alignItems: "center",
  gap: "0.625rem",
  border: "1px solid var(--beige)",
  borderRadius: "999px",
  padding: "0 1rem",
  background: "var(--white)",
  cursor: "text",
};

const searchInputStyle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: "0.82rem",
  fontWeight: 300,
  padding: "0.625rem 0",
  border: "none",
  background: "transparent",
  color: "var(--dark)",
  outline: "none",
  width: "100%",
};

const selectWrapStyle: React.CSSProperties = {
  position: "relative",
  minWidth: 190,
};

const selectInputStyle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: "0.82rem",
  fontWeight: 300,
  padding: "0.625rem 2.25rem 0.625rem 1.125rem",
  border: "1px solid var(--beige)",
  borderRadius: "999px",
  background: "var(--white)",
  color: "var(--dark)",
  outline: "none",
  appearance: "none",
  cursor: "pointer",
  width: "100%",
};

const btnPrimaryStyle: React.CSSProperties = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "0.65rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  padding: "0.6rem 1.375rem",
  background: "var(--caramel)",
  color: "var(--white)",
  border: "none",
  borderRadius: "2px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  whiteSpace: "nowrap",
};

const btnSecondaryStyle: React.CSSProperties = {
  ...btnPrimaryStyle,
  background: "transparent",
  color: "var(--text-muted)",
  border: "1px solid var(--beige)",
};

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(92,61,46,0.45)",
  backdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 200,
  padding: "1rem",
};

const modalStyle: React.CSSProperties = {
  background: "var(--bg)",
  padding: "2.5rem 2rem",
  borderRadius: "2px",
  maxWidth: 440,
  width: "100%",
  maxHeight: "90vh",
  overflowY: "auto",
  textAlign: "center",
};

const modalTitleStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 400,
  fontSize: "clamp(1.2rem, 3vw, 1.7rem)",
  color: "var(--dark)",
  marginBottom: "0.5rem",
};

const modalTextStyle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: "0.85rem",
  fontWeight: 300,
  color: "var(--text-muted)",
  lineHeight: 1.75,
};

const methodBtnStyle = (active: boolean): React.CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem 1.375rem",
  border: `1px solid ${active ? "var(--caramel)" : "var(--beige)"}`,
  borderRadius: "2px",
  background: active ? "rgba(176,137,104,0.07)" : "transparent",
  color: active ? "var(--caramel)" : "var(--text-muted)",
  cursor: "pointer",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "0.62rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  transition: "all 0.18s ease",
  minWidth: 130,
});
