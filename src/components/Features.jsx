import React from 'react'
import { motion } from 'framer-motion'
import { Users, MessageSquare, Download, Shield, Zap } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'تأكيد الحضور RSVP',
      description: 'كل ضيف يؤكد حضوره من داخل الدعوة بضغطة واحدة',
      color: 'from-luxury-gold-500 to-luxury-gold-400'
    },
    {
      icon: Users,
      title: 'نظام المرافقين',
      description: 'تحكّم في عدد المرافقين المسموح، مع تمييز الكبار والأطفال',
      color: 'from-luxury-burgundy-500 to-luxury-burgundy-400'
    },
    {
      icon: Download,
      title: 'تصدير القائمة',
      description: 'حمّل قائمة الضيوف كاملة بصيغة CSV للتنظيم مع القاعة',
      color: 'from-luxury-gold-400 to-luxury-burgundy-400'
    },
    {
      icon: Shield,
      title: 'لوحة متابعة خاصة',
      description: 'تابعوا تأكيدات الحضور والتفاصيل في الوقت الفعلي',
      color: 'from-luxury-burgundy-400 to-luxury-gold-400'
    }
  ]

  const stats = [
    { value: '86', label: 'مؤكد', color: 'text-luxury-gold-400' },
    { value: '24', label: 'قيد الانتظار', color: 'text-luxury-burgundy-400' },
    { value: '8', label: 'معتذر', color: 'text-luxury-champagne/50' }
  ]

  return (
    <section id="features" className="relative py-24 px-4 sm:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal to-luxury-obsidian" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-luxury-gold-500/10 rounded-full blur-3xl animate-float" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4">
            تابعا ضيوفكما لحظة بلحظة
          </h2>
          <p className="text-lg text-luxury-champagne/70 max-w-2xl mx-auto">
            تأكيدات الحضور، عدد المرافقين والأطفال، وقائمة كاملة قابلة للتصدير — كل ذلك في الوقت الفعلي
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 rounded-3xl"
            dir="rtl"
          >
            <h3 className="text-xl font-bold text-luxury-champagne mb-6">
              إحصائيات الضيوف
            </h3>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="p-4 rounded-xl bg-white/5 text-center">
                  <p className={`text-3xl font-serif font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-luxury-champagne/70 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Guest List Preview */}
            <div className="p-6 rounded-xl bg-white/5">
              <p className="text-xs font-bold text-luxury-champagne/60 uppercase tracking-wider mb-4">
                آخر التأكيدات
              </p>
              {[
                { name: 'Sara & Walid', guests: '2', status: 'مؤكد' },
                { name: 'عائلة بن يوسف', guests: '4', status: 'مؤكد' },
                { name: 'Nadia B.', guests: '1', status: 'معتذر' }
              ].map((guest, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-3 ${
                    index < 2 ? 'mb-3' : ''
                  }`}
                  dir="rtl"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-luxury-gold-500 to-luxury-gold-400 flex items-center justify-center text-luxury-obsidian font-bold text-xs">
                    {guest.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-luxury-champagne text-sm">
                      {guest.name}
                    </p>
                    <p className="text-xs text-luxury-champagne/60">
                      {guest.guests} ضيوف
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      guest.status === 'مؤكد'
                        ? 'bg-luxury-gold-400/20 text-luxury-gold-400'
                        : 'bg-luxury-champagne/10 text-luxury-champagne/50'
                    }`}
                  >
                    {guest.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features List */}
          <div className="space-y-6" dir="rtl">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ x: 8, transition: { duration: 0.3 } }}
                className="flex gap-5 p-6 glass-card rounded-2xl cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}
                >
                  <feature.icon className="w-7 h-7 text-luxury-obsidian" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-luxury-champagne mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-luxury-champagne/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
