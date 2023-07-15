import React from 'react'
import Notes from './Notes'

function Home() {
  return (
    <div>
      <div className='container my-3'>
      <h2>Add a Note</h2>
      <div className="mb-3 my-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Primary</button><br/>
      </div>
      <Notes/>
    </div>
  )
}

export default Home
