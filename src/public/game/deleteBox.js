function createDeleteBox(box, layerPos) {
    button = document.createElement('button');
    let existButton = document.querySelector('#btn' + layerPos._id);
    if (!existButton) {
        button.id = "btn" + layerPos._id;
        button.style = "position: absolute; background-color: transparent; z-index: -2";
        button.style.width = box.width();
        button.style.height = box.height();
        button.style.top = box.y() + 20;
        button.style.left = box.x();
        document.body.appendChild(button);
        return button;
    } else return existButton;
}