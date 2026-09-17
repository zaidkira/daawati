import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid3x3, List, Heart, Eye, Sparkles } from 'lucide-react'

const TemplateGallery = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [hoveredTemplate, setHoveredTemplate] = useState(null)

  const templates = [
    { id: 1, name: 'Islamic Royal', badge: 'الأكثر طلبًا', color: 'from-luxury-gold-500 to-luxury-burgundy-500' },
    { id: 2, name: 'Sage Garden', badge: 'كلاسيكي', color: 'from-luxury-burgundy-500 to-luxury-gold-500' },
    { id: 3, name: 'Floral Romantic', badge: 'جديد', color: 'from-luxury-gold-400 to-luxury-burgundy-400' },
    { id: 4, name: 'Azura Beach', badge: 'جديد', color: 'from-luxury-burgundy-400 to-luxury-gold-400' },
    { id: 5, name: 'Amazigh Royal', badge: 'جديد', color: 'from-luxury-gold-500 to-luxury-burgundy-500' },
    { id: 6, name: 'El Mahroussa', badge: 'جديد', color: 'from-luxury-burgundy-500 to-luxury-gold-500' }
  ]

  return (
    <section id="templates" className="relative py-24 px-4 sm:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-luxury-obsidian" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-luxury-gold-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-luxury-burgundy-500/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12" dir="rtl">
          <div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4">
              استكشف قوالبنا الفاخرة
            </h2>
            <p className="text-lg text-luxury-champagne/70 max-w-xl">
              اختر القالب الذي يناسب ذوقكما من بين مجموعة متنوعة من التصاميم الأنيقة
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 p-2 rounded-xl bg-white/5 backdrop-blur-glass border border-white/10">
            {[
              { mode: 'grid', icon: Grid3x3, label: 'شبكة' },
              { mode: 'list', icon: List, label: 'قائمة' }
            ].map((item) => (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === item.mode
                    ? 'bg-luxury-gold-400 text-luxury-obsidian'
                    : 'text-luxury-champagne/70 hover:text-luxury-champagne'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredTemplate(template.id)}
              onHoverEnd={() => setHoveredTemplate(null)}
              className="glass-card rounded-3xl overflow-hidden group cursor-pointer"
              dir="rtl"
            >
              {/* Template Preview */}
              <div className={`relative h-96 bg-gradient-to-br ${template.color} p-8 flex items-center justify-center`}>
                <span className="text-8xl">💒</span>
                
                {/* Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400 text-luxury-obsidian text-xs font-bold shadow-lg">
                  {template.badge}
                </div>

                {/* Hover Actions */}
                <AnimatePresence>
                  {hoveredTemplate === template.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
                      >
                        <Eye className="w-6 h-6 text-luxury-obsidian" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
                      >
                        <Heart className="w-6 h-6 text-luxury-obsidian" />
                      </motion.button>
                </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-luxury-champagne mb-3">
                  {template.name}
                </h3>
                <p className="text-luxury-champagne/70 text-sm mb-6 leading-relaxed">
                  تصميم أنيق يجمع بين الأصالة والحداثة مع تفاصيل دقيقة ومؤثرات بصرية مذهلة
                </p>
                
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3 rounded-full bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400 text-luxury-obsidian font-semibold text-sm shadow-gold-glow"
                  >
                    اطللب الآن
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-full border-2 border-luxury-gold-400 text-luxury-gold-400 font-semibold text-sm hover:bg-luxury-gold-400/10 transition-colors"
                  >
                    معاينة
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 glass-card rounded-3xl border-2 border-dashed border-luxury-gold-400/30 text-center"
          dir="rtl"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-luxury-gold-400" />
            <h3 className="text-2xl font-bold text-luxury-gold-400">
              قريبًا: تصاميم جديدة
            </h3>
          </div>
          <p className="text-luxury-champagne/70 mb-6">
            نعمل على إضافة قوالب جديدة فاخرة قريبًا
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Luxury Gold', 'Modern Minimal', 'Vintage Rose'].map((item, index) => (
              <span
                key={index}
                className="px-5 py-2 rounded-full bg-white/5 border border-luxury-gold-400/20 text-luxury-gold-400 text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TemplateGallery
