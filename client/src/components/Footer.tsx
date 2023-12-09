import { useContext } from 'react'
import { DarkModeContext } from '../pages/Home'

function Footer(): JSX.Element {
  const darkmode = useContext(DarkModeContext)
  const bgFooter = darkmode.isDarkMode
    ? 'bg-darkModeElements text-dmTextAndLmElements'
    : 'bg-dmTextAndLmElements'
  return (
    <section className={`${bgFooter} h-20 flex items-center justify-center`}>
      <b> Created by OSHIN (Ganjanapas Phothong) & her friend</b>
    </section>
  )
}

export default Footer
