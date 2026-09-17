import React from 'react'
import { motion } from 'framer-motion'
import { Shirt, Sparkles } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const DressCode = ({ dressCode }) => {
  const { t, direction } = useLanguage()

  const dressCodeTypes = {
    elegant: {
      icon: '👔',
      title: t('elegantAttire'),
      description: 'ملابس أنيقة ورسمية مناسبة للمناسبات الفخمة',
      color: 'from-amber-500 to-amber-600'
    },
    formal: {
      icon: '🤵',
      title: t('formalAttire'),
      description: 'ملابس رسمية كاملة - بدلة للرجال وفستان طويل للسيدات',
      color: 'from-purple-500 to-purple-600'
    },
    casual: {
      icon: '👕',
      title: t('casualAttire'),
      description: 'ملابس عادية ومريحة',
      color: 'from-blue-500 to-blue-600'
    }
  }

  const currentDressCode = dressCodeTypes[dressCode?.type] || dressCodeTypes.elegant

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          dir={direction}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-amber-500/20 mb-8">
            <Shirt className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">
              {t('dressCode')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-amber-100 mb-4">
            قيمة الملابس
          </h2>
        </motion.div>

        {/* Dress Code Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md border border-amber-500/20 rounded-3xl p-8 md:p-12 text-center"
          dir={direction}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 mb-6"
          >
            <span className="text-5xl">{currentDressCode.icon}</span>
          </motion.div>

          {/* Title */}
          <h3 className="text-3xl font-serif font-bold text-amber-100 mb-4">
            {currentDressCode.title}
          </h3>

          {/* Description */}
          <p className="text-lg text-amber-200/80 mb-8 max-w-2xl mx-auto">
            {dressCode?.description || currentDressCode.description}
          </p>

          {/* Visual Guide */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { icon: '👔', label: 'أناقة' },
              { icon: '👗', label: 'رسمي' },
              { icon: '👠', label: 'أحذية' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <span className="text-sm text-amber-300/80">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300/80">
              نقدر حرصكم على الظهور بمظهر لائق
            </span>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default DressCode
