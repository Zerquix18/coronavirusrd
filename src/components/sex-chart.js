import React, { useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import DaySelector from "./day-selector"

const SexChart = ({ sexData }) => {
  const [fromToday, setToday] = useState(true)

  let sexDataToUse = [...sexData]
  if (!fromToday) {
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

      <DaySelector
        name="sex-chart-day"
        dayValue={fromToday}
        setValue={setToday}
      />

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
