function boxColider(box, boxClone, stage, layer) {
    boxClone.on("dragstart", function () {
        let xtest = boxClone.x();
        let ytest = boxClone.y();
        boxClone.on("dragend", function (evt) {
            if (!document.querySelector("#live")) {
                if (
                    (box.x() - boxClone.x()) <= 25
                    && ((box.x() - boxClone.x()) > 0)
                    && ((box.y() - boxClone.y()) <= 5)
                    && ((box.y() - boxClone.y()) > 0)) {
                    box.fill(boxClone.fill());
                    boxClone.destroy();
                    try {
                        tr.destroy();
                    } catch (err) {

                    }
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