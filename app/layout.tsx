import "./globals.css";

import { GeistSans } from "geist/font/sans";

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
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>{children}</body>
    </html>
  );
}
