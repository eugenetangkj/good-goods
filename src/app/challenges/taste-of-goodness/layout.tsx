import type { Metadata} from "next";
import "./../../globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Good Goods - Taste of Goodness Challenge",
  description: "Discover and support a local F&B social enterprise while standing a chance to earn rewards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css" rel="stylesheet" />
      </Head>

      <body className={`${inter.className} antialiased overflow-x-hidden`}>
          {children}   
          <script src="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js" async></script>
      </body>
    </html>
  );
}
