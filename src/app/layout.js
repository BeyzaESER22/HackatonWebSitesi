import './globals.css';
import { Space_Grotesk, Inter, JetBrains_Mono, Permanent_Marker } from 'next/font/google';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toast } from '@/components/ui/Toast';
import { buildMetadata } from '@/lib/seo';

const display = Space_Grotesk({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-display', display: 'swap' });
const body    = Inter({           subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-body',    display: 'swap' });
const mono    = JetBrains_Mono({  subsets: ['latin'], weight: ['400','500'],                  variable: '--font-mono',    display: 'swap' });
const brush   = Permanent_Marker({ subsets: ['latin'], weight: ['400'],                       variable: '--font-brush',   display: 'swap' });

export const metadata = buildMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable} ${mono.variable} ${brush.variable}`}>
      <body className="hf-grain">
        <div className="hf-mesh-bg" aria-hidden="true" />
        <AppProvider>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
