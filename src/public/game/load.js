var stage;
async function init(param) {
  let json = await (await fetch(`http://localhost/scenarios/${param}`)).json();
  if (json.length > 0) {
    document.querySelector('.funcs').removeAttribute('hidden');
    document.querySelector('#container').removeAttribute('hidden');
    stage = Konva.Node.create(json[0].scene, "container");
    stage.id = param;
    let fieldsJson = JSON.parse(json[0].scene);
    let container = stage.container();
    container.style += `width:${fieldsJson["attrs"]["width"]}px; height:${
      fieldsJson["attrs"]["height"]
    }px`;
    container.focus();
    container.addEventListener("keydown", function(e) {
      if (e.keyCode == 46) {
        try {
          if (tr) {
            let id = tr.parent.parent.clickEndShape.id();
            tr.parent.parent.clickEndShape.destroy();
            let boxDel = layer.findOne(`#${id + 1}`);
            boxDel.destroy();
            tr.destroy();
            layer.draw();
          }
        } catch (err) {}
      }
    });
    let stageFor = stage.children[0].children;
    var layer = stage.children[0];
    for (let i = 0; i < stageFor.length; i += 2) {
      let box;
      let boxClone;
      var layer = stage.children[0];
      if (stageFor[i].attrs.fill != "black") {
        loadBox(box, boxClone, i, i + 1);
      } else {
        loadBox(box, boxClone, i + 1, i);
      }
    }

    function loadBox(box, boxClone, i, j) {
      box = stageFor[j];
      boxClone = stageFor[i];
      boxClone.on("mouseover", function() {
        document.body.style.cursor = "pointer";
      });
      addPaleteColor(boxClone, layer, stage);

      boxClone.on("mouseout", function() {
        document.body.style.cursor = "default";
      });
      boxColider(box, boxClone, stage, layer);
      transformBox(box, boxClone, stage, layer);
      stage.add(layer);
      layer.draw();
    }
    executeProc(stage, layer);
  }
}


let gameLoads = document.querySelectorAll(".game-loads");
gameLoads.forEach(gameLoad => {
  gameLoad.addEventListener("click", event => {
    event.preventDefault();
    init(gameLoad.id);
  });
});
