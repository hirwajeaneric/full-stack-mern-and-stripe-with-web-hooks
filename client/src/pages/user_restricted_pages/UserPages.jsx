import { Outlet } from "react-router-dom"
import SimpleUserNavigationBar from "../../components/SimpleUserNavigationBar"

const UserPages = () => {
  return (
    <div>
        <SimpleUserNavigationBar />
        <Outlet />
    </div>
  )
}

export default UserPages