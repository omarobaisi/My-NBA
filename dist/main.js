const getPlayers = function () {
  const teamName = $("#teamInput").val();
  $.get(`teams/${teamName}`, function (data) {
    data = data.players;
    let players = new Players(data);
    let playersClass = new Renderer(
      "#players",
      "#players-template",
      players.getPlayers()
    );
    playersClass.render();
  });
};
