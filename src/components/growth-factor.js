import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import format from 'date-fns/format'

const GrowthFactor = ({ cases }) => {
  const growthFactorOptions = {
      chart: {
      type: 'column'
    },
    title: {
      text: 'Factor de crecimiento por día'
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
      name: "Factor de crecimiento",
      data: cases.map((thisCase, i, array) => {
        const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
        let y
        if (i === 0) {
          y = 0
        } else {
          const growthFactor = thisCase.total_cases / array[i - 1].total_cases
          y = parseFloat(growthFactor.toFixed(2))
        }
        return {
          x: new Date(thisCase.date),
          y,
          name: date,
        }
      }).slice(-15),
    }]
  }

  return (
    <div>
      <h2 className="title">Factor de crecimiento</h2>
      <div className="columns">
        <div className="column is-half">
          <HighchartsReact
            highcharts={Highcharts}
            options={growthFactorOptions}
          />
        </div>
      </div>
    </div>
  )
}

export default GrowthFactor
