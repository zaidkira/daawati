import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext({})

export const translations = {
  ar: {
    direction: 'rtl',
    font: 'Cairo, sans-serif',
    tapToOpen: 'اضغط للفتح',
    beginningOfForever: 'بداية للأبد',
    confirmAttendance: 'تأكيد الحضور',
    days: 'أيام',
    hours: 'ساعات',
    minutes: 'دقائق',
    seconds: 'ثواني',
    ourStory: 'قصتنا',
    eventProgram: 'برنامج الحفل',
    venue: 'مكان الحفل',
    openInMaps: 'فتح في الخرائط',
    addToCalendar: 'إضافة للتقويم',
    dressCode: 'قيمة الملابس',
    rsvp: 'تأكيد الحضور',
    name: 'الاسم',
    attending: 'هل ستحضر؟',
    yes: 'نعم',
    no: 'لا',
    companions: 'المرافقين',
    addCompanion: 'إضافة مرافق',
    message: 'رسالة',
    submit: 'إرسال',
    adultsOnly: 'حفلة للكبار فقط',
    thankYou: 'شكراً لتأكيد حضورك!',
    faq: 'الأسئلة الشائعة',
    share: 'مشاركة',
    copyLink: 'نسخ الرابط',
    downloadQR: 'تحميل رمز QR',
    guestArrival: 'وصول الضيوف',
    ceremony: 'حفل الزفاف والفاتحة',
    dinner: 'العشاء',
    cake: 'تقطيع الكعكة',
    closing: 'ختام الحفل',
    elegantAttire: 'ملابس أنيقة',
    formalAttire: 'ملابس رسمية',
    casualAttire: 'ملابس عادية',
    firstMeeting: 'أول لقاء',
    familyVisit: 'الشوفة',
    engagement: 'الخطوبة',
    contract: 'الفاتحة',
    forever: 'إلى الأبد ∞'
  },
  fr: {
    direction: 'ltr',
    font: 'Playfair Display, serif',
    tapToOpen: 'Appuyez pour ouvrir',
    beginningOfForever: 'Le début de notre pour toujours',
    confirmAttendance: 'Confirmer votre présence',
    days: 'Jours',
    hours: 'Heures',
    minutes: 'Minutes',
    seconds: 'Secondes',
    ourStory: 'Notre histoire',
    eventProgram: 'Programme de la journée',
    venue: 'Lieu',
    openInMaps: 'Ouvrir dans Maps',
    addToCalendar: 'Ajouter au calendrier',
    dressCode: 'Code vestimentaire',
    rsvp: 'RSVP',
    name: 'Nom',
    attending: 'Présence?',
    yes: 'Oui',
    no: 'Non',
    companions: 'Accompagnants',
    addCompanion: 'Ajouter un accompagnant',
    message: 'Message',
    submit: 'Envoyer',
    adultsOnly: 'Soirée réservée aux adultes',
    thankYou: 'Merci pour votre confirmation!',
    faq: 'FAQ',
    share: 'Partager',
    copyLink: 'Copier le lien',
    downloadQR: 'Télécharger QR',
    guestArrival: 'Arrivée des invités',
    ceremony: 'Cérémonie & Fatiha',
    dinner: 'Dîner',
    cake: 'Coupe du gâteau',
    closing: 'Clôture',
    elegantAttire: 'Tenue élégante',
    formalAttire: 'Tenue formelle',
    casualAttire: 'Tenue décontractée',
    firstMeeting: 'Première rencontre',
    familyVisit: 'La visite familiale',
    engagement: 'Fiançailles',
    contract: 'Fatiha',
    forever: 'Pour toujours ∞'
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar')
  const [direction, setDirection] = useState('rtl')

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'fr' : 'ar'
    setLanguage(newLang)
    setDirection(translations[newLang].direction)
    document.documentElement.dir = translations[newLang].direction
    document.documentElement.lang = newLang
  }

  const t = (key) => translations[language][key] || key

  const value = {
    language,
    direction,
    toggleLanguage,
    t,
    font: translations[language].font
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
