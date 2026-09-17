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

  // Get couple's initials
  const getInitials = () => {
    const groomInitial = invitation.couple.groomName?.charAt(0) || 'A'
    const brideInitial = invitation.couple.brideName?.charAt(0) || 'F'
    return `${groomInitial}&${brideInitial}`
  }

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
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
              backgroundImage: 'url(/images/envelope-texture.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#f5f0e8'
            }}
          >
            {/* Subtle overlay for texture */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom right, rgba(232, 237, 228, 0.5), rgba(253, 251, 247, 0.5))'
              }}
            />
            
            {/* Envelope */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-80 h-96 sm:w-96 sm:h-[28rem]"
            >
              {/* Envelope body */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl overflow-hidden">
                {/* Envelope texture pattern */}
                <div className="absolute inset-0 opacity-30" 
                     style={{
                       backgroundImage: 'url(/images/linen-texture.jpg)',
                       backgroundSize: 'cover'
                     }} 
                />
                
                {/* Envelope fold effect - triangular overlays */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-amber-200/40 to-amber-300/40 transform -skew-y-6 origin-top" />
                <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-bl from-amber-200/40 to-amber-300/40 transform skew-y-6 origin-top" />
                
                {/* Center fold line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-300/60 transform -translate-y-1/2" />
              </div>

              {/* Wax Seal */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full cursor-pointer"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #c9a227, #8b6914)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)',
                  animation: 'pulse-glow 3s ease-in-out infinite'
                }}
              >
                {/* Couple's initials */}
                <div 
                  className="w-full h-full flex items-center justify-center font-script text-3xl sm:text-4xl text-amber-100"
                  style={{
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 1px rgba(255,255,255,0.2)',
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: '600'
                  }}
                >
                  {getInitials()}
                </div>
              </motion.div>

              {/* Tap to open prompt */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  fontWeight: '300',
                  textTransform: 'uppercase',
                  color: '#8b7355',
                  animation: 'fade-pulse 2s ease-in-out infinite'
                }}
              >
                {language === 'ar' ? 'اضغط للفتح' : 'TOUCHEZ LE SCEAU POUR OUVRIR'}
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
