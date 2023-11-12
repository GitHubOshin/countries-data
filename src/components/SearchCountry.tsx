import { useContext, useState } from 'react'
import { DarkModeContext } from '../App'

const regions = [
  { id: 'All', country: 'All' },
  { id: '1-Africa', country: 'Africa' },
  { id: '2-America', country: 'America' },
  { id: '3-Asia', country: 'Asia' },
  { id: '4-Europe', country: 'Europe' },
  { id: '4-Oceania', country: 'Oceania' }
]

function SearchCountry(): JSX.Element {
  const darkmode = useContext(DarkModeContext)
  const [dropdown, setDropdown] = useState(false)

  const [activeRegion, setActiveRegion] = useState('Filter by Region')

  const isDark = darkmode.isDarkMode
    ? 'bg-darkModeElements text-dmTextAndLmElements'
    : 'bg-dmTextAndLmElements'

  const isDropdwn = dropdown ? 'block' : 'hidden'

  function handleOnClickRegion(regionId: string) {
    regions.map((region) => {
      if (regionId === 'All') {
        setActiveRegion('Filter by Region')
        setDropdown(false)
      } else if (regionId === region.id) {
        setActiveRegion(region.country)
        setDropdown(false)
      }
    })
  }

  return (
    <section className="flex justify-between">
      <input
        className={`rounded px-[32px] py-4  desktop:min-w-[480px] ${isDark}`}
        placeholder="Search for country..."
      />

      <div
        className={`hover:cursor-pointer relative w-[200px] flex items-center rounded  ${isDark}`}
      >
        <button
          className=" w-full px-[25px] flex justify-between items-center"
          onClick={() => {
            setDropdown(!dropdown)
          }}
        >
          <p>{activeRegion}</p>
          <p>ˇ</p>
        </button>
        <ul
          className={`absolute top-[60px] py-6 w-full rounded ${isDark} ${isDropdwn}`}
        >
          {regions.map((region) => {
            return (
              <li
                onClick={() => handleOnClickRegion(region.id)}
                key={region.id}
                className="hover:bg-slate-300 hover:text-darkModeElements hover:cursor-pointer h-7 flex items-center pl-6"
              >
                {region.country}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default SearchCountry
