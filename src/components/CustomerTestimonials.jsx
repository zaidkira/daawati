import React from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin } from 'lucide-react'

const CustomerTestimonials = () => {
  const testimonials = [
    { 
      name: 'Sara & Mohamed', 
      location: 'الجزائر العاصمة', 
      text: 'الدعوة كانت أجمل من توقعاتنا، وكل الضيوف سألونا عنها. متابعة تأكيدات الحضور سهّلت علينا التنظيم كثيرًا.',
      rating: 5
    },
    { 
      name: 'Amina & Yacine', 
      location: 'وهران', 
      text: 'عائلتنا في فرنسا فتحت الدعوة بالفرنسية وعائلتنا هنا بالعربية — التفصيل هذا وحده يستحق. شكرًا على الاحترافية.',
      rating: 5
    },
    { 
      name: 'Rym & Karim', 
      location: 'قسنطينة', 
      text: 'فتح الظرف مع الموسيقى أبهر الجميع. طلبنا تعديل الألوان وتمّ في نفس اليوم.',
      rating: 5
    },
    { 
      name: 'Ines & Amine', 
      location: 'عنابة', 
      text: 'طلبنا الدعوة قبل أسبوع فقط من الحفل ووصلتنا خلال يومين. الرد سريع والتعامل راقٍ جدًا.',
      rating: 5
    },
    { 
      name: 'Lina & Sofiane', 
      location: 'سطيف', 
      text: 'رمز QR على البطاقات المطبوعة كان فكرة عبقرية — كبار العائلة أخذوا البطاقة والشباب فتحوا الرابط.',
      rating: 5
    },
    { 
      name: 'Meriem & Walid', 
      location: 'تلمسان', 
      text: 'لوحة متابعة الضيوف وفّرت علينا عشرات المكالمات. عرفنا العدد النهائي قبل القاعة بأيام.',
      rating: 5
    }
  ]

  return (
    <section className="relative py-24 px-4 sm:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-luxury-obsidian" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold-500/10 rounded-full blur-3xl animate-float" />

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
            أزواج سعداء اختاروا الدعوة الرقمية
          </h2>
          <p className="text-lg text-luxury-champagne/70 max-w-2xl mx-auto">
            انضم لأكثر من 100 زوج سعيد حول الجزائر
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-8 rounded-3xl"
              dir="rtl"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-luxury-gold-400 fill-luxury-gold-400" />
                ))}
              </div>

              {/* Testimonial */}
              <p className="text-luxury-champagne/90 text-base leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-luxury-gold-500 to-luxury-gold-400 flex items-center justify-center text-luxury-obsidian font-bold text-lg">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-luxury-champagne text-base">
                    {testimonial.name}
                  </p>
                  <div className="flex items-center gap-2 text-luxury-champagne/60 text-sm">
                    <MapPin className="w-4 h-4" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CustomerTestimonials
