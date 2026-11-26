// Derlemeden sonra her sayfanın HTML'ini hazır içerikle üretir.
// Arama motorları ve JavaScript'i yavaş açılan telefonlar metni hemen görür.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const kok = path.resolve(process.cwd());
const dist = path.join(kok, "dist");
// SSR çıktısının adı ortama göre değişebilir; entry-server ile başlayan .js dosyasını bul
const ssrDosya = fs.readdirSync(path.join(kok, "dist-ssr"), { recursive: true })
  .map(String).find((f) => /entry-server[^/]*\.m?js$/.test(f));
if (!ssrDosya) throw new Error("dist-ssr içinde entry-server bulunamadı");
const { render } = await import(pathToFileURL(path.join(kok, "dist-ssr", ssrDosya)).href);
const { T, YOL, SITE, FIRMA } = await import(pathToFileURL(path.join(kok, "src/icerik.js")).href);

const sablon = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const kac = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const SAYFALAR = ["ana", "urunler", "hammadde", "hakkimizda", "iletisim"];
const harita = [];

function yaz(sayfa, dil, dosya, { indeks = true } = {}) {
  const [baslik, aciklama] = T[dil].meta[sayfa];
  const url = sayfa === "bulunamadi" ? null : SITE + YOL[dil][sayfa];
  const bas = [
    `<meta name="description" content="${kac(aciklama)}">`,
    indeks ? "" : `<meta name="robots" content="noindex">`,
    url ? `<link rel="canonical" href="${url}">` : "",
    url ? `<link rel="alternate" hreflang="tr" href="${SITE + YOL.tr[sayfa]}">` : "",
    url ? `<link rel="alternate" hreflang="en" href="${SITE + YOL.en[sayfa]}">` : "",
    url ? `<link rel="alternate" hreflang="x-default" href="${SITE + YOL.tr[sayfa]}">` : "",
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="Raypak Ambalaj">`,
    `<meta property="og:title" content="${kac(baslik)}">`,
    `<meta property="og:description" content="${kac(aciklama)}">`,
    url ? `<meta property="og:url" content="${url}">` : "",
    `<meta property="og:image" content="${SITE}/assets/img/og.jpg">`,
    `<meta property="og:locale" content="${dil === "tr" ? "tr_TR" : "en_US"}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
  ];
  if (sayfa === "ana") {
    const ld = {
      "@context": "https://schema.org", "@type": "Organization", name: FIRMA.unvan, alternateName: "Raypak",
      url: SITE + "/", logo: SITE + "/icon-512.png", email: FIRMA.eposta, telephone: FIRMA.tel.replace(/\s/g, ""),
      address: { "@type": "PostalAddress", streetAddress: FIRMA.adres.slice(0, 2).join(" "), postalCode: "34490",
        addressLocality: "Başakşehir", addressRegion: "İstanbul", addressCountry: "TR" },
    };
    bas.push(`<script type="application/ld+json">${JSON.stringify(ld)}</script>`);
  }
  let html = sablon
    .replace('<html lang="tr">', `<html lang="${dil}">`)
    .replace(/<title>.*?<\/title>/, `<title>${kac(baslik)}</title>`)
    .replace("<!--bas-->", bas.filter(Boolean).join("\n"))
    .replace('<div id="root"></div>', `<div id="root" data-sayfa="${sayfa}" data-dil="${dil}">${render(sayfa, dil)}</div>`);
  const hedef = path.join(dist, dosya);
  fs.mkdirSync(path.dirname(hedef), { recursive: true });
  fs.writeFileSync(hedef, html);
  if (url) harita.push(sayfa);
}

for (const dil of ["tr", "en"])
  for (const s of SAYFALAR) yaz(s, dil, path.join(YOL[dil][s], "index.html"));
yaz("bulunamadi", "tr", "404.html", { indeks: false });

const bugun = new Date().toISOString().slice(0, 10);
const xml = ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'];
for (const dil of ["tr", "en"])
  for (const s of SAYFALAR)
    xml.push(`<url><loc>${SITE + YOL[dil][s]}</loc><lastmod>${bugun}</lastmod>` +
      `<xhtml:link rel="alternate" hreflang="tr" href="${SITE + YOL.tr[s]}"/>` +
      `<xhtml:link rel="alternate" hreflang="en" href="${SITE + YOL.en[s]}"/></url>`);
xml.push("</urlset>");
fs.writeFileSync(path.join(dist, "sitemap.xml"), xml.join("\n"));
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log("sayfalar hazır:", fs.readdirSync(dist).join(" "));
