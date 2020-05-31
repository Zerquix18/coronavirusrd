import React, { useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import format from 'date-fns/format'

const CaseCharts = ({ cases }) => {
  const [areCasesLogarithmic, setAreCasesLogarithmic] = useState(false);
  const [areDeathsLogarithmic, setAreDeathsLogarithmic] = useState(false);
  const [areRecoveredLogarithmic, setAreRecoveredLogarithmic] = useState(false);
  const [areActiveLogarithmic, setAreActiveLogarithmic] = useState(false);

  const caseOptions = {
    title: {
      text: 'Total casos por día'
    },
    yAxis: {
      title: {
          text: 'Número de casos'
      },
      type: areCasesLogarithmic ? 'logarithmic' : 'lineal',
    },
    xAxis: {
      accessibility: {
          rangeDescription: 'Fecha'
      },
      type: 'datetime',
      dateTimeLabelFormats: {
         day: '%d %b %Y'    //ex- 01 Jan 2016
      }
    },
    series: [{
      name: "Casos",
      color: "#fcba03",
      data: cases.map(thisCase => {
        const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
        return {
          x: new Date(thisCase.date),
          y: thisCase.total_cases,
          name: date,
        }
      }),
    }]
  }

  const deathOptions = {
    title: {
      text: 'Total muertes por día'
    },
    yAxis: {
      title: {
          text: 'Número de muertes'
      },
      type: areDeathsLogarithmic ? 'logarithmic' : 'lineal',
    },
    xAxis: {
      accessibility: {
          rangeDescription: 'Fecha'
      },
      type: 'datetime',
      dateTimeLabelFormats: {
         day: '%d %b %Y'
      }
    },
    series: [{
      name: "Muertes",
      color: '#ff0000',
      data: cases.map(thisCase => {
        const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
        return {
          x: new Date(thisCase.date),
          y: thisCase.total_deaths,
          name: date,
        }
      }),
    }]
  }

  const recoveredOptions = {
    title: {
      text: 'Total recuperados por día'
    },
    yAxis: {
      title: {
          text: 'Número de recuperados'
      },
      type: areRecoveredLogarithmic ? 'logarithmic' : 'lineal',
    },
    xAxis: {
      accessibility: {
          rangeDescription: 'Fecha'
      },
      type: 'datetime',
      dateTimeLabelFormats: {
         day: '%d %b %Y'
      }
    },
    series: [{
      name: "Recuperados",
      color: '#5bff24',
      data: cases.map(thisCase => {
        const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
        return {
          x: new Date(thisCase.date),
          y: thisCase.total_recovered,
          name: date,
        }
      }),
    }]
  }

  const activeOptions = {
    title: {
      text: 'Total casos activos por día'
    },
    yAxis: {
      title: {
          text: 'Número de casos activos'
      },
      type: areRecoveredLogarithmic ? 'logarithmic' : 'lineal',
    },
    xAxis: {
      accessibility: {
          rangeDescription: 'Fecha'
      },
      type: 'datetime',
      dateTimeLabelFormats: {
         day: '%d %b %Y'
      }
    },
    series: [{
      name: "Casos activos",
      color: '#1cfbff',
      data: cases.map(thisCase => {
        const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
        return {
          x: new Date(thisCase.date),
          y: (thisCase.total_cases - thisCase.total_recovered - thisCase.total_deaths),
          name: date,
        }
      }),
    }]
  }

  return (
    <>
      <div className="columns">
        <div className="column is-half">
          <div className="control day-selector">
            <label className="radio">
              <input type="radio" name="cases-logarithmic" checked={!areCasesLogarithmic} onClick={() => setAreCasesLogarithmic(false)} />
              <span className="">Escala Lineal</span>
            </label>
            <label className="radio">
              <input type="radio" name="cases-logarithmic" checked={areCasesLogarithmic} onClick={() => setAreCasesLogarithmic(true)} />
              <span className="">Escala Logarítimica</span>
            </label>
          </div>
          <HighchartsReact
            highcharts={Highcharts}
            options={caseOptions}
          />
        </div>
        <div className="column is-half">
          <div className="control day-selector">
            <label className="radio">
              <input type="radio" name="deaths-logarithmic" checked={!areDeathsLogarithmic} onClick={() => setAreDeathsLogarithmic(false)} />
              <span className="">Escala Lineal</span>
            </label>
            <label className="radio">
              <input type="radio" name="deaths-logarithmic" checked={areDeathsLogarithmic} onClick={() => setAreDeathsLogarithmic(true)} />
              <span className="">Escala Logarítimica</span>
            </label>
          </div>
          <HighchartsReact
            highcharts={Highcharts}
            options={deathOptions}
          />
        </div>
      </div>

      <div className="columns">
        <div className="column is-half">
          <div className="control day-selector">
            <label className="radio">
              <input type="radio" name="recovered-logarithmic" checked={!areRecoveredLogarithmic} onClick={() => setAreRecoveredLogarithmic(false)} />
              <span className="">Escala Lineal</span>
            </label>
            <label className="radio">
              <input type="radio" name="recovered-logarithmic" checked={areRecoveredLogarithmic} onClick={() => setAreRecoveredLogarithmic(true)} />
              <span className="">Escala Logarítimica</span>
            </label>
          </div>
          <HighchartsReact
            highcharts={Highcharts}
            options={recoveredOptions}
          />
        </div>
        <div className="column is-half">
          <div className="control day-selector">
            <label className="radio">
              <input type="radio" name="active-logarithmic" checked={!areActiveLogarithmic} onClick={() => setAreActiveLogarithmic(false)} />
              <span className="">Escala Lineal</span>
            </label>
            <label className="radio">
              <input type="radio" name="active-logarithmic" checked={areActiveLogarithmic} onClick={() => setAreActiveLogarithmic(true)} />
              <span className="">Escala Logarítimica</span>
            </label>
          </div>
          <HighchartsReact
            highcharts={Highcharts}
            options={activeOptions}
          />
        </div>
      </div>
    </>
  )
}

export default CaseCharts;
