import Sidebar from "@/components/Sidebar";
import { useState } from "react"
import { Outlet } from "react-router";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div id="root-layout">
      <div id="top-bar">
        <header>
          <span id="header__national">national</span>
          <span id="header__pokedex">p<span id="header__o">o</span>kedex</span>
          <span id="header__made-by">by (@N)²iBL</span>
        </header>
        <nav onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <input type="search" id="nav-search" placeholder="Buscar" />
          <div className="icon-button">
            Fil
          </div>
          <div className="icon-button">
            Ord
          </div>
        </nav>
      </div>
      <div id="main-row">
        <Sidebar isOpen={isSidebarOpen} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
