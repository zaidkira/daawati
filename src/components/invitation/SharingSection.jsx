import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Copy, Check, QrCode } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useLanguage } from '../../contexts/LanguageContext'

const SharingSection = ({ invitationSlug }) => {
  const { t, language } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const shareUrl = `${window.location.origin}/i/${invitationSlug}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const shareViaWhatsApp = () => {
    const text = language === 'ar' 
      ? `مدعوون لحفل زفافنا! 🎉\n${shareUrl}`
      : `Vous êtes invités à notre mariage! 🎉\n${shareUrl}`
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#fdfbf7' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl text-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(201, 162, 39, 0.15)'
          }}
        >
          <div className="flex justify-center mb-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(201, 162, 39, 0.15)'
              }}
            >
              <Share2 
                className="w-10 h-10"
                style={{ color: '#c9a227' }}
              />
            </div>
          </div>

          <h2 
            className="text-3xl sm:text-4xl font-serif font-bold mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#4a4a4a'
            }}
          >
            {t('share')}
          </h2>

          <p 
            className="text-lg mb-8"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#6b6b6b'
            }}
          >
            {language === 'ar' 
              ? 'شارك الدعوة مع أصدقائك وعائلتك' 
              : 'Share the invitation with your friends and family'}
          </p>

          {/* URL Display */}
          <div className="flex items-center gap-3 max-w-lg mx-auto mb-6">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-6 py-4 rounded-xl text-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(201, 162, 39, 0.3)',
                color: '#4a4a4a',
                fontFamily: '"Plus Jakarta Sans", sans-serif'
              }}
            />
            <button
              onClick={copyToClipboard}
              className="p-3 rounded-xl transition-all"
              style={{
                backgroundColor: 'rgba(201, 162, 39, 0.15)',
                border: '1px solid rgba(201, 162, 39, 0.3)',
                color: '#c9a227'
              }}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={shareViaWhatsApp}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #c9a227 0%, #d6af59 50%, #c9a227 100%)',
                color: '#1a1a1a',
                fontFamily: '"Playfair Display", serif',
                boxShadow: '0 4px 20px rgba(201, 162, 39, 0.3)'
              }}
            >
              <span className="text-xl">💬</span>
              WhatsApp
            </button>
            
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              style={{
                border: '2px solid #c9a227',
                color: '#c9a227',
                fontFamily: '"Playfair Display", serif',
                backgroundColor: 'transparent'
              }}
            >
              <QrCode className="w-5 h-5" />
              {t('qrCode')}
            </button>
          </div>

          {/* QR Code */}
          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="inline-block p-6 rounded-2xl"
                style={{
                  backgroundColor: 'white',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
              >
                <QRCodeSVG
                  value={shareUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                  fgColor="#1a1a1a"
                  bgColor="#ffffff"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default SharingSection
