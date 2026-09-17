export const generateICS = (eventData) => {
  const { title, startDate, endDate, location, description } = eventData
  
  // Format dates for ICS
  const formatDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '')
  }
  
  const start = formatDate(new Date(startDate))
  const end = formatDate(new Date(endDate))
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Dawati Wedding Invitations//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')
  
  return icsContent
}

export const downloadICS = (eventData, filename = 'wedding-invitation.ics') => {
  const icsContent = generateICS(eventData)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const generateGoogleCalendarLink = (eventData) => {
  const { title, startDate, endDate, location, description } = eventData
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${new Date(startDate).toISOString().replace(/-|:|\.\d\d\d/g, '')}/${new Date(endDate).toISOString().replace(/-|:|\.\d\d\d/g, '')}`,
    details: description,
    location: location
  })
  
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
