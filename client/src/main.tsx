import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/ui.scss";
import "@/styles/neue_machina.css"
import Home from "@/pages/Home";
import PokemonDetails from "@/pages/pokemon/PokemonDetails";
import Layout from "@/components/Layout";
import PokemonList from "@/pages/pokemon/PokemonList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pokemons",
        element: <PokemonList />,
      },
      {
        path: "/pokemon/:id",
        element: <PokemonDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
