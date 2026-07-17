import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap{return ["","/product","/about","/gallery","/faq","/contact"].map((path)=>({url:`https://avelune.com${path}`,lastModified:new Date()}));}
