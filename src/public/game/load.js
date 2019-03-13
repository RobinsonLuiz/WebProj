var stage;
var layer;
var container;
async function init(param) {
  let json;
  if (typeof param == "object") {
    json = [param];
  } else
    json = await (await fetch(`http://localhost/scenarios/${param}`)).json();
  if (json.length > 0) {
    document.querySelector(".funcs").removeAttribute("hidden");
    document.querySelector("#container").removeAttribute("hidden");
    stage = Konva.Node.create(
      json[0].scene ? json[0].scene : json[0],
      "container"
    );
    stage.id = param;
    let fieldsJson = JSON.parse(json[0].scene ? json[0].scene : json[0]);
    layer = stage.children[0];
    container = stage.container();
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
    var mode;
    // draw a rectangle to be used as the rubber area
    var r2 = new Konva.Rect({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      stroke: "red",
      dash: [2, 2]
    });
    r2.listening(false); // stop r2 catching our mouse events.
    layer.add(r2);
    // start the rubber drawing on mouse down.
    container.addEventListener("mousedown", function(e) {
      mode = "drawing";
      startDrag({ x: e.screenX, y: e.screenY });
    });

    // update the rubber rect on mouse move - note use of 'mode' var to avoid drawing after mouse released.
    container.addEventListener("mousemove", function(e) {
      if (mode === "drawing") {
        updateDrag({ x: e.screenX, y: e.screenY});
      }
    });

    container.addEventListener("mouseup", function(e) {
      mode = "";
      r2.visible(false);
      layer.draw();
    });

    function startDrag(posIn) {
      posStart = { x: posIn.x, y: posIn.y };
      posNow = { x: posIn.x, y: posIn.y };
    }

    function updateDrag(posIn) {
      // update rubber rect position
      posNow = { x: posIn.x, y: posIn.y };
      console.log(posStart, posNow);
      var posRect = reverse(posStart, posNow);
      r2.x(posRect.x1 - 180);
      r2.y(posRect.y1 - 300);
      r2.width(posRect.x2 - posRect.x1);
      r2.height(posRect.y2 - posRect.y1);
      r2.visible(true);
      layer.draw();
    }

    function reverse(r1, r2) {
      var r1x = r1.x,
        r1y = r1.y,
        r2x = r2.x,
        r2y = r2.y,
        d;
      if (r1x > r2x) {
        d = Math.abs(r1x - r2x);
        r1x = r2x;
        r2x = r1x + d;
      }
      if (r1y > r2y) {
        d = Math.abs(r1y - r2y);
        r1y = r2y;
        r2y = r1y + d;
      }
      return { x1: r1x, y1: r1y, x2: r2x, y2: r2y }; // return the corrected rect.
    }
    let stageFor = stage.children[0].children;
    for (let i = 0; i < stageFor.length; i += 2) {
      let box;
      let boxClone;
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

function createText(letter, size, fontFamily, x, y) {
  var tboxClone = new Konva.Text({
    x: stage.getHeight() / 2 - 25 + x - 200,
    y: stage.getWidth() / 2 - 25,
    draggable: true,
    fontSize: size,
    fontFamily: fontFamily,
    fill: "red",
    text: letter,
    id: hashCode(
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 10) +
        Math.random() * 10
    )
  });

  var tbox = new Konva.Text({
    x: stage.getHeight() / 2 - 25 + x - 200,
    y: stage.getWidth() - 800,
    draggable: true,
    fontSize: size,
    fontFamily: fontFamily,
    fill: "black",
    text: letter,
    id: tboxClone.id() + 1
  });

  tboxClone.on("mouseover", function() {
    document.body.style.cursor = "pointer";
  });

  tboxClone.on("mouseout", function() {
    document.body.style.cursor = "default";
  });

  boxColider(tbox, tboxClone, stage, layer);
  transformBox(tbox, tboxClone, stage, layer);
  layer.add(tbox);
  layer.add(tboxClone);
  layer.draw();
}

let text = document.querySelector(".btn-text");

text.addEventListener("click", function() {
  let textValue = document.querySelector(".text-input");
  for (let i = 0; i < textValue.value.length; i++) {
    createText(textValue.value[i], 140, "Calibri", i * 100, y * 20);
  }
});
