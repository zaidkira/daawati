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
    <section className="py-20 px-4" style={{ backgroundColor: '#fdfbf7' }}>
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl sm:text-5xl font-serif font-bold mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#4a4a4a'
            }}
          >
            {t('venue')}
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(to right, #c9a227, #d6af59, #c9a227)'
            }}
          />
        </motion.div>

        {/* Venue Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl text-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(201, 162, 39, 0.15)'
          }}
        >
          <div className="flex justify-center mb-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(201, 162, 39, 0.15)'
              }}
            >
              <MapPin 
                className="w-10 h-10"
                style={{ color: '#c9a227' }}
              />
            </div>
          </div>

          <h3 
            className="text-3xl sm:text-4xl font-serif font-bold mb-3"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#4a4a4a'
            }}
          >
            {language === 'ar' ? venue.name : venue.nameFr}
          </h3>
          
          <p 
            className="text-lg mb-8"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: '#6b6b6b'
            }}
          >
            {language === 'ar' ? venue.address : venue.addressFr}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #c9a227 0%, #d6af59 50%, #c9a227 100%)',
                color: '#1a1a1a',
                fontFamily: '"Playfair Display", serif',
                boxShadow: '0 4px 20px rgba(201, 162, 39, 0.3)'
              }}
            >
              <ExternalLink className="w-5 h-5" />
              {t('openInMaps')}
            </a>
            
            <button
              onClick={generateICS}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              style={{
                border: '2px solid #c9a227',
                color: '#c9a227',
                fontFamily: '"Playfair Display", serif',
                backgroundColor: 'transparent'
              }}
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
