import { FindAllOptions } from "@/repository/pokemon.repository";
import { PokemonService } from "@/service/pokemon.service";
import log from "@/utils/logger";
import type { IncomingMessage, ServerResponse } from "node:http";

const service = new PokemonService();

export class PokemonController {
  async list(req: IncomingMessage, res: ServerResponse) {
    log("PokemonController.list")
    const query = Object.fromEntries(new URLSearchParams((req.url || "").split("?")[1] || "").entries());

    try {
      const result = service.list(query as unknown as FindAllOptions);

      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } catch (err) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Bad Request" }));
    }
  }

  async getById(
    req: IncomingMessage,
    res: ServerResponse,
    id: string
  ) {
    log(`PokemonController.getById "${id}"`)
    try {
      const result = service.getById(id);

      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } catch (err: any) {
      if (err.message === "Pokemon not found") {
        res.statusCode = 404;
      } else {
        res.statusCode = 400;
      }

      res.end(JSON.stringify({ error: err.message }));
    }
  }

  async listFilters(req: IncomingMessage, res: ServerResponse) {
    log(`PokemonController.listFilters`)

    try {
      const result = service.listFilters();

      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } catch (err) {
      console.log(err)
      res.statusCode = 500;
      res.end(JSON.stringify({ error: "Server Error", err }));
    }
  }
}
