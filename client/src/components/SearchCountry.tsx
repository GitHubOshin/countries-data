import { useContext, useState, Dispatch, SetStateAction } from 'react'
import { DarkModeContext } from '../App'
import { TypeRegions } from '../interfaces/types'
import { Listbox } from '@headlessui/react'

interface SearchCountryProps {
  searchCountry: string | null
  onSetSearchCountry: (e: React.ChangeEvent<HTMLInputElement>) => void
  filterRegion: TypeRegions
  setFilterRegion: Dispatch<SetStateAction<TypeRegions>>
}
interface IOption<T = string> {
  value: string
  text: T
}
// regions ok mai ka?
const regions: IOption<TypeRegions>[] = [
  { value: 'All', text: 'All' },
  { value: '1-Africa', text: 'Africa' },
  { value: '2-America', text: 'America' },
  { value: '3-Asia', text: 'Asia' },
  { value: '4-Europe', text: 'Europe' },
  { value: '4-Oceania', text: 'Oceania' }
]

function SearchCountry(props: SearchCountryProps): JSX.Element {
  const {
    searchCountry,
    onSetSearchCountry: handleSetSearchCountry,
    filterRegion,
    setFilterRegion
  } = props

  const darkmode = useContext(DarkModeContext)

  const isDark = darkmode.isDarkMode
    ? 'bg-darkModeElements text-dmTextAndLmElements'
    : 'bg-dmTextAndLmElements'

  function handleOnClickRegion(region: TypeRegions) {
    // regions.map((region) => {
    //   if (regionId === region.country) {
    //     setActiveRegion('Filter by Region')
    //     setDropdown(false)
    //   } else if (regionId === region.id) {
    //     setActiveRegion(region.country)
    //     setDropdown(false)
    //   }
    // })
    setFilterRegion(region)
  }

  console.log(regions)

  return (
    <section className="flex justify-between">
      <input
        className={`rounded px-[32px] py-4  desktop:min-w-[480px] ${isDark}`}
        placeholder="Search for country..."
        value={searchCountry || ''}
        onChange={handleSetSearchCountry}
      />

      <div>
        <Listbox value={filterRegion} onChange={handleOnClickRegion}>
          <Listbox.Button className="w-[100px] text-left">
            {filterRegion}
          </Listbox.Button>
          <Listbox.Options>
            {regions.map((region) => {
              return (
                <Listbox.Option
                  key={region.value}
                  value={region.text}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                >
                  {region.text}
                </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Listbox>
      </div>
      {/* <ul
          className={`absolute top-[60px] py-6 w-full rounded ${isDark} ${isDropdwn}`}
        >
          {regions.map((region) => {
            return (
              <li
                onClick={() => handleOnClickRegion(region.text)}
                key={region.value}
                className="hover:bg-slate-300 hover:text-darkModeElements hover:cursor-pointer h-7 flex items-center pl-6"
              >
                {region.text}
              </li>
            )
          })}
        </ul> */}
    </section>
  )
}

export default SearchCountry
