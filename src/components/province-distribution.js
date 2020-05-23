import React, { useState } from 'react'
import DaySelector from "./day-selector"
import ProvinceCasesModal from './province-cases-modal'

const ProvinceDistribution = ({ provinces }) => {
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState({ sortKey: 'total_cases', sortDirection: 'up' })
  const [fromToday, setToday] = useState(true)
  const [showingDetailsFor, setShowingDetailsFor] = useState(-1) // index

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
  let total_recovered = 0
  let total_new_recovered = 0
  let total_active = 0
  let total_tests = 0
  let total_new_tests = 0

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

      <table className="table is-hoverable is-narrow">
        <thead>
          <th onClick={() => setSort({ sortKey: 'province', sortDirection: 'up' })}>
            Provincia&nbsp;
            { sort.sortKey === 'province' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'province' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th onClick={() => setSort({ sortKey: 'total_cases', sortDirection: 'up' })}>
            Casos&nbsp;
            { sort.sortKey === 'total_cases' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'total_cases' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th>
            Casos nuevos&nbsp;
            { sort.sortKey === 'new_cases' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'new_cases' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th onClick={() => setSort({ sortKey: 'total_deaths', sortDirection: 'up' })}>
            Muertes&nbsp;
            { sort.sortKey === 'total_deaths' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'total_deaths' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th>
            Muertes nuevas&nbsp;
            { sort.sortKey === 'new_deaths' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'new_deaths' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th>
            Recuperados
          </th>
          <th>
            Recuperados nuevos
          </th>
          <th>
            Actualmente infectados
          </th>
          <th>
            Pruebas
          </th>
          <th>
            Pruebas nuevas
          </th>
        </thead>
        <tbody>
          { provincesToDisplay.map((province, i) => {
            const name = province.name
            const lastUpdate = province.cases[province.cases.length - 1]
            const secondToLast = province.cases[province.cases.length - 2]

            const newCases = secondToLast ? lastUpdate.total_cases - secondToLast.total_cases : lastUpdate.total_cases
            const newDeaths = secondToLast ? lastUpdate.total_deaths - secondToLast.total_deaths : lastUpdate.total_deaths
            const newRecovered = secondToLast ? lastUpdate.total_recovered - secondToLast.total_recovered : lastUpdate.total_recovered
            const active = lastUpdate.total_cases - lastUpdate.total_deaths - lastUpdate.total_recovered
            const newTests = secondToLast ? lastUpdate.total_tests - secondToLast.total_tests : lastUpdate.total_tests

            total_cases += lastUpdate.total_cases
            // sometimes they substract cases. don't know why.
            total_new_cases += newCases
            total_deaths += lastUpdate.total_deaths
            total_new_deaths += newDeaths
            total_new_recovered += newRecovered
            total_recovered += lastUpdate.total_recovered
            total_active += active
            total_tests += lastUpdate.total_tests
            total_new_tests += newTests

            const openModal = () => {
              setShowingDetailsFor(i)
            }

            return (
              <tr key={i}>
                <td>
                  <a href="javascript:void(0)" onClick={openModal}>{name}</a>
                </td>
                <td>{ lastUpdate.total_cases }</td>
                <td className={newCases > 0 ? 'is-warning' : undefined}>
                  { newCases > 0 && `+${newCases}` }
                  { newCases < 0 && `${newCases}` }
                </td>
                <td>{ lastUpdate.total_deaths }</td>
                <td className={newDeaths ? 'is-danger' : undefined}>{ newDeaths > 0 && `+${newDeaths}` }</td>
                <td>{ lastUpdate.total_recovered }</td>
                <td className={newRecovered ? 'is-success' : undefined}>{ newRecovered > 0 && `+${newRecovered}` }</td>
                <td>{ active }</td>
                <td>{ lastUpdate.total_tests }</td>
                <td>{ newTests }</td>
              </tr>
            )
          })}

          <tr>
            <th>TOTALES</th>
            <th>{ total_cases }</th>
            <th>{ total_new_cases }</th>
            <th>{ total_deaths }</th>
            <th>{ total_new_deaths }</th>
            <th>{ total_recovered }</th>
            <th>{ total_new_recovered }</th>
            <th>{ total_active }</th>
            <th>{ total_tests }</th>
            <th>{ total_new_tests }</th>
          </tr>
        </tbody>
      </table>

      { showingDetailsFor > -1 && (
        <ProvinceCasesModal
          province={provincesToDisplay[showingDetailsFor]}
          onClose={() => {
            setShowingDetailsFor(-1)
          }}
        />
      )}
    </div>
  )
}

export default ProvinceDistribution
