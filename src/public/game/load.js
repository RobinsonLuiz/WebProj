
hashCode = function(s) {
  return s.split("").reduce(function(a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

function createId() {
  return hashCode(
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 10) +
      Math.random() * 10)
};

function renderElements(stage, typeBox, coords=null) {
  let rectX = coords ? coords.x - 320 : stage.getHeight() / 2 - 25 - Math.random() * 250;
  let rectY = coords ? coords.y - 370 : stage.getWidth() / 2 - 50 - Math.random() * 250;
  let box;
  let boxClone;
  let id = createId();
  switch (typeBox) {
    case "rectangle":
      box = new Rect(rectX, rectY, 200, 100, "Red", true, stage, id);
      boxClone = new Rect(rectX, rectY, 200, 100, "Black", false, stage, id + 1);
      break;
    case "circle":
      box = new Circle(500, 100, 70, 0, Math.PI * 2, "Red", true, stage, id);
      boxClone = new Circle(500, 100, 70, 0, Math.PI * 2, "Black", false, stage, id + 1);
      break;
    case "triangle":
      box = new Triangle(400, 50, 100, 300, "Red", true, stage, id);
      boxClone = new Triangle(400, 50, 100, 300, "Black", false, stage, id + 1);
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
  stage.addShape(boxClone);
  stage.addShape(box);
  //colider
}
let stage = new Stage(document.querySelector('canvas'));
document.querySelector(".newBox").addEventListener("click", function() {
  let typeBox = document.querySelector(".typeBox").value;
  renderElements(stage, typeBox);
});

let text = document.querySelector(".btn-text");

text.addEventListener("click", function () {
  let textValue = document.querySelector(".text-input").value;
  let fract = false;
  if (document.querySelector('.fract').checked) fract = true;
  let textClone = new Text(textValue, 200, 150, "Black", false, stage, "40px Calibri", fract);
  let textBox = new Text(textValue, 200, 150, "Red", true, stage, "40px Calibri", fract);
  stage.addShape(textClone);
  stage.addShape(textBox);
});

setInterval(() => {
  console.log(stage.json());
}, 5000);