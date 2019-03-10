let sceneCurrent = document.querySelectorAll(".current-scene");
let newScene = document.querySelector(".new-scene");
let nameScene = document.querySelector(".name-scene");
let idScene;

sceneCurrent.forEach(scene => {
  scene.addEventListener("click", function(event) {
    event.preventDefault();
    $("#modal-new-scene").modal("show");
    idScene = scene.id;
  });
});

newScene.addEventListener("click", function(event) {
  event.preventDefault();
  if (idScene) {
    $.ajax({
      url: `http://localhost/scenarios/create`,
      type: "POST",
      data: { name: nameScene.value, id: idScene },
      success: function(data) {
        alert("Criado com sucesso");
        $("#modal-new-scene").modal("hide");
        location.reload();
      }
    });
  }
});
