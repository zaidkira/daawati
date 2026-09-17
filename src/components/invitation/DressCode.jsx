import React from 'react'
import { motion } from 'framer-motion'
import { Shirt } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const DressCode = ({ dressCode }) => {
  const { t, language } = useLanguage()

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-luxury-charcoal to-luxury-obsidian">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 sm:p-12 rounded-3xl text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-luxury-gold-400/20 flex items-center justify-center">
              <Shirt className="w-10 h-10 text-luxury-gold-400" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-champagne mb-4">
            {t('dressCode')}
          </h2>
          
          <p className="text-xl text-luxury-champagne/80">
            {language === 'ar' ? dressCode.textAr : dressCode.text}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default DressCode
