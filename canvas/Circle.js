class Circle extends Shape {
    circle;
  //id optional temporaly
  
  constructor(x, y, width, height, radius, fill, modify, context, id = 0) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.modify = modify;
    this.id = id;
    this.context = context;
  }


  contains(mouseX, mouseY) {
        if (this.context.getContext().isPointInPath(this.circle, mouseX, mouseY)) return true;
  }

  draw(ctx) {
    this.circle = new Path2D();
    this.circle.arc(this.x, this.y, this.width, this.height, Math.PI * 2);
    ctx.fillStyle = this.fill;
    ctx.closePath();
    ctx.fill(this.circle);
  }
}
