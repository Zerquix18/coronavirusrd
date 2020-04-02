import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import format from 'date-fns/format'

const NewByDay = ({ cases }) => {

  const newCasesOptions = {
      chart: {
      type: 'column'
    },
    title: {
      text: 'Nuevos casos por día'
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
      name: "Nuevos casos",
      data: cases.slice(-30).map(thisCase => {
        const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
        return {
          x: new Date(thisCase.date),
          y: thisCase.new_cases,
          name: date,
        }
      }),
    }]
  }

  const newDeathsOptions = {
      chart: {
      type: 'column'
    },
    title: {
      text: 'Nuevas muertes por día'
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
      name: "Nuevas muertes",
      data: cases.slice(-30).map(thisCase => {
        const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
        return {
          x: new Date(thisCase.date),
          y: thisCase.new_deaths,
          name: date,
        }
      }),
    }]
  }

  return (
    <div>
      <h2 className="title">Nuevos casos / Nuevas muertes por día</h2>

      <div className="columns">
        <div className="column is-half">
          <HighchartsReact
            highcharts={Highcharts}
            options={newCasesOptions}
          />
        </div>
        <div className="column is-half">
          <HighchartsReact
            highcharts={Highcharts}
            options={newDeathsOptions}
          />
        </div>
      </div>

    </div>
  )
}

export default NewByDay
