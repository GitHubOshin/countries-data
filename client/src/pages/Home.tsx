import { createContext, useState } from 'react'
import Header from '../components/Header'
import SearchingAndFlags from '../components/SearchingAndFlags'
import Footer from '../components/Footer'

interface DarkModeInterface {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const defaultDarkMode: DarkModeInterface = {
  isDarkMode: false,
  toggleDarkMode: () => {}
}

export const DarkModeContext = createContext<DarkModeInterface>(defaultDarkMode)

function Home(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }
  return (
    <>
      <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        <Header />
        <SearchingAndFlags />
        <Footer />
      </DarkModeContext.Provider>
    </>
  )
}

export default Home
