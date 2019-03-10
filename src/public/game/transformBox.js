
function transformBox(box, boxClone, stage, layer) {
    stage.on('click tap', function (e) {
        if (e.target === stage) {
            stage.find('Transformer').destroy();
            layer.draw();
            return;
        };
    });
    boxClone.on('click', function () {
        stage.find('Transformer').destroy();
        tr = new Konva.Transformer({
            anchorStroke: 'red',
            anchorFill: 'white',
            anchorSize: 8,
            borderStroke: "black",
            borderDash: [3, 3]
        });
        layer.add(tr);
        tr.attachTo(boxClone);
        layer.draw();
        return tr;
    });

    boxClone.on("transform", function () {
        box.scaleX(boxClone.scaleX());
        box.scaleY(boxClone.scaleY());
        box.rotation(boxClone.rotation());
        layer.draw();
    });
}
