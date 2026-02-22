export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  
  return (
    <aside id="sidebar" className={isOpen ? "visible" : "hidden"}>
      <section className="sidebar-section">
        <header className="sidebar__header">
          <span className="sidebar__header-icon">O</span>
          <h5 className="sidebar__header-text">Ordenação</h5>
        </header>

        <article className="sidebar-widget">
          <div className="widget__body">
            <div className="wbody__input">
              <input type="radio" id="sortby_number" name="sort" value="id" />
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

      <section className="sidebar-section">
        <header className="sidebar__header">
          <span className="sidebar__header-icon">F</span>
          <h5 className="sidebar__header-text">Filtros</h5>
        </header>

        <article className="sidebar-widget">
          <header className="widget__header">
            <h6 className="widget__header-text">Região</h6>
          </header>
          <div className="widget__body">
            <div className="wbody__input">
              <input type="checkbox" id="filter_region_kanto" name="kanto" />
              <label htmlFor="filter_region_kanto">Kanto</label>
            </div>
            <div className="wbody__input">
              <input type="checkbox" id="filter_region_johto" name="johto" />
              <label htmlFor="filter_region_johto">Johto</label>
            </div>
            <div className="wbody__input">
              <input type="checkbox" id="filter_region_hoenn" name="hoenn" />
              <label htmlFor="filter_region_hoenn">Hoenn</label>
            </div>
            <div className="wbody__input">
              <input type="checkbox" id="filter_region_unova" name="unova" />
              <label htmlFor="filter_region_unova">Unova</label>
            </div>
          </div>
        </article>

        <article className="sidebar-widget">
          <header className="widget__header">
            <h6 className="widget__header-text">Raridade</h6>
          </header>
          <div className="widget__body">
            <div className="wbody__input">
              <input type="radio" id="filter_rarity_common" name="rarity" value="common" />
              <label htmlFor="filter_rarity_common">Common</label>
            </div>
            <div className="wbody__input">
              <input type="radio" id="filter_rarity_legendary" name="rarity" value="legendary" />
              <label htmlFor="filter_rarity_legendary">Legendary</label>
            </div>
            <div className="wbody__input">
              <input type="radio" id="filter_rarity_mythical" name="rarity" value="mythical" />
              <label htmlFor="filter_rarity_mythical">Mythical</label>
            </div>
          </div>
        </article>

        <article className="sidebar-widget">
          <header className="widget__header">
            <h6 className="widget__header-text">Tipo</h6>
          </header>
          <div className="widget__body">Wip</div>
        </article>

        <article className="sidebar-widget">
          <header className="widget__header">
            <h6 className="widget__header-text">Geração</h6>
          </header>
          <div className="widget__body">Wip</div>
        </article>

        <article className="sidebar-widget">
          <header className="widget__header">
            <h6 className="widget__header-text">Grupo de Ovo</h6>
          </header>
          <div className="widget__body">Wip</div>
        </article>
      </section>
    </aside>
  );
}
