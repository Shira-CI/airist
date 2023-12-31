import { useEffect, useRef } from 'react'
import classes from './btn-square-color.module.css'
// import classes from '../../../assets/styles/cmps/order/_OrderModalBtn.scss'

export function ReserveButton({ children, ...props }) {
  const buttonRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (ev) => {
      const rect = buttonRef.current.getBoundingClientRect()
      const x =
        ((ev.clientX - rect.left) * 100) / buttonRef.current.clientWidth
      const y =
        ((ev.clientY - rect.top) * 100) / buttonRef.current.clientHeight

      buttonRef.current.style.setProperty('--mouse-x', x)
      buttonRef.current.style.setProperty('--mouse-y', y)
    }
    buttonRef.current.addEventListener('mousemove', handleMouseMove)
    const btn = buttonRef.current

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove)
    }
  }, [buttonRef])

  return (
    // <button ref={buttonRef} {...props} className={classes.btnSquareColor}>
    <button ref={buttonRef} {...props} className={`${classes.btnSquareColor} demo-login-btn`}>
      {children}
    </button>
  )
}
