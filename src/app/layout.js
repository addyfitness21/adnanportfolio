import { Plus_Jakarta_Sans, Great_Vibes, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const greatVibes = Great_Vibes({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: ["400"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Adnan Ali — Founder & Builder",
  description: "I don't just build brands. I build the systems behind them.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${greatVibes.variable} ${playfairDisplay.variable} ${caveat.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Font Awesome Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          precedence="default"
        />
      </head>
      <body className="bg-black text-zinc-100 font-sans selection:bg-rose-500 selection:text-white min-h-screen overflow-x-hidden relative" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
