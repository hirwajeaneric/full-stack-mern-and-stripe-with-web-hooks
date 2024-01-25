import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <h1>Welcome home</h1>
        <Link to={'/cart'}>View cart</Link>

    </div>
  )
}

export default Home