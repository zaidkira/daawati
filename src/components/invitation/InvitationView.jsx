import React, { useState } from 'react'
import { motion } from 'framer-motion'
import EnvelopeOpening from './EnvelopeOpening'
import InvitationHero from './InvitationHero'
import CountdownTimer from './CountdownTimer'
import OurStory from './OurStory'
import EventProgram from './EventProgram'
import VenueDetails from './VenueDetails'
import DressCode from './DressCode'
import RSVPForm from './RSVPForm'
import InvitationFAQ from './InvitationFAQ'
import Sharing from './Sharing'
import TemplateWrapper from './TemplateWrapper'
import { LanguageProvider } from '../../contexts/LanguageContext'

const InvitationView = ({ data, theme, isDemo = false }) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp')
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Normalize data structure
  const invitationData = {
    coupleNames: {
      groom: data?.groomName || 'أحمد',
      bride: data?.brideName || 'فاطمة'
    },
    weddingDate: data?.weddingDate || '2025-06-15T18:00:00',
    tagline: data?.tagline || 'بداية جديدة لحياة جميلة',
    venue: data?.venue || {
      name: 'قصر الأمير',
      address: 'الجزائر العاصمة، حيدرة',
      googleMapsUrl: 'https://maps.app.goo.gl/example',
      coordinates: { lat: 36.7538, lng: 3.0588 }
    },
    story: data?.story || [
      { year: '2020', title: 'أول لقاء', description: 'تعارفنا في صدفة جميرة' },
      { year: '2021', title: 'الشوفة', description: 'زيارة عائلية رسمية' },
      { year: '2022', title: 'الخطوبة', description: 'احتفلنا بخطوبتنا' },
      { year: '2023', title: 'الفاتحة', description: 'عقدنا القران' },
      { year: '∞', title: 'إلى الأبد', description: 'معاً للأبد' }
    ],
    program: data?.program || [
      { time: '18:00', title: 'وصول الضيوف' },
      { time: '18:30', title: 'حفل الزفاف والفاتحة' },
      { time: '20:00', title: 'العشاء' },
      { time: '21:30', title: 'تقطيع الكعكة' },
      { time: '23:00', title: 'ختام الحفل' }
    ],
    dressCode: data?.dressCode || { type: 'elegant', description: 'ملابس أنيقة' },
    rsvpSettings: data?.rsvpSettings || { adultsOnly: false, maxCompanions: 5 },
    faq: data?.faq || [
      { question: 'كم يستغرق الوصول؟', answer: '15 دقيقة' },
      { question: 'هل هناك مواقف؟', answer: 'نعم، مواقف مجانية' }
    ],
    theme: theme?.id || 'islamic-royal',
    media: data?.media || {
      backgroundImage: '/images/wedding-bg.jpg',
      backgroundVideo: '/videos/wedding-bg.mp4',
      openingChime: '/audio/opening-chime.mp3',
      backgroundMusic: '/audio/music.mp3'
    }
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-900">
        {/* Demo Banner */}
        {isDemo && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 px-4 text-center">
            <span className="text-sm font-medium">🎨 هذه معاينة تجريبية للقالب</span>
          </div>
        )}

        {/* Envelope Opening Animation */}
        <EnvelopeOpening
          onOpen={() => setIsEnvelopeOpen(true)}
          invitationData={invitationData}
        />

        {/* Main Content (hidden until envelope opens) */}
        {isEnvelopeOpen && (
          <TemplateWrapper theme={invitationData.theme}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className={isDemo ? 'pt-8' : ''}
            >
              {/* Demo CTA Button */}
              {isDemo && (
                <motion.a
                  href={`/?template=${theme?.id}#order`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed bottom-6 right-6 z-40 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  اطلب هذا القالب 💍
                </motion.a>
              )}

              {/* Hero Section */}
              <InvitationHero
                invitationData={invitationData}
                onRSVPClick={scrollToRSVP}
              />

              {/* Countdown Timer */}
              <CountdownTimer targetDate={invitationData.weddingDate} />

              {/* Our Story */}
              <OurStory story={invitationData.story} />

              {/* Event Program */}
              <EventProgram program={invitationData.program} />

              {/* Venue Details */}
              <VenueDetails
                venue={invitationData.venue}
                weddingDate={invitationData.weddingDate}
                coupleNames={invitationData.coupleNames}
              />

              {/* Dress Code */}
              <DressCode dressCode={invitationData.dressCode} />

              {/* RSVP Form */}
              {!isDemo && (
                <RSVPForm
                  invitationId={data?.invitationId || 'demo'}
                  rsvpSettings={invitationData.rsvpSettings}
                />
              )}

              {/* FAQ */}
              <InvitationFAQ faq={invitationData.faq} />

              {/* Sharing */}
              {!isDemo && (
                <Sharing invitationSlug={data?.invitationId || 'demo'} />
              )}
            </motion.div>
          </TemplateWrapper>
        )}
      </div>
    </LanguageProvider>
  )
}

export default InvitationView
