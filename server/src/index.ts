import "dotenv/config";
import http from "node:http";
import log from "@/utils/logger";
import { PokemonController } from "@/controller/pokemon.controller";

const PORT = Number(process.env.SERVER_PORT) || 3001;

const pkmnController = new PokemonController();

const server = http.createServer((req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    /** add other headers as per requirement */
  };

  
  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  log("Received Request:", req.method, req.url);

  if (!req.url) {
    log("SERVER ERROR: No Url in Request");
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: "Invalid request" }));
  }

  if (req.method === "GET" && req.url.startsWith("/api")) {
    Object.entries(headers).forEach(([headerName, headerValue]) => {
      res.appendHeader(headerName, headerValue as any);
    })
    log("Is api request ✅");
    const parts = (req.url.split("?")[0] as string).split("/").filter(Boolean);
    log(`Parts: ${parts.join("|")}`)

    if (parts[1] === "pokemons") {
      if (parts[2] === "filters") {
        return pkmnController.listFilters(req, res)
      }
      
      return pkmnController.list(req, res);
    }

    if (parts[1] === "pokemon") {
      const id = parts[2] || "";
      return pkmnController.getById(req, res, id);
    }
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(PORT, () => {
  console.log("Server running on http://localhost:3001");
});

server.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use.`);
    process.exit(1);
  }
  console.error("Server Fatal Error", err);
});
