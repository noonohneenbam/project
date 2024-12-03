import { Link } from 'react-router-dom'
import React from 'react'

function Home(props){
  return (
    <Link to="/">
        <button className="close-search" onClick={props.resetSearch} >Close</button>
        </Link>
  )
}
export default Home