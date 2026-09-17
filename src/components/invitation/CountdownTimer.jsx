import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

const CountdownTimer = ({ targetDate }) => {
  const { t } = useLanguage()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date()
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const timeUnits = [
    { value: timeLeft.days, label: t('days') },
    { value: timeLeft.hours, label: t('hours') },
    { value: timeLeft.minutes, label: t('minutes') },
    { value: timeLeft.seconds, label: t('seconds') }
  ]

  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#fdfbf7' }}>
      <div className="max-w-4xl mx-auto">
        {/* Section header with decorative divider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12" style={{ backgroundColor: 'rgba(201, 162, 39, 0.4)' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#c9a227' }} />
            <div className="h-px w-12" style={{ backgroundColor: 'rgba(201, 162, 39, 0.4)' }} />
          </div>
          <h2 
            className="text-xl tracking-widest uppercase font-light"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#8b7355',
              letterSpacing: '0.3em'
            }}
          >
            {t('days')} {t('hours')} {t('minutes')} {t('seconds')}
          </h2>
        </motion.div>

        {/* Card-style countdown boxes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
        >
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative p-6 sm:p-8 text-center rounded-2xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(201, 162, 39, 0.15)'
              }}
            >
              {/* Number */}
              <div 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: '#4a4a4a'
                }}
              >
                {String(unit.value).padStart(2, '0')}
              </div>
              
              {/* Label */}
              <div 
                className="text-xs sm:text-sm tracking-widest uppercase font-light"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  color: '#8b7355',
                  letterSpacing: '0.2em'
                }}
              >
                {unit.label}
              </div>

              {/* Decorative corner */}
              <div 
                className="absolute top-2 right-2 w-1 h-1 rounded-full"
                style={{ backgroundColor: '#c9a227' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CountdownTimer
