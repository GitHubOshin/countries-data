import axios, { AxiosResponse } from 'axios'

import { useContext, useState, useEffect, ChangeEvent } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { DarkModeContext } from '../pages/Home'
import SearchCountry from './SearchCountry'
import FlagList from './FlagList'
import { ICountry, TypeRegions } from '../interfaces/types'

function SearchingAndFlags() {
  const { isDarkMode } = useContext(DarkModeContext)

  const [searchCountry, setSearchCountry] = useState<string | null>(null)
  const [filterRegion, setFilterRegion] = useState<TypeRegions>('All')
  const darkModeClass = isDarkMode ? 'bg-darkModeBg' : 'bg-lightModeBg'
  const darkModeCard = isDarkMode ? 'bg-darkModeElements' : 'bg-lightModeBg'
  const darkModeText = isDarkMode
    ? 'text-dmTextAndLmElements'
    : 'text-lightModeText'

  const [countries, setCountries] = useState<ICountry[]>([])

  const debouncedCountry = useDebounce(searchCountry)

  useEffect(() => {
    fetchDataCountries()
  }, [])

  useEffect(() => {
    fetchCountriesByRegion(filterRegion)
  }, [filterRegion])

  useEffect(() => {
    console.log(debouncedCountry)
    fetchCountriesByName(debouncedCountry)
  }, [debouncedCountry])

  async function fetchCountriesByName(country: string | null) {
    if (country === null) return
    const isEmptyStrCountry = country === ''

    const pathURI = isEmptyStrCountry ? 'all' : `name/${country}`

    const url = decodeURIComponent(
      'https://restcountries.com/v3.1' + `/${pathURI}`
    )

    try {
      const { data } = await axios.get<any, AxiosResponse<ICountry[]>>(url)

      setCountries(data)
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error('Request canceled', error.message)
      }
    }
  }
  async function fetchCountriesByRegion(region: TypeRegions) {
    const isAllRegion = region === 'All'

    const endpointURL = `https://restcountries.com/v3.1${
      isAllRegion ? '/all' : `/region/${region}`
    }`

    const { data } = await axios.get<any, AxiosResponse<ICountry[]>>(
      endpointURL
    )
    setCountries(data)
  }

  async function fetchDataCountries() {
    // const data = await axios.get(
    const { data } = await axios.get<any, AxiosResponse<ICountry[]>>(
      `https://restcountries.com/v3.1/${filterRegion.toLocaleLowerCase()}`
    )
    // setCountries(data.data)
    setCountries(data)
  }

  const handleSetSearchCountry = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCountry(e.target.value)
  }

  return (
    <section
      className={`px-20 py-12 h-full flex flex-col gap-y-14 ${darkModeClass}`}
    >
      <SearchCountry
        searchCountry={searchCountry}
        onSetSearchCountry={handleSetSearchCountry}
        filterRegion={filterRegion}
        setFilterRegion={setFilterRegion}
      />
      <FlagList
        dataCountries={countries}
        darkMode={darkModeCard}
        darkModeText={darkModeText}
      />
    </section>
  )
}

export default SearchingAndFlags
