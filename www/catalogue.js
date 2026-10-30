// Rubalise : catalogue des produits de nutrition sportive, pour remplir « Mon placard ».
// Valeurs par portion relevées sur les sites officiels des marques le 27/10/2026 (lien `src` sur chaque produit).
// null = valeur non publiée en texte par la marque (souvent seulement dans une image du tableau nutritionnel) :
// le coureur peut la compléter dans son placard. Aucune photo : une pastille de couleur et une icône par catégorie.
// À tenir à jour : les marques changent leurs recettes et leurs gammes.
window.RB_CATALOG = {
  checked: '2026-10-27',
  cats: [
    { id: 'gel', label: 'Gels' },
    { id: 'barre', label: 'Barres' },
    { id: 'hydra', label: 'Hydratation' }
  ],
  brands: [
    { id: 'maurten', name: 'Maurten', color: '#7A8A99', logo: 'img/brands/maurten.svg', bg: '#E3E8EE', tint: true },
    { id: 'naak', name: 'Näak', color: '#D9822B', logo: 'img/brands/naak.svg', bg: '#F7E4CF', tint: true },
    { id: 'overstims', name: 'Overstims', color: '#2E7DBF', logo: 'img/brands/overstims.svg', bg: '#FBE1DF', tint: true },
    { id: 'meltonic', name: 'Meltonic', color: '#E0A526', logo: 'img/brands/meltonic.svg', bg: '#FACC03' },
    { id: 'gu', name: 'GU', color: '#C2412D', logo: 'img/brands/gu.svg', bg: '#020101' },
    { id: 'sis', name: 'SiS', color: '#1F9E89', logo: 'img/brands/sis.svg', bg: '#171718' },
    { id: 'tailwind', name: 'Tailwind', color: '#8E5BC4', logo: 'img/brands/tailwind.svg', bg: '#ECE2F6', tint: true },
    { id: 'isostar', name: 'Isostar', color: '#D23C5A', logo: 'img/brands/isostar.svg', bg: '#010101' },
    { id: 'powerbar', name: 'Powerbar', color: '#3E4FB0', logo: 'img/brands/powerbar.svg', bg: '#161616' },
    { id: 'ta', name: 'Tä', color: '#2F9C5A', logo: 'img/brands/ta.svg', bg: '#E2E5F2', tint: true }
  ],
  // carbs : glucides (g) ; sodium (mg) ; caf : caféine (mg) ; unit : format d'une portion
  products: [
    // ---- Maurten ----
    { id: 'maurten-gel100', brand: 'maurten', cat: 'gel', name: 'Gel 100', carbs: 25, sodium: 20, caf: 0, unit: 'gel 40 g', kcal: 100, fat: 0, protein: 0, fiber: 0, img: 'img/products/maurten-gel100.webp', src: 'https://www.maurten.com/fr/products/gel-100-box' },
    { id: 'maurten-gel100caf', brand: 'maurten', cat: 'gel', name: 'Gel 100 Caf 100', carbs: 25, sodium: 22, caf: 100, unit: 'gel 40 g', kcal: 100, fat: 0, protein: 0, img: 'img/products/maurten-gel100caf.webp', src: 'https://www.maurten.com/fr/products/gel-100-caf-100-box' },
    { id: 'maurten-gel160', brand: 'maurten', cat: 'gel', name: 'Gel 160', carbs: 40, sodium: 32, caf: 0, unit: 'gel 65 g', kcal: 160, fat: 0, protein: 0, img: 'img/products/maurten-gel160.webp', src: 'https://www.maurten.com/fr/products/gel-160-box' },
    { id: 'maurten-solid160', brand: 'maurten', cat: 'barre', name: 'Solid 160', carbs: 40, sodium: 248, caf: 0, unit: 'barre 55 g', kcal: 199, fat: 3.1, protein: 2.2, fiber: 1.4, img: 'img/products/maurten-solid160.webp', src: 'https://www.maurten.com/fr/products/solid-160' },
    { id: 'maurten-solidc160', brand: 'maurten', cat: 'barre', name: 'Solid C 160', carbs: 40, sodium: 244, caf: 0, unit: 'barre 55 g', kcal: 201, fat: 3.0, protein: 2.5, fiber: 1.9, img: 'img/products/maurten-solidc160.webp', src: 'https://www.maurten.com/fr/products/solid-c-160' },
    { id: 'maurten-drink160', brand: 'maurten', cat: 'hydra', name: 'Drink Mix 160', carbs: 39, sodium: 210, caf: 0, unit: 'sachet 42 g pour 500 ml', ml: 500, kcal: 160, fat: 0, protein: 0, img: 'img/products/maurten-drink160.webp', src: 'https://www.maurten.com/fr/products/drink-mix-160' },
    { id: 'maurten-drink320', brand: 'maurten', cat: 'hydra', name: 'Drink Mix 320', carbs: 78, sodium: 248, caf: 0, unit: 'sachet 83 g pour 500 ml', ml: 500, kcal: 320, fat: 0, protein: 0, img: 'img/products/maurten-drink320.webp', src: 'https://www.maurten.com/fr/products/drink-mix-320' },
    { id: 'maurten-drink320caf', brand: 'maurten', cat: 'hydra', name: 'Drink Mix 320 Caf 100', carbs: 78, sodium: 248, caf: 100, unit: 'sachet 83 g pour 500 ml', ml: 500, kcal: 320, fat: 0, protein: 0, img: 'img/products/maurten-drink320caf.webp', src: 'https://www.maurten.com/fr/products/drink-mix-320-caf-100' },
    // ---- Näak ----
    { id: 'naak-boost30-neutre', brand: 'naak', cat: 'gel', name: 'Gel BOOST 30 · Neutre', carbs: 30, sodium: 125, caf: 0, unit: 'gel 48 g', src: 'https://www.naak.com/fr/products/boost-gel-30-neutral' },
    { id: 'naak-boost30-citron', brand: 'naak', cat: 'gel', name: 'Gel BOOST 30 · Citron salé', carbs: 30, sodium: 250, caf: 0, unit: 'gel 48 g', src: 'https://www.naak.com/fr/products/boost-gel-30-salted-lemon' },
    { id: 'naak-boost30-peche', brand: 'naak', cat: 'gel', name: 'Gel BOOST 30 · Thé pêche (caféine)', carbs: 30, sodium: 0, caf: 100, unit: 'gel 48 g', src: 'https://www.naak.com/fr/products/boost-gel-30-peach-tea' },
    { id: 'naak-puree-pomme', brand: 'naak', cat: 'gel', name: 'Purée ULTRA 200 · Pomme & sirop d’érable', carbs: 26, sodium: 162, caf: 0, unit: 'gourde 90 g', kcal: 200, fat: 8.9, protein: 5, fiber: 1, src: 'https://www.naak.com/fr/products/ultra-puree-200-apple-maple-syrup' },
    { id: 'naak-barre-baies', brand: 'naak', cat: 'barre', name: 'Barre ULTRA · Baies & noix', carbs: 27, sodium: 180, caf: 0, unit: 'barre', kcal: 200, fat: 8, protein: 7, fiber: 4, src: 'https://www.naak.com/fr/products/ultra-bar-200-berries-nuts' },
    { id: 'naak-boost60-neutre', brand: 'naak', cat: 'hydra', name: 'Boisson BOOST 60 · Neutre', carbs: 60, sodium: null, caf: 0, unit: 'sachet', src: 'https://www.naak.com/fr/products/boost-drink-mix-60-neutral-single-serve' },
    { id: 'naak-boost60-concombre', brand: 'naak', cat: 'hydra', name: 'Boisson BOOST 60 · Concombre salé', carbs: 60, sodium: 500, caf: 0, unit: 'sachet', src: 'https://www.naak.com/fr/products/boost-drink-mix-60-salted-cucumber-single-serve' },
    // ---- Overstims ----
    { id: 'overstims-gel-ultra', brand: 'overstims', cat: 'gel', name: 'Gel Ultra', carbs: 30, sodium: null, caf: 0, unit: 'gel', src: 'https://www.overstims.com/gels-energetiques/gel-ultra-10-gels' },
    { id: 'overstims-coup-de-fouet', brand: 'overstims', cat: 'gel', name: 'Gel Coup de fouet', carbs: 26, sodium: 45, caf: null, unit: 'gel', src: 'https://www.overstims.com/gels-energetiques/coup-de-fouet-10-gels' },
    { id: 'overstims-energix', brand: 'overstims', cat: 'gel', name: 'Gel Energix', carbs: 26, sodium: 45, caf: 0, unit: 'gel', src: 'https://www.overstims.com/gels-energetiques/energix-10-gels' },
    { id: 'overstims-puree-ultra', brand: 'overstims', cat: 'gel', name: 'Purée ultra', carbs: 22.5, sodium: null, caf: 0, unit: 'purée', src: 'https://www.overstims.com/purees-energetiques/puree-ultra-abricot-3' },
    { id: 'overstims-barre-ultra', brand: 'overstims', cat: 'barre', name: 'Barre ultra', carbs: 25, sodium: null, caf: 0, unit: 'barre', src: 'https://www.overstims.com/barres-energetiques/barre-ultra-4-barres' },
    { id: 'overstims-barre-ultra-salee', brand: 'overstims', cat: 'barre', name: 'Barre ultra salée', carbs: 23, sodium: null, caf: 0, unit: 'barre', src: 'https://www.overstims.com/barres-energetiques/barre-ultra-salee-4-barres' },
    { id: 'overstims-hydrixir-ultra', brand: 'overstims', cat: 'hydra', name: 'Hydrixir ultra', carbs: 30, sodium: null, caf: 0, unit: 'portion', src: 'https://www.overstims.com/boissons-energetiques/hydrixir-ultra-10-sticks' },
    { id: 'overstims-hydrixir-antiox', brand: 'overstims', cat: 'hydra', name: 'Hydrixir antioxydant', carbs: 37, sodium: 26, caf: 0, unit: 'portion', kcal: 148, fat: 0, protein: 0, src: 'https://www.overstims.com/boissons-energetiques/hydrixir-antioxydant' },
    { id: 'overstims-hydrixir-bio', brand: 'overstims', cat: 'hydra', name: 'Hydrixir bio', carbs: 38, sodium: null, caf: 0, unit: 'portion', src: 'https://www.overstims.com/boissons-energetiques/hydrixir-bio' },
    // ---- Meltonic ----
    { id: 'meltonic-endurance-xl', brand: 'meltonic', cat: 'gel', name: 'Gel Endurance XL · Miel ginseng gelée royale', carbs: 28.4, sodium: 144, caf: 0, unit: 'gel 40 g', kcal: 115, fat: 0.4, protein: 0.4, src: 'https://www.meltonic.com/fr/gels-energetiques-au-miel/20116-721-gel-energetique-endurance-xl-miel-ginseng-gelee-royale.html' },
    { id: 'meltonic-sale-xl', brand: 'meltonic', cat: 'gel', name: 'Gel Salé XL · Miel fleur de sel', carbs: 28.8, sodium: null, caf: 0, unit: 'gel 40 g', src: 'https://www.meltonic.com/fr/gels-energetiques-au-miel/20118-727-gel-energetique-sale-xl-miel-fleur-de-sel-gelee-royale.html' },
    { id: 'meltonic-cafeine-xl', brand: 'meltonic', cat: 'gel', name: 'Gel Caféine XL 200 mg', carbs: 29, sodium: null, caf: 200, unit: 'gel 40 g', src: 'https://www.meltonic.com/fr/gels-energetiques-au-miel/10170-559-gel-energetique-cafe-miel-gelee-royale.html' },
    { id: 'meltonic-antioxydant', brand: 'meltonic', cat: 'gel', name: 'Gel Antioxydant · Miel acérola spiruline', carbs: 15, sodium: 2, caf: 0, unit: 'gel 20 g', kcal: 61, fat: 0.1, protein: 0.3, fiber: 0.1, src: 'https://www.meltonic.com/fr/gels-energetiques-au-miel/51-396-gel-energetique-antioxydant.html' },
    { id: 'meltonic-puree-banane', brand: 'meltonic', cat: 'gel', name: 'Purée protéinée · Banane fraise', carbs: 18, sodium: 188, caf: 0, unit: 'gourde 90 g', src: 'https://www.meltonic.com/fr/purees-energetiques/17846-671-puree-proteinee-banane-fraise.html' },
    { id: 'meltonic-purbar-coco', brand: 'meltonic', cat: 'barre', name: 'Pur’Bar · Amande coco', carbs: 27.4, sodium: 64, caf: 0, unit: 'barre', src: 'https://www.meltonic.com/fr/barre-energetique/126-567-pur-bar-datte-coco.html' },
    { id: 'meltonic-purbar-cacao', brand: 'meltonic', cat: 'barre', name: 'Pur’Bar · Cacao noisette', carbs: 27.4, sodium: 62, caf: 0, unit: 'barre', kcal: 180, fat: 4.8, protein: 5.5, fiber: 4.5, src: 'https://www.meltonic.com/fr/barre-energetique/127-573-pur-bar-cacao-noisette.html' },
    { id: 'meltonic-barre-cacahuete', brand: 'meltonic', cat: 'barre', name: 'Barre · Cacahuète choco', carbs: 11, sodium: 207, caf: 0, unit: 'barre', src: 'https://www.meltonic.com/fr/barre-energetique/13077-621-barre-energetique-bio-cacahuete-choco.html' },
    { id: 'meltonic-barre-fraise', brand: 'meltonic', cat: 'barre', name: 'Barre · Fraise citron', carbs: 13, sodium: 2.5, caf: 0, unit: 'barre', src: 'https://www.meltonic.com/fr/barre-energetique/6314-505-barre-energetique-bio-fraise-citron.html' },
    { id: 'meltonic-boisson-citron', brand: 'meltonic', cat: 'hydra', name: 'Boisson énergétique · Citron', carbs: 31.1, sodium: 300, caf: 0, unit: 'sachet pour 500 ml', ml: 500, kcal: 124, fat: 0, protein: 0, src: 'https://www.meltonic.com/fr/boisson-energetique/14262-738-sachets-boisson-energetique-bio-citron.html' },
    // ---- GU ----
    { id: 'gu-gel', brand: 'gu', cat: 'gel', name: 'Original Energy Gel', carbs: 23, sodium: 125, caf: 0, unit: 'gel (selon saveur)', kcal: 100, fat: 0, protein: 0, src: 'https://guenergy.com/products/energy-gel' },
    { id: 'gu-gel-caf40', brand: 'gu', cat: 'gel', name: 'Original Energy Gel (40 mg caféine)', carbs: 23, sodium: 125, caf: 40, unit: 'gel (selon saveur)', kcal: 100, fat: 0, protein: 0, src: 'https://guenergy.com/products/energy-gel' },
    { id: 'gu-roctane', brand: 'gu', cat: 'gel', name: 'Roctane Energy Gel', carbs: 21, sodium: 180, caf: 0, unit: 'gel (selon saveur)', src: 'https://guenergy.com/products/roctane-energy-gel' },
    { id: 'gu-roctane-caf70', brand: 'gu', cat: 'gel', name: 'Roctane Energy Gel (70 mg caféine)', carbs: 21, sodium: 180, caf: 70, unit: 'gel (selon saveur)', src: 'https://guenergy.com/products/roctane-energy-gel' },
    { id: 'gu-liquid', brand: 'gu', cat: 'gel', name: 'Liquid Energy', carbs: 24, sodium: 75, caf: 0, unit: 'gel liquide', src: 'https://guenergy.com/products/liquid-energy' },
    { id: 'gu-roctane-drink', brand: 'gu', cat: 'hydra', name: 'Roctane Energy & Hydration Drink Mix', carbs: 60, sodium: 320, caf: 0, unit: 'portion', src: 'https://guenergy.com/products/roctane-energy-drink-mix' },
    { id: 'gu-tabs', brand: 'gu', cat: 'hydra', name: 'Hydration Tabs', carbs: 0, sodium: 320, caf: 0, unit: 'pastille', src: 'https://guenergy.com/products/hydration-drink-tabs' },
    // ---- SiS ----
    { id: 'sis-go-iso', brand: 'sis', cat: 'gel', name: 'GO Isotonic Energy Gel', carbs: 22, sodium: null, caf: 0, unit: 'gel', kcal: 88, fat: 0.1, protein: 0, src: 'https://www.scienceinsport.com/shop-sis/go-range/go-gels/sis-go-isotonic-energy-gel-pack' },
    { id: 'sis-go-electro', brand: 'sis', cat: 'gel', name: 'GO Energy + Electrolyte Gel', carbs: 22, sodium: 118, caf: 0, unit: 'gel', kcal: 89, fat: 0, protein: 0, src: 'https://www.scienceinsport.com/shop-sis/go-range/go-gels/sis-go-energy-electrolyte-gels-pack' },
    { id: 'sis-go-caf', brand: 'sis', cat: 'gel', name: 'GO Energy + Caffeine Gel', carbs: 22, sodium: null, caf: 75, unit: 'gel', src: 'https://www.scienceinsport.com/shop-sis/go-range/go-gels/sis-go-energy-caffeine-gels-pack' },
    { id: 'sis-beta-gel', brand: 'sis', cat: 'gel', name: 'BETA Fuel Gel', carbs: 40, sodium: null, caf: 0, unit: 'gel', kcal: 160, fat: 0, protein: 0, src: 'https://www.scienceinsport.com/shop-sis/go-range/go-gels/beta-fuel-gel-pack' },
    { id: 'sis-beta-electro', brand: 'sis', cat: 'gel', name: 'BETA Fuel + Electrolyte Gel', carbs: 40, sodium: 200, caf: 0, unit: 'gel', src: 'https://www.scienceinsport.com/shop-sis/go-range/beta-fuel/beta-fuel-electrolyte-gel' },
    { id: 'sis-beta-nootropics', brand: 'sis', cat: 'gel', name: 'BETA Fuel + Nootropics Gel', carbs: 40, sodium: null, caf: 200, unit: 'gel', kcal: 160, fat: 0, protein: 0, src: 'https://www.scienceinsport.com/shop-sis/go-range/beta-fuel/beta-fuel-nootropics-pack' },
    { id: 'sis-oat-bar', brand: 'sis', cat: 'barre', name: 'Energy Oat Bar', carbs: 40, sodium: null, caf: 0, unit: 'barre', src: 'https://www.scienceinsport.com/shop-sis/go-range/go-energy-bars/energy-oat-bar' },
    { id: 'sis-bar-mini', brand: 'sis', cat: 'barre', name: 'GO Energy Bar Mini', carbs: 26, sodium: 50, caf: 0, unit: 'barre', kcal: 143, fat: 2.2, protein: 5, fiber: 1.1, src: 'https://www.scienceinsport.com/shop-sis/go-range/go-energy-bars/sis-go-energy-bar-mini-30-pack' },
    { id: 'sis-bake', brand: 'sis', cat: 'barre', name: 'GO Energy Bake', carbs: 30, sodium: 97, caf: 0, unit: 'barre', kcal: 187, fat: 4.9, protein: 3.4, fiber: 3.4, src: 'https://www.scienceinsport.com/shop-sis/go-range/go-energy-bars/sis-go-energy-bake-12-pack' },
    { id: 'sis-beta-chews', brand: 'sis', cat: 'barre', name: 'BETA Fuel Energy Chews', carbs: 45, sodium: 42, caf: 0, unit: 'sachet de bonbons', kcal: 185, fiber: 2.2, src: 'https://www.scienceinsport.com/shop-sis/go-range/go-energy-bars/beta-fuel-energy-chew-pack' },
    { id: 'sis-beta80', brand: 'sis', cat: 'hydra', name: 'BETA Fuel 80', carbs: 80, sodium: null, caf: 0, unit: 'portion', kcal: 322, fat: 0, protein: 2.5, src: 'https://www.scienceinsport.com/shop-sis/go-range/go-energy-powders/beta-fuel-80' },
    { id: 'sis-go-powder', brand: 'sis', cat: 'hydra', name: 'GO Energy Powder', carbs: 47, sodium: null, caf: 0, unit: 'portion', src: 'https://www.scienceinsport.com/shop-sis/go-range/go-energy-powders/sis-go-energy-powder-1-6kg' },
    { id: 'sis-go-electrolyte', brand: 'sis', cat: 'hydra', name: 'GO Electrolyte Powder', carbs: 36, sodium: null, caf: 0, unit: 'portion', kcal: 146, fat: 0, protein: 0, src: 'https://www.scienceinsport.com/shop-sis/go-range/go-energy-powders/sis-go-electrolyte-powder' },
    // ---- Tailwind ----
    { id: 'tailwind-endurance', brand: 'tailwind', cat: 'hydra', name: 'Endurance Fuel', carbs: 50, sodium: 620, caf: 0, unit: 'sachet (200 kcal)', kcal: 200, fat: 0, protein: 0, fiber: 0, src: 'https://tailwindnutrition.com/products/endurance-fuel-cherry-limeade' },
    { id: 'tailwind-endurance-caf', brand: 'tailwind', cat: 'hydra', name: 'Endurance Fuel caféiné', carbs: 50, sodium: 620, caf: 35, unit: 'sachet (200 kcal)', kcal: 200, fat: 0, protein: 0, fiber: 0, src: 'https://tailwindnutrition.com/products/endurance-fuel-caffeinated-blood-orange' },
    { id: 'tailwind-highcarb', brand: 'tailwind', cat: 'hydra', name: 'High Carb Fuel', carbs: 90, sodium: 680, caf: 0, unit: 'portion', src: 'https://tailwindnutrition.com/products/highcarbfuel' },
    // ---- Isostar ----
    { id: 'isostar-le3h-gel-orange', brand: 'isostar', cat: 'gel', name: 'Long Energy +3H Gel · Orange', carbs: 18, sodium: 60, caf: 0, unit: 'gel 40 g', src: 'https://www.isostar.fr/long-energy-3h-gel-energetique-sport-cola-40g.html' },
    { id: 'isostar-le3h-gel-cola', brand: 'isostar', cat: 'gel', name: 'Long Energy +3H Gel · Cola (caféine)', carbs: 18, sodium: 60, caf: 32, unit: 'gel 40 g', src: 'https://www.isostar.fr/long-energy-3h-gel-energetique-sport-cola-40g.html' },
    { id: 'isostar-fruit-boost', brand: 'isostar', cat: 'gel', name: 'Pâte de fruits Energy Boost · Fraise', carbs: 10, sodium: null, caf: 10, unit: 'carré', src: 'https://www.isostar.fr/pate-de-fruits-sport-energy-boost-fraise-carres-energetiques-x10.html' },
    { id: 'isostar-barre-choco', brand: 'isostar', cat: 'barre', name: 'Barre céréales · Chocolat', carbs: 24, sodium: 81, caf: 0, unit: 'barre 35 g', kcal: 145, fat: 4.2, protein: 2.2, src: 'https://www.isostar.fr/barres-energetiques-sport-cereales-chocolat-3x35g.html' },
    { id: 'isostar-barre-max', brand: 'isostar', cat: 'barre', name: 'Barre Max Énergie · Pomme abricot', carbs: 34, sodium: 55, caf: 0, unit: 'barre 55 g', kcal: 208, fat: 4.9, protein: 7.2, src: 'https://www.isostar.fr/barres-cereales-max-energie-pomme-abricot-3x55g.html' },
    { id: 'isostar-le3h-boisson', brand: 'isostar', cat: 'hydra', name: 'Long Energy +3H Boisson', carbs: 31, sodium: 560, caf: 0, unit: 'portion pour 500 ml', ml: 500, src: 'https://www.isostar.fr/long-energy-3h-boisson-sport-poudre-isotonique-hydrate-perform-citron-570g.html' },
    { id: 'isostar-pastilles', brand: 'isostar', cat: 'hydra', name: 'Pastilles d’hydratation électrolytes', carbs: 0, sodium: 320, caf: 0, unit: 'pastille pour 500 ml', ml: 500, src: 'https://www.isostar.fr/x18-pastilles-d-hydratation-electrolytes-immunite-citron-90g.html' },
    // ---- Powerbar ----
    { id: 'powerbar-powergel', brand: 'powerbar', cat: 'gel', name: 'PowerGel Original', carbs: 26, sodium: 205, caf: 0, unit: 'sachet 41 g', kcal: 105, fat: 0, protein: 0, src: 'https://www.powerbar.com/fr-de/products/powergel-original-high-carb-gel-energetique' },
    { id: 'powerbar-powergel-caf', brand: 'powerbar', cat: 'gel', name: 'PowerGel Original (50 mg caféine)', carbs: 26, sodium: 205, caf: 50, unit: 'sachet 41 g', kcal: 102, fat: 0.4, protein: 0, src: 'https://www.powerbar.com/fr-de/products/powergel-original-high-carb-gel-energetique' },
    { id: 'powerbar-hydro', brand: 'powerbar', cat: 'gel', name: 'PowerGel Hydro', carbs: 25, sodium: null, caf: 0, unit: 'sachet 67 ml', src: 'https://www.powerbar.com/fr-de/products/powergel-hydro-high-carb-gel-energetique' },
    { id: 'powerbar-fuel30', brand: 'powerbar', cat: 'gel', name: 'Fuel Gel 30 · Cola-orange (caféine)', carbs: 30, sodium: 205, caf: 100, unit: 'gel 50 ml', src: 'https://www.powerbar.com/fr-de/products/fuel-gel-30-gel-glucidique' },
    // ---- Tä (valeurs relevées le 27/10/2026 ; dose de caféine non publiée pour les saveurs caféinées) ----
    { id: 'ta-gel', brand: 'ta', cat: 'gel', name: 'Gel énergétique 40 ml (sans caféine)', carbs: 33, sodium: null, caf: 0, unit: 'gel 40 ml', src: 'https://www.ta-energy.com/products/energie-gels-vanilla' },
    { id: 'ta-gel-caf', brand: 'ta', cat: 'gel', name: 'Gel énergétique 40 ml · Café, cola ou fruits des bois (caféine)', carbs: 33, sodium: null, caf: null, unit: 'gel 40 ml', src: 'https://www.ta-energy.com/products/energie-gels-coffee' },
    { id: 'ta-jelly', brand: 'ta', cat: 'gel', name: 'Gel Jelly 51 g · Neutre ou citron yuzu', carbs: 35, sodium: null, caf: 0, unit: 'gel 51 g', src: 'https://www.ta-energy.com/products/jelly-gels-neutre' },
    { id: 'ta-jelly-caf', brand: 'ta', cat: 'gel', name: 'Gel Jelly 51 g · Fruits des bois (caféine)', carbs: 35, sodium: null, caf: null, unit: 'gel 51 g', src: 'https://www.ta-energy.com/products/jelly-gels-wild-berry' },
    { id: 'ta-gommes', brand: 'ta', cat: 'barre', name: 'Gommes énergétiques 30 g (sans caféine)', carbs: 25, sodium: null, caf: 0, unit: 'sachet 30 g', src: 'https://www.ta-energy.com/products/energie-gommes-fraise' },
    { id: 'ta-gommes-caf', brand: 'ta', cat: 'barre', name: 'Gommes énergétiques 30 g · Cola, cranberry pomme ou pamplemousse (caféine)', carbs: 25, sodium: null, caf: null, unit: 'sachet 30 g', src: 'https://www.ta-energy.com/products/energie-gommes-cola' },
    { id: 'ta-barre-bio', brand: 'ta', cat: 'barre', name: 'Barre énergétique bio 38 g', carbs: 20, sodium: null, caf: 0, unit: 'barre 38 g', src: 'https://www.ta-energy.com/products/energie-barres-bio-abricot-cajou' },
    { id: 'ta-isotonique', brand: 'ta', cat: 'hydra', name: 'Boisson isotonique', carbs: 35, sodium: null, caf: 0, unit: 'sachet 40 g', src: 'https://www.ta-energy.com/products/boisson-isotonic-sachet-citron' },
    { id: 'ta-maltodextrine', brand: 'ta', cat: 'hydra', name: 'Boisson maltodextrine', carbs: 45, sodium: null, caf: 0, unit: 'portion', src: 'https://www.ta-energy.com/products/maltode6x-neutre' },
    { id: 'ta-pastilles', brand: 'ta', cat: 'hydra', name: 'Pastilles d’électrolytes', carbs: 0, sodium: null, caf: 0, unit: 'pastille', src: 'https://www.ta-energy.com/products/electrolytes-citron' },
    { id: 'ta-sel', brand: 'ta', cat: 'hydra', name: 'Capsules de sel', carbs: 0, sodium: null, caf: 0, unit: 'capsule', src: 'https://www.ta-energy.com/products/capsules-de-sel' }
  ]
};
