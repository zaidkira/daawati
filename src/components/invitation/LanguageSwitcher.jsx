import React from 'react'
import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const LanguageSwitcher = ({ languagePair = 'ar-fr' }) => {
  const { language, changeLanguage } = useLanguage()

  const availableLanguages = languagePair === 'ar-fr' 
    ? [
        { code: 'ar', label: 'العربية', flag: '🇩🇿' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' }
      ]
    : [
        { code: 'ar', label: 'العربية', flag: '🇩🇿' },
        { code: 'en', label: 'English', flag: '🇬🇧' }
      ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-40"
    >
      <div className="flex items-center gap-2">
        <Languages className="w-5 h-5 text-luxury-gold-400" />
        <div className="flex gap-2">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                language === lang.code
                  ? 'bg-luxury-gold-500 text-luxury-obsidian'
                  : 'bg-white/10 text-luxury-champagne hover:bg-white/20'
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default LanguageSwitcher
