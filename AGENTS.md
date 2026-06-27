<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:foma-overnight (manuel — sync tooling buraya dokunmaz) -->
# FomaPrint — Gece Geliştirme Yönü

## Bağlam
Next.js (proje-içi sürüm — yukarıdaki nextjs-agent-rules'a UY: kod
yazmadan önce node_modules/next/dist/docs/ oku) + Tailwind.
Üç giriş noktası: self-service retail, B2B POD/blind-ship, lokal toplu baskı.
Şu an redesign/b2b-unify dalındayız.

## Kurallar
- Tüm müşteriye dönük metin İNGİLİZCE.
- Mevcut tasarım dilini/komponent yapısını bozma.
- Küçük commit'lerle ilerle; her tamamlanan maddeden sonra commit at.
- Emin olmadığın mimari kararı YAPMA — AGENTS.md'ye not düş, sabaha bırak.
- node_modules, .env, secret'lara dokunma.

## Bu haftanın gece görevi
- [ ] (madde 1)
- [ ] (madde 2)

## Gece durumu — 2026-06-26 (image gallery binding)
- Şube: `gece/20260626` (commits `5d2842f`, `3ddd524`, `9c3ca5d`); push edilmedi.
- Eşleşme: 1279/1279 katalog SKU'su (REMOVED_SKUS sonrası), 4599 görsel
  URL'si. Eşleme stratejisi: filename `_` öncesi adayı SKU set'ine
  case-insensitive **exact** match — fuzzy / prefix-strip yok. Detay:
  `overnight-image-report.md` (kök).
- Yerleştirme: `public/products/{SKU}/` altına APFS clonefile ile, 8.3 GB.
  Boyut 500 MB eşiğini aştığı için `.gitignore` ile commit dışı bırakıldı.
- Bekleyen karar (sabah): görseller nereye gidecek? Seçenekler:
  Vercel Blob / Cloudinary / S3+CDN. URL şeması `/products/{SKU}/...` —
  CDN seçilirse `src/data/product-images.json` ya doğrudan yeniden
  yazılır ya da Next rewrite ile `cdn.example.com/...` arkasına alınır.
- Yardımcı script'ler `.scrape/overnight/`'ta (gitignore'lu).
<!-- END:foma-overnight -->
