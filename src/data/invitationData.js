export const invitationTemplates = {
  royal: {
    id: 'royal',
    name: 'Islamic Royal',
    colors: {
      primary: '#7b1e2b',
      secondary: '#c6a15b',
      background: '#0a0a0a',
      text: '#f7f3e9'
    },
    fonts: {
      arabic: 'Amiri',
      latin: 'Playfair Display'
    }
  },
  beach: {
    id: 'beach',
    name: 'Azura Beach',
    colors: {
      primary: '#1e90ff',
      secondary: '#87ceeb',
      background: '#f0f8ff',
      text: '#2c3e50'
    },
    fonts: {
      arabic: 'Cairo',
      latin: 'Montserrat'
    }
  },
  garden: {
    id: 'garden',
    name: 'Garden Romance',
    colors: {
      primary: '#228b22',
      secondary: '#90ee90',
      background: '#f5fffa',
      text: '#2f4f4f'
    },
    fonts: {
      arabic: 'Tajawal',
      latin: 'Georgia'
    }
  }
}

export const sampleInvitation = {
  id: 'amine-fatima',
  template: 'royal',
  couple: {
    groomName: 'أمين',
    brideName: 'فاطمة',
    groomNameFr: 'Amine',
    brideNameFr: 'Fatima'
  },
  date: '2026-12-15T18:00:00',
  venue: {
    name: 'قصر السعادة',
    nameFr: 'Palais du Bonheur',
    address: 'الجزائر العاصمة',
    addressFr: 'Alger Centre',
    coordinates: { lat: 36.7538, lng: 3.0588 },
    mapsUrl: 'https://maps.app.goo.gl/example'
  },
  story: [
    { year: '2020', title: 'أول لقاء', titleFr: 'Première rencontre', text: 'التقينا لأول مرة في جامعة الجزائر', textFr: 'Nous nous sommes rencontrés à l\'université d\'Alger' },
    { year: '2021', title: 'الشوفة', titleFr: 'La demande', text: 'زيارة عائلية رسمية للخطوبة', textFr: 'Visite familiale officielle pour les fiançailles' },
    { year: '2022', title: 'الخطوبة', titleFr: 'Fiançailles', text: 'احتفلنا بخطبتنا في presence العائلة', textFr: 'Nous avons célébré nos fiançailles en présence de la famille' },
    { year: '2023', title: 'الفاتحة', titleFr: 'Le contrat', text: 'كتابة الفاتحة وربط الميثاق', textFr: 'Signature du contrat et lien du mariage' },
    { year: '∞', title: 'للأبد', titleFr: 'Pour toujours', text: 'بداية حياتنا المشتركة', textFr: 'Le début de notre vie commune' }
  ],
  program: [
    { time: '17:00', title: 'وصول الضيوف', titleFr: 'Arrivée des invités' },
    { time: '18:00', title: 'الطقوس والفاتحة', titleFr: 'Cérémonie et Fatiha' },
    { time: '19:30', title: 'العشاء', titleFr: 'Dîner' },
    { time: '21:00', title: 'قطع الكعكة', titleFr: 'Coupe du gâteau' },
    { time: '22:00', title: 'ختام الحفل', titleFr: 'Clôture' }
  ],
  dressCode: {
    text: 'Tenue élégante de soirée',
    textAr: 'لباس رسمي أنيق'
  },
  faq: [
    { question: 'هل الحفلة للكبار فقط؟', questionFr: 'Est-ce que la soirée est réservée aux adultes ?', answer: 'نعم، الحفلة مخصصة للكبار فقط', answerFr: 'Oui, la soirée est réservée aux adultes' },
    { question: 'هل يمكنني إضافة مرافق؟', questionFr: 'Puis-je amener un accompagnant ?', answer: 'يمكنك إضافة مرافق واحد كحد أقصى', answerFr: 'Vous pouvez amener un accompagnant maximum' },
    { question: 'ما هو قانون اللباس؟', questionFr: 'Quel est le code vestimentaire ?', answer: 'لباس رسمي أنيق', answerFr: 'Tenue élégante de soirée' }
  ],
  settings: {
    adultsOnly: true,
    languagePair: 'ar-fr',
    backgroundMusic: true
  }
}
