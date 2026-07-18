import type { Metadata } from "next";
import "./globals.css";

const socialImage = "/images/avelune/hero-keepsake.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://avelune.com"),
  title: {
    default: "AVELUNE | Personalized Wooden Pet Memorial Keepsakes",
    template: "%s | AVELUNE",
  },
  description: "Personalized wooden pet memorial keepsakes created to preserve photographs, collars, handwritten notes, and the memories that remain closest.",
  openGraph: {
    title: "AVELUNE | Personalized Wooden Pet Memorial Keepsakes",
    description: "Personalized wooden pet memorial keepsakes created to preserve photographs, collars, handwritten notes, and the memories that remain closest.",
    type: "website",
    siteName: "AVELUNE",
    images: [{ url: socialImage, alt: "AVELUNE personalized wooden pet keepsake" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVELUNE | Personalized Wooden Pet Memorial Keepsakes",
    description: "Personalized wooden pet memorial keepsakes created to preserve photographs, collars, handwritten notes, and the memories that remain closest.",
    images: [socialImage],
  },
  icons: {
    icon: socialImage,
    apple: socialImage,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
