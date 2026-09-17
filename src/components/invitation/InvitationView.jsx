import React, { useState } from 'react'
import { motion } from 'framer-motion'
import OpeningAnimation from './OpeningAnimation'
import HeroSection from './HeroSection'
import CountdownTimer from './CountdownTimer'
import StoryTimeline from './StoryTimeline'
import EventProgram from './EventProgram'
import VenueDetails from './VenueDetails'
import DressCode from './DressCode'
import RSVPForm from './RSVPForm'
import FAQSection from './FAQSection'
import SharingSection from './SharingSection'
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
    couple: {
      groomName: data?.groomName || 'أحمد',
      brideName: data?.brideName || 'فاطمة',
      groomNameFr: data?.groomNameFr || 'Ahmed',
      brideNameFr: data?.brideNameFr || 'Fatima'
    },
    date: data?.weddingDate || '2025-06-15T18:00:00',
    venue: data?.venue || {
      name: 'قصر الأمير',
      nameFr: 'Palace Prince',
      address: 'الجزائر العاصمة، حيدرة',
      addressFr: 'Alger Centre, Hydra',
      googleMapsUrl: 'https://maps.app.goo.gl/example',
      coordinates: { lat: 36.7538, lng: 3.0588 }
    },
    story: data?.story || [
      { year: '2020', title: 'أول لقاء', titleFr: 'First meeting', text: 'تعارفنا في صدفة جميرة', textFr: 'We met by chance' },
      { year: '2021', title: 'الشوفة', titleFr: 'Proposal', text: 'زيارة عائلية رسمية', textFr: 'Official family visit' },
      { year: '2022', title: 'الخطوبة', titleFr: 'Engagement', text: 'احتفلنا بخطوبتنا', textFr: 'We celebrated our engagement' },
      { year: '2023', title: 'الفاتحة', titleFr: 'Contract', text: 'عقدنا القران', textFr: 'We signed the contract' },
      { year: '∞', title: 'إلى الأبد', titleFr: 'Forever', text: 'معاً للأبد', textFr: 'Together forever' }
    ],
    program: data?.program || [
      { time: '18:00', title: 'وصول الضيوف', titleFr: 'Guest arrival' },
      { time: '18:30', title: 'حفل الزفاف والفاتحة', titleFr: 'Wedding ceremony' },
      { time: '20:00', title: 'العشاء', titleFr: 'Dinner' },
      { time: '21:30', title: 'تقطيع الكعكة', titleFr: 'Cake cutting' },
      { time: '23:00', title: 'ختام الحفل', titleFr: 'Closing' }
    ],
    dressCode: data?.dressCode || { text: 'ملابس أنيقة', textAr: 'ملابس أنيقة' },
    settings: data?.rsvpSettings || { adultsOnly: false, languagePair: 'ar-fr' },
    faq: data?.faq || [
      { question: 'كم يستغرق الوصول؟', questionFr: 'How long does it take?', answer: '15 دقيقة', answerFr: '15 minutes' },
      { question: 'هل هناك مواقف؟', questionFr: 'Is there parking?', answer: 'نعم، مواقف مجانية', answerFr: 'Yes, free parking' }
    ],
    template: theme?.id || 'royal'
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
        <OpeningAnimation
          onOpen={() => setIsEnvelopeOpen(true)}
          invitation={invitationData}
        />

        {/* Main Content (hidden until envelope opens) */}
        {isEnvelopeOpen && (
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
            <HeroSection
              invitation={invitationData}
              onScrollToRSVP={scrollToRSVP}
            />

            {/* Countdown Timer */}
            <CountdownTimer targetDate={invitationData.weddingDate} />

            {/* Our Story */}
            <StoryTimeline story={invitationData.story} />

            {/* Event Program */}
            <EventProgram program={invitationData.program} />

            {/* Venue Details */}
            <VenueDetails
              venue={invitationData.venue}
              date={invitationData.weddingDate}
            />

            {/* Dress Code */}
            <DressCode dressCode={invitationData.dressCode} />

            {/* RSVP Form */}
            {!isDemo && (
              <div id="rsvp">
                <RSVPForm
                  invitationId={data?.invitationId || 'demo'}
                  adultsOnly={invitationData.rsvpSettings?.adultsOnly}
                />
              </div>
            )}

            {/* FAQ */}
            <FAQSection faq={invitationData.faq} />

            {/* Sharing */}
            {!isDemo && (
              <SharingSection invitationSlug={data?.invitationId || 'demo'} />
            )}
          </motion.div>
        )}
      </div>
    </LanguageProvider>
  )
}

export default InvitationView
