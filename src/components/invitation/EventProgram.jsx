import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Sparkles } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const EventProgram = ({ program }) => {
  const { t, direction } = useLanguage()

  const getTranslatedTitle = (title) => {
    const translations = {
      'وصول الضيوف': t('guestArrival'),
      'حفل الزفاف والفاتحة': t('ceremony'),
      'العشاء': t('dinner'),
      'تقطيع الكعكة': t('cake'),
      'ختام الحفل': t('closing')
    }
    return translations[title] || title
  }

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
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">
              {t('eventProgram')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-amber-100 mb-4">
            برنامج الحفل
          </h2>
          <p className="text-lg text-amber-200/70 max-w-2xl mx-auto">
            جدول فعاليات يوم الزفاف
          </p>
        </motion.div>

        {/* Program Timeline */}
        <div className="space-y-4" dir={direction}>
          {program.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: direction === 'rtl' ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all">
                <div className="flex items-center gap-6">
                  {/* Time */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                      <span className="text-amber-300 font-bold text-lg">
                        {item.time}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-amber-100 mb-2">
                      {getTranslatedTitle(item.title)}
                    </h3>
                    <div className="flex items-center gap-2 text-amber-400/60 text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>نشاط مميز</span>
                    </div>
                  </div>

                  {/* Decorative Arrow */}
                  <motion.div
                    className={`w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center ${
                      direction === 'rtl' ? 'rotate-180' : ''
                    }`}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(201, 156, 44, 0.2)' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                  </motion.div>
                </div>
              </div>

              {/* Connector Line */}
              {index < program.length - 1 && (
                <div className={`absolute ${direction === 'rtl' ? 'right-8' : 'left-8'} top-full w-px h-8 bg-gradient-to-b from-amber-500/30 to-transparent`} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default EventProgram
