import { useContext } from 'react'
import { DarkModeContext } from '../App'
import SearchCountry from './SearchCountry'
import FlagList from './FlagList'

function SearchingAndFlags() {
  const darkmode = useContext(DarkModeContext)
  const isDark = darkmode.isDarkMode ? 'bg-darkModeBg' : 'bg-lightModeBg'
  return (
    <section className={`px-16 py-12 h-full flex flex-col ${isDark}`}>
      <SearchCountry />
      <FlagList />
    </section>
  )
}

export default SearchingAndFlags
