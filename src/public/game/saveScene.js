let save = document.querySelector(".save");
save.addEventListener("click", function(event) {
  event.preventDefault();
  if (stage) {
    $.ajax({
      url: `http://localhost/scenarios/${stage.id}`,
      type: "PUT",
      data: `scene=${stage.toJSON()}`,
      success: function(data) {
        alert("Salvo com sucesso");
      }
    });
  }
});
