// Sürekli kayan, sayfa kaydırıldıkça hızlanan ve fare/parmakla sağa sola sürüklenebilen yazı bandı.
import { useEffect, useRef } from "react";
import "./ScrollVelocity.css";

function Satir({ metin, hiz, kopya }) {
  const kap = useRef(null);
  const ser = useRef(null);

  useEffect(() => {
    const kutu = kap.current, el = ser.current;
    if (!kutu || !el) return;
    const azHareket = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = 0;                 // bandın konumu (px)
    let genislik = 0;          // tek kopyanın genişliği: bu kadar kayınca başa sarar
    let yon = Math.sign(hiz);  // son kaydırma yönü
    let ekHiz = 0;             // sayfa kaydırmasından gelen geçici hız
    let atis = 0;              // sürükleyip bırakınca kalan savrulma hızı (px/sn)
    let gorunur = true, id = 0, sonT = 0, sonY = window.scrollY;
    const tut = { aktif: false, x: 0, t: 0, hiz: 0, kimlik: -1 };

    const olc = () => { genislik = el.firstElementChild ? el.firstElementChild.getBoundingClientRect().width : 0; };
    const sar = () => { if (genislik > 0) { x = x % genislik; if (x > 0) x -= genislik; } };
    const ciz = () => { el.style.transform = `translate3d(${x}px,0,0)`; };

    const kare = (t) => {
      const dt = sonT ? Math.min(t - sonT, 64) / 1000 : 0;
      sonT = t;
      // sayfa kaydırma hızı: aşağı kaydırınca ileri, yukarı kaydırınca geri, kaydırdıkça hızlanır
      const y = window.scrollY, dy = y - sonY; sonY = y;
      if (dt > 0) {
        const sayfaHizi = dy / dt;
        if (Math.abs(sayfaHizi) > 20) yon = Math.sign(sayfaHizi) * Math.sign(hiz);
        ekHiz += (Math.min(Math.abs(sayfaHizi), 4000) * 0.35 - ekHiz) * (1 - Math.exp(-dt * 6));
      }
      if (!tut.aktif) {
        const temel = azHareket ? 0 : Math.abs(hiz) + ekHiz;
        x -= yon * temel * dt;
        x += atis * dt;
        atis *= Math.exp(-dt * 2.5);
        if (Math.abs(atis) < 5) atis = 0;
      }
      sar(); ciz();
      id = gorunur ? requestAnimationFrame(kare) : 0;
    };
    const baslat = () => { if (!id) { sonT = 0; sonY = window.scrollY; id = requestAnimationFrame(kare); } };

    // sürükleme: yatay hareket bandı kaydırır, dikey hareket sayfayı kaydırmaya devam eder
    const bas = (e) => {
      tut.aktif = true; tut.kimlik = e.pointerId; tut.x = e.clientX; tut.t = performance.now(); tut.hiz = 0; atis = 0;
      kutu.setPointerCapture?.(e.pointerId); kutu.classList.add("tutuluyor");
    };
    const surukle = (e) => {
      if (!tut.aktif || e.pointerId !== tut.kimlik) return;
      const simdi = performance.now(), d = e.clientX - tut.x, sure = Math.max(simdi - tut.t, 1);
      x += d; tut.hiz = 0.8 * (d / sure) * 1000 + 0.2 * tut.hiz;
      tut.x = e.clientX; tut.t = simdi;
      if (Math.abs(d) > 0) yon = d < 0 ? 1 : -1;
      sar(); ciz();
    };
    const birak = (e) => {
      if (!tut.aktif || e.pointerId !== tut.kimlik) return;
      tut.aktif = false; kutu.classList.remove("tutuluyor");
      atis = Math.max(-3000, Math.min(3000, tut.hiz));
    };
    kutu.addEventListener("pointerdown", bas);
    kutu.addEventListener("pointermove", surukle);
    kutu.addEventListener("pointerup", birak);
    kutu.addEventListener("pointercancel", birak);

    const ro = new ResizeObserver(() => { olc(); sar(); ciz(); });
    ro.observe(el);
    olc();

    // ekran dışındayken durur, görünür olunca kaldığı yerden devam eder
    const io = new IntersectionObserver(([g]) => {
      gorunur = g.isIntersecting;
      if (gorunur) baslat(); else { cancelAnimationFrame(id); id = 0; }
    }, { rootMargin: "100px" });
    io.observe(kutu);
    const sekme = () => { if (document.hidden) { cancelAnimationFrame(id); id = 0; } else if (gorunur) baslat(); };
    document.addEventListener("visibilitychange", sekme);
    baslat();

    return () => {
      cancelAnimationFrame(id); io.disconnect(); ro.disconnect();
      document.removeEventListener("visibilitychange", sekme);
      kutu.removeEventListener("pointerdown", bas); kutu.removeEventListener("pointermove", surukle);
      kutu.removeEventListener("pointerup", birak); kutu.removeEventListener("pointercancel", birak);
    };
  }, [hiz]);

  return (
    <div className="parallax akan" ref={kap}>
      <div className="scroller" ref={ser}>
        {Array.from({ length: kopya }, (_, i) => <span key={i} aria-hidden={i > 0 || undefined}>{metin}</span>)}
      </div>
    </div>
  );
}

export default function AkanYazi({ metinler, hiz = 110, kopya = 4, className = "" }) {
  return (
    <div className={className}>
      {metinler.map((m, i) => <Satir key={i} metin={m} hiz={i % 2 ? -hiz : hiz} kopya={kopya} />)}
    </div>
  );
}
