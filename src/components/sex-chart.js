import React, { useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import DaySelector from "./day-selector"

import format from 'date-fns/format'

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
          color: "#fab9c8",
          name: 'Femenino',
          y: women * 100,
        },
      ]
    }]
  }

  const differencesByDayOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Diferencia en sexo por dia'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
        name: "Masculino",
        data: sexData.slice(-30).map(thisCase => {
          const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
          return {
            x: new Date(thisCase.date),
            y: Math.round(thisCase.men * 100),
            name: date,
          }
        }),
      },
      {
        name: "Femenino",
        color: "#fab9c8",
        data: sexData.slice(-30).map(thisCase => {
          const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
          return {
            x: new Date(thisCase.date),
            y: Math.round(thisCase.women * 100),
            name: date,
          }
        }),
      },
    ]
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

export default SexChart
