import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Globe, Music, Volume1 } from 'lucide-react'
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
              width: '100vw',
              height: '100vh',
              backgroundImage: 'url(/images/envelope-texture.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#f5f0e8'
            }}
          >
            {/* Subtle overlay for texture depth */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom right, rgba(232, 237, 228, 0.3), rgba(253, 251, 247, 0.3))',
                boxShadow: 'inset 0 0 100px rgba(0,0,0,0.1)'
              }}
            />
            
            {/* Language switcher - top right */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full flex items-center gap-2 transition-all hover:scale-105"
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
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ar' ? 'العربية' : 'Français'}</span>
            </motion.button>

            {/* Music toggle - bottom right */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={toggleMute}
              className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(201, 162, 39, 0.3)',
                color: '#c9a227',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)'
              }}
            >
              {isMuted ? <Volume1 className="w-5 h-5" /> : <Music className="w-5 h-5" />}
            </motion.button>
            
            {/* Envelope */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Envelope body with texture */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(/images/envelope-texture.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              {/* Envelope fold effect - triangular overlays with texture */}
              <div 
                className="absolute top-0 left-0 w-full h-1/2 transform -skew-y-6 origin-top"
                style={{
                  backgroundImage: 'url(/images/envelope-texture.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.85)'
                }}
              />
              <div 
                className="absolute top-0 right-0 w-full h-1/2 transform skew-y-6 origin-top"
                style={{
                  backgroundImage: 'url(/images/envelope-texture.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.85)'
                }}
              />
              
              {/* Center fold line */}
              <div 
                className="absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(139, 115, 85, 0.3), transparent)'
                }}
              />

              {/* Wax Seal */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="relative w-32 h-32 sm:w-40 sm:h-40 cursor-pointer"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #c17a52, #a85c3a 60%, #7a3f26 100%)',
                  borderRadius: '48% 52% 50% 49%',
                  boxShadow: `
                    inset 0 -8px 15px rgba(0,0,0,0.4),
                    inset 0 8px 15px rgba(255,255,255,0.25),
                    0 10px 25px rgba(0,0,0,0.35)
                  `,
                  animation: 'pulse-glow 3s ease-in-out infinite'
                }}
              >
                {/* Concentric ring detail */}
                <div 
                  className="absolute inset-0 rounded-full border-2"
                  style={{
                    borderColor: 'rgba(0,0,0,0.15)',
                    top: '8px',
                    left: '8px',
                    right: '8px',
                    bottom: '8px'
                  }}
                />
                
                {/* Couple's initials */}
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: '600',
                    fontSize: '2.5rem',
                    color: '#a85c3a',
                    textShadow: '1px 1px 0px rgba(255,255,255,0.3), -1px -1px 2px rgba(0,0,0,0.5)'
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
                className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: '0.875rem',
                  letterSpacing: '0.3em',
                  fontWeight: '300',
                  textTransform: 'uppercase',
                  color: '#a85c3a',
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
          className={`fixed top-4 ${language === 'ar' ? 'left-4' : 'right-4'} z-40 p-3 rounded-full transition-all`}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(201, 162, 39, 0.3)',
            color: '#c9a227'
          }}
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>
      )}
    </>
  )
}

export default OpeningAnimation
