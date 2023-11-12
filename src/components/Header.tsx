import { useContext } from 'react'
import { DarkModeContext } from '../App'

function Header(): JSX.Element {
  const darkmode = useContext(DarkModeContext)
  return (
    <section
      className={`px-16 h-[61px] flex justify-between items-center ${
        darkmode.isDarkMode === true
          ? 'bg-darkModeElements text-white'
          : 'bg-dmTextAndLmElements'
      }`}
    >
      <h1 className="font-extrabold">Where in the world?</h1>

      <button
        className="flex gap-2 items-center"
        onClick={darkmode.toggleDarkMode}
      >
        <img
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
        />
        Dark Mode
      </button>
    </section>
  )
}

export default Header
