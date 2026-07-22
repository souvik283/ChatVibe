import arcjet, { shield, detectBot, tokenBucket, slidingWindow } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import express from "express";
import ENV from "./env.js";

const app = express();
const port = 3000;

const aj = arcjet({
  key: ENV.arcjet_key,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    slidingWindow({
      mode: "LIVE",
      max: 100,
      interval: 60,
    })
  ],
});

export default aj