import { lazy, Suspense, useEffect, useRef, useState } from "react";
import VariableProximity from "./rb/VariableProximity";
import AkanYazi from "./rb/AkanYazi";
import FlowingMenu from "./rb/FlowingMenu";
import Magnet from "./rb/Magnet";
import logoAcik from "../public/assets/logo/raypak-logo.svg?raw";
import logoKoyu from "../public/assets/logo/raypak-logo-koyu.svg?raw";
import { T, YOL, FIRMA, HACIM } from "./icerik.js";

// Ağır WebGL bileşenleri ayrı dosyalara bölünür ve sayfa göründükten sonra yüklenir
const Ballpit = lazy(() => import("./rb/Ballpit"));
const CircularGallery = lazy(() => import("./rb/CircularGallery"));

const IMG = (n, w = 1200) => `/assets/img/${n}-${w}.webp`;

/* sayfa yüklenip tarayıcı boşa çıkınca true olur: animasyonlar ilk görüntüyü geciktirmez */
function useBosta(gecikme = 600) {
  const [hazir, setHazir] = useState(false);
  useEffect(() => {
    let iptal = false, t;
    const basla = () => {
      const ric = window.requestIdleCallback || ((f) => setTimeout(f, 200));
      t = setTimeout(() => ric(() => !iptal && setHazir(true)), gecikme);
    };
    if (document.readyState === "complete") basla(); else addEventListener("load", basla, { once: true });
    return () => { iptal = true; clearTimeout(t); removeEventListener("load", basla); };
  }, [gecikme]);
  return hazir;
}

/* öğe ekrana yaklaşınca true olur */
function useYakin(ref, pay = "400px") {
  const [yakin, setYakin] = useState(false);
  useEffect(() => {
    if (!ref.current || yakin) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setYakin(true), { rootMargin: pay });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, pay, yakin]);
  return yakin;
}

function useMobil() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = matchMedia("(max-width: 900px)");
    const f = () => setM(q.matches);
    f(); q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, []);
  return m;
}

/* logo, sayfaya gömülü SVG: ayrı dosya yüklemesine bağlı değil, her tarayıcıda görünür */
const Logo = ({ koyu, etiket }) => (
  <span className="logo-svg" role="img" aria-label={etiket} dangerouslySetInnerHTML={{ __html: koyu ? logoKoyu : logoAcik }} />
);

/* ---------- geri dönüşüm kodu ---------- */
const Kod = ({ n, ab, etiket }) =>
  n ? (
    <svg className="kod" viewBox="0 0 64 70" role="img" aria-label={`${etiket} ${n} ${ab}`}>
      <path d="M32 6 L58 52 L6 52 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <text x="32" y="44" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor">{n}</text>
      <text x="32" y="67" textAnchor="middle" fontSize="10" fontWeight="700" fill="currentColor">{ab}</text>
    </svg>
  ) : <span className="kod bos" aria-hidden="true" />;

/* ---------- kova çizimi: hacmin küp köküyle ölçeklenir, böylece boylar gerçek orandadır ---------- */
function Kova({ v, vurgu }) {
  const h = 150 * Math.cbrt(v / 20), wt = h * 0.8, wb = wt * 0.8, cx = 90, y0 = 176;
  const sol = cx - wt / 2, sag = cx + wt / 2;
  return (
    <svg viewBox="0 0 180 184" aria-hidden="true" className="kova">
      <path className={vurgu ? "kv vurgu" : "kv"} d={`M${sol} ${y0 - h} L${sag} ${y0 - h} L${cx + wb / 2} ${y0} L${cx - wb / 2} ${y0} Z`} />
      <path d={`M${sol - 3} ${y0 - h} h${wt + 6}`} stroke="currentColor" strokeWidth="5" />
      <path d={`M${sol + 4} ${y0 - h + 2} Q ${cx} ${y0 - h - wt * 0.6} ${sag - 4} ${y0 - h + 2}`} fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="0" y1={y0} x2="180" y2={y0} stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/* ---------- üst menü ---------- */
function Ust({ sayfa, dil }) {
  const t = T[dil], y = YOL[dil], obur = dil === "tr" ? "en" : "tr";
  const [acik, setAcik] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("menu-acik", acik);
    if (!acik) return;
    const k = (e) => e.key === "Escape" && setAcik(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [acik]);
  const linkler = [["urunler", t.menu.urunler], ["hammadde", t.menu.hammadde], ["hakkimizda", t.menu.hakkimizda], ["iletisim", t.menu.iletisim]];
  const dilYolu = YOL[obur][sayfa] || YOL[obur].ana;
  return (
    <>
      <a className="atla" href="#icerik">{t.menu.icerigeGec}</a>
      <header className={acik ? "ust acik" : "ust"}>
        <a href={y.ana} className="ust-logo" aria-label={`Raypak Ambalaj, ${t.menu.anaSayfa}`}><Logo etiket="Raypak Ambalaj" /></a>
        <nav id="anamenu" className="menu" aria-label={dil === "tr" ? "Ana menü" : "Main menu"}>
          {linkler.map(([k, ad]) => (
            <a key={k} href={y[k]} aria-current={sayfa === k ? "page" : undefined} onClick={() => setAcik(false)}>{ad}</a>
          ))}
          <a className="btn kucuk menu-teklif" href={y.iletisim} onClick={() => setAcik(false)}>{t.menu.teklif}</a>
        </nav>
        <div className="dil">
          <span aria-current="true">{dil.toUpperCase()}</span>
          <a href={dilYolu} hrefLang={obur} lang={obur} aria-label={T[obur].dilAdi}>{obur.toUpperCase()}</a>
        </div>
        <a className="btn kucuk ust-teklif" href={y.iletisim}>{t.menu.teklif}</a>
        <button className="menudugme" aria-expanded={acik} aria-controls="anamenu" onClick={() => setAcik(!acik)}>
          <span className="cizgi" aria-hidden="true"><i /><i /></span>
          <span className="gizli">{acik ? t.menu.kapat : t.menu.ac}</span>
        </button>
      </header>
    </>
  );
}

function Alt({ dil }) {
  const t = T[dil], y = YOL[dil];
  return (
    <footer className="alt">
      <div className="alt-ust">
        <div>
          <a href={y.ana} aria-label={`Raypak Ambalaj, ${t.menu.anaSayfa}`} className="alt-logo"><Logo koyu etiket="Raypak Ambalaj" /></a>
          <p>{t.alt.tanim}</p>
        </div>
        <div>
          <h2>{t.alt.sayfalar}</h2>
          <ul>
            <li><a href={y.urunler}>{t.menu.urunler}</a></li>
            <li><a href={y.hammadde}>{t.menu.hammadde}</a></li>
            <li><a href={y.hakkimizda}>{t.menu.hakkimizda}</a></li>
            <li><a href={y.iletisim}>{t.menu.iletisim}</a></li>
          </ul>
        </div>
        <div>
          <h2>{t.alt.iletisim}</h2>
          <ul>
            <li><a href={FIRMA.telHref}>{FIRMA.tel}</a></li>
            <li><a href={`mailto:${FIRMA.eposta}`}>{FIRMA.eposta}</a></li>
            <li><address>{FIRMA.adres.map((s) => <span key={s}>{s}<br /></span>)}</address></li>
          </ul>
        </div>
      </div>
      <p className="yasal">© {new Date().getFullYear()} {FIRMA.unvan} {t.alt.hak} MERSİS {FIRMA.mersis}. {dil === "tr" ? "Ticaret Sicil No" : "Trade Registry No."} {FIRMA.sicil}.</p>
    </footer>
  );
}

function Cagri({ dil }) {
  const t = T[dil];
  return (
    <section className="cagri">
      <h2>{t.cagri.baslik}</h2>
      <p>{t.cagri.metin}</p>
      <div className="iletisim">
        <Magnet padding={40} magnetStrength={4}><a className="buyuk" href={FIRMA.telHref}>{FIRMA.tel}</a></Magnet>
        <Magnet padding={40} magnetStrength={4}><a className="buyuk" href={`mailto:${FIRMA.eposta}`}>{FIRMA.eposta}</a></Magnet>
      </div>
      <a className="btn acik-btn" href={YOL[dil].iletisim}>{t.cagri.form}</a>
    </section>
  );
}

function SayfaBas({ baslik, giris }) {
  return (
    <section className="sayfabas">
      <h1>{baslik}</h1>
      <p>{giris}</p>
    </section>
  );
}

/* tarayıcı WebGL destekliyor mu (3B galeri ve granül havuzu için) */
function webglVar() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); }
  catch { return false; }
}

function Galeri({ dil }) {
  const ref = useRef(null);
  const serit = useRef(null);
  const yakin = useYakin(ref);
  const [gl, setGl] = useState(false);
  useEffect(() => { setGl(webglVar() && !matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  const liste = T[dil].hammaddeSayfa.liste;
  const items = liste.map((m) => ({ image: IMG(m[4]), text: m[2].replace(/ \(.*\)/, "") }));
  const kaydir = (yon) => serit.current?.scrollBy({ left: yon * serit.current.clientWidth * 0.8, behavior: "smooth" });
  const uc = gl && yakin;
  return (
    <div className={uc ? "galeri" : "galeri duz"} ref={ref}>
      {uc ? (
        <Suspense fallback={null}><CircularGallery items={items} font="800 30px Archivo" bend={2.4} textColor="#FAF6EC" borderRadius={0.03}
          scrollSpeed={2} scrollEase={0.05} itemAspect={0.8} openOnClick={false} /></Suspense>
      ) : (
        /* 3B galeri yüklenene kadar ya da tarayıcı desteklemiyorsa: elle kaydırılan düz şerit */
        <>
          <ul className="serit" ref={serit} tabIndex={0} aria-label={T[dil].menu.hammadde}
            onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); kaydir(1); } if (e.key === "ArrowLeft") { e.preventDefault(); kaydir(-1); } }}>
            {liste.map((m) => (
              <li key={m[2]}><img src={IMG(m[4], 800)} alt="" loading="lazy" width="800" height="600" /><span>{m[2]}</span></li>
            ))}
          </ul>
          <div className="serit-ok">
            <button type="button" onClick={() => kaydir(-1)} aria-label={dil === "tr" ? "Önceki" : "Previous"}>‹</button>
            <button type="button" onClick={() => kaydir(1)} aria-label={dil === "tr" ? "Sonraki" : "Next"}>›</button>
          </div>
        </>
      )}
    </div>
  );
}

function Sektorler({ dil }) {
  const items = T[dil].sektor.liste.map(([text, meta, img]) => ({ link: YOL[dil].iletisim, text, meta, image: IMG(img, 800) }));
  return (
    <div className="sektor-menu">
      <FlowingMenu items={items} textColor="#25211F" bgColor="#FAF6EC" marqueeBgColor="#A8153A" marqueeTextColor="#FAF6EC" borderColor="rgba(37,33,31,.18)" ariaLabel={T[dil].sektor.baslik} />
    </div>
  );
}

function Uretim({ dil }) {
  const t = T[dil].uretim;
  const renk = [["granul-pp-kopolimer", "kart-krem"], ["enjeksiyon-makineleri", "kart-kum"], ["uretim-hatti", "kart-visne"], ["uretim-salonu", "kart-komur"]];
  return (
    <section className="uretim">
      <div className="bas"><h2>{t.baslik}</h2><p>{t.metin}</p></div>
      {/* Kartlar tarayıcının kendi "sticky" özelliğiyle üst üste biner: JavaScript hesabı yok, her zoom ve ekranda aynı çalışır */}
      <ol className="yigin">
        {t.adim.map(([b, m], i) => (
          <li key={b} className={`adim ${renk[i][1]}`} style={{ "--i": i }}>
            <div className="adim-yazi"><span className="no" aria-hidden="true">{i + 1}</span><div><h3>{b}</h3><p>{m}</p></div></div>
            <div className="adim-foto"><img src={IMG(renk[i][0], 800)} alt="" loading="lazy" width="800" height="600" /></div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ================= sayfalar ================= */

function Ana({ dil }) {
  const t = T[dil], y = YOL[dil];
  const girisRef = useRef(null);
  const bosta = useBosta();
  const mobil = useMobil();
  const [gl, setGl] = useState(false);
  useEffect(() => { setGl(webglVar()); }, []);
  const bosluk = "  ";
  return (
    <>
      <section className="giris" ref={girisRef}>
        <div className="havuz" aria-hidden="true">
          {bosta && gl && <Suspense fallback={null}><Ballpit key={mobil ? "m" : "d"} count={mobil ? 70 : 140} colors={["#FAF6EC", "#E7D5A8", "#A8153A", "#E23A5E", "#FFFFFF"]}
            material="gloss" minSize={mobil ? 0.55 : 0.45} maxSize={mobil ? 1.1 : 1.05} gravity={0.6} friction={0.9975}
            wallBounce={0.9} followCursor cursorSize={1.6} lightIntensity={1.1} exposure={1.05} shadows={0.5} /></Suspense>}
        </div>
        <div className="giris-yazi">
          <p className="ust-not">{t.giris.ust}</p>
          <h1 aria-label={t.giris.baslik}>
            <VariableProximity label={t.giris.baslik}
              fromFontVariationSettings="'wght' 640, 'wdth' 100" toFontVariationSettings="'wght' 900, 'wdth' 125"
              containerRef={girisRef} radius={160} falloff="gaussian" smoothing={0.25} />
          </h1>
          <p className="giris-p">{t.giris.metin}</p>
          <div className="eylem">
            <Magnet padding={60} magnetStrength={3}><a className="btn" href={y.iletisim}>{t.giris.b1}</a></Magnet>
            <a className="btn hayalet" href={y.urunler}>{t.giris.b2}</a>
          </div>
        </div>
      </section>

      <section className="akis">
        <AkanYazi metinler={[HACIM.map(t.litre).join(bosluk) + bosluk, t.akis.satir2.join(bosluk) + bosluk]} hiz={110} className="akis-yazi" kopya={4} />
        <div className="akis-alt">
          <h2>{t.akis.baslik}</h2>
          <div><p>{t.akis.metin}</p><a className="bag" href={y.urunler}>{t.akis.bag}</a></div>
        </div>
      </section>

      <section className="hammadde">
        <div className="bas"><h2>{t.ham.baslik}</h2><div><p>{t.ham.metin}</p><a className="bag" href={y.hammadde}>{t.ham.bag}</a></div></div>
        <Galeri dil={dil} />
        <p className="ipucu">{t.ham.ipucu}</p>
      </section>

      <section className="sektor">
        <div className="bas"><h2>{t.sektor.baslik}</h2></div>
        <Sektorler dil={dil} />
      </section>

      <Uretim dil={dil} />
      <Cagri dil={dil} />
    </>
  );
}

function Urunler({ dil }) {
  const t = T[dil], u = t.urunler;
  return (
    <>
      <SayfaBas baslik={u.baslik} giris={u.giris} />
      <section className="bolum">
        <div className="bas"><h2>{u.hacimBaslik}</h2><p>{u.hacimMetin}</p></div>
        <ul className="hacimler">
          {HACIM.map((v) => (
            <li key={v}><Kova v={v} vurgu={v === 18} /><b>{t.litre(v)}</b><span>{u.kapak}</span></li>
          ))}
        </ul>
      </section>
      <section className="bolum koyu-bant">
        <div className="bas"><h2>{u.secenekBaslik}</h2></div>
        <dl className="tablo">
          {u.secenek.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}
        </dl>
      </section>
      <section className="sektor">
        <div className="bas"><h2>{u.alanBaslik}</h2></div>
        <Sektorler dil={dil} />
      </section>
      <Cagri dil={dil} />
    </>
  );
}

function Hammaddeler({ dil }) {
  const h = T[dil].hammaddeSayfa;
  return (
    <>
      <SayfaBas baslik={h.baslik} giris={h.giris} />
      <section className="hammadde ust-bosluk-az">
        <Galeri dil={dil} />
        <p className="ipucu">{T[dil].ham.ipucu}</p>
      </section>
      <section className="bolum">
        <div className="malzemeler">
          {h.liste.map(([n, ab, ad, m, img]) => (
            <article className="malzeme" key={ad}>
              <img src={IMG(img, 800)} alt={ad} loading="lazy" width="800" height="600" />
              <div>
                <Kod n={n} ab={ab} etiket={h.kod} />
                <h2>{ad}</h2>
                <p>{m}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bant-visne">
        <h2>{h.kaynakBaslik}</h2>
        <p>{h.kaynakMetin}</p>
      </section>
      <Cagri dil={dil} />
    </>
  );
}

function Hakkimizda({ dil }) {
  const h = T[dil].hakkimizda;
  return (
    <>
      <SayfaBas baslik={h.baslik} giris={h.giris} />
      <section className="bolum ikili">
        <div>
          <h2>{h.kimBaslik}</h2>
          {h.kim.map((p) => <p key={p}>{p}</p>)}
          <h2 className="ara">{h.nasilBaslik}</h2>
          {h.nasil.map((p) => <p key={p}>{p}</p>)}
        </div>
        <figure className="foto">
          <img src={IMG("uretim-salonu", 1600)} alt="" loading="lazy" width="1600" height="1067" />
          <figcaption>{dil === "tr" ? "Temsili görsel" : "Illustrative image"}</figcaption>
        </figure>
      </section>
      <section className="bolum koyu-bant">
        <div className="bas"><h2>{h.ilkeBaslik}</h2></div>
        <div className="ilkeler">
          {h.ilke.map(([b, m]) => <div key={b}><h3>{b}</h3><p>{m}</p></div>)}
        </div>
      </section>
      <Uretim dil={dil} />
      <section className="bolum">
        <div className="bas"><h2>{h.bilgiBaslik}</h2></div>
        <dl className="tablo">
          {h.bilgi(FIRMA).map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}
        </dl>
      </section>
      <Cagri dil={dil} />
    </>
  );
}

function Iletisim({ dil }) {
  const t = T[dil], i = t.iletisim, a = i.alan;
  const [hata, setHata] = useState("");
  const gonder = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!f.get("ad")?.trim() || !f.get("eposta")?.trim()) { setHata(i.eksik); return; }
    setHata("");
    const govde = [["ad", a.ad], ["firma", a.firma], ["eposta", a.eposta], ["tel", a.tel], ["hacim", a.hacim], ["adet", a.adet], ["yer", a.yer], ["mesaj", a.mesaj]]
      .map(([k, l]) => `${l}: ${f.get(k) || "-"}`).join("\n");
    location.href = `mailto:${FIRMA.eposta}?subject=${encodeURIComponent(i.konu)}&body=${encodeURIComponent(govde)}`;
  };
  return (
    <>
      <SayfaBas baslik={i.baslik} giris={i.giris} />
      <section className="bolum iletisim-sayfa">
        <div className="kanallar">
          <div><h2>{i.tel}</h2><a className="buyuk koyu" href={FIRMA.telHref}>{FIRMA.tel}</a></div>
          <div><h2>{i.eposta}</h2><a className="buyuk koyu" href={`mailto:${FIRMA.eposta}`}>{FIRMA.eposta}</a></div>
          <div><h2>{i.adres}</h2><address>{FIRMA.unvan}<br />{FIRMA.adres.map((s) => <span key={s}>{s}<br /></span>)}</address>
            <a className="bag" href={FIRMA.harita} target="_blank" rel="noopener">{i.harita}</a></div>
        </div>
        <form className="form" onSubmit={gonder} noValidate>
          <h2>{i.formBaslik}</h2>
          <div className="alanlar">
            <label>{a.ad}<input name="ad" autoComplete="name" required /></label>
            <label>{a.firma}<input name="firma" autoComplete="organization" /></label>
            <label>{a.eposta}<input name="eposta" type="email" autoComplete="email" required /></label>
            <label>{a.tel}<input name="tel" type="tel" autoComplete="tel" /></label>
            <label>{a.hacim}<select name="hacim" defaultValue=""><option value="">{a.sec}</option>{HACIM.map((v) => <option key={v}>{t.litre(v)}</option>)}<option>{a.diger}</option></select></label>
            <label>{a.adet}<input name="adet" /></label>
            <label className="tam">{a.yer}<input name="yer" /></label>
            <label className="tam">{a.mesaj}<textarea name="mesaj" rows="4" /></label>
          </div>
          {hata && <p className="hata" role="alert">{hata}</p>}
          <button className="btn" type="submit">{i.gonder}</button>
          <p className="not">{i.not}</p>
        </form>
      </section>
    </>
  );
}

function Bulunamadi({ dil }) {
  const b = T[dil].bulunamadi;
  return (
    <section className="sayfabas bulunamadi">
      <h1>{b.baslik}</h1>
      <p>{b.metin}</p>
      <a className="btn" href={YOL[dil].ana}>{b.don}</a>
    </section>
  );
}

const SAYFA = { ana: Ana, urunler: Urunler, hammadde: Hammaddeler, hakkimizda: Hakkimizda, iletisim: Iletisim, bulunamadi: Bulunamadi };

export default function Site({ sayfa, dil }) {
  const Govde = SAYFA[sayfa] || Bulunamadi;
  return (
    <>
      <Ust sayfa={sayfa} dil={dil} />
      <main id="icerik" className={`s-${sayfa}`}><Govde dil={dil} /></main>
      <Alt dil={dil} />
    </>
  );
}
