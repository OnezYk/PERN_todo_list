import { Navbar } from "./components/Navbar.tsx"
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex">
      <Navbar />
      <Outlet />
    </div>
  );
};