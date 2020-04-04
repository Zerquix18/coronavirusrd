import React, { useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import DaySelector from "./day-selector"

import format from 'date-fns/format'

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

  const casesForDifference = cases.filter(item => !! item.total_at_the_hospital)

  const differencesByDayOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Diferencia en ubicación por día'
    },
    accessibility: {
      point: {
          valueSuffix: '%'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
    xAxis: {
      accessibility: {
          rangeDescription: 'Fecha'
      },
      type: 'datetime',
      dateTimeLabelFormats: {
         day: '%d %b %Y'
      }
    },
    yAxis: {
      min: 0,
      max: 100,
    },
    plotOptions: {
      series: {
          stacking: 'normal'
      }
    },
    series: [
      {
        name: "Aislamiento domiciliario",
        data: casesForDifference.slice(-30).map(item => {
          const date = format(new Date(item.date), 'dd/MM/yyyy')

          const totalCases = item.total_cases
          const totalAtHome = item.total_at_home 

          return {
            x: new Date(item.date),
            y: Math.round((totalAtHome / totalCases) * 100),
            name: date,
          }
        }),
      },
      {
        name: "Aislamiento hospitalario",
        data: casesForDifference.slice(-30).map(item => {
          const date = format(new Date(item.date), 'dd/MM/yyyy')

          const totalCases = item.total_cases
          const totalAtTheHospital = item.total_at_the_hospital

          return {
            x: new Date(item.date),
            y: Math.round((totalAtTheHospital / totalCases) * 100),
            name: date,
          }
        }),
      },
    ]
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
        <div className="column is-half">
          <HighchartsReact
            highcharts={Highcharts}
            options={differencesByDayOptions}
          />
        </div>
      </div>
    </div>
  )

}

export default CaseLocation
