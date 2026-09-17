import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Calendar } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const OurStory = ({ story }) => {
  const { t, direction } = useLanguage()

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          dir={direction}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-amber-500/20 mb-8">
            <Heart className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">
              {t('ourStory')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-amber-100 mb-4">
            رحلتنا معاً
          </h2>
          <p className="text-lg text-amber-200/70 max-w-2xl mx-auto">
            كل لحظة جعلتنا أقرب إلى بعضنا
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative" dir={direction}>
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-amber-500/50 via-amber-500/30 to-transparent" />

          {/* Story Items */}
          <div className="space-y-12">
            {story.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: direction === 'rtl' ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 
                    ? direction === 'rtl' ? 'flex-row' : 'flex-row-reverse'
                    : direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Content */}
                <div className={`w-1/2 ${direction === 'rtl' ? (index % 2 === 0 ? 'pr-12' : 'pl-12') : (index % 2 === 0 ? 'pl-12' : 'pr-12')}`}>
                  <div className="bg-white/5 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all">
                    {/* Year Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 text-sm font-bold mb-4">
                      <Calendar className="w-4 h-4" />
                      {item.year}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-amber-100 mb-3">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-amber-200/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-slate-900 z-10" />

                {/* Empty Space */}
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default OurStory
