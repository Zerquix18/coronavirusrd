import React from 'react'
import format from 'date-fns/format'

const Updates = ({ updates }) => {
  updates.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  })
  return (
    <div>
      <h2 className="title">Fuentes</h2>

      <div className="columns">
        <div className="column is-half content">
          <ul>
            { updates.map(update => {
              const date = format(new Date(update.date), 'dd/MM/yyyy')
              return (
                <li key={update.link}>
                  <a href={update.link}>[{ date }] { update.title }</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Updates
