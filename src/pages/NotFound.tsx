import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='not-found'>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The Page you requested does not exist</p>
        <Link to="/dashboard">Return to Dashboard</Link>

    </section>
  )
}

export default NotFound