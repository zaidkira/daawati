import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LanguageProvider } from '../contexts/LanguageContext'
import OpeningAnimation from '../components/invitation/OpeningAnimation'
import HeroSection from '../components/invitation/HeroSection'
import CountdownTimer from '../components/invitation/CountdownTimer'
import StoryTimeline from '../components/invitation/StoryTimeline'
import EventProgram from '../components/invitation/EventProgram'
import VenueDetails from '../components/invitation/VenueDetails'
import DressCode from '../components/invitation/DressCode'
import RSVPForm from '../components/invitation/RSVPForm'
import FAQSection from '../components/invitation/FAQSection'
import SharingSection from '../components/invitation/SharingSection'
import LanguageSwitcher from '../components/invitation/LanguageSwitcher'
import DecorativeDivider from '../components/invitation/DecorativeDivider'
import HostDashboard from '../components/invitation/HostDashboard'
import { sampleInvitation } from '../data/invitationData'

const InvitationPageContent = ({ invitationSlug }) => {
  const [isOpened, setIsOpened] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const rsvpRef = useRef(null)

  const invitation = sampleInvitation // In production, fetch from Supabase based on slug

  const scrollToRSVP = () => {
    rsvpRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleOpen = () => {
    setIsOpened(true)
  }

  // Check if user is authorized for dashboard (simplified - in production use proper auth)
  const isAuthorized = false // Will be true for authenticated hosts

  if (showDashboard) {
    return (
      <HostDashboard 
        invitationId={invitation.id} 
        isAuthorized={isAuthorized}
      />
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdfbf7' }}>
      <OpeningAnimation onOpen={handleOpen} invitation={invitation} />
      
      <AnimatePresence mode="wait">
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <LanguageSwitcher languagePair={invitation.settings.languagePair} />
            
            <HeroSection 
              invitation={invitation} 
              onScrollToRSVP={scrollToRSVP}
            />
            
            <DecorativeDivider icon="💍" className="py-8" />
            
            <CountdownTimer targetDate={invitation.date} />
            
            <DecorativeDivider icon="❤️" className="py-8" />
            
            <StoryTimeline story={invitation.story} />
            
            <DecorativeDivider icon="📅" className="py-8" />
            
            <EventProgram program={invitation.program} />
            
            <DecorativeDivider icon="📍" className="py-8" />
            
            <VenueDetails venue={invitation.venue} date={invitation.date} />
            
            <DecorativeDivider icon="👗" className="py-8" />
            
            <DressCode dressCode={invitation.dressCode} />
            
            <DecorativeDivider icon="✉️" className="py-8" />
            
            <div ref={rsvpRef}>
              <RSVPForm 
                invitationId={invitation.id}
                adultsOnly={invitation.settings.adultsOnly}
              />
            </div>
            
            <DecorativeDivider icon="❓" className="py-8" />
            
            <FAQSection faq={invitation.faq} />
            
            <DecorativeDivider icon="🔗" className="py-8" />
            
            <SharingSection invitationSlug={invitationSlug} />
            
            {/* Hidden dashboard trigger for demo */}
            <div className="fixed bottom-4 right-4 z-50">
              <button
                onClick={() => setShowDashboard(true)}
                className="p-2 rounded-full bg-white/10 text-white/50 hover:text-white/80 transition-all text-xs"
              >
                Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const InvitationPage = ({ invitationSlug }) => {
  return (
    <LanguageProvider>
      <InvitationPageContent invitationSlug={invitationSlug} />
    </LanguageProvider>
  )
}

export default InvitationPage
