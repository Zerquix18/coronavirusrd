import React, { useState } from 'react'
import DaySelector from "./day-selector"
import ProvinceCasesModal from './province-cases-modal'
import regions from '../regions'

const ProvinceDistribution = ({ provinces }) => {
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState({ sortKey: 'totalCases', sortDirection: 'up' })
  const [fromToday, setToday] = useState(true)
  const [showingDetailsFor, setShowingDetailsFor] = useState(-1) // index
  const [region, setRegion] = useState(null);

  let provincesToDisplay = [...provinces]
  if (!fromToday) {
    provincesToDisplay = provincesToDisplay.map(province => {
      const cases = [...province.cases]
      cases.pop();
      return { ...province, cases }
    })
  }

  if (region) {
    provincesToDisplay = provincesToDisplay.filter(province => regions[region].includes(province.name))
  }

  provincesToDisplay = provincesToDisplay.filter(province => {
    if (filter.trim() === '') {
      return true
    }

    return province.name.toLowerCase().includes(filter.toLowerCase())
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

  const provincesForTable = provincesToDisplay.map(province => {
    const lastUpdate = province.cases[province.cases.length - 1]
    const secondToLast = province.cases[province.cases.length - 2]

    const name = province.name
    const newCases = secondToLast ? lastUpdate.total_cases - secondToLast.total_cases : lastUpdate.total_cases
    const newDeaths = secondToLast ? lastUpdate.total_deaths - secondToLast.total_deaths : lastUpdate.total_deaths
    const newRecovered = secondToLast ? lastUpdate.total_recovered - secondToLast.total_recovered : lastUpdate.total_recovered
    const active = lastUpdate.total_cases - lastUpdate.total_deaths - lastUpdate.total_recovered
    const newTests = secondToLast ? lastUpdate.total_tests - secondToLast.total_tests : lastUpdate.total_tests
    const totalCases = lastUpdate.total_cases
    const totalDeaths = lastUpdate.total_deaths;
    const totalRecovered = lastUpdate.total_recovered
    const totalTests = lastUpdate.total_tests

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

    return {
      name,
      newCases,
      newDeaths,
      newRecovered,
      active,
      newTests,
      totalCases,
      totalDeaths,
      totalRecovered,
      totalTests,
    }
  })

  provincesForTable.sort((a, b) => {
    if (sort.sortKey === 'name') {
      return a.name.localeCompare(b.name)
    }

    return b[sort.sortKey] - a[sort.sortKey]
  })

  return (
    <div>
      <h2 className="title">Distribución por provincia</h2>

      <DaySelector
        name="province-day"
        dayValue={fromToday}
        setValue={setToday}
      />

      <div style={{ maxWidth: '300px', float: 'right' }}>
        <input
          className="input"
          type="text"
          placeholder="Filtrar"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div class="tabs">
        <ul>
          <li className={region === null ? 'is-active' : undefined}>
            <a onClick={() => { setRegion(null) }}>
              Todas
            </a>
          </li>
          { Object.keys(regions).map(reg => {
            return (
              <li key={reg} className={region === reg ? 'is-active' : undefined}>
                <a onClick={() => setRegion(reg) }>{ reg }</a>
              </li>
            )
          })}
        </ul>
      </div>

      <br />

      <table className="table is-hoverable is-narrow">
        <thead>
          <th style={{ cursor: 'pointer' }} onClick={() => setSort({ sortKey: 'names', sortDirection: 'up' })}>
            Provincia&nbsp;
            { sort.sortKey === 'names' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'names' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th style={{ cursor: 'pointer' }} onClick={() => setSort({ sortKey: 'totalCases', sortDirection: 'up' })}>
            Casos&nbsp;
            { sort.sortKey === 'totalCases' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'totalCases' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th style={{ cursor: 'pointer' }} onClick={() => setSort({ sortKey: 'newCases', sortDirection: 'up' })}>
            Casos nuevos&nbsp;
            { sort.sortKey === 'newCases' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'newCases' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th style={{ cursor: 'pointer' }} onClick={() => setSort({ sortKey: 'totalDeaths', sortDirection: 'up' })}>
            Muertes&nbsp;
            { sort.sortKey === 'totalDeaths' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'totalDeaths' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th style={{ cursor: 'pointer' }} onClick={() => setSort({ sortKey: 'newDeaths', sortDirection: 'up' })}>
            Muertes nuevas&nbsp;
            { sort.sortKey === 'newDeaths' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'newDeaths' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th style={{ cursor: 'pointer' }} onClick={() => setSort({ sortKey: 'totalRecovered', sortDirection: 'up' })}>
            Recuperados
            { sort.sortKey === 'totalRecovered' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'totalRecovered' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th style={{ cursor: 'pointer' }} onClick={() => setSort({ sortKey: 'newRecovered', sortDirection: 'up' })}>
            Recuperados nuevos
            { sort.sortKey === 'newRecovered' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'newRecovered' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th style={{ cursor: 'pointer' }} onClick={() => setSort({ sortKey: 'active', sortDirection: 'up' })}>
            Actualmente infectados
            { sort.sortKey === 'active' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'active' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th style={{ cursor: 'pointer' }} onClick={() => setSort({ sortKey: 'totalTests', sortDirection: 'up' })}>
            Pruebas
            { sort.sortKey === 'totalTests' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'totalTests' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
          <th style={{ cursor: 'pointer' }} onClick={() => setSort({ sortKey: 'newTests', sortDirection: 'up' })}>
            Pruebas nuevas
            { sort.sortKey === 'newTests' && sort.sortDirection === 'up' && <span><i className="fa fa-arrow-up" /></span>}
            { sort.sortKey === 'newTests' && sort.sortDirection === 'down' && <span><i className="fa fa-arrow-down" /></span>}
          </th>
        </thead>
        <tbody>
          { provincesForTable.map((province, i) => {
            const {
              name,
              newCases,
              newDeaths,
              newRecovered,
              active,
              newTests,
              totalCases,
              totalDeaths,
              totalRecovered,
              totalTests,
            } = province

            const openModal = () => {
              setShowingDetailsFor(i)
            }

            return (
              <tr key={i}>
                <td>
                  <a href="javascript:void(0)" onClick={openModal}>{name}</a>
                </td>
                <td>{ totalCases }</td>
                <td className={newCases > 0 ? 'is-warning' : undefined}>
                  { newCases > 0 && `+${newCases}` }
                  { newCases < 0 && `${newCases}` }
                </td>
                <td>{ totalDeaths }</td>
                <td className={newDeaths ? 'is-danger' : undefined}>{ newDeaths > 0 && `+${newDeaths}` }</td>
                <td>{ totalRecovered }</td>
                <td className={newRecovered ? 'is-success' : undefined}>{ newRecovered > 0 && `+${newRecovered}` }</td>
                <td>{ active }</td>
                <td>{ totalTests }</td>
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
