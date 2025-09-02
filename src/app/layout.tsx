import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Srikar Portfolio",
  description: "Visual and product designer who builds what I design. From brand identities to Swift apps and React applications, I create end-to-end digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Google Analytics via next/script */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FEBY07XY8L" strategy="afterInteractive" />
        <Script id="ga-setup" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FEBY07XY8L');
          `}
        </Script>
      </head>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
