import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Infinity } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const StoryTimeline = ({ story }) => {
  const { t, language } = useLanguage()

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4">
            {t('ourStory')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-luxury-gold-400 to-luxury-gold-600 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-luxury-gold-400 via-luxury-gold-500 to-luxury-gold-600" />

          {/* Story items */}
          {story.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <div className="glass-card p-6 rounded-2xl">
                  <div className="text-2xl font-serif font-bold text-luxury-gold-400 mb-2">
                    {item.year === '∞' ? (
                      <div className="flex items-center justify-center gap-2">
                        <Infinity className="w-6 h-6" />
                      </div>
                    ) : (
                      item.year
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-luxury-champagne mb-2">
                    {language === 'ar' ? item.title : item.titleFr}
                  </h3>
                  <p className="text-luxury-champagne/80">
                    {language === 'ar' ? item.text : item.textFr}
                  </p>
                </div>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-luxury-gold-400 border-4 border-luxury-obsidian z-10">
                {index === story.length - 1 && (
                  <Heart className="absolute -top-2 -right-2 w-4 h-4 text-luxury-burgundy-400 fill-luxury-burgundy-400" />
                )}
              </div>

              {/* Empty space for alternating layout */}
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StoryTimeline
