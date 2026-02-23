import Sidebar from "@/components/Sidebar";
import IconClaroLogo from "@/components/svg/IconClaroLogo";
import { useState } from "react"
import { Outlet } from "react-router";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div id="root-layout">
      <div id="top-bar">
        <header id="header-n2bl">
          <a href="/">
            <span id="header__national">national</span>
            <span id="header__pokedex">P<IconClaroLogo id="header__icon-o" />kedéx</span>
            <span id="header__made-by">by (@N)²iBL</span>
          </a>
        </header>
        <nav onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <div>
            Search
          </div>
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
