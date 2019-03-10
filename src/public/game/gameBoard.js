hashCode = function(s) {
  return s.split("").reduce(function(a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

function executeProc(stage, layer) {
  //adicionando apartir de um click
  document.querySelector(".newBox").addEventListener("click", function() {
    let typeBox = document.querySelector(".typeBox").value;
    renderElements(stage, layer, typeBox);
  });
  setInterval(() => {
    let liveMode = document.querySelector("#live");
    if (liveMode) {
      liveMode.addEventListener("click", function() {
        liveMode.textContent = "Sair do modo live";
        liveMode.id = "pararLive";
        liveMode.value = "live";
      });
    }
    let offLiveMode = document.querySelector("#pararLive");
    if (offLiveMode) {
      offLiveMode.addEventListener("click", function() {
        offLiveMode.textContent = "Modo live";
        offLiveMode.id = "live";
        offLiveMode.value = "notLive";
      });
    }
  }, 500);
}

function renderElements(stage, layer, data, coords=null) {
  let rectX = coords ? coords.x - 320 : stage.getHeight() / 2 - 25 - Math.random() * 250;
  let rectY = coords ? coords.y - 370 : stage.getWidth() / 2 - 50 - Math.random() * 250;
  let newTypeBox = {
    x: rectX ,
    y: rectY ,
    width: 100,
    height: 50,
    fill: "red",
    stroke: "black",
    strokeWidth: 4,
    draggable: true,
    id: hashCode(
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 10) +
        Math.random() * 10
    )
  };
  let rendererBoxType;
  switch (data) {
    case "rectangle":
      rendererBoxType = createRectangulo(newTypeBox, stage, layer);
      break;
    case "circle":
      rendererBoxType = createCircle(newTypeBox, 40, stage, layer);
      break;
    case "triangle":
      rendererBoxType = createPolygon(newTypeBox, 3, 80, stage, layer, 1);
      break;
    case "pentagono":
      rendererBoxType = createPolygon(newTypeBox, 5, 40, stage, layer);
      break;
    case "hexagono":
      rendererBoxType = createPolygon(newTypeBox, 6, 40, stage, layer);
      break;
    case "quadrilatero":
      rendererBoxType = createPolygon(newTypeBox, 4, 40, stage, layer);
  }

  let box = rendererBoxType[1];
  let boxClone = rendererBoxType[0];

  boxClone.on("mouseover", function() {
    document.body.style.cursor = "pointer";
  });

  boxClone.on("mouseout", function() {
    document.body.style.cursor = "default";
  });

  layer.add(box);
  layer.add(boxClone);
  boxColider(box, boxClone, stage, layer);
  transformBox(box, boxClone, stage, layer);
  stage.add(layer);
  layer.draw();
}
