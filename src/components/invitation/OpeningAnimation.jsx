import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const OpeningAnimation = ({ onOpen, invitation }) => {
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)
  const musicRef = useRef(null)

  const handleOpen = () => {
    setIsOpen(true)
    
    // Play opening chime
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(console.error)
    }
    
    // Start background music after chime
    setTimeout(() => {
      if (musicRef.current && !isMuted) {
        musicRef.current.play().catch(console.error)
      }
    }, 1000)
    
    // Trigger parent callback
    setTimeout(() => {
      onOpen()
    }, 1500)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (musicRef.current) {
      musicRef.current.muted = !isMuted
      if (!isMuted && musicRef.current.paused) {
        musicRef.current.play().catch(console.error)
      }
    }
  }

  return (
    <>
      {/* Audio elements */}
      <audio ref={audioRef} src="/audio/opening-chime.mp3" preload="auto" />
      <audio 
        ref={musicRef} 
        src="/audio/music.mp3" 
        loop 
        preload="auto"
        muted={isMuted}
      />

      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-luxury-obsidian via-luxury-charcoal to-luxury-obsidian"
          >
            {/* Envelope Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Wax Seal */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-luxury-gold-400 to-luxury-gold-600 flex items-center justify-center cursor-pointer shadow-gold-glow"
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl mb-2">💍</div>
                  <div className="text-luxury-obsidian font-bold text-sm sm:text-base">
                    {invitation.couple.groomName} & {invitation.couple.brideName}
                  </div>
                </div>
              </motion.div>

              {/* Tap to open prompt */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-center mt-8 text-luxury-gold-300 text-lg"
              >
                {t('tapToOpen')}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mute toggle (persistent) */}
      {isOpen && (
        <motion.button
          initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          className={`fixed top-4 ${language === 'ar' ? 'left-4' : 'right-4'} z-40 p-3 rounded-full bg-white/10 backdrop-blur-glass border border-white/20 text-luxury-gold-400 hover:bg-white/20 transition-all`}
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>
      )}
    </>
  )
}

export default OpeningAnimation
