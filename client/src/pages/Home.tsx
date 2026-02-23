import HeaderLogo from "@/components/HeaderLogo";
import { NavLink } from "react-router-dom"
// import { useState } from "react";
// import { NavLink } from "react-router";

export default function Home() {

  return (
    <section id="home">
      <article>
        <HeaderLogo />
        <form method="GET" action="/pokemon">
          <div className="search-combo">
            <input id="home-search" type="search" name="search" placeholder="Search Pokemons" />
            <button type="submit" id="home-submit">Go</button>
          </div>
          <NavLink to="/pokemon" id="home-action-list">View All</NavLink>
        </form>
      </article>
    </section>
  );
}
