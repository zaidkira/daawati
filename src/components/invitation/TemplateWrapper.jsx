import React from 'react'
import { invitationTemplates } from '../../data/invitationData'

const TemplateWrapper = ({ children, theme }) => {
  const currentTheme = invitationTemplates[theme] || invitationTemplates['islamic-royal']
  
  const themeStyles = {
    '--primary-color': currentTheme.colors.primary,
    '--secondary-color': currentTheme.colors.secondary,
    '--accent-color': currentTheme.colors.accent,
    '--text-color': currentTheme.colors.text,
    '--font-arabic': currentTheme.fonts.arabic,
    '--font-french': currentTheme.fonts.french
  }

  return (
    <div style={themeStyles} className="invitation-template">
      {children}
    </div>
  )
}

export default TemplateWrapper
