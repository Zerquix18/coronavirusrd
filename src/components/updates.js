import React from 'react'

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
              return (
                <li key={update.link}>
                  <a href={update.link}>{ update.title }</a>
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
