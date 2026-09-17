import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Sparkles } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const EnvelopeOpening = ({ onOpen, invitationData }) => {
  const { t, direction } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [audioInitialized, setAudioInitialized] = useState(false)
  
  const openingChimeRef = useRef(null)
  const backgroundMusicRef = useRef(null)

  const handleOpen = () => {
    setIsOpen(true)
    
    // Play opening chime
    if (openingChimeRef.current) {
      openingChimeRef.current.currentTime = 0
      openingChimeRef.current.play().catch(console.error)
    }
    
    // Start background music after chime
    setTimeout(() => {
      if (backgroundMusicRef.current && !isMuted) {
        backgroundMusicRef.current.currentTime = 0
        backgroundMusicRef.current.play().catch(console.error)
        setAudioInitialized(true)
      }
    }, 1000)
    
    // Trigger callback after animation
    setTimeout(() => {
      onOpen()
    }, 2000)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (backgroundMusicRef.current) {
      if (isMuted) {
        backgroundMusicRef.current.play().catch(console.error)
      } else {
        backgroundMusicRef.current.pause()
      }
    }
  }

  useEffect(() => {
    // Set initial direction
    document.documentElement.dir = direction
  }, [direction])

  return (
    <>
      {/* Audio Elements */}
      <audio
        ref={openingChimeRef}
        src={invitationData?.media?.openingChime || '/audio/opening-chime.mp3'}
        preload="auto"
      />
      <audio
        ref={backgroundMusicRef}
        src={invitationData?.media?.backgroundMusic || '/audio/music.mp3'}
        loop
        preload="auto"
      />

      {/* Music Toggle (Persistent) */}
      {audioInitialized && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`fixed top-4 ${direction === 'rtl' ? 'left-4' : 'right-4'} z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all`}
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
            dir={direction}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c99c2c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            {/* Envelope/Seal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 text-center"
            >
              {/* Wax Seal */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="relative cursor-pointer group"
              >
                {/* Seal Ring */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/30"
                />
                
                {/* Main Seal */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700 shadow-2xl flex items-center justify-center border-4 border-amber-400/50">
                  {/* Seal Design */}
                  <div className="text-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [-5, 5, -5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-6xl md:text-8xl mb-2"
                    >
                      💍
                    </motion.div>
                    <div className="text-amber-200 text-sm md:text-base font-medium">
                      {invitationData?.coupleNames?.groom} & {invitationData?.coupleNames?.bride}
                    </div>
                  </div>
                  
                  {/* Sparkle Effects */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-amber-300 rounded-full"
                      style={{
                        top: `${50 + 40 * Math.cos((i * 60) * Math.PI / 180)}%`,
                        left: `${50 + 40 * Math.sin((i * 60) * Math.PI / 180)}%`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>

                {/* Tap to Open Prompt */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-8"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm md:text-base font-medium">
                      {t('tapToOpen')}
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-amber-500/30 rounded-tl-2xl" />
            <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-amber-500/30 rounded-tr-2xl" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-amber-500/30 rounded-bl-2xl" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-amber-500/30 rounded-br-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EnvelopeOpening
