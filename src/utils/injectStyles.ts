import styles from '../styles.css?inline'

const STYLE_ID = 'react-simple-notify-styles'

export const ensureContainerStyles = () => {
  if (typeof document === 'undefined') {
    return
  }

  if (document.getElementById(STYLE_ID)) {
    return
  }

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = styles
  document.head.appendChild(style)
}
