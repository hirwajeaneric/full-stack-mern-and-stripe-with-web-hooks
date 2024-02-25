import { Outlet } from "react-router-dom"
import AdminSideMenuBar from "../../components/AdminSideMenuBar"

const DashboardMainPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex h-screen flex-wrap w-full max-w-ful justify-between items-start">
        <AdminSideMenuBar />
        <div className="w-full md:w-3/4 md:pl-10 mt-10 md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardMainPage