//@ts-nocheck


export default function log(...args: any[]) {
  const prefix = [`[${ANSI.G.NF}LOGGER${ANSI.RST}]`,
    `${ANSI.C.BF}${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    `${ANSI.C.NF} :>>${ANSI.RST}`
  ].join(" ")
  
  if (typeof args[0] === "string") {
    args[0] = prefix + " " + args[0];
  } else {
    args = [prefix, ...args];
  }

  console.log(...args);
}


/**
 * ANSI[Color Name Initial][Type], where:
 * - Color may be:
 *   Red Green Blue Cyan Magenta Yellow White or blacK
 *   (use only R,G,B,C,M,Y,K,W)
 * - Type may be:
 *   - NF for Normal Foreground
 *   - NB for Normal Background
 *   - BF for Bright Foreground
 *   - BB for Bright Background
 * 
 * The meaning of "bright" may differ based on shell theme.
 */
const ANSI = escape({
  /** Reset */
  RST: 0,
  /** Black */
  K: { NF: 30, NB: 40, BF: 90, BB: 100 },
  /** Red */
  R: { NF: 31, NB: 41, BF: 91, BB: 101 },
  /** Green */
  G: { NF: 32, NB: 42, BF: 92, BB: 102 },
  /** Yellow */
  Y: { NF: 33, NB: 43, BF: 93, BB: 103 },
  /** Blue */
  B: { NF: 34, NB: 44, BF: 94, BB: 104 },
  /** Magenta (purple) */
  M: { NF: 35, NB: 45, BF: 95, BB: 105 },
  /** Cyan */
  C: { NF: 36, NB: 46, BF: 96, BB: 106 },
  /** White */
  W: { NF: 37, NB: 47, BF: 97, BB: 107 },
})

ANSI.RST = "\x1b[0m"



function escape(obj): typeof obj {
  return Object.entries(obj).reduce((acc1, [key1, val1]) => ({
    ...acc1,
    [key1]: typeof val1 === "object"
      ? Object.entries(val1).reduce((acc2, [key2, val2]) => ({
        ...acc2,
        [key2]: `\x1b[${val2}m`
      }), {})
      : `x1b[${val1}m`
  }), {})
}



// | Color   | Normal   | BG       | Bright   | Bright BG |
// | ------- | -------- | -------- | -------- | --------- |
// | Black   | \x1b[30m | \x1b[40m | \x1b[90m | \x1b[100m |
// | Red     | \x1b[31m | \x1b[41m | \x1b[91m | \x1b[101m |
// | Green   | \x1b[32m | \x1b[42m | \x1b[92m | \x1b[102m |
// | Yellow  | \x1b[33m | \x1b[43m | \x1b[93m | \x1b[103m |
// | Blue    | \x1b[34m | \x1b[44m | \x1b[94m | \x1b[104m |
// | Magenta | \x1b[35m | \x1b[45m | \x1b[95m | \x1b[105m |
// | Cyan    | \x1b[36m | \x1b[46m | \x1b[96m | \x1b[106m |
// | White   | \x1b[37m | \x1b[47m | \x1b[97m | \x1b[107m |

// Reset  \x1b[0m
// White BG  | \x1b[7m
// Black BG  | \x1b[8m
// Underline  \x1b[4m
// Italic  \x1b[3m
// Strike  \x1b[9m
// Blink  \x1b[5m
// Blink  \x1b[6m
