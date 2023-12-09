import { useContext, Dispatch, SetStateAction } from 'react'
import { DarkModeContext } from '../pages/Home'
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
    setFilterRegion(region)
  }

  console.log(regions)

  return (
    <section className=" flex justify-between mobile:flex-col desktop:flex-row mobile:gap-8">
      <input
        className={`rounded px-[32px] py-4  shadow-md desktop:min-w-[480px] ${isDark}`}
        placeholder="Search for country..."
        value={searchCountry || ''}
        onChange={handleSetSearchCountry}
      />

      <div
        className={`${isDark} mobile:h-14 mobile:w-[215px] desktop:w-[200px] rounded-md shadow-md`}
      >
        <Listbox value={filterRegion} onChange={handleOnClickRegion}>
          <Listbox.Button className="flex items-center justify-between  w-full h-full right-0 px-10">
            {filterRegion}
            <img
              alt="arrow down"
              src="../../public/images/icons/arrowDown.svg"
            />
          </Listbox.Button>
          <Listbox.Options
            className={`${isDark} py-3 rounded-md shadow-md absolute w-[200px] mt-1 `}
          >
            {regions.map((region) => {
              return (
                <Listbox.Option
                  key={region.value}
                  value={region.text}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 hover:cursor-pointer ${
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
    </section>
  )
}

export default SearchCountry
