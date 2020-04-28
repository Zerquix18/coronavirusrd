import React, { useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import format from 'date-fns/format'

const CaseCharts = ({ cases }) => {
  const [areCasesLogarithmic, setAreCasesLogarithmic] = useState(false);
  const [areDeathsLogarithmic, setAreDeathsLogarithmic] = useState(false);

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
      data: cases.slice(-60).map(thisCase => {
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
      color: '#fcba03',
      data: cases.slice(-60).map(thisCase => {
        const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
        return {
          x: new Date(thisCase.date),
          y: thisCase.total_deaths,
          name: date,
        }
      }),
    }]
  }

  return (
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
  )
}

export default CaseCharts;
