import HeaderLogo from "@/components/HeaderLogo";
import Sidebar from "@/components/Sidebar";
import { useState } from "react"
import { Outlet } from "react-router";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div id="root-layout">
      <div id="top-bar">
        <HeaderLogo />
        <nav onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <button id="btn-search">
            Search
          </button>
        </nav>
      </div>
      <div id="main-row">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
