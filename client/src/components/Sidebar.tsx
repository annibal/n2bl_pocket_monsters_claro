import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import IconFilter from "@/components/svg/IconFilter";
import IconSort from "@/components/svg/IconSort";
import usePokemonFilters, { type PokemonFilters } from "@/components/usePokemonFilters";

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { data: tData } = usePokemonFilters();
  const data = tData || ({} as PokemonFilters);

  const keys = Object.keys(data) as (keyof typeof data)[];

  const filters = useMemo(() => {
    return keys.map((key) => ({
      filterKey: key,
      filterName: key
        .split("_")
        .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
        .join(" "),
      filterValues: data[key],
    }));
  }, [keys, data]);

  function clearFilters() {}
  function applyFilters() {}

  if (!data) {
    return (
      <SidebarStructure
        isOpen={isOpen}
        onClose={onClose}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />
    );
  }

  const filtersContent = (
    <section className="sidebar-section">
      <header className="sidebar__header">
        <span className="sidebar__header-icon">
          <IconFilter />
        </span>
        <h5 className="sidebar__header-text">Filters</h5>
      </header>

      {filters.map((filter) => (
        <article className="sidebar-widget" key={filter.filterKey}>
          <header className="widget__header">
            <h6 className="widget__header-text">{filter.filterName}</h6>
          </header>
          <div className="widget__body">
            {filter.filterValues.map((fv) => {
              const id = `${filter.filterKey}_${String(fv).replaceAll(" ", "_")}`;
              return (
                <div className="wbody__input" key={id}>
                  <input type="checkbox" id={id} name={filter.filterKey} value={String(fv)} />
                  <label htmlFor={id}>{fv}</label>
                </div>
              );
            })}
          </div>
        </article>
      ))}
    </section>
  );

  return (
    <SidebarStructure
      clearFilters={clearFilters}
      applyFilters={applyFilters}
      isOpen={isOpen}
      onClose={onClose}
      children={filtersContent}
    />
  );
}

type SidebarStructureProps = SidebarProps & PropsWithChildren & {
  clearFilters: () => void;
  applyFilters: () => void
};

function SidebarStructure(props: SidebarStructureProps) {
  const { children, isOpen, onClose, clearFilters, applyFilters } = props;

  return (
    <aside id="sidebar" className={isOpen ? "visible" : "hidden"}>
      <div className="sidebar-content">
        <header className="sidebar__top-header">
          <h4 className="sidebar__header-text">Search Pokemon</h4>
          <button className="sidebar__close" onClick={onClose}>
            🗙
          </button>
        </header>

        <section className="sidebar-section">
          <input type="search" placeholder="Search" name="search" id="textSearch" />
        </section>

        <section className="sidebar-section">
          <header className="sidebar__header">
            <span className="sidebar__header-icon">
              <IconSort />
            </span>
            <h5 className="sidebar__header-text">Sort by</h5>
          </header>

          <article className="sidebar-widget">
            <div className="widget__body">
              <div className="wbody__input">
                <input type="radio" id="sortby_number" name="sort" value="id" checked/>
                <label htmlFor="sortby_number">Number</label>
              </div>
              <div className="wbody__input">
                <input type="radio" id="sortby_name" name="sort" value="name" />
                <label htmlFor="sortby_name">Name</label>
              </div>
              <div className="wbody__input">
                <input type="radio" id="sortby_hp" name="sort" value="hp" />
                <label htmlFor="sortby_hp">H.P.</label>
              </div>
              <div className="wbody__input">
                <input type="radio" id="sortby_attack" name="sort" value="attack" />
                <label htmlFor="sortby_attack">Attack</label>
              </div>
              <div className="wbody__input">
                <input type="radio" id="sortby_defense" name="sort" value="defense" />
                <label htmlFor="sortby_defense">Defense</label>
              </div>
              <div className="wbody__input">
                <input type="radio" id="sortby_spattack" name="sort" value="special_attack" />
                <label htmlFor="sortby_spattack">Sp. Attack</label>
              </div>
              <div className="wbody__input">
                <input type="radio" id="sortby_spdefense" name="sort" value="special__defense" />
                <label htmlFor="sortby_spdefense">Sp. Defense</label>
              </div>
              <div className="wbody__input">
                <input type="radio" id="sortby_speed" name="sort" value="speed" />
                <label htmlFor="sortby_speed">Speed</label>
              </div>
              <div className="wbody__input">
                <input type="radio" id="sortby_basexp" name="sort" value="base_experience" />
                <label htmlFor="sortby_basexp">Base Exp.</label>
              </div>
              <div className="wbody__input">
                <input type="radio" id="sortby_height" name="sort" value="height" />
                <label htmlFor="sortby_height">Height</label>
              </div>
              <div className="wbody__input">
                <input type="radio" id="sortby_weight" name="sort" value="weight" />
                <label htmlFor="sortby_weight">Weight</label>
              </div>
            </div>
          </article>
        </section>

        {/* ____ */}

        {children}

        {/* ____ */}

        <footer className="sidebar__footer">
          <button id="sidebar-footer__clear" onClick={clearFilters} type="button">
            Clear
          </button>
          <button id="sidebar-footer__apply" onClick={applyFilters} type="button">
            Apply
          </button>
        </footer>
      </div>
    </aside>
  );
}
