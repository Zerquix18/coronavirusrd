import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import format from 'date-fns/format'

const Tests = ({ cases }) => {
  const totalTestsOptions = {
    title: {
      text: 'Total pruebas por día'
    },
    yAxis: {
      title: {
          text: 'Número de pruebas totales'
      },
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
        name: "Pruebas totales",
        color: '#1cfbff',
        data: cases.map(thisCase => {
          const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
          return {
            x: new Date(thisCase.date),
            y: (thisCase.total_cases + (thisCase.total_discarded || 0)),
            name: date,
          }
        }),
      },
      {
        name: "Pruebas positivas",
        color: '#fcba03',
        data: cases.map(thisCase => {
          const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
          return {
            x: new Date(thisCase.date),
            y: thisCase.total_cases,
            name: date,
          }
        }),
      },
      {
        name: "Pruebas negativas",
        color: '#ff0000',
        data: cases.map(thisCase => {
          const date = format(new Date(thisCase.date), 'dd/MM/yyyy')
          return {
            x: new Date(thisCase.date),
            y: thisCase.total_discarded,
            name: date,
          }
        }),
      }
    ]
  }

  const testsPerDay = cases.map((day, i, array) => {
    const yesterday = array[i - 1]
    const yesterdayTests = yesterday ? yesterday.total_cases + (yesterday.total_discarded || 0) : 0
    const todayTests = day.total_cases + (day.total_discarded || 0)

    const diff = todayTests - yesterdayTests
    return { date: day.date, tests: diff }
  }).slice(1)

  const newTestsOptions = {
      chart: {
      type: 'column'
    },
    title: {
      text: 'Nuevas pruebas por día'
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
        name: "Nuevas pruebas",
        data: testsPerDay.map((day) => {
          const date = format(new Date(day.date), 'dd/MM/yyyy')
          const tests = day.tests
          return {
            x: new Date(day.date),
            y: tests,
            name: date,
          }
        }),
      },
      {
        type: "line",
        name: "Promedio movible de 7 dias",
        data: testsPerDay.map((day, index, array) => {
          const date = format(new Date(day.date), 'dd/MM/yyyy')

          let average
          if (index < 7) {
            average = (array.slice(0, index + 1).reduce((total, current) => total + current.tests, 0) / (index + 1))
          } else {
            average = (array.slice(index - 7, index + 1).reduce((total, current) => total + current.tests, 0) / 7)
          }

          return {
            x: new Date(day.date),
            y: Math.round(average),
            name: date,
          }
        }),
      },
    ]
  }

  return (
    <div>
      <h2 className="title">Pruebas realizadas</h2>
      <small>Las pruebas realizadas para confirmar si una persona se recuperó no se toman en cuenta en estos gráficos</small>.

      <div className="columns">
        <div className="column is-half">
          <HighchartsReact
            highcharts={Highcharts}
            options={totalTestsOptions}
          />
        </div>
        <div className="column is-half">
          <HighchartsReact
            highcharts={Highcharts}
            options={newTestsOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default Tests
