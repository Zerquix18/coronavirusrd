import React, { useState } from 'react'

const ProvinceDistribution = ({ provinces }) => {
  const [filter, setFilter] = useState("")
  const [yesterday, setYesterday] = useState(false)

  let provincesToDisplay = [...provinces]
  if (yesterday) {
    provincesToDisplay = provincesToDisplay.map(province => {
      const cases = [...province.cases]
      cases.pop();
      return { ...province, cases }
    })
  }

  provincesToDisplay = provincesToDisplay.filter(province => {
    if (filter.trim() === '') {
      return true
    }

    return province.name.toLowerCase().includes(filter.toLowerCase())
  })

  provincesToDisplay.sort((a, b) => {
    const aTotalCases = a.cases[a.cases.length - 1].total_cases
    const bTotalCases = b.cases[b.cases.length - 1].total_cases

    return bTotalCases - aTotalCases
  })

  let total_cases = 0
  let total_imported = 0
  let total_under_investigation = 0
  let total_local = 0
  let total_new_cases = 0
  let total_deaths = 0
  let total_new_deaths = 0

  return (
    <div>
      <h2 className="title">Distribución por provincia</h2>

      <div className="control">
        <label className="radio">
          <input type="radio" name="province_distribution_date" checked={!yesterday} onClick={() => setYesterday(false)} />
          Hoy
        </label>
        <label className="radio">
          <input type="radio" name="province_distribution_date" checked={yesterday} onClick={() => setYesterday(true)} />
          Ayer
        </label>
      </div>

      <div style={{ maxWidth: '300px' }}>
        <input
          class="input"
          type="text"
          placeholder="Filtrar"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="table is-hoverable">
        <thead>
          <th>Provincia</th>
          <th>Casos totales</th>
          <th>Casos importados</th>
          <th>Casos siendo investigados</th>
          <th>Casos locales</th>
          <th>Casos nuevos</th>
          <th>Total muertes</th>
          <th>Nuevas muertes</th>
        </thead>
        <tbody>
          { provincesToDisplay.map((province) => {
            const name = province.name
            const lastUpdate = province.cases[province.cases.length - 1]
            const secondToLast = province.cases[province.cases.length - 2]

            const newCases = secondToLast ? lastUpdate.total_cases - secondToLast.total_cases : 0
            const newDeaths = secondToLast ? lastUpdate.total_deaths - secondToLast.total_deaths : 0

            total_cases += lastUpdate.total_cases
            total_imported += lastUpdate.total_imported
            total_under_investigation += lastUpdate.total_under_investigation
            total_local += lastUpdate.total_local
            total_new_cases += newCases
            total_deaths += lastUpdate.total_deaths
            total_new_deaths += newDeaths

            return (
              <tr>
                <td>{ name }</td>
                <td>{ lastUpdate.total_cases }</td>
                <td>{ lastUpdate.total_imported }</td>
                <td>{ lastUpdate.total_under_investigation }</td>
                <td>{ lastUpdate.total_local }</td>
                <td>{ newCases > 0 && newCases }</td>
                <td>{ lastUpdate.total_deaths }</td>
                <td>{ newDeaths > 0 && newDeaths }</td>
              </tr>
            )
          })}

          <tr>
            <th>TOTALES</th>
            <th>{ total_cases }</th>
            <th>{ total_imported }</th>
            <th>{ total_under_investigation }</th>
            <th>{ total_local }</th>
            <th>{ total_new_cases }</th>
            <th>{ total_deaths }</th>
            <th>{ total_new_deaths }</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ProvinceDistribution
