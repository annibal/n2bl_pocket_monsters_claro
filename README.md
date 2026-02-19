# n2bl_pocket_monsters_claro
Pokedex Test for Fullstack job position

## Getting Started
Instructions to run this project locally



## Requirements



## Decisions
Choices made throughout the development, explained.

### Data Source

The required [Kaggle Dataset](https://www.kaggle.com/datasets/cristobalmitchell/pokedex) was not a good choice for the data source, given over 80% of this dataset are null-value cells.

I believe that happened because the dataset was built based on scraping data from some websites, who probably updated their DOM due to some new design feature, while the dataset scraping code fell behind. Also the kaggle dataset has data for _"all 898 pokemon"_ while there are currently 1025 unique pokemon species, with over 1300 different pokemon forms.

The raw data csv's from [PokeAPI](https://pokeapi.co/docs/v2)'s [GitHub](https://github.com/PokeAPI/pokeapi/tree/master) will be used as the data source for this test instead.

See [PokeAPI/pokeapi/../pokemon.csv](https://github.com/PokeAPI/pokeapi/blob/master/data/v2/csv/pokemon.csv)


### Back-end technology stack

**Node.js** + **Typescript** pave the server's floor.

This gives due to my experience in these languages is two orders of magnitude greater than the same experience with **Java** used in web context.

**SQLite** power the database.

Since the DB needed an _Driver_ to be accessed by Node.js, the external library [**better-sqlite3**](https://github.com/WiseLibs/better-sqlite3) was also installed as an dependency for this project's back end.

There were other options for the SQLite Driver, but **better-sqlite3's** github page explains why it was chosen over the other SQLite drivers.


### Front-end technology stack

**React** and **Typescript** are obliged. **Fetch** suffices for communication with the back end.

For styling, **CSS Reset** + **SCSS** and some stylesheets will provide all necessary style rules with easy interface of writing them, winning over tailwind's complex customization and lack of proper typescript types.

Also, some Utilitary Libs were needed:
- [React Router v7](https://reactrouter.com/7.13.0/home)
