import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={metadataBase:new URL("https://avelune.com"),title:{default:"AVELUNE — Personalised Pet Keepsakes",template:"%s | AVELUNE"},description:"Personalised solid-wood pet keepsake boxes. A quiet place for their love to stay.",keywords:["personalised pet keepsake","wooden pet memorial box","pet remembrance gift"],openGraph:{title:"AVELUNE — Personalised Pet Keepsakes",description:"A quiet place for their love to stay.",type:"website",images:[{url:"/images/avelune/hero-keepsake.jpg",alt:"AVELUNE personalised wooden pet keepsake box"}]}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
