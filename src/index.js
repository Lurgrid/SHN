"use strict";

import { Client } from './SHN.js';

const SHN = new Client()
SHN.run()

SHN.once("ready", () => {
    console.log("Fetching on")
})
SHN.on("NewStory", data => {
    console.log(data)
})

SHN.on("error", (err, where) => {
    console.log(where)
})