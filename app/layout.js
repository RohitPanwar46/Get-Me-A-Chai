import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Sessionwrapper from "./component/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me a chai - A website for fund your project with chai",
  description: "A website for fund your project with chai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Sessionwrapper>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white`}>
          <Navbar />
          <div className="min-h-[86.6vh]">
            {children}
          </div>
          <Footer />
        </body>
      </Sessionwrapper>
    </html>
  );
}
