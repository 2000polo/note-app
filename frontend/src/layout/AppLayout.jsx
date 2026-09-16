import { Outlet } from "react-router";
import Navbar from "../components/Navbar"

const AppLayout = () => {
    return (
        <section className="mx-2 lg:mx-auto max-w-6xl">
            <Navbar />
            <Outlet />
        </section>
    )
}

export default AppLayout;