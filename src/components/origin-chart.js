import React, { useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import DaySelector from "./day-selector"

const OriginChart = ({ provinces }) => {
  const [fromToday, setToday] = useState(true)

  let provincesToDisplay = [...provinces]
  if (!fromToday) {
    provincesToDisplay = provincesToDisplay.map(province => {
      const cases = [...province.cases]
      cases.pop();
      return { ...province, cases }
    })
  }

  const totalImported = provincesToDisplay.reduce((total, current) => {
    return total + current.cases[current.cases.length - 1].total_imported
  }, 0)

  const totalUnderInvestigation = provincesToDisplay.reduce((total, current) => {
    return total + current.cases[current.cases.length - 1].total_under_investigation
  }, 0)

  const totalLocal = provincesToDisplay.reduce((total, current) => {
    return total + current.cases[current.cases.length - 1].total_local
  }, 0)

  const total = totalImported + totalUnderInvestigation + totalLocal

  const options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Distribución de origen'
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
          name: 'Total Importados',
          y: (totalImported / total) * 100,
        },
        {
          name: 'Total Bajo investigación',
          y: (totalUnderInvestigation / total) * 100,
        },
        {
          name: 'Total Local',
          y: (totalLocal / total) * 100,
        },
      ]
    }]
  }

  return (
    <div>
      <h2 className="title">Origen</h2>

      <DaySelector
        name="origin-day"
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

export default OriginChart
