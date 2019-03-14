class Shape {

    x = 0;
    y = 0;
    width = 0;
    height = 0;
    modify = false;
    id = 0;

    //id optional temporaly
    constructor(x, y, width, height, fill, modify, id = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.modify = modify;
        this.id = id;
    }


    draw(ctx) {
        ctx.fillStyle = this.fill;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
    }

    contains(mouseX, mouseY) {

        return (
          this.x <= mouseX &&
          this.x + this.width >= mouseX &&
          this.y <= mouseY &&
          this.y + this.height >= mouseY
        );
    };



    updateColor(color) {
        this.fill = color;
    }
}