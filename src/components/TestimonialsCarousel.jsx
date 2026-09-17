import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TestimonialsCarousel = () => {
  const testimonials = [
    {
      initials: 'S&M',
      names: 'Sara & Mohamed',
      rating: 5,
      text: 'الدعوة كانت أجمل من توقعاتنا، وكل الضيوف سألونا عنها. متابعة تأكيدات الحضور سهّلت علينا التنظيم كثيرًا.'
    },
    {
      initials: 'A&Y',
      names: 'Amina & Yacine',
      rating: 5,
      text: 'عائلتنا في فرنسا فتحت الدعوة بالفرنسية وعائلتنا هنا بالعربية — التفصيل هذا وحده يستحق. شكرًا على الاحترافية.'
    },
    {
      initials: 'R&K',
      names: 'Rym & Karim',
      rating: 5,
      text: 'فتح الظرف مع الموسيقى أبهر الجميع. طلبنا تعديل الألوان وتمّ في نفس اليوم.'
    },
    {
      initials: 'I&A',
      names: 'Ines & Amine',
      rating: 5,
      text: 'طلبنا الدعوة قبل أسبوع فقط من الحفل ووصلتنا خلال يومين. الرد سريع والتعامل راقٍ جدًا.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="relative py-24 px-4 sm:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-obsidian to-luxury-charcoal" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-luxury-gold-400/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-luxury-gold-400 fill-luxury-gold-400" />
            ))}
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4">
            ماذا يقول أزواجنا؟
          </h2>
          <p className="text-lg text-luxury-champagne/70 max-w-2xl mx-auto">
            انضم لأكثر من 100 زوج سعيد اختاروا الدعوة الرقمية
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-6 relative group cursor-pointer"
              dir="rtl"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-luxury-gold-400/20 group-hover:text-luxury-gold-400/40 transition-colors" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-luxury-gold-500 to-luxury-gold-400 flex items-center justify-center text-luxury-obsidian font-bold text-sm">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-luxury-champagne">{testimonial.names}</p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-luxury-gold-400 fill-luxury-gold-400" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-luxury-champagne/80 text-sm leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 p-8 glass-card rounded-3xl max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: '100+', label: 'حفل سعيد' },
              { value: '4.9', label: 'تقييم العملاء' },
              { value: '24h', label: 'تسليم سريع' }
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-serif font-bold text-luxury-gold-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-luxury-champagne/70 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsCarousel
