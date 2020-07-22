const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");
const app = express();

const port = 8084;

app.use(bodyParser.json());
app.use(cors());

require("dotenv").config();

// Create HTTPS server
const server = https.createServer(
  {
    cert: fs.readFileSync("./localhost.crt"),
    key: fs.readFileSync("./localhost.key"),
  },
  app
);

const knex = require("knex")({
  client: "postgresql",
  connection: {
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
});

app.get("/app-04/links", async (req, res) => {
  let results = await knex
    .select("*")
    .from("links")
    .catch((err) => console.log(err));

  results = await compileTags(results);

  res.send(results);
});

app.post("/app-04/links", async function (req, res) {
  let results_bridge;

  let link = {
    name: req.body.name,
    url: req.body.url,
  };

  let results_link = await knex("links")
    .insert(link)
    .returning("*")
    .catch((err) => console.log(err));

  for (let item of req.body.tags) {
    let results_tag = await knex
      .select("id")
      .from("tags")
      .where("name", item.name)
      .catch((err) => console.log(err));

    if (results_tag.length === 0) {
      results_tag = await knex("tags")
        .insert(item)
        .returning("id")
        .catch((err) => console.log(err));
    }

    let bridge = {
      tag_id: results_tag[0].id,
      link_id: results_link[0].id,
    };

    results_bridge = await knex("link_tags")
      .insert(bridge)
      .returning("id")
      .catch((err) => console.log(err));
  }

  let results = await compileTags(results_link);

  res.send(results);
});

async function compileTags(results) {
  let links = [];

  for (let item of results) {
    let tags = await knex
      .select("*")
      .from("tags")
      .join("link_tags", "link_tags.tag_id", "=", "tags.id")
      .where("link_id", item.id)
      .catch((err) => console.log(err));

    let link_tags = [];

    for (let tag of tags) {
      delete tag["id"];
      delete tag["tag_id"];
      delete tag["link_id"];
      link_tags.push(tag);
    }

    item["tags"] = link_tags;

    links.push(item);
  }

  return JSON.stringify(links);
}

server.listen(port, () => {
  console.log("Application listening to port " + port);
});

module.exports = app;
