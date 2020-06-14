import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import format from 'date-fns/format'

const NewByDay = ({ cases }) => {

  const newCasesOptions = {
      chart: {
      type: 'column'
    },
    title: {
      text: 'Nuevos casos por día'
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
    series: [
      {
        name: "Nuevos casos",
        data: cases.map(thisCase => {
          const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
          return {
            x: new Date(thisCase.date),
            y: thisCase.new_cases,
            name: date,
          }
        }),
      },
      {
        type: "line",
        name: "Promedio movible de 7 días",
        data: cases.map((thisCase, index, array) => {
          const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
          let average
          if (index < 7) {
            average = (array.slice(0, index + 1).reduce((total, current) => total + current.new_cases, 0) / (index + 1))
          } else {
            average = (array.slice(index - 7, index + 1).reduce((total, current) => total + current.new_cases, 0) / 7)
          }

          return {
            x: new Date(thisCase.date),
            y: parseFloat(average.toFixed(2)),
            name: date,
          }
        })
      }
    ]
  }

  const newDeathsOptions = {
      chart: {
      type: 'column'
    },
    title: {
      text: 'Nuevas muertes por día'
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
    series: [
      {
        name: "Nuevas muertes",
        data: cases.map(thisCase => {
          const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
          return {
            x: new Date(thisCase.date),
            y: thisCase.new_deaths,
            name: date,
          }
        }),
      },
      {
        type: "line",
        name: "Promedio movible de 7 días",
        data: cases.map((thisCase, index, array) => {
          const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
          let average
          if (index < 7) {
            average = (array.slice(0, index + 1).reduce((total, current) => total + current.new_deaths, 0) / (index + 1))
          } else {
            average = (array.slice(index - 7, index + 1).reduce((total, current) => total + current.new_deaths, 0) / 7)
          }

          return {
            x: new Date(thisCase.date),
            y: parseFloat(average.toFixed(2)),
            name: date,
          }
        })
      }
    ]
  }

  const newRecoveriesPerDay = cases.filter(day => typeof day.total_recovered === 'number').map((thisCase, i, array) => {
    const date = new Date(thisCase.date)
    let new_recoveries
    if (i === 0) {
      new_recoveries = 0;
    } else {
      new_recoveries = thisCase.total_recovered - array[i - 1].total_recovered
    }

    return { date, new_recoveries }
  })

  const newRecoveriesOptions = {
    chart: {
    type: 'column'
  },
  title: {
    text: 'Nuevos recuperados por día'
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
  series: [
    {
      name: "Nuevos recuperados",
      data: newRecoveriesPerDay.map((day) => {
        const { date, new_recoveries } = day
        return {
          x: date,
          y: new_recoveries,
          name: format(date, 'dd/MM/yyyy'),
        }
      }),
    },
    {
      type: "line",
      name: "Promedio movible de 7 días",
      data: newRecoveriesPerDay.map((thisCase, index, array) => {
        const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
        let average
        if (index < 7) {
          average = (array.slice(0, index + 1).reduce((total, current) => total + current.new_recoveries, 0) / (index + 1))
        } else {
          average = (array.slice(index - 7, index + 1).reduce((total, current) => total + current.new_recoveries, 0) / 7)
        }

        return {
          x: thisCase.date,
          y: parseFloat(average.toFixed(2)),
          name: date,
        }
      })
    }
  ]
}

  return (
    <div>
      <h2 className="title">Nuevos casos/muertes/recuperados por día</h2>

      <div className="columns">
        <div className="column is-half">
          <HighchartsReact
            highcharts={Highcharts}
            options={newCasesOptions}
          />
        </div>
        <div className="column is-half">
          <HighchartsReact
            highcharts={Highcharts}
            options={newDeathsOptions}
          />
        </div>
      </div>

      <div className="columns">
        <div className="column is-half">
          <HighchartsReact
            highcharts={Highcharts}
            options={newRecoveriesOptions}
          />
        </div>
      </div>

    </div>
  )
}

export default NewByDay
