import Link from "next/link";
import { Footer, Header } from "./components/chrome";

export default function NotFound() {
  return <><Header/><main className="legal wrap"><p className="eyebrow">404</p><h1>Page not found</h1><p>The page you are looking for may have moved or no longer exists.</p><Link className="button" href="/">Return Home <span>↗</span></Link></main><Footer/></>;
}
