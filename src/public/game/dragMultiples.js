
function startDrag(posIn, r2) {
    posStart = { x: posIn.x, y: posIn.y };
    posNow = { x: posIn.x, y: posIn.y };
}
var posRect;
var posNow;
function updateDrag(posIn, r2) {
    // update rubber rect position
    posNow = { x: posIn.x, y: posIn.y };
    posRect = reverse(posStart, posNow);
    r2.x(posRect.x1 - 180);
    r2.y(posRect.y1 - 300);
    r2.width(posRect.x2 - posRect.x1);
    r2.height(posRect.y2 - posRect.y1);
    r2.visible(true);
    layer.draw();
}

function viewDrag() {
    return { initPos: { x: posRect.x1, y: posRect.y1 }, posRect: { x: posRect.x2, y: posRect.y2 } };
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