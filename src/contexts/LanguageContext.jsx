import React, { createContext, useContext, useState, useEffect } from 'react'

const translations = {
  ar: {
    // Opening
    tapToOpen: 'اضغط للفتح',
    // Hero
    weddingOf: 'زفاف',
    and: 'و',
    foreverStart: 'بداية للأبد',
    confirmPresence: 'تأكيد الحضور',
    // Countdown
    days: 'أيام',
    hours: 'ساعات',
    minutes: 'دقائق',
    seconds: 'ثواني',
    // Story
    ourStory: 'قصتنا',
    // Program
    program: 'برنامج الحفل',
    // Venue
    venue: 'مكان الحفل',
    openInMaps: 'فتح في الخرائط',
    addToCalendar: 'إضافة للتقويم',
    // Dress Code
    dressCode: 'قانون اللباس',
    // RSVP
    rsvp: 'تأكيد الحضور',
    name: 'الاسم',
    attending: 'الحضور',
    yes: 'نعم',
    no: 'لا',
    companions: 'مرافقين',
    addCompanion: 'إضافة مرافق',
    message: 'رسالة',
    submit: 'إرسال',
    adultsOnly: 'الحفلة للكبار فقط',
    thankYou: 'شكراً لتأكيد حضورك!',
    // Dashboard
    dashboard: 'لوحة التحكم',
    totalConfirmed: 'إجمالي المؤكدين',
    totalDeclined: 'إجمالي المعتذرين',
    totalPending: 'إجمالي المعلقين',
    exportCSV: 'تصدير CSV',
    // FAQ
    faq: 'الأسئلة الشائعة',
    // Sharing
    share: 'مشاركة',
    qrCode: 'رمز QR',
  },
  fr: {
    // Opening
    tapToOpen: 'Appuyez pour ouvrir',
    // Hero
    weddingOf: 'Mariage de',
    and: 'et',
    foreverStart: 'Le début de notre pour toujours',
    confirmPresence: 'Confirmer votre présence',
    // Countdown
    days: 'Jours',
    hours: 'Heures',
    minutes: 'Minutes',
    seconds: 'Secondes',
    // Story
    ourStory: 'Notre Histoire',
    // Program
    program: 'Programme',
    // Venue
    venue: 'Lieu',
    openInMaps: 'Ouvrir dans Maps',
    addToCalendar: 'Ajouter au calendrier',
    // Dress Code
    dressCode: 'Code vestimentaire',
    // RSVP
    rsvp: 'RSVP',
    name: 'Nom',
    attending: 'Présence',
    yes: 'Oui',
    no: 'Non',
    companions: 'Accompagnants',
    addCompanion: 'Ajouter un accompagnant',
    message: 'Message',
    submit: 'Envoyer',
    adultsOnly: 'Soirée réservée aux adultes',
    thankYou: 'Merci pour votre confirmation!',
    // Dashboard
    dashboard: 'Tableau de bord',
    totalConfirmed: 'Total confirmés',
    totalDeclined: 'Total déclinés',
    totalPending: 'Total en attente',
    exportCSV: 'Exporter CSV',
    // FAQ
    faq: 'FAQ',
    // Sharing
    share: 'Partager',
    qrCode: 'Code QR',
  },
  en: {
    // Opening
    tapToOpen: 'Tap to open',
    // Hero
    weddingOf: 'Wedding of',
    and: 'and',
    foreverStart: 'The beginning of our forever',
    confirmPresence: 'Confirm your presence',
    // Countdown
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    // Story
    ourStory: 'Our Story',
    // Program
    program: 'Program',
    // Venue
    venue: 'Venue',
    openInMaps: 'Open in Maps',
    addToCalendar: 'Add to Calendar',
    // Dress Code
    dressCode: 'Dress Code',
    // RSVP
    rsvp: 'RSVP',
    name: 'Name',
    attending: 'Attending',
    yes: 'Yes',
    no: 'No',
    companions: 'Companions',
    addCompanion: 'Add companion',
    message: 'Message',
    submit: 'Submit',
    adultsOnly: 'Adults only',
    thankYou: 'Thank you for your confirmation!',
    // Dashboard
    dashboard: 'Dashboard',
    totalConfirmed: 'Total Confirmed',
    totalDeclined: 'Total Declined',
    totalPending: 'Total Pending',
    exportCSV: 'Export CSV',
    // FAQ
    faq: 'FAQ',
    // Sharing
    share: 'Share',
    qrCode: 'QR Code',
  }
}

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar')
  const [direction, setDirection] = useState('rtl')

  const changeLanguage = (lang) => {
    setLanguage(lang)
    setDirection(lang === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const t = (key) => translations[language][key] || key

  return (
    <LanguageContext.Provider value={{ language, direction, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
