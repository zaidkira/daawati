export const defaultInvitationData = {
  // Basic Information
  coupleNames: {
    groom: 'أحمد',
    bride: 'فاطمة'
  },
  weddingDate: '2025-06-15T18:00:00',
  tagline: 'بداية جديدة لحياة جميلة',
  
  // Venue
  venue: {
    name: 'قصر الأمير',
    address: 'الجزائر العاصمة، حيدرة',
    googleMapsUrl: 'https://maps.app.goo.gl/example',
    coordinates: {
      lat: 36.7538,
      lng: 3.0588
    }
  },
  
  // Story Timeline
  story: [
    {
      year: '2020',
      title: 'أول لقاء',
      description: 'تعارفنا في صدفة جميرة غيرت حياتنا'
    },
    {
      year: '2021',
      title: 'الشوفة',
      description: 'زيارة عائلية رسمية لطلب اليد'
    },
    {
      year: '2022',
      title: 'الخطوبة',
      description: 'احتفلنا بخطوبتنا وسط الأهل والأصدقاء'
    },
    {
      year: '2023',
      title: 'الفاتحة',
      description: 'عقدنا القران وبدأنا رحلة الحياة معاً'
    },
    {
      year: '∞',
      title: 'إلى الأبد',
      description: 'معاً نبني حياة مليئة بالحب والسعادة'
    }
  ],
  
  // Event Program
  program: [
    {
      time: '18:00',
      title: 'وصول الضيوف'
    },
    {
      time: '18:30',
      title: 'حفل الزفاف والفاتحة'
    },
    {
      time: '20:00',
      title: 'العشاء'
    },
    {
      time: '21:30',
      title: 'تقطيع الكعكة'
    },
    {
      time: '23:00',
      title: 'ختام الحفل'
    }
  ],
  
  // Dress Code
  dressCode: {
    type: 'elegant',
    description: 'ملابس أنيقة - رسمية'
  },
  
  // RSVP Settings
  rsvpSettings: {
    adultsOnly: false,
    maxCompanions: 5,
    requireMessage: false
  },
  
  // FAQ
  faq: [
    {
      question: 'كم يستغرق الوصول إلى المكان؟',
      answer: 'المكان يبعد 15 دقيقة عن وسط المدينة'
    },
    {
      question: 'هل هناك مواقف سيارات؟',
      answer: 'نعم، يتوفر مواقف سيارات مجانية للضيوف'
    },
    {
      question: 'هل يمكن إحضار الأطفال؟',
      answer: 'نعم، الأطفال مرحب بهم'
    }
  ],
  
  // Theme
  theme: 'islamic-royal',
  
  // Media
  media: {
    backgroundImage: '/images/wedding-bg.jpg',
    backgroundVideo: '/videos/wedding-bg.mp4',
    openingChime: '/audio/opening-chime.mp3',
    backgroundMusic: '/audio/music.mp3'
  }
}

export const invitationTemplates = {
  'islamic-royal': {
    name: 'Islamic Royal',
    colors: {
      primary: '#c99c2c',
      secondary: '#1a1a1a',
      accent: '#8b0000',
      text: '#f5e6d3'
    },
    fonts: {
      arabic: 'Amiri, serif',
      french: 'Playfair Display, serif'
    }
  },
  'sage-garden': {
    name: 'Sage Garden',
    colors: {
      primary: '#9CAF88',
      secondary: '#f5f5f5',
      accent: '#6B8E23',
      text: '#2d2d2d'
    },
    fonts: {
      arabic: 'Cairo, sans-serif',
      french: 'Lora, serif'
    }
  },
  'floral-romantic': {
    name: 'Floral Romantic',
    colors: {
      primary: '#FFB6C1',
      secondary: '#FFF0F5',
      accent: '#FF69B4',
      text: '#4a4a4a'
    },
    fonts: {
      arabic: 'Tajawal, sans-serif',
      french: 'Great Vibes, cursive'
    }
  },
  'azura-beach': {
    name: 'Azura Beach',
    colors: {
      primary: '#00CED1',
      secondary: '#F0F8FF',
      accent: '#20B2AA',
      text: '#2c3e50'
    },
    fonts: {
      arabic: 'Cairo, sans-serif',
      french: 'Montserrat, sans-serif'
    }
  }
}
