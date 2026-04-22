import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sarah & Carlo — 12.12.2026',
  description:
    'Celebre conosco o casamento de Sarah e Carlo em 12 de Dezembro de 2026 na Paróquia Nossa Senhora do Perpétuo Socorro e Todos os Santos, Montes Claros – MG.',
  keywords: ['casamento', 'Sarah', 'Carlo', 'Montes Claros', '2026', 'wedding'],
  openGraph: {
    title: 'Sarah & Carlo — 12.12.2026',
    description: 'Um convite especial para celebrar nosso casamento.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Poppins:wght@300;400;500;600&family=Montserrat:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
