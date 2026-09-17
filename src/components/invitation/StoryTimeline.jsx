import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Infinity } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const StoryTimeline = ({ story }) => {
  const { t, language } = useLanguage()

  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#fdfbf7' }}>
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl sm:text-5xl font-serif font-bold mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#4a4a4a'
            }}
          >
            {t('ourStory')}
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(to right, #c9a227, #d6af59, #c9a227)'
            }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5"
            style={{
              background: 'linear-gradient(to bottom, #c9a227, #d6af59, #c9a227)'
            }}
          />

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
                <div 
                  className="p-6 rounded-2xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(201, 162, 39, 0.15)'
                  }}
                >
                  <div 
                    className="text-2xl font-serif font-bold mb-2"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      color: '#c9a227'
                    }}
                  >
                    {item.year === '∞' ? (
                      <div className="flex items-center justify-center gap-2">
                        <Infinity className="w-6 h-6" />
                      </div>
                    ) : (
                      item.year
                    )}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      color: '#4a4a4a'
                    }}
                  >
                    {language === 'ar' ? item.title : item.titleFr}
                  </h3>
                  <p 
                    className="text-base"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      color: '#6b6b6b',
                      lineHeight: '1.6'
                    }}
                  >
                    {language === 'ar' ? item.text : item.textFr}
                  </p>
                </div>
              </div>

              {/* Center dot */}
              <div 
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full z-10"
                style={{
                  backgroundColor: '#c9a227',
                  border: '4px solid #fdfbf7'
                }}
              >
                {index === story.length - 1 && (
                  <Heart 
                    className="absolute -top-2 -right-2 w-4 h-4"
                    style={{ 
                      color: '#c9a227',
                      fill: '#c9a227'
                    }} 
                  />
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
