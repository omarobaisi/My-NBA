const express = require("express");
const axios = require("axios");
const path = require("path");
const urllib = require("urllib");
const app = express();

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

const teamToIDs = {
  lakers: "1610612747",
  warriors: "1610612744",
  heat: "1610612748",
  suns: "1610612756",
};

app.get("/teams/:teamName", async (req, res) => {
  urllib.request(
    "http://data.nba.net/10s/prod/v1/2018/players.json",
    (err, data, _res) => {
      if (err) throw err;
      let fetchedPlayers = JSON.parse(data.toString()).league.standard;
      let players = [];
      fetchedPlayers.forEach((player) => {
        if (
          player.teams[0] &&
          player.teams[0].teamId == teamToIDs[req.params.teamName] &&
          player.isActive == true
        ) {
          player = {
            name: player.firstName + " " + player.lastName,
            jersey: player.jersey,
            position: player.pos,
            image: `https://nba-players.herokuapp.com/players/${player.lastName}/${player.firstName}`,
          };
          players.push(player);
        }
      });
      res.send({ players: players });
    }
  );
});

app.listen(3000, () => {
  console.log("App listining on port 3000");
});
