import React from 'react'
import { motion } from 'framer-motion'

const DecorativeDivider = ({ icon = '💍', className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`flex items-center justify-center gap-4 ${className}`}
    >
      <div 
        className="h-px flex-1"
        style={{ 
          background: 'linear-gradient(to right, transparent, #c9a227, transparent)',
          opacity: 0.4
        }}
      />
      <div 
        className="text-2xl"
        style={{ 
          filter: 'drop-shadow(0 0 4px rgba(201, 162, 39, 0.3))'
        }}
      >
        {icon}
      </div>
      <div 
        className="h-px flex-1"
        style={{ 
          background: 'linear-gradient(to right, transparent, #c9a227, transparent)',
          opacity: 0.4
        }}
      />
    </motion.div>
  )
}

export default DecorativeDivider
