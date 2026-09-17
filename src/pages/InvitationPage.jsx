import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import EnvelopeOpening from '../components/invitation/EnvelopeOpening'
import InvitationHero from '../components/invitation/InvitationHero'
import CountdownTimer from '../components/invitation/CountdownTimer'
import OurStory from '../components/invitation/OurStory'
import EventProgram from '../components/invitation/EventProgram'
import VenueDetails from '../components/invitation/VenueDetails'
import DressCode from '../components/invitation/DressCode'
import RSVPForm from '../components/invitation/RSVPForm'
import InvitationFAQ from '../components/invitation/InvitationFAQ'
import Sharing from '../components/invitation/Sharing'
import TemplateWrapper from '../components/invitation/TemplateWrapper'
import { LanguageProvider } from '../contexts/LanguageContext'
import { defaultInvitationData } from '../data/invitationData'
import { supabase } from '../lib/supabase'

const InvitationPage = () => {
  const { slug } = useParams()
  const [invitationData, setInvitationData] = useState(defaultInvitationData)
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchInvitationData()
  }, [slug])

  const fetchInvitationData = async () => {
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) throw error

      if (data) {
        setInvitationData({
          ...defaultInvitationData,
          ...data.data,
          coupleNames: data.data?.coupleNames || defaultInvitationData.coupleNames,
          weddingDate: data.wedding_date || defaultInvitationData.weddingDate,
          venue: data.data?.venue || defaultInvitationData.venue,
          story: data.data?.story || defaultInvitationData.story,
          program: data.data?.program || defaultInvitationData.program,
          dressCode: data.data?.dressCode || defaultInvitationData.dressCode,
          rsvpSettings: data.data?.rsvpSettings || defaultInvitationData.rsvpSettings,
          faq: data.data?.faq || defaultInvitationData.faq,
          theme: data.theme || defaultInvitationData.theme,
          media: data.data?.media || defaultInvitationData.media
        })
      }
    } catch (error) {
      console.error('Error fetching invitation:', error)
      setError('Invitation not found')
    } finally {
      setLoading(false)
    }
  }

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById('rsvp')
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-amber-400">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-amber-400 text-center">
          <h1 className="text-2xl font-bold mb-4">Invitation Not Found</h1>
          <p>The invitation you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-900">
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
            >
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
            <RSVPForm
              invitationId={slug}
              rsvpSettings={invitationData.rsvpSettings}
            />

            {/* FAQ */}
            <InvitationFAQ faq={invitationData.faq} />

            {/* Sharing */}
            <Sharing invitationSlug={slug} />
          </motion.div>
          </TemplateWrapper>
        )}
      </div>
    </LanguageProvider>
  )
}

export default InvitationPage
