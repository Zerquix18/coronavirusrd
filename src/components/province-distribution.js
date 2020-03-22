import React, { useState } from 'react'

const ProvinceDistribution = ({ provinces }) => {
  const [filter, setFilter] = useState("")

  const provincesToDisplay = provinces.filter(province => {
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

  return (
    <div>
      <h2 className="title">Distribución por provincia</h2>

      <div style={{ maxWidth: '300px'}}>
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
          <th>Casos investigados</th>
          <th>Casos locales</th>
          <th>Casos nuevos</th>
          <th>Total muertes</th>
          <th>Nuevas muertes</th>
        </thead>
        <tbody>
          { provincesToDisplay.map((province, i) => {
            const name = province.name
            const lastUpdate = province.cases[province.cases.length - 1]

            return (
              <tr>
                <td>{ name }</td>
                <td>{ lastUpdate.total_cases }</td>
                <td>{ lastUpdate.total_imported }</td>
                <td>{ lastUpdate.total_under_investigation }</td>
                <td>{ lastUpdate.total_local }</td>
                <td>{ lastUpdate.new_cases }</td>
                <td>{ lastUpdate.total_deaths }</td>
                <td>{ lastUpdate.new_deaths }</td>
              </tr>
            )
          })}

          <tr>
            <th>TOTALES</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ProvinceDistribution
