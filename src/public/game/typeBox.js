function createPolygon(typeBox, sides, radius, stage, layer, scaleY=false) {
    if (scaleY) typeBox['scaleY'] = scaleY;
    typeBox['radius'] = radius;
    typeBox['sides'] = sides;
    let box = new Konva.RegularPolygon(typeBox);
    addPaleteColor(box, layer, stage);
    typeBox['fill'] = 'black';
    typeBox['x'] = 100;
    typeBox['y'] = 100;
    typeBox.id += 1;
    let box2 = new Konva.RegularPolygon(typeBox);
    return [box, box2];
};

function createRectangulo(typeBox, stage, layer) {
    let box = new Konva.Rect(typeBox);
    addPaleteColor(box, layer, stage);
    typeBox['fill'] = 'black';
    typeBox['x'] = 100;
    typeBox['y'] = 100;
    typeBox.id += 1;
    let box2 = new Konva.Rect(typeBox);
    return [box, box2];
};

function createCircle(typeBox, radius, stage, layer) {
    typeBox['radius'] = radius;
    let box = new Konva.Circle(typeBox);
    addPaleteColor(box, layer, stage);
    typeBox['fill'] = 'black';
    typeBox['x'] = 100;
    typeBox['y'] = 100;
    typeBox.id += 1;
    let box2 = new Konva.Circle(typeBox);
    return [box, box2];
};


function addPaleteColor(box, layer, stage) {
    box.on("dblclick", function (evt) {
        let position = stage.getPointerPosition();
        let layerPos = layer.getIntersection(position);
        color = createInputColor(layerPos);
        $(color).trigger('click');
        color.addEventListener('change', function() {
            layerPos.attrs.fill = color.value;
            layer.draw();
            color.remove();
        });
    });
    layer.draw();
};

function createInputColor(layerPos) {
    color = document.createElement('input');
    color.type = "color";
    color.id = layerPos._id;
    return color;
};