import React from 'react'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
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

  const currentLang = availableLanguages.find(lang => lang.code === language) || availableLanguages[0]

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-6 right-6 z-40 px-4 py-2 rounded-full flex items-center gap-2 transition-all hover:scale-105"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(201, 162, 39, 0.3)',
        color: '#8b7355',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        fontSize: '0.875rem',
        fontWeight: '500',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
      }}
      onClick={() => {
        const currentIndex = availableLanguages.findIndex(lang => lang.code === language)
        const nextIndex = (currentIndex + 1) % availableLanguages.length
        changeLanguage(availableLanguages[nextIndex].code)
      }}
    >
      <Globe className="w-4 h-4" />
      <span>{currentLang.flag} {currentLang.label}</span>
    </motion.button>
  )
}

export default LanguageSwitcher
