let x;
let y;
function allowDrop(ev) {
  ev.preventDefault();
  x = ev.screenX;
  y = ev.screenY;
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var coords = { x, y };
  renderElements(stage, stage.children[0], data, coords);
}
