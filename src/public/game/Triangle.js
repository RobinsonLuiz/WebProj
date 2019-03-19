var delta = 0;
class Triangle extends Shape {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    modify = false;
    id = 0;
    triangle;
  
    //id optional temporaly
    constructor(x, y, width, height, fill, modify, context, id = 0) {
      super();
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.fill = fill;
      this.modify = modify;
      this.id = id;
      this.context = context;
    }
  
    contains(mouseX, mouseY) {
        if (this.context.getContext().isPointInPath(this.triangle, mouseX, mouseY)) {
            return true;
        }
    }
  
    draw(ctx) {
        this.triangle = new Path2D();
        ctx.beginPath();
        this.triangle.moveTo(200 + this.x , 100 + this.y);
        this.triangle.lineTo(this.x, this.y + 100);
        this.triangle.lineTo(this.x + 100, this.y - 100);
        ctx.closePath();

        // the outline
        this.triangle.lineWidth = 10;
        this.triangle.strokeStyle = "#666666";
        ctx.fillStyle = this.fill;
        ctx.fill(this.triangle);
    }
  }
  