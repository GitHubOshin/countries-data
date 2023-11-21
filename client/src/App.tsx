import Header from './components/Header'
import Footer from './components/Footer'
import { createContext, useState } from 'react'
import SearchingAndFlags from './components/SearchingAndFlags'

interface DarkModeInterface {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const defaultDarkMode: DarkModeInterface = {
  isDarkMode: false,
  toggleDarkMode: () => {}
}

export const DarkModeContext = createContext<DarkModeInterface>(defaultDarkMode)

function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="h-full min-w-[375px]">
      <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        <Header />
        <SearchingAndFlags />
        <Footer />
      </DarkModeContext.Provider>
    </div>
  )
}

export default App
