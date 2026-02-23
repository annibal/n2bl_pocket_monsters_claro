import HeaderLogo from "@/components/HeaderLogo";
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
          <button type="button" id="home-action-list">View All</button>
        </form>
      </article>
    </section>
  );
}
