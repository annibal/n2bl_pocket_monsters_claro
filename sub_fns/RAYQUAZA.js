// RAYQUAZA
// Sky High Pokemon, takes care of GROUDON (Earth) and KYOGRE (Water).
//
// This script boots up and runs both client and server.
//

import concurrently from "concurrently";

const concurrentlyConfig = {
  prefix:             "[{time}] {name}\x1b[0m",
  prefixColors:       ["cyan", "magenta"],
  killOthersOn:       ["failure", "success"],
  timestampFormat:    "HH:mm:ss"
};

const commandQueue = [
  { command: "npm run dev -w server", name: "\x1b[46m\x1b[97m[SERVER]" },
  { command: "npm run dev -w client", name: "\x1b[45m\x1b[97m[CLIENT]" },
];


const { result } = concurrently(commandQueue, concurrentlyConfig);

const onEnd = (retVal) => () => process.exit(retVal);
result.then(onEnd(0), onEnd(1));
