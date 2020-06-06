import React, { useState } from 'react'
import format from 'date-fns/format';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import regions from '../regions'

const ProgressionByProvince = ({ provinces }) => {
  const [region, setRegion] = useState(null);

  let provincesToDisplay = [...provinces]

  if (region) {
    provincesToDisplay = provincesToDisplay.filter(province => regions[region].includes(province.name))
  }

  const progressionChartOptions = {
    chart: {
      height: 600,
    },
    title: {
      text: 'Progresión por provincia por casos activos'
    },
    yAxis: {
      title: {
          text: 'Casos activos'
      },
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y} infectados</b>'
    },
    xAxis: {
      accessibility: {
        rangeDescription: 'Fecha'
      },
      type: 'datetime',
      dateTimeLabelFormats: {
         day: '%d %b %Y'    //ex- 01 Jan 2016
      }
    },

    series: provincesToDisplay.map(province => {
      const data = province.cases.map(day => {
        const name = format(new Date(day.date), 'dd/MM/yyyy')
        const total_recovered = day.total_recovered || 0;
        const total_deaths = day.total_deaths || 0;
        const total_cases = day.total_cases;

        const y = total_cases - total_deaths - total_recovered;

        return {
          x: new Date(day.date),
          y,
          name,
        }
      })
      return {
        name: province.name,
        data,
      }
    })
  }

  return (
    <div>
      <h2 className="title">Progresión de la enfermedad por provincia</h2>

      <div class="tabs">
        <ul>
          <li className={region === null ? 'is-active' : undefined}>
            <a onClick={() => { setRegion(null) }}>
              Todas
            </a>
          </li>
          { Object.keys(regions).map(reg => {
            return (
              <li key={reg} className={region === reg ? 'is-active' : undefined}>
                <a onClick={() => setRegion(reg) }>{ reg }</a>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="columns">
        <div className="column is-full">
          <HighchartsReact
            highcharts={Highcharts}
            options={progressionChartOptions}
          />
        </div>
      </div>

    </div>
  )
}

export default ProgressionByProvince
