import http from "node:http";
import { PokemonController } from "@/controller/pokemon.controller";
import log from "@/utils/logger";

const pkmnController = new PokemonController();

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  log("Received Request:", req.method, req.url)

  if (!req.url) {
    log("SERVER ERROR: No Url in Request");
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: "Invalid request" }));
  }

  if (req.method === "GET" && req.url.startsWith("/api")) {
    log("Is api request ✅");
    const parts = req.url.split("/").filter(Boolean);

    if (parts[1] === "pokemons") {
      return pkmnController.list(req, res);
    }

    if (parts[1] === "pokemon") {
      const id = parts[3] || "";
      return pkmnController.getById(req, res, id);
    }
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(3001);
