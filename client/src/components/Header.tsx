import { useContext } from 'react'
import { DarkModeContext } from '../pages/Home'
import { Link } from 'react-router-dom'

function Header(): JSX.Element {
  const darkmode = useContext(DarkModeContext)
  return (
    <section
      className={`mobile:px-5 desktop:px-20 h-[61px] flex justify-between items-center ${
        darkmode.isDarkMode === true
          ? 'bg-darkModeElements text-white'
          : 'bg-dmTextAndLmElements'
      }`}
    >
      <Link to="/">
        <h1 className="font-extrabold">Where in the world?</h1>
      </Link>

      <button
        className="flex gap-2 items-center"
        onClick={darkmode.toggleDarkMode}
      >
        {/* <img
          className="w-4"
          alt={
            darkmode.isDarkMode
              ? "Switch to 'Light Mode'"
              : "Switch to 'Dark Mode'"
          }
          src={
            darkmode.isDarkMode
              ? '../../public/images/icons/mood-dm.svg'
              : '../../public/images/icons/moon-outline.svg'
          }
        /> */}
        Dark Mode
      </button>
    </section>
  )
}

export default Header
