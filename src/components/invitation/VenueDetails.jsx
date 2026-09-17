import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ExternalLink, Navigation } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { downloadICS, generateGoogleCalendarLink } from '../../utils/calendarUtils'

const VenueDetails = ({ venue, weddingDate, coupleNames }) => {
  const { t, direction } = useLanguage()

  const handleAddToCalendar = () => {
    const eventData = {
      title: `زفاف ${coupleNames.groom} و ${coupleNames.bride}`,
      startDate: weddingDate,
      endDate: new Date(new Date(weddingDate).getTime() + 6 * 60 * 60 * 1000), // 6 hours later
      location: venue.name,
      description: `دعوة لحضور زفاف ${coupleNames.groom} و ${coupleNames.bride}`
    }
    
    downloadICS(eventData)
  }

  const handleGoogleCalendar = () => {
    const eventData = {
      title: `زفاف ${coupleNames.groom} و ${coupleNames.bride}`,
      startDate: weddingDate,
      endDate: new Date(new Date(weddingDate).getTime() + 6 * 60 * 60 * 1000),
      location: venue.name,
      description: `دعوة لحضور زفاف ${coupleNames.groom} و ${coupleNames.bride}`
    }
    
    window.open(generateGoogleCalendarLink(eventData), '_blank')
  }

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
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">
              {t('venue')}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-amber-100 mb-4">
            مكان الحفل
          </h2>
        </motion.div>

        {/* Venue Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md border border-amber-500/20 rounded-3xl p-8 md:p-12"
          dir={direction}
        >
          {/* Venue Name */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-serif font-bold text-amber-100 mb-4">
              {venue.name}
            </h3>
            <p className="text-amber-200/80 text-lg">
              {venue.address}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Open in Maps */}
            <motion.a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all"
            >
              <MapPin className="w-5 h-5 text-amber-400" />
              <span className="text-amber-100 font-medium">
                {t('openInMaps')}
              </span>
              <ExternalLink className="w-4 h-4 text-amber-400/60" />
            </motion.a>

            {/* Add to Calendar (ICS) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCalendar}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all"
            >
              <Calendar className="w-5 h-5 text-amber-400" />
              <span className="text-amber-100 font-medium">
                {t('addToCalendar')}
              </span>
            </motion.button>

            {/* Google Calendar */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleCalendar}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 transition-all"
            >
              <Navigation className="w-5 h-5 text-amber-400" />
              <span className="text-amber-100 font-medium">
                Google Calendar
              </span>
            </motion.button>
          </div>

          {/* Map Preview */}
          {venue.coordinates && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 rounded-2xl overflow-hidden border border-amber-500/20"
            >
              <iframe
                src={`https://www.google.com/maps?q=${venue.coordinates.lat},${venue.coordinates.lng}&z=15&output=embed`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue Location"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default VenueDetails
