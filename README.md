# raypak.com.tr

Raypak Ambalaj A.Ş. web sitesi. Türkçe ve İngilizce, beş sayfa: Ana sayfa, Ürünler, Hammaddeler, Hakkımızda, İletişim.

## Nerede ne var?

| Ne değiştirmek istiyorsunuz? | Dosya |
|---|---|
| Sitedeki bütün yazılar (TR ve EN), telefon, adres, hacimler | `src/icerik.js` |
| Sayfaların düzeni ve bölümleri | `src/Site.jsx` |
| Renkler, yazı boyutları, boşluklar | `src/app.css` |
| Fotoğraflar, logolar, yazı tipi | `public/assets/` |
| Animasyon bileşenleri (React Bits) | `src/rb/` |

## Nasıl yayına çıkar?

Bu repo Cloudflare Pages'e bağlıdır. `main` dalına yapılan her değişiklikten sonra Cloudflare siteyi kendisi derler ve bir iki dakika içinde yayınlar.

Cloudflare ayarları:

- Build command: `npm run build`
- Build output directory: `dist`
- Node sürümü `.nvmrc` dosyasında (22)

## Bilgisayarda denemek için

```
npm install
npm run dev
```

## Lisanslar

Animasyon bileşenleri [React Bits](https://github.com/DavidHDev/react-bits) kütüphanesinden alınmıştır (MIT + Commons Clause, `src/rb/LICENSE-react-bits.md`). Bileşenler bu sitenin parçası olarak kullanılabilir; tek başlarına satılamaz ya da dağıtılamaz.
