class Rect extends Shape {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  modify = false;
  id = 0;
  rectangle;

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
    if (this.context.getContext().isPointInPath(this.rectangle, mouseX, mouseY)) return true;
  }

  draw(ctx) {
    this.rectangle = new Path2D();
    this.rectangle.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.fill;
    ctx.fill(this.rectangle);
  }
}
