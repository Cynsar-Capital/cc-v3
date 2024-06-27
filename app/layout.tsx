import Footer from "@/components/footer";
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import Section from "@/components/section";

let title = "Cynsar Capital, lets build capital for everyone";
let description =
  "We are an AI based capital management firm that lets you chat with a super smart intelligent bot who can guide you with bunch of stuff.";

export const metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://cynsar.capital"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>
        {children}
        <Section />
        <Footer />
      </body>
    </html>
  );
}
