'use client';

export default function Footer() {
  return (
    <footer>
      <button
        className="back-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
      >
        ↑
      </button>
      <h2>Sarah &amp; Carlo</h2>
      <blockquote>
        &ldquo;O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.
        Tudo sofre, tudo crê, tudo espera, tudo suporta.&rdquo;
      </blockquote>
      <p className="verse-ref">1 Coríntios 13:4-7</p>
      <p className="footer-love">
        Agradecemos imensamente por fazerem parte deste momento tão especial.<br />
        Com amor, Sarah e Carlo
      </p>
      <p className="footer-date">12 de Dezembro de 2026</p>
    </footer>
  );
}
