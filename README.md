# SHN
 Fetch last story of Hacker News

## Main
``` javascript
import { Client } from './SHN.js';

const SHN = new Client()
SHN.run()

SHN.once("ready", () => {
    console.log("Fetching on")
})
SHN.on("NewStory", data => {
    console.log(data)
})
```
