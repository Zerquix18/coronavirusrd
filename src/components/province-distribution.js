import React, { useState } from 'react'
import DaySelector from "./day-selector"

const ProvinceDistribution = ({ provinces }) => {
  const [filter, setFilter] = useState("")
  const [sort, setSort] = useState({ sortKey: 'total_cases', sortDirection: 'up' })
  const [fromToday, setToday] = useState(true)

  let provincesToDisplay = [...provinces]
  if (!fromToday) {
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
    if (sort.sortKey === 'province') {
      return a.name.localeCompare(b.name)
    }
    const aTotalCases = a.cases[a.cases.length - 1][sort.sortKey]
    const bTotalCases = b.cases[b.cases.length - 1][sort.sortKey]

    return bTotalCases - aTotalCases
  })

  let total_cases = 0
  let total_new_cases = 0
  let total_deaths = 0
  let total_new_deaths = 0

  return (
    <div>
      <h2 className="title">Distribución por provincia</h2>

      <DaySelector
        name="province-day"
        dayValue={fromToday}
        setValue={setToday}
      />

      <div style={{ maxWidth: '300px' }}>
        <input
          className="input"
          type="text"
          placeholder="Filtrar"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="table is-hoverable">
        <thead>
          <th onClick={() => setSort({ sortKey: 'province', sortDirection: 'up' })}>
            Provincia&nbsp;
            { sort.sortKey === 'province' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'province' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th onClick={() => setSort({ sortKey: 'total_cases', sortDirection: 'up' })}>
            Casos totales&nbsp;
            { sort.sortKey === 'total_cases' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'total_cases' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th>
            Casos nuevos&nbsp;
            { sort.sortKey === 'new_cases' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'new_cases' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th onClick={() => setSort({ sortKey: 'total_deaths', sortDirection: 'up' })}>
            Total muertes&nbsp;
            { sort.sortKey === 'total_deaths' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'total_deaths' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th>
            Nuevas muertes&nbsp;
            { sort.sortKey === 'new_deaths' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'new_deaths' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
        </thead>
        <tbody>
          { provincesToDisplay.map((province, i) => {
            const name = province.name
            const lastUpdate = province.cases[province.cases.length - 1]
            const secondToLast = province.cases[province.cases.length - 2]

            const newCases = secondToLast ? lastUpdate.total_cases - secondToLast.total_cases : 0
            const newDeaths = secondToLast ? lastUpdate.total_deaths - secondToLast.total_deaths : 0

            total_cases += lastUpdate.total_cases
            // sometimes they substract cases. don't know why.
            total_new_cases += newCases
            total_deaths += lastUpdate.total_deaths
            total_new_deaths += newDeaths

            return (
              <tr key={i}>
                <td>{ name }</td>
                <td>{ lastUpdate.total_cases }</td>
                <td className={newCases > 0 && 'is-warning'}>
                  { newCases > 0 && `+${newCases}` }
                  { newCases < 0 && `-${newCases}` }
                </td>
                <td>{ lastUpdate.total_deaths }</td>
                <td className={newDeaths && 'is-danger'}>{ newDeaths > 0 && `+${newDeaths}` }</td>
              </tr>
            )
          })}

          <tr>
            <th>TOTALES</th>
            <th>{ total_cases }</th>
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
