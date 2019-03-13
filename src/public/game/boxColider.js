function boxColider(box, boxClone, stage, layer) {
  boxClone.on("dragstart", function() {
    let xtest = boxClone.x();
    let ytest = boxClone.y();
    boxClone.on("dragend", function(evt) {
      if (!document.querySelector("#live")) {
        let s1 = box.getClientRect(); // use this to get bounding rect for shapes other than rectangles.
        let s2 = boxClone.getClientRect();

        let X = s1.x;
        let Y = s1.y;
        let A = s1.x + s1.width;
        let B = s1.y + s1.height;

        let X1 = s2.x;
        let A1 = s2.x + s2.width;
        let Y1 = s2.y;
        let B1 = s2.y + s2.height;

        if (A < X1 || A1 < X || B < Y1 || B1 < Y) {
          box.fill(boxClone.fill());
          boxClone.destroy();
          try {
            tr.destroy();
          } catch (err) {}
          layer.draw();
        } else {
          boxClone.x(xtest);
          boxClone.y(ytest);
          layer.draw();
        }
      }
    });
  });
}
