import { useEffect, useState, FC, useMemo } from 'react'
import { DarkModeContext } from './Home'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios, { type AxiosResponse } from 'axios'
import type { ICountry } from '../interfaces/types'
import { getNativeName } from '../utils/native-name'

type ButtonCountryProps = { name?: string; code?: string; isDarkMode: boolean }

function Detail({
  about = '',
  detail = ''
}: {
  about?: string
  detail?: string
}): JSX.Element {
  return (
    <span className="flex gap-1 mb-2">
      {about}
      <p className="font-thin">{detail || '««NO_DATA»»'}</p>
    </span>
  )
}

function Country(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [country, setCountry] = useState<ICountry | null>(null)
  const [dictCountryNameByCca3, setDictCountryNameByCca3] = useState<
    Record<
      string,
      { commonName: string; nativeName: string; currencyCode: string }
    >
  >({})
  const darkModeClass = isDarkMode ? 'bg-darkModeBg ' : 'bg-lightModeBg'
  const dmText = isDarkMode ? 'text-dmTextAndLmElements' : 'text-black'
  const { code = '' } = useParams<'code'>()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCountryDetail()
  }, [code])

  useEffect(() => {
    fetchCountries()
  }, [])

  const ButtonCountry: FC<ButtonCountryProps> = ({
    name = '',
    code = '',
    isDarkMode
  }) => {
    return (
      <Link
        to={`/countries/${code}`}
        className={`flex items-center pl-7 pr-7 py-1 shadow-md rounded-sm hover:cursor-pointer ${
          isDarkMode
            ? 'bg-darkModeElements text-dmTextAndLmElements'
            : 'bg-dmTextAndLmElements'
        }`}
      >
        {name}
      </Link>
    )
  }

  async function fetchCountryDetail() {
    const { data = [] } = await axios.get<null, AxiosResponse<ICountry[]>>(
      `https://restcountries.com/v3.1/alpha/${code}`
    )
    setCountry(data?.[0])
  }

  async function fetchCountries() {
    const { data: countries = [] } = await axios.get<
      null,
      AxiosResponse<ICountry[]>
    >(`https://restcountries.com/v3.1/all`)

    const dict: Record<
      string,
      { commonName: string; nativeName: string; currencyCode: string }
    > = {}

    const set = new Set<string>()
    countries.forEach(({ cca3 = '', name = {}, currencies = {} }) => {
      set.add(Object.keys(name?.nativeName || {})[0])
      // console.log('ata', cca3)
      if (name.common === 'China') console.log(name.nativeName)
      const nativeName = getNativeName(name?.nativeName, cca3)

      dict[cca3] = {
        commonName: name?.common || '',
        nativeName,
        currencyCode: Object.keys(currencies)?.[0] || ''
      }
    })

    setDictCountryNameByCca3(dict)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const currencyCode = useMemo(() => {
    return dictCountryNameByCca3[country?.cca3 || '']?.currencyCode
  }, [country, dictCountryNameByCca3])
  console.log(country)

  if (!country || Object.keys(dictCountryNameByCca3).length === 0) {
    return <div>Loading...</div>
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className="min-w-[350px] h-screen">
        <Header />
        <section
          className={`${darkModeClass}  flex flex-col items-center mobile:px-5 desktop:px-20 h-full`}
        >
          <button
            className={`self-start px-10 py-1 shadow-md rounded-md my-[80px] ${
              isDarkMode
                ? 'bg-darkModeElements text-white'
                : 'bg-dmTextAndLmElements'
            }`}
            onClick={() => navigate(-1)}
          >
            BACK
          </button>
          <div className="flex mobile:items-center desktop:items-start mobile:flex-col desktop:flex-row desktop:gap-[140px] mobile:gap-12 w-fit">
            <img
              alt=""
              src={country?.flags?.png}
              className="w-[293px] h-[210px]"
              //
              // min-w-[293px] min-h-[210px]
            />
            <div className={`${dmText} max-w-[500px]`}>
              <h1 className="font-extrabold text-3xl mb-8">
                {country?.name?.common}
              </h1>
              <div className=" grid desktop:grid-cols-2 desktop:gap-x-28 mobile:gap-y-8 ">
                <div className="">
                  <Detail
                    about="Native Name: "
                    detail={
                      dictCountryNameByCca3[country?.cca3]?.nativeName || ''
                    }
                  />
                  <Detail
                    about="Population: "
                    detail={country?.population?.toString()}
                  />
                  <Detail about="Region: " detail={country?.region} />
                  <Detail about="Sub Region: " detail={country?.subregion} />
                  <Detail about="Capital: " detail={country?.capital?.[0]} />
                </div>
                <div>
                  <Detail
                    about="Top Level Domain: "
                    detail={country?.tld?.[0]}
                  />
                  <Detail
                    about="Currencies: "
                    detail={country?.currencies?.[currencyCode]?.name}
                  />
                  <Detail
                    about={
                      Object.keys(country?.languages || {}).length > 1
                        ? 'Languages: '
                        : 'Language: '
                    }
                    detail={Object.values(country?.languages || {}).join(', ')}
                  />
                </div>
                {/** mt-[70px]  flex flex-cols gap-2  w-[580px] h-[500px]  */}
                <section className=" desktop:w-[480px] flex mobile:flex-col desktop:flex-row">
                  <h6 className="">Border Country:</h6>
                  <div className="flex flex-wrap gap-2 ">
                    {country?.borders?.map((border) => {
                      return (
                        <ButtonCountry
                          name={dictCountryNameByCca3[border].commonName}
                          code={border}
                          isDarkMode={isDarkMode}
                        />
                      )
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </DarkModeContext.Provider>
  )
}

export default Country
