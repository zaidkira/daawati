import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Copy, Download, Check, QrCode } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const Sharing = ({ invitationSlug }) => {
  const { t, direction } = useLanguage()
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const invitationUrl = `${window.location.origin}/i/${invitationSlug}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const shareViaWhatsApp = () => {
    const message = `دعوة لحضور زفافنا! 🎉\n\n${invitationUrl}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const shareViaFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(invitationUrl)}`
    window.open(facebookUrl, '_blank')
  }

  const downloadQRCode = () => {
    // Using a simple QR code API
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(invitationUrl)}`
    
    // Create a temporary link to download
    const link = document.createElement('a')
    link.href = qrApiUrl
    link.download = `wedding-invitation-qr.png`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
          dir={direction}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-amber-500/20 mb-8">
            <Share2 className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">
              {t('share')}
            </span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-amber-100 mb-4">
              شارك الدعوة
          </h2>
        </motion.div>

        {/* Sharing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md border border-amber-500/20 rounded-3xl p-8"
          dir={direction}
        >
          {/* URL Display */}
          <div className="mb-6">
            <label className="block text-amber-200 font-medium mb-3">
              رابط الدعوة
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={invitationUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-white/5 border border-amber-500/20 rounded-xl text-amber-100 text-sm focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={copyToClipboard}
                className="px-4 py-3 rounded-xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all flex items-center gap-2 text-amber-200"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    تم النسخ
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    {t('copyLink')}
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Social Sharing */}
          <div className="mb-6">
            <label className="block text-amber-200 font-medium mb-3">
              مشاركة عبر
            </label>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={shareViaWhatsApp}
                className="flex-1 px-4 py-3 rounded-xl bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 transition-all flex items-center justify-center gap-2 text-green-200"
              >
                <span className="text-xl">📱</span>
                واتساب
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={shareViaFacebook}
                className="flex-1 px-4 py-3 rounded-xl bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 transition-all flex items-center justify-center gap-2 text-blue-200"
              >
                <span className="text-xl">📘</span>
                فيسبوك
              </motion.button>
            </div>
          </div>

          {/* QR Code */}
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowQR(!showQR)}
              className="w-full px-4 py-3 rounded-xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all flex items-center justify-center gap-2 text-amber-200"
            >
              <QrCode className="w-5 h-5" />
              {showQR ? 'إخفاء رمز QR' : 'عرض رمز QR'}
            </motion.button>

            <AnimatePresence>
              {showQR && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-6 bg-white/5 rounded-xl text-center"
                >
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(invitationUrl)}`}
                    alt="QR Code"
                    className="mx-auto mb-4 rounded-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={downloadQRCode}
                    className="px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all flex items-center gap-2 text-amber-200 mx-auto"
                  >
                    <Download className="w-4 h-4" />
                    {t('downloadQR')}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/2 right-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default Sharing
