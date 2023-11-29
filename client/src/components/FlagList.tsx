import { ICountry } from '../interfaces/types'
import { Link } from 'react-router-dom'

type FlagListProps = {
  dataCountries: ICountry[]
  darkMode: string
  darkModeText: string
}
function FlagList({
  dataCountries = [],
  darkMode,
  darkModeText
}: FlagListProps): JSX.Element {
  function PreDetail({
    about = '',
    detail = ''
  }: {
    about?: string
    detail?: string
  }) {
    return (
      <span className="flex gap-1">
        {about}
        <p className="font-thin">{detail}</p>
      </span>
    )
  }

  function ShowDetail(props: {
    countryName?: string
    population?: string
    region?: string
    capital?: string
  }) {
    return (
      <div className="flex flex-col gap-4 pt-6 px-6 pb-11">
        <h1 className={`font-bold`}>{props?.countryName}</h1>
        <div className="flex flex-col text-sm gap-1">
          <PreDetail about="Population: " detail={props?.population} />
          <PreDetail about="Region: " detail={props?.region} />
          <PreDetail about="Capital: " detail={props?.capital} />
        </div>
      </div>
    )
  }

  return (
    <section className={darkModeText}>
      <ul className="flex flex-wrap gap-14 justify-between">
        {dataCountries.map((country) => {
          return (
            <li
              className={`max-w-[260px] w-full rounded-md ${darkMode}  shadow-md mb-5`}
              key={country?.cca3}
              onClick={() => {
                console.log(`The card ${country?.cca3} has been clicked`)
              }}
            >
              <Link to={`/countries/${country?.cca3}`}>
                <img
                  className="w-full h-[164px] rounded-t-md"
                  src={country?.flags?.png}
                />

                <ShowDetail
                  countryName={country?.name?.common}
                  population={country?.population?.toString()}
                  // ?.replace(/\B(??=(\d{3})+(?!\d))/g, ',')}
                  region={country?.region}
                  capital={country?.capital?.[0]}
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default FlagList
