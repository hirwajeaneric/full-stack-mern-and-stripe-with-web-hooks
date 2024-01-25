import { Outlet } from "react-router-dom"
import Navigation from "../../components/Navigation"
import Footer from "../../components/Footer"

const MainUserPage = () => {
  return (
    <div>
        <Navigation />
        <Outlet />
        <Footer />
    </div>
  )
}

export default MainUserPage