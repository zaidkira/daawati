export const themes = {
  "islamic-royal": {
    id: "islamic-royal",
    name: "Islamic Royal",
    slug: "islamic-royal",
    badge: "الأكثر طلبًا",
    color: "from-luxury-gold-500 to-luxury-burgundy-500",
    colors: {
      primary: "#c99c2c",
      secondary: "#1a1a1a",
      accent: "#8b0000",
      text: "#f5e6d3",
      background: "#0a0a0a"
    },
    fonts: {
      arabic: "Amiri, serif",
      french: "Playfair Display, serif"
    },
    sealIcon: "💍",
    musicUrl: "/audio/music.mp3",
    description: "تصميم ملكي إسلامي فاخر مع الألوان الذهبية والخلفية الداكنة"
  },
  "sage-garden": {
    id: "sage-garden",
    name: "Sage Garden",
    slug: "sage-garden",
    badge: "كلاسيكي",
    color: "from-luxury-burgundy-500 to-luxury-gold-500",
    colors: {
      primary: "#9CAF88",
      secondary: "#f5f5f5",
      accent: "#6B8E23",
      text: "#2d2d2d",
      background: "#f8f9f5"
    },
    fonts: {
      arabic: "Cairo, sans-serif",
      french: "Lora, serif"
    },
    sealIcon: "🌿",
    musicUrl: "/audio/music.mp3",
    description: "تصميم حديقة طبيعي بألوان الأخضر والبيج الهادئة"
  },
  "floral-romantic": {
    id: "floral-romantic",
    name: "Floral Romantic",
    slug: "floral-romantic",
    badge: "جديد",
    color: "from-luxury-gold-400 to-luxury-burgundy-400",
    colors: {
      primary: "#FFB6C1",
      secondary: "#FFF0F5",
      accent: "#FF69B4",
      text: "#4a4a4a",
      background: "#fff5f8"
    },
    fonts: {
      arabic: "Tajawal, sans-serif",
      french: "Great Vibes, cursive"
    },
    sealIcon: "🌸",
    musicUrl: "/audio/music.mp3",
    description: "تصميم زهري رومانسي بألوان الوردي والخلفية الفاتحة"
  },
  "azura-beach": {
    id: "azura-beach",
    name: "Azura Beach",
    slug: "azura-beach",
    badge: "جديد",
    color: "from-luxury-burgundy-400 to-luxury-gold-400",
    colors: {
      primary: "#00CED1",
      secondary: "#F0F8FF",
      accent: "#20B2AA",
      text: "#2c3e50",
      background: "#f0f8ff"
    },
    fonts: {
      arabic: "Cairo, sans-serif",
      french: "Montserrat, sans-serif"
    },
    sealIcon: "🐚",
    musicUrl: "/audio/music.mp3",
    description: "تصميم شاطئي أزرق مع ألوان البحر والخلفية الفاتحة"
  },
  "amazigh-royal": {
    id: "amazigh-royal",
    name: "Amazigh Royal",
    slug: "amazigh-royal",
    badge: "جديد",
    color: "from-luxury-gold-500 to-luxury-burgundy-500",
    colors: {
      primary: "#1E90FF",
      secondary: "#F5F5DC",
      accent: "#4169E1",
      text: "#2c3e50",
      background: "#faf8f0"
    },
    fonts: {
      arabic: "Cairo, sans-serif",
      french: "Playfair Display, serif"
    },
    sealIcon: "ⵣ",
    musicUrl: "/audio/music.mp3",
    description: "تصميم أمزيغي ملكي بالألوان الزرقاء والذهبي"
  },
  "el-mahroussa": {
    id: "el-mahroussa",
    name: "El Mahroussa",
    slug: "el-mahroussa",
    badge: "جديد",
    color: "from-luxury-burgundy-500 to-luxury-gold-500",
    colors: {
      primary: "#FFD700",
      secondary: "#1a1a1a",
      accent: "#C0C0C0",
      text: "#f5e6d3",
      background: "#0a0a0a"
    },
    fonts: {
      arabic: "Amiri, serif",
      french: "Playfair Display, serif"
    },
    sealIcon: "👑",
    musicUrl: "/audio/music.mp3",
    description: "تصميم محروسة فاخر بالألوان الذهبية والفضية"
  }
}

export const getThemeBySlug = (slug) => {
  return themes[slug] || themes["islamic-royal"]
}

export const getAllThemes = () => {
  return Object.values(themes)
}
