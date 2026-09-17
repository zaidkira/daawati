# Digital Wedding Invitation Features

This document describes the complete digital wedding invitation system implemented for the Dawati platform.

## Features Implemented

### 1. Envelope Opening Animation
- **Component**: `src/components/invitation/EnvelopeOpening.jsx`
- **Features**:
  - Animated wax seal with sparkle effects
  - "Tap to open" interaction prompt
  - Opening chime sound effect (`opening-chime.mp3`)
  - Background music (`music.mp3`) with mute/unmute toggle
  - Smooth transition to main content

### 2. Bilingual Support (AR/FR)
- **Component**: `src/contexts/LanguageContext.jsx`
- **Features**:
  - Language toggle button (Arabic ↔ French)
  - Automatic text direction switching (`dir="rtl"` ↔ `dir="ltr"`)
  - Translation system for all UI text
  - Font pairing: Arabic fonts (Amiri, Cairo, Tajawal) + French/English fonts (Playfair Display)

### 3. Hero Section
- **Component**: `src/components/invitation/InvitationHero.jsx`
- **Features**:
  - Couple's names with elegant typography
  - Wedding date display
  - Tagline/message
  - CTA button to scroll to RSVP section
  - Background video or image support

### 4. Countdown Timer
- **Component**: `src/components/invitation/CountdownTimer.jsx`
- **Features**:
  - Live countdown (days/hours/minutes/seconds)
  - Updates every second
  - Shows "00" placeholders before JS loads
  - Responsive design

### 5. Our Story Timeline
- **Component**: `src/components/invitation/OurStory.jsx`
- **Features**:
  - Vertical timeline with year markers
  - Editable story entries (year, title, description)
  - Alternating left/right layout
  - Smooth animations

### 6. Event Program
- **Component**: `src/components/invitation/EventProgram.jsx`
- **Features**:
  - Timeline of wedding day events
  - Time + event name format
  - Data-driven (configurable per invitation)
  - Visual connector lines

### 7. Venue Details
- **Component**: `src/components/invitation/VenueDetails.jsx`
- **Features**:
  - Venue name and address
  - "Open in Maps" button (Google Maps integration)
  - "Add to Calendar" button (generates .ics file)
  - Google Calendar integration
  - Embedded map preview

### 8. Dress Code Section
- **Component**: `src/components/invitation/DressCode.jsx`
- **Features**:
  - Visual dress code guide
  - Support for elegant, formal, and casual attire
  - Icons and descriptions
  - Customizable per invitation

### 9. RSVP Form
- **Component**: `src/components/invitation/RSVPForm.jsx`
- **Features**:
  - Guest name (required)
  - Attending status (Yes/No)
  - Dynamic companion addition
  - Optional message
  - Adults-only toggle option
  - Form validation
  - Supabase integration
  - Confirmation state after submission

### 10. Host Dashboard
- **Component**: `src/components/dashboard/HostDashboard.jsx`
- **Features**:
  - Auth-protected dashboard for couples
  - RSVP statistics (total, confirmed, declined, total guests)
  - Filterable RSVP list
  - Export to CSV functionality
  - Real-time data from Supabase

### 11. FAQ Section
- **Component**: `src/components/invitation/InvitationFAQ.jsx`
- **Features**:
  - Accordion-style FAQ
  - Configurable questions and answers
  - Smooth expand/collapse animations
  - Data-driven content

### 12. Template System
- **Component**: `src/components/invitation/TemplateWrapper.jsx`
- **Data**: `src/data/invitationData.js`
- **Features**:
  - Multiple visual themes (Islamic Royal, Sage Garden, Floral Romantic, Azura Beach)
  - Theme-specific color schemes
  - Theme-specific font pairings
  - Easy template switching
  - Data structure separated from presentation

### 13. Sharing Features
- **Component**: `src/components/invitation/Sharing.jsx`
- **Features**:
  - Unique URL structure (`/i/:slug`)
  - Copy link to clipboard
  - WhatsApp sharing
  - Facebook sharing
  - QR code generation
  - QR code download

### 14. Routing System
- **File**: `src/App.jsx`
- **Features**:
  - React Router integration
  - Landing page route (`/`)
  - Invitation page route (`/i/:slug`)
  - Dashboard route (`/dashboard/:invitationId`)

## Database Schema

### Invitations Table
```sql
CREATE TABLE invitations (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  theme TEXT DEFAULT 'islamic-royal',
  wedding_date TIMESTAMP WITH TIME ZONE NOT NULL,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### RSVPs Table
```sql
CREATE TABLE rsvps (
  id UUID PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id),
  guest_name TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  companions_count INTEGER DEFAULT 0,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## File Structure

```
src/
├── components/
│   ├── invitation/
│   │   ├── EnvelopeOpening.jsx
│   │   ├── InvitationHero.jsx
│   │   ├── CountdownTimer.jsx
│   │   ├── OurStory.jsx
│   │   ├── EventProgram.jsx
│   │   ├── VenueDetails.jsx
│   │   ├── DressCode.jsx
│   │   ├── RSVPForm.jsx
│   │   ├── InvitationFAQ.jsx
│   │   ├── Sharing.jsx
│   │   └── TemplateWrapper.jsx
│   └── dashboard/
│       └── HostDashboard.jsx
├── contexts/
│   ├── AuthContext.jsx
│   └── LanguageContext.jsx
├── data/
│   └── invitationData.js
├── pages/
│   └── InvitationPage.jsx
├── utils/
│   └── calendarUtils.js
└── App.jsx
```

## Setup Instructions

### 1. Database Setup
Run the migration file in Supabase:
```bash
# Apply the migration in Supabase SQL editor
# File: supabase/migrations/001_create_invitations_tables.sql
```

### 2. Environment Variables
Ensure your `.env` file contains:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Audio Files
Place audio files in the `public/` directory:
```
public/
├── audio/
│   ├── opening-chime.mp3
│   └── music.mp3
├── images/
│   └── wedding-bg.jpg
└── videos/
    └── wedding-bg.mp3
```

### 4. Create an Invitation
Use the Supabase dashboard or API to create an invitation:
```javascript
const { data, error } = await supabase
  .from('invitations')
  .insert([
    {
      slug: 'amine-fatima',
      user_id: user.id,
      theme: 'islamic-royal',
      wedding_date: '2025-06-15T18:00:00',
      data: {
        coupleNames: { groom: 'أحمد', bride: 'فاطمة' },
        venue: { name: 'قصر الأمير', address: 'الجزائر العاصمة', googleMapsUrl: '...' },
        // ... other data
      }
    }
  ])
```

## Usage

### Access an Invitation
Navigate to: `https://yourdomain.com/i/invitation-slug`

### Access Dashboard
Navigate to: `https://yourdomain.com/dashboard/invitation-id`

### Language Toggle
Click the language icon in the top corner to switch between Arabic and French.

### RSVP Process
1. Guest opens invitation link
2. Envelope animation plays
3. Guest scrolls to RSVP section
4. Fills out form (name, attending status, companions, message)
5. Submission saved to Supabase
6. Confirmation message displayed

### Dashboard Access
1. Log in with user account
2. Navigate to dashboard URL
3. View RSVP statistics
4. Export data to CSV

## Customization

### Add New Templates
Edit `src/data/invitationData.js`:
```javascript
export const invitationTemplates = {
  'your-template': {
    name: 'Your Template Name',
    colors: {
      primary: '#hex',
      secondary: '#hex',
      accent: '#hex',
      text: '#hex'
    },
    fonts: {
      arabic: 'Font Name, serif',
      french: 'Font Name, serif'
    }
  }
}
```

### Add Translations
Edit `src/contexts/LanguageContext.jsx`:
```javascript
export const translations = {
  ar: { /* new keys */ },
  fr: { /* new keys */ }
}
```

## Technical Details

### Technologies Used
- React 18
- React Router DOM
- Framer Motion (animations)
- Supabase (backend/auth)
- Tailwind CSS (styling)
- Lucide React (icons)

### Performance Optimizations
- Lazy loading of audio files
- Optimized animations with Framer Motion
- Efficient state management
- Responsive design

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive
- Touch-friendly interactions

## Future Enhancements

Potential improvements:
- Real-time RSVP updates via subscriptions
- Photo gallery integration
- Guest book feature
- Multiple language support (beyond AR/FR)
- Advanced template customization
- Analytics dashboard
- Email notifications for RSVPs
- SMS integration for reminders

## Support

For issues or questions:
1. Check the component documentation
2. Review the data structure in `invitationData.js`
3. Verify Supabase configuration
4. Test with sample data first
