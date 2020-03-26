import React, { useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import DaySelector from "./day-selector"

const CaseLocation = ({ cases }) => {
  const [fromToday, setToday] = useState(true)

  let casesToUse = [...cases]
  if (!fromToday) {
    casesToUse.pop();
  }

  const totalCases = casesToUse[casesToUse.length -1].total_cases
  const totalAtHome = casesToUse[casesToUse.length -1].total_at_home
  const totalAtTheHospital = casesToUse[casesToUse.length -1].total_at_the_hospital

  const options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Ubicación de los casos activos'
    },
    tooltip: {
        pointFormat: 'Porcentaje: <b>{point.percentage:.1f}%</b>'
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
      name: 'Ubicación',
      colorByPoint: true,
      data: [
        {
          name: 'Aislamiento hospitalario',
          y: (totalAtTheHospital / totalCases) * 100,
        },
        {
          name: 'Aislamiento domiciliario',
          y: (totalAtHome / totalCases) * 100,
        },
      ]
    }]
  }

  return (
    <div>
      <h2 className="title">Ubicación de los casos activos</h2>

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

export default CaseLocation
