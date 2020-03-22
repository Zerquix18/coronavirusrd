import React, { useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const SexChart = ({ sexData }) => {
  const [yesterday, setYesterday] = useState(false)

  let sexDataToUse = [...sexData]
  if (yesterday) {
    sexDataToUse.pop();
  }

  const men = sexDataToUse[sexDataToUse.length - 1].men
  const women = sexDataToUse[sexDataToUse.length - 1].women

  const options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Distribución por sexo'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
      name: 'Casos',
      colorByPoint: true,
      data: [
        {
          name: 'Masculino',
          y: men * 100,
        },
        {
          name: 'Femenino',
          y: women * 100,
        },
      ]
    }]
  }

  return (
    <div>
      <h2 className="title">Distribución por sexo</h2>

      <div className="control">
        <label className="radio">
          <input type="radio" name="answer" checked={!yesterday} onClick={() => setYesterday(false)} />
          Hoy
        </label>
        <label className="radio">
          <input type="radio" name="answer" checked={yesterday} onClick={() => setYesterday(true)} />
          Ayer
        </label>
      </div>

      <div className="columns">
        <div className="column is-half">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </div>
      </div>
    </div>
  )
}

export default SexChart
