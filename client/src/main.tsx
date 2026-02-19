import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/index.css";
import Home from "@/pages/Home";
import PokemonDetails from "@/pages/pokemon/PokemonDetails";

const apiUrl = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home apiUrl={apiUrl} />
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetails />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
