class Text extends Shape {
  x = 0;
  y = 0;
  modify = false;
  id = 0;
  text;
  region;

  //id optional temporaly
  constructor(text, x, y, fill, modify, context, tam, fract, id = 0) {
    super();
    this.fill = fill;
    this.modify = modify;
    this.text = text;
    this.tam = tam;
    this.x = x;
    this.y = y;
    this.id = id;
    this.fract = fract;
    this.context = context;
    this.effect = false;
  }

  contains(mouseX, mouseY) {
    this.context.getContext().beginPath();
    this.context.getContext().rect(this.region.x, this.region.y, this.region.w, this.region.h);
    if (this.context.getContext().isPointInPath(mouseX, mouseY)) return true;
  }

  draw(ctx) {
    let range = 0;
    if (this.fract) {
      for (let i = 0; i < this.text.length; i++) {
        let modif = false;
        if (this.fill != 'Black') modif = true; 
        let text = new Text(this.text[i], this.x + range, this.y, this.fill, modif, this.context, this.tam, false);
        this.fract = false;
        range += 40;
        this.effect = true;
        this.context.shapes.push(text);
      }
    } else {
        if (!this.effect) {
            ctx.beginPath();
            ctx.fillStyle = this.fill;
            ctx.font = this.tam;
            ctx.fillText(this.text, this.x, this.y);
            ctx.closePath();
        }
    }
    this.tw = ctx.measureText(this.text).width;
    this.region = {x: this.x - this.tw * 0.07, y: this.y - 30,  w: this.tw, h:32}; // approx. text region
}
}