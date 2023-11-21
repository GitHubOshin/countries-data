import express from 'express'
import bodyParser from 'body-parser'

import { countries } from './data/data.js'

const app = express()
const port = 1002
// app.use(bodyParser.urlencoded())
app.use(bodyParser.json()) // get data parameter

// Show all countries
// app.get('/countries', (req, res) => {
//   res.json({
//     data: countries
//   })
// })

// Show specific countries
app.get('/countries', (req, res) => {
  const queryKeys = Object.keys(req.query)
  if (queryKeys.length === 0) {
    return res.json(countries)
  }
  // http://localhost:1002/countries?region=Europe
  const region = req.query.region

  const filteredCountries = dataCountries.filter((country) => {
    return country.region.toLowerCase() === region.toLowerCase()
  })

  return res.json({
    data: filteredCountries
  })
})

app.listen(port, () => {
  console.log(`Countries have been prepared at port ${port}`)
})
