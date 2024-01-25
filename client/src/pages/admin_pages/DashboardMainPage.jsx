import { Outlet } from "react-router-dom"
import SimpleUserNavigationBar from "../../components/SimpleUserNavigationBar"

const DashboardMainPage = () => {
  return (
    <div>
        <SimpleUserNavigationBar />
        <Outlet />
    </div>
  )
}

export default DashboardMainPage