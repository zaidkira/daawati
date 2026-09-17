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
              <Share2 className="w-10 h-10 text-luxury-gold-400" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-champagne mb-4">
            {t('share')}
          </h2>

          <p className="text-luxury-champagne/80 mb-8">
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
              className="input-luxury flex-1 text-center"
            />
            <button
              onClick={copyToClipboard}
              className="p-3 rounded-xl bg-luxury-gold-400/20 text-luxury-gold-400 hover:bg-luxury-gold-400/30 transition-all"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={shareViaWhatsApp}
              className="luxury-button flex items-center justify-center gap-2"
            >
              <span className="text-xl">💬</span>
              WhatsApp
            </button>
            
            <button
              onClick={() => setShowQR(!showQR)}
              className="luxury-button-outline flex items-center justify-center gap-2"
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
                className="inline-block p-6 bg-white rounded-2xl"
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
