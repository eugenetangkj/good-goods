import type { Metadata} from "next";
import localFont from "next/font/local";
import "./../globals.css";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Good Goods",
  description: "Effortlessly connecting consumers with social enterprises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <ThemeModeScript />
      </head>

      <body className={`${inter.className} antialiased`}>
          {children}   
      </body>
    </html>
  );
}
