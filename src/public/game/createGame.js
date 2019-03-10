let newGame = document.querySelector(".new-game");
let nameGame = document.querySelector(".name-game");

newGame.addEventListener("click", function(event) {
  event.preventDefault();
  $.ajax({
    url: `http://localhost/games/create`,
    type: "POST",
    data: { name: nameGame.value, id: idScene },
    success: function(data) {
      alert("Criado com sucesso");
      $("#modal-new-scene").modal("hide");
      location.reload();
    }
  });
});
