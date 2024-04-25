import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className='sidebar'>
        <Link to='/'>Weather</Link>
        <Link to='/'>Cities</Link>
        <Link to='/'>Weather</Link>
        <Link to='/'>Weather</Link>
    </div>
  )
}

export default Sidebar