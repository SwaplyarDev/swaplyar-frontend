'use client'

import { motion } from 'framer-motion'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface IconAcordeonProps {
  /** Si el acordeón está expandido */
  expanded?: boolean
  /** Tamaño total del círculo (px) */
  size?: number
  /** Color del fondo */
  bgColor?: string
  /** Color del icono */
  iconColor?: string,
    /** Size del icono */
  sizeIcon?:number,
}

export const IconAcordeon = ({
  expanded = false,
  size = 40,
  bgColor = '#F7F5F0', 
  iconColor = '#002984',
  sizeIcon=18
}: IconAcordeonProps) => {
  return (
    <motion.div
      animate={{ rotate: expanded ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
       className={`
        
        bg-[#F7F5F0] dark:bg-[#4a4a4a] 
    
      `}
    >
      <ExpandMoreIcon className='dark:text-[#252526]' sx={{ color: iconColor, fontSize: sizeIcon }} />
    </motion.div>
  )
}
