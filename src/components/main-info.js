import React from 'react'

const MainInfo = ({ cases }) => {
  const totalCases = cases[cases.length -1].total_cases
  const totalDeaths = cases[cases.length -1].total_deaths
  const newCases = cases[cases.length -1].new_cases
  const newDeaths = cases[cases.length -1].new_deaths
  const totalRecovered = cases[cases.length -1].total_recovered
  const totalDiscarded = cases[cases.length -1].total_discarded

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-half has-text-centered">
          <h1 className="title">{ totalCases }</h1>
          <h2 className="subtitle">Casos totales</h2>
        </div>
        <div className="column is-half has-text-centered">
          <h1 className="title has-text-danger">{ totalDeaths }</h1>
          <h2 className="subtitle">Muertes totales</h2>
        </div>
      </div>
      <div className="columns">
        <div className="column is-half has-text-centered">
          <h1 className="title">{ newCases }</h1>
          <h2 className="subtitle">Nuevos casos</h2>
        </div>
        <div className="column is-half has-text-centered">
          <h1 className="title has-text-danger">{ newDeaths }</h1>
          <h2 className="subtitle">Nuevas muertes</h2>
        </div>
      </div>
      <div className="columns">
        <div className="column is-half has-text-centered">
          <h1 className="title">{ totalRecovered }</h1>
          <h2 className="subtitle">Total recuperados</h2>
        </div>
        <div className="column is-half has-text-centered">
          <h1 className="title has-text-danger">{ totalDiscarded }</h1>
          <h2 className="subtitle">Total descartados</h2>
        </div>
      </div>
    </div>
  )
}

export default MainInfo
