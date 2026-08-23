# @beyond/utils

Kleine, abhaengigkeitsfreie Helper-Funktionen, die von mehreren Bots und
Tools in diesem Repo genutzt werden.

## Installation (innerhalb des Monorepos)

```bash
npm install @beyond/utils@*
```

## API

```js
import { logger, chunkArray, sleep, formatDuration, randomFrom } from "@beyond/utils";

logger.info("Bot gestartet");
logger.error("Etwas ist schiefgelaufen", err);

await sleep(1000);

formatDuration(90_000); // "1m 30s"

chunkArray([1, 2, 3, 4, 5], 2); // [[1,2], [3,4], [5]]

randomFrom(["a", "b", "c"]); // zufaelliges Element
```
