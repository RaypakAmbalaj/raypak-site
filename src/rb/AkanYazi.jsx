// Kaydırma hızıyla hızlanan, yön değiştiren kayan yazı bandı.
// React Bits "ScrollVelocity" bileşeninin aynı davranışını, ağır animasyon kütüphanesi olmadan uygular.
import { useEffect, useRef } from "react";
import "./ScrollVelocity.css";

function Satir({ metin, hiz, kopya }) {
  const ser = useRef(null);
  useEffect(() => {
    const el = ser.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0, yon = 1, sonY = scrollY, sonT = performance.now(), yumusak = 0, id;
    const kare = (t) => {
      const dt = Math.min(t - sonT, 64); sonT = t;
      const anlik = ((scrollY - sonY) / Math.max(dt, 1)) * 1000; sonY = scrollY;   // piksel/sn
      yumusak += (anlik - yumusak) * (1 - Math.exp(-dt / 120));
      if (yumusak < -5) yon = -1; else if (yumusak > 5) yon = 1;
      const carpan = 1 + Math.abs(yumusak) / 200;                                  // kaydırdıkça hızlanır
      x -= yon * hiz * carpan * (dt / 1000);
      const w = el.firstElementChild ? el.firstElementChild.offsetWidth : 0;
      if (w) x = ((x % w) + w) % w - w;                                             // sonsuz döngü
      el.style.transform = `translate3d(${x}px,0,0)`;
      id = requestAnimationFrame(kare);
    };
    // yalnızca ekrandayken çalışır
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(id);
      if (e.isIntersecting) { sonT = performance.now(); sonY = scrollY; id = requestAnimationFrame(kare); }
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(id); };
  }, [hiz]);
  return (
    <div className="parallax">
      <div className="scroller" ref={ser} style={{ willChange: "transform" }}>
        {Array.from({ length: kopya }, (_, i) => <span key={i} aria-hidden={i > 0 || undefined}>{metin}</span>)}
      </div>
    </div>
  );
}

export default function AkanYazi({ metinler, hiz = 60, kopya = 4, className = "" }) {
  return (
    <div className={className}>
      {metinler.map((m, i) => <Satir key={i} metin={m} hiz={i % 2 ? -hiz : hiz} kopya={kopya} />)}
    </div>
  );
}
