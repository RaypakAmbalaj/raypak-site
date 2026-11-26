// Sitenin bütün metinleri: TR ve EN. Bir metni değiştirmek için yalnızca bu dosyayı düzenlemek yeterli.

export const SITE = "https://raypak.com.tr";

export const YOL = {
  tr: { ana: "/", urunler: "/urunler/", hammadde: "/hammaddeler/", hakkimizda: "/hakkimizda/", iletisim: "/iletisim/" },
  en: { ana: "/en/", urunler: "/en/products/", hammadde: "/en/raw-materials/", hakkimizda: "/en/about/", iletisim: "/en/contact/" },
};

export const FIRMA = {
  unvan: "Raypak Ambalaj A.Ş.",
  tel: "+90 553 854 22 22",
  telHref: "tel:+905538542222",
  eposta: "info@raypak.com.tr",
  adres: ["İkitelli OSB Mah. İpkas 8A Blok Sk.", "İpkas Sitesi 8A Blok No: 8 İç Kapı No: 8", "34490 Başakşehir / İstanbul"],
  harita: "https://www.google.com/maps/search/?api=1&query=%C4%B0pkas+Sitesi+8A+Blok+%C4%B0kitelli+OSB+Ba%C5%9Fak%C5%9Fehir+%C4%B0stanbul",
  mersis: "0733142910900001",
  sicil: "1158527",
  vergi: "İkitelli V.D. 7331429109",
};

export const HACIM = [0.75, 2.5, 3.5, 5, 7.5, 10, 15, 18, 20];

const ortak = (dil) => ({
  litre: (v) => (dil === "tr" ? String(v).replace(".", ",") : String(v)) + " L",
});

export const T = {
  tr: {
    ...ortak("tr"),
    dilAdi: "Türkçe",
    menu: { urunler: "Ürünler", hammadde: "Hammaddeler", hakkimizda: "Hakkımızda", iletisim: "İletişim", teklif: "Teklif İsteyin", ac: "Menüyü aç", kapat: "Menüyü kapat", anaSayfa: "Ana sayfa", icerigeGec: "İçeriğe geç" },
    meta: {
      ana: ["Raypak Ambalaj | Polipropilen Plastik Kova Üreticisi, İstanbul", "İkitelli OSB'deki tesisimizde PP kopolimer ve PP random granülden enjeksiyonla 0,75 L ile 20 L arası markasız plastik kova üretiyoruz. Yurt içi ve ihracat."],
      urunler: ["Plastik Kova Ürünleri, 0,75 L ile 20 L | Raypak Ambalaj", "0,75 litreden 20 litreye kapaklı ve kapaksız, markasız polipropilen kovalar. Boya, kimya ve yapı kimyasalları için toptan üretim."],
      hammadde: ["Hammaddeler: PP Kopolimer, PP Random, PE, PVC, PS | Raypak Ambalaj", "Kova üretiminde kullandığımız polimerler ve her birinin kovaya kattığı özellikler."],
      hakkimizda: ["Hakkımızda | Raypak Ambalaj", "İstanbul İkitelli OSB'de kendi tesisinde enjeksiyonla polipropilen kova üreten ambalaj firması."],
      iletisim: ["İletişim ve Teklif | Raypak Ambalaj", "Plastik kova fiyat teklifi, numune ya da sorularınız için Raypak Ambalaj ile iletişime geçin."],
      bulunamadi: ["Sayfa bulunamadı | Raypak Ambalaj", "Aradığınız sayfa bulunamadı."],
    },
    giris: {
      ust: "Plastik kova üreticisi, İstanbul",
      baslik: "Markasız plastik kovada güvenilir üretim ortağınız.",
      metin: "Polipropilen granülü kendi tesisimizde, kendi makinelerimizle enjeksiyonla kovaya dönüştürüyoruz. Siz markanızı basın; üretim, kalite ve teslimat bizde.",
      b1: "Teklif İsteyin", b2: "Ürünleri İnceleyin",
    },
    akis: { satir2: ["Kapaklı", "Kapaksız", "Markasız", "Toptan"], baslik: "0,75 litreden 20 litreye plastik kova.", metin: "Boya, kimya, yapı kimyasalları ve endüstriyel kullanım için kapaklı ve kapaksız kovalar. Hacim ve adet ihtiyacınıza göre üretim planlıyoruz.", bag: "Tüm hacimleri görün" },
    ham: { baslik: "Doğru kova, doğru hammaddeyle başlar.", metin: "Ağırlıklı olarak PP kopolimer ve PP random kullanıyoruz. Grade'leri farklı ülkelerden ve üreticilerden tedarik ediyoruz.", ipucu: "Galeriyi sağa sola sürükleyerek gezebilirsiniz.", bag: "Hammaddelerin ayrıntıları" },
    sektor: { baslik: "Kimler için üretiyoruz?", liste: [
      ["Boya", "Su bazlı boya, astar ve dolgu", "kovalar"],
      ["Kimya", "Endüstriyel kimyasallar ve temizlik ürünleri", "granul-karisim"],
      ["Yapı kimyasalları", "Macun, sıva, yapıştırıcı ve izolasyon", "uretim-salonu"],
      ["Endüstriyel", "Parça, sarf ve genel depolama", "enjeksiyon-makineleri"],
    ] },
    uretim: { baslik: "Enjeksiyonla, ölçülebilir kalite.", metin: "Hammaddenin seçiminden paletin yüklenmesine kadar süreci tek çatı altında yönetiyoruz.", adim: [
      ["Granül seçimi ve kurutma", "Kullanım yerine uygun grade seçilir, granül nemden arındırılır."],
      ["Enjeksiyon kalıplama", "Eriyen polimer kalıba basılır; kova birkaç saniyede şeklini alır."],
      ["Ölçü ve ağırlık kontrolü", "Her partide ölçü, ağırlık ve görünüm kontrol edilir."],
      ["İstifleme ve sevkiyat", "Kovalar iç içe istiflenir, paletlenir; yurt içine ve dışına yola çıkar."],
    ] },
    cagri: { baslik: "Projeniz için fiyat teklifi alın.", metin: "Hacim, adet ve teslim yerini yazın; aynı iş günü içinde net bir fiyatla dönelim. Yurt dışı alıcılar için İngilizce proforma ve Incoterms® ile çalışıyoruz.", form: "Teklif formuna gidin" },
    urunler: {
      baslik: "Ürünler", giris: "0,75 litreden 20 litreye, kapaklı ve kapaksız markasız polipropilen kovalar.",
      hacimBaslik: "Hacimler", hacimMetin: "Aşağıdaki hacimlerde üretim yapıyoruz. Çizimler birbirine göre gerçek oranlarında. Listede olmayan bir hacim için bize yazın.",
      kapak: "Kapaklı ya da kapaksız",
      secenekBaslik: "Seçenekler",
      secenek: [["Kapak", "Kapaklı veya kapaksız"], ["Kulp", "Plastik veya metal kulp"], ["Renk", "Doğal (natürel) ya da masterbatch ile istediğiniz renk"], ["Marka", "Markasız; etiket ya da baskıyı siz uygularsınız"], ["Paketleme", "İç içe istifli, koli ya da streçli palet"]],
      alanBaslik: "Kullanım alanları",
    },
    hammaddeSayfa: {
      baslik: "Hammaddeler", giris: "Üretimde kullandığımız polimerler ve her birinin kovaya kattığı özellikler.",
      kod: "Geri dönüşüm kodu",
      liste: [
        ["5", "PP", "PP kopolimer", "Darbeye ve düşük sıcaklığa dayanıklıdır. Kovalarımızın ana hammaddesidir; istif ve taşıma sırasında çatlamaya karşı direnç verir.", "granul-pp-kopolimer"],
        ["5", "PP", "PP random kopolimer", "Daha berrak ve parlak bir görünüm verir. Görünümün önemli olduğu yarı şeffaf ürünlerde tercih edilir.", "granul-pp-random"],
        ["2", "PE-HD", "Polietilen (PE)", "Esnek ve tok bir polimerdir, kimyasallara dayanıklıdır. Esneklik gereken kapak ve parçalarda kullanılır.", "granul-pe"],
        ["3", "PVC", "Polivinil klorür (PVC)", "Sert ve dayanıklı bir polimerdir; belirli teknik uygulamalarda kullanılır.", "granul-pvc"],
        ["6", "PS", "Polistiren (PS)", "Rijit ve berraktır; sertlik ve şeffaflık istenen ürünlerde değerlendirilir.", "granul-ps"],
        ["", "", "Renk masterbatch", "Renkli kova siparişlerinde doğal polimere istenen rengi vermek için eklenir.", "granul-karisim"],
      ],
      kaynakBaslik: "Tek kaynağa bağlı değiliz.",
      kaynakMetin: "Hammaddeyi farklı ülkelerden ve üreticilerden alıyoruz. Bir tedarikçide sorun çıktığında üretim durmuyor; fiyat ve süreklilik dengesini müşterimizin lehine kuruyoruz.",
    },
    hakkimizda: {
      baslik: "Hakkımızda", giris: "İstanbul İkitelli Organize Sanayi Bölgesi'nde polipropilen kova üreten bir ambalaj firmasıyız.",
      kimBaslik: "Raypak Ambalaj kimdir?",
      kim: ["Raypak Ambalaj A.Ş., plastik ambalaj üretimi için kurulmuş bir sanayi kuruluşudur. Temel işimiz, PP kopolimer ve PP random granülden enjeksiyon yöntemiyle kova üretmektir.", "Ürünlerimizi markasız üretiyor ve toptan satıyoruz. Müşterilerimiz kovaları kendi markalarıyla etiketleyerek ya da doğrudan kullanarak değerlendiriyor."],
      nasilBaslik: "Nasıl çalışıyoruz?",
      nasil: ["Üretimimizi İkitelli OSB'deki tesisimizde, kendi ekipmanlarımızla yapıyoruz. Bu sayede termin, kalite ve maliyet konusunda net söz verebiliyoruz.", "Hammaddeyi farklı ülkelerden ve üreticilerden tedarik ediyor, her ürün için uygun grade'i seçiyoruz."],
      ilkeBaslik: "İlkelerimiz",
      ilke: [["Netlik", "Teklifte, teslim süresinde ve ürün özelliklerinde açık ve ölçülebilir bilgi veririz."], ["Tutarlılık", "Her partide aynı ölçü, aynı ağırlık, aynı görünüm hedefiyle üretiriz."], ["Süreklilik", "Müşterilerimizle tek seferlik satış değil, uzun vadeli tedarik ilişkisi kurarız."]],
      bilgiBaslik: "Firma bilgileri",
      bilgi: (F) => [["Unvan", F.unvan], ["Adres", F.adres.join(", ")], ["Vergi dairesi ve no", F.vergi], ["MERSİS no", F.mersis], ["Ticaret sicil no", F.sicil]],
    },
    iletisim: {
      baslik: "İletişim", giris: "Fiyat teklifi, numune ya da her türlü sorunuz için bize ulaşın.",
      tel: "Telefon", eposta: "E-posta", adres: "Adres", harita: "Haritada göster",
      formBaslik: "Teklif formu",
      alan: { ad: "Ad soyad", firma: "Firma", eposta: "E-posta", tel: "Telefon", hacim: "Hacim", sec: "Seçin", diger: "Diğer / birden fazla", adet: "Adet ya da tonaj", yer: "Teslim yeri (şehir ya da ülke)", mesaj: "Mesajınız" },
      gonder: "E-postayı hazırla",
      not: "Düğmeye bastığınızda e-posta uygulamanız formdaki bilgilerle açılır; göndermeniz yeterli.",
      eksik: "Lütfen adınızı ve e-posta adresinizi yazın.",
      konu: "Teklif talebi",
    },
    alt: { tanim: "İstanbul İkitelli'de polipropilen kova üreten, yurt içine ve yurt dışına satış yapan üretici.", sayfalar: "Sayfalar", iletisim: "İletişim", hak: "Tüm hakları saklıdır." },
    bulunamadi: { baslik: "Bu sayfa bulunamadı.", metin: "Adres değişmiş ya da yanlış yazılmış olabilir.", don: "Ana sayfaya dönün" },
  },

  en: {
    ...ortak("en"),
    dilAdi: "English",
    menu: { urunler: "Products", hammadde: "Raw materials", hakkimizda: "About", iletisim: "Contact", teklif: "Request a Quote", ac: "Open menu", kapat: "Close menu", anaSayfa: "Home", icerigeGec: "Skip to content" },
    meta: {
      ana: ["Raypak Ambalaj | Polypropylene Plastic Pail Manufacturer, Istanbul", "We injection-mould unbranded plastic pails from 0.75 L to 20 L out of PP copolymer and PP random in our own facility in Istanbul. Domestic supply and export."],
      urunler: ["Plastic Pails, 0.75 L to 20 L | Raypak Ambalaj", "Unbranded polypropylene pails from 0.75 to 20 litres, with or without lids. Wholesale production for paint, chemicals and construction chemicals."],
      hammadde: ["Raw Materials: PP Copolymer, PP Random, PE, PVC, PS | Raypak Ambalaj", "The polymers we use in production and what each one brings to a pail."],
      hakkimizda: ["About Us | Raypak Ambalaj", "A packaging company injection-moulding polypropylene pails in its own facility in İkitelli OSB, Istanbul."],
      iletisim: ["Contact and Quotes | Raypak Ambalaj", "Contact Raypak Ambalaj for plastic pail quotes, samples or any question."],
      bulunamadi: ["Page not found | Raypak Ambalaj", "The page you are looking for could not be found."],
    },
    giris: {
      ust: "Plastic pail manufacturer, Istanbul",
      baslik: "Your reliable manufacturing partner for unbranded plastic pails.",
      metin: "We turn polypropylene granules into pails by injection moulding, in our own facility and on our own machines. You add your brand; we take care of production, quality and delivery.",
      b1: "Request a Quote", b2: "View Products",
    },
    akis: { satir2: ["With lid", "Without lid", "Unbranded", "Wholesale"], baslik: "Plastic pails from 0.75 to 20 litres.", metin: "Pails with or without lids for paint, chemicals, construction chemicals and industrial use. We plan production around your volume and quantity.", bag: "See all volumes" },
    ham: { baslik: "The right pail starts with the right polymer.", metin: "We mainly use PP copolymer and PP random, sourcing grades from different countries and producers.", ipucu: "Drag the gallery sideways to browse.", bag: "Raw material details" },
    sektor: { baslik: "Who we produce for", liste: [
      ["Paint", "Water-based paints, primers and fillers", "kovalar"],
      ["Chemicals", "Industrial chemicals and cleaning products", "granul-karisim"],
      ["Construction chemicals", "Putties, plasters, adhesives, insulation", "uretim-salonu"],
      ["Industrial", "Parts, consumables and general storage", "enjeksiyon-makineleri"],
    ] },
    uretim: { baslik: "Injection moulding, measurable quality.", metin: "We manage the whole process under one roof, from choosing the raw material to loading the pallet.", adim: [
      ["Granule selection and drying", "The right grade is chosen for the application and the granules are dried."],
      ["Injection moulding", "The molten polymer is injected into the mould; the pail takes shape in seconds."],
      ["Dimension and weight checks", "Every batch is checked for dimensions, weight and appearance."],
      ["Nesting and shipping", "Pails are nested and palletised, then shipped at home and abroad."],
    ] },
    cagri: { baslik: "Get a price quote for your project.", metin: "Tell us the volume, quantity and delivery location; we reply with a clear price within the same business day. We work with English proforma invoices and Incoterms®.", form: "Go to the quote form" },
    urunler: {
      baslik: "Products", giris: "Unbranded polypropylene pails from 0.75 to 20 litres, with or without lids.",
      hacimBaslik: "Volumes", hacimMetin: "We produce the volumes below. The drawings are to scale relative to each other. Contact us for a size that is not listed.",
      kapak: "With or without lid",
      secenekBaslik: "Options",
      secenek: [["Lid", "With or without lid"], ["Handle", "Plastic or metal handle"], ["Colour", "Natural, or any colour with masterbatch"], ["Branding", "Unbranded; you apply the label or print"], ["Packing", "Nested, in cartons or on stretch-wrapped pallets"]],
      alanBaslik: "Applications",
    },
    hammaddeSayfa: {
      baslik: "Raw materials", giris: "The polymers we use in production, and what each one brings to a pail.",
      kod: "Resin identification code",
      liste: [
        ["5", "PP", "PP copolymer", "Resistant to impact and low temperatures. The main material of our pails, giving resistance to cracking during stacking and transport.", "granul-pp-kopolimer"],
        ["5", "PP", "PP random copolymer", "A clearer, glossier look. Preferred for semi-transparent products where appearance matters.", "granul-pp-random"],
        ["2", "PE-HD", "Polyethylene (PE)", "A flexible, tough polymer with good chemical resistance. Used for lids and parts that need flexibility.", "granul-pe"],
        ["3", "PVC", "Polyvinyl chloride (PVC)", "A rigid, durable polymer used in specific technical applications.", "granul-pvc"],
        ["6", "PS", "Polystyrene (PS)", "A rigid, clear polymer, used where stiffness and transparency are needed.", "granul-ps"],
        ["", "", "Colour masterbatch", "Used for coloured pails, to give the natural polymer the requested colour.", "granul-karisim"],
      ],
      kaynakBaslik: "We don't depend on a single source.",
      kaynakMetin: "We buy raw materials from different countries and producers. If one supplier has a problem, production keeps running, and the balance of price and continuity stays in our customers' favour.",
    },
    hakkimizda: {
      baslik: "About us", giris: "A packaging company producing polypropylene pails in İkitelli Organised Industrial Zone, Istanbul.",
      kimBaslik: "Who is Raypak Ambalaj?",
      kim: ["Raypak Ambalaj A.Ş. is an industrial company established to manufacture plastic packaging. Our core business is producing pails from PP copolymer and PP random granules by injection moulding.", "We produce our pails unbranded and sell them wholesale. Our customers label them with their own brand or use them as they are."],
      nasilBaslik: "How we work",
      nasil: ["We manufacture in our own facility in İkitelli OSB, with our own equipment. This lets us make clear commitments on lead time, quality and cost.", "We source raw materials from different countries and producers and select the right grade for each product."],
      ilkeBaslik: "Our principles",
      ilke: [["Clarity", "Clear, measurable information in every quote, lead time and product specification."], ["Consistency", "The same dimensions, weight and appearance in every batch."], ["Continuity", "Long-term supply relationships, not one-off sales."]],
      bilgiBaslik: "Company details",
      bilgi: (F) => [["Company", F.unvan], ["Address", F.adres.join(", ")], ["Tax office and no.", F.vergi], ["MERSİS no.", F.mersis], ["Trade registry no.", F.sicil]],
    },
    iletisim: {
      baslik: "Contact", giris: "Get in touch for a price quote, samples or any question.",
      tel: "Phone", eposta: "Email", adres: "Address", harita: "Show on map",
      formBaslik: "Quote request",
      alan: { ad: "Full name", firma: "Company", eposta: "Email", tel: "Phone", hacim: "Volume", sec: "Select", diger: "Other / several", adet: "Quantity or tonnage", yer: "Delivery location (city or country)", mesaj: "Your message" },
      gonder: "Prepare the email",
      not: "When you press the button, your email app opens with the details from the form; just send it.",
      eksik: "Please enter your name and email address.",
      konu: "Quote request",
    },
    alt: { tanim: "A manufacturer in İkitelli, Istanbul, producing polypropylene pails for domestic and international buyers.", sayfalar: "Pages", iletisim: "Contact", hak: "All rights reserved." },
    bulunamadi: { baslik: "This page could not be found.", metin: "The address may have changed or been mistyped.", don: "Back to the home page" },
  },
};
