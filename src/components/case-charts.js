import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import format from 'date-fns/format'

const CaseCharts = ({ cases }) => {
  const caseOptions = {
    title: {
      text: 'Total casos por día'
    },
    yAxis: {
      title: {
          text: 'Número de casos'
      }
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
      data: cases.slice(-15).map(thisCase => {
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
      }
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
      data: cases.slice(-15).map(thisCase => {
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
        <HighchartsReact
          highcharts={Highcharts}
          options={caseOptions}
        />
      </div>
      <div className="column is-half">
        <HighchartsReact
          highcharts={Highcharts}
          options={deathOptions}
        />
      </div>
    </div>
  )
}

export default CaseCharts;
