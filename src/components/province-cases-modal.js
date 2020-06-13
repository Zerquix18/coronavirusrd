import React from 'react'
import Cases from './case-charts'
import NewByDay from './new-by-day'
import Positivity from './positivity'
import GrowthFactor from './growth-factor'
import Tests from './tests'

const ProvinceCasesModal = ({ province, onClose }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card" style={{ width: '80vw'}}>
        <header className="modal-card-head">
          <p className="modal-card-title">Casos de { province.name }</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">

          <Cases cases={province.cases} />
          <hr />

          <NewByDay
            cases={province.cases.map((cases, i, array) => {
              if (i === 0) {
                return { ...cases, new_cases: 0, new_deaths: 0 }
              }
              const new_cases = array[i].total_cases - array[i - 1].total_cases
              const new_deaths = array[i].total_deaths - array[i - 1].total_deaths

              return { ...cases, new_cases, new_deaths };
            }).slice(1)} />

          
          <hr />
          
          <Tests cases={province.cases.filter(cases => cases.total_tests !== null).map(cases => {
            cases.total_discarded = cases.total_tests - cases.total_cases
            return cases
          })} />

          <hr />

          <Positivity cases={province.cases.filter(day => typeof day.positivity === 'number')} />

          <hr />
          
          <GrowthFactor cases={province.cases} />
        </section>
      </div>
    </div>
  )
}

export default ProvinceCasesModal
