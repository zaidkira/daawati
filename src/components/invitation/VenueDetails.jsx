import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ExternalLink } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const VenueDetails = ({ venue, date }) => {
  const { t, language } = useLanguage()

  const generateCalendarLink = () => {
    const eventDate = new Date(date)
    const startDate = eventDate.toISOString().replace(/-|:|\.\d\d\d/g, '')
    const endDate = new Date(eventDate.getTime() + 5 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '')
    
    const title = language === 'ar' 
      ? `زفاف ${venue.name}` 
      : `Mariage - ${venue.nameFr}`
    
    const details = language === 'ar'
      ? `المكان: ${venue.name} - ${venue.address}`
      : `Lieu: ${venue.nameFr} - ${venue.addressFr}`
    
    const location = venue.address
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`
  }

  const generateICS = () => {
    const eventDate = new Date(date)
    const endDate = new Date(eventDate.getTime() + 5 * 60 * 60 * 1000)
    
    const formatDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, '')
    }
    
    const title = language === 'ar' 
      ? `زفاف ${venue.name}` 
      : `Mariage - ${venue.nameFr}`
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(eventDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${language === 'ar' ? venue.name : venue.nameFr}`,
      `LOCATION:${language === 'ar' ? venue.address : venue.addressFr}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')
    
    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'wedding-invitation.ics'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-luxury-champagne mb-4">
            {t('venue')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-luxury-gold-400 to-luxury-gold-600 mx-auto rounded-full" />
        </motion.div>

        {/* Venue Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 sm:p-12 rounded-3xl text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-luxury-gold-400/20 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-luxury-gold-400" />
            </div>
          </div>

          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-luxury-champagne mb-3">
            {language === 'ar' ? venue.name : venue.nameFr}
          </h3>
          
          <p className="text-lg text-luxury-champagne/80 mb-8">
            {language === 'ar' ? venue.address : venue.addressFr}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-button flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              {t('openInMaps')}
            </a>
            
            <button
              onClick={generateICS}
              className="luxury-button-outline flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              {t('addToCalendar')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default VenueDetails
