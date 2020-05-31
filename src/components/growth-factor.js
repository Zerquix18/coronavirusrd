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
      }),
    }]
  }

  return (
    <div>
      <h2 className="title">Factor de crecimiento</h2>
      <div className="columns">
        <div className="column is-half">
          <p>
            El factor de crecimiento es el factor por el cual una cantidad se multiplica a lo largo del tiempo. La fórmula utilizada es la de todos los casos nuevos del día anterior. Por ejemplo, una cantidad que crece un 7% cada período (en este caso diariamente) tiene un factor de crecimiento de 1,07.</p>

          <p>
            Un factor de crecimiento superior a 1 indica un aumento, mientras que uno que permanece entre 0 y 1 es un signo de disminución, con lo que la cantidad acaba por convertirse en cero, mientras que un factor de crecimiento constantemente superior a 1 podría indicar un crecimiento exponencial
          </p>

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
