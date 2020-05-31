import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import format from 'date-fns/format'

const Positivity = ({ cases }) => {

  const positivityOptions = {
    title: {
      text: 'Positividad de las últimas 4 semanas por día'
    },
    yAxis: {
      title: {
          text: 'Positividad'
      },
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.2f}%</b>'
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
      name: "Positividad",
      data: cases.map(thisCase => {
        const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
        return {
          x: new Date(thisCase.date),
          y: thisCase.positivity * 100,
          name: date,
        }
      }),
    }]
  }


  return (
    <div>
      <h2 className="title">Positividad en las últimas 4 semanas, cada día</h2>

      <div className="columns">
        <div className="column is-half">
          <HighchartsReact
            highcharts={Highcharts}
            options={positivityOptions}
          />
        </div>
      </div>

    </div>
  )
}

export default Positivity
