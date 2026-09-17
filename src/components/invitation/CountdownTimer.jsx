import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const CountdownTimer = ({ targetDate }) => {
  const { t, direction } = useLanguage()
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

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
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
    <section className="relative py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
          dir={direction}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-amber-500/20 mb-6">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">
              العد التنازلي
            </span>
          </div>
        </motion.div>

        {/* Timer Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8" dir={direction}>
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6 md:p-8 text-center">
                {/* Number */}
                <div className="text-4xl md:text-6xl font-bold text-amber-200 mb-2 font-mono">
                  {String(unit.value).padStart(2, '0')}
                </div>
                
                {/* Label */}
                <div className="text-sm md:text-base text-amber-400/80 font-medium">
                  {unit.label}
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-amber-500/50 rounded-tr" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-amber-500/50 rounded-bl" />
            </motion.div>
          ))}
        </div>

        {/* Decorative Line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
        />
      </div>
    </section>
  )
}

export default CountdownTimer
