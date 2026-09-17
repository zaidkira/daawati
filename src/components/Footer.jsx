import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Mail, ArrowUp, Share2, MessageCircle } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-16 px-4 sm:px-8 border-t border-luxury-gold-400/20 bg-luxury-obsidian">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-luxury-gold-400/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6" dir="rtl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-luxury-gold-500 to-luxury-gold-400 flex items-center justify-center text-luxury-obsidian text-2xl font-bold shadow-gold-glow">
                د
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-luxury-champagne">
                  Dawati
                </span>
                <span className="block text-sm text-luxury-gold-400 font-medium">
                  دعوتي
                </span>
              </div>
            </div>
            <p className="text-luxury-champagne/70 text-sm leading-relaxed max-w-xs">
              نصنع دعوات زفاف رقمية فاخرة تجمع بين الأصالة والتقنية، لتكون ذكرى جميلة ليومكم المميز.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Share2, href: '#' },
                { icon: MessageCircle, href: '#' },
                { icon: Mail, href: 'mailto:contact@dawati.dz' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-luxury-gold-400/50 transition-colors"
                >
                  <social.icon className="w-5 h-5 text-luxury-gold-400" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div dir="rtl">
            <h3 className="text-sm font-bold text-luxury-gold-400 uppercase tracking-wider mb-6">
              المنتج
            </h3>
            <ul className="space-y-4">
              {[
                { label: 'القوالب', href: '#templates' },
                { label: 'الأسعار', href: '#pricing' },
                { label: 'المميزات', href: '#features' }
              ].map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-luxury-champagne/80 hover:text-luxury-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div dir="rtl">
            <h3 className="text-sm font-bold text-luxury-gold-400 uppercase tracking-wider mb-6">
              الشركة
            </h3>
            <ul className="space-y-4">
              {[
                { label: 'الأسئلة الشائعة', href: '#faq' },
                { label: 'تواصل معنا', href: '#contact' },
                { label: 'contact@dawati.dz', href: 'mailto:contact@dawati.dz' }
              ].map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-luxury-champagne/80 hover:text-luxury-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div dir="rtl">
            <h3 className="text-sm font-bold text-luxury-gold-400 uppercase tracking-wider mb-6">
              النشرة البريدية
            </h3>
            <p className="text-luxury-champagne/70 text-sm mb-4 leading-relaxed">
              اشترك للحصول على آخر الأخبار والعروض
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-luxury-champagne placeholder-white/30 text-sm focus:outline-none focus:border-luxury-gold-400/50 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400 text-luxury-obsidian font-semibold text-sm shadow-gold-glow"
              >
                اشترك
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-luxury-champagne/60 text-sm flex items-center gap-2" dir="rtl">
            © 2026 Dawati — جميع الحقوق محفوظة
            <Heart className="w-4 h-4 text-luxury-burgundy-400 fill-luxury-burgundy-400" />
            صُنع بحب في الجزائر
          </p>
          
          <div className="flex gap-6 text-luxury-champagne/60 text-sm">
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="hover:text-luxury-gold-400 transition-colors"
            >
              سياسة الخصوصية
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="hover:text-luxury-gold-400 transition-colors"
            >
              الشروط والأحكام
            </motion.a>
          </div>
        </div>

        {/* Scroll to Top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -4, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 left-8 w-12 h-12 rounded-full bg-gradient-to-r from-luxury-gold-500 to-luxury-gold-400 text-luxury-obsidian flex items-center justify-center shadow-gold-glow z-50"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      </div>
    </footer>
  )
}

export default Footer
