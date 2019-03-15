class Stage {
  stylePaddingLeft;
  stylePaddingTop;
  styleBorderLeft;
  styleBorderTop;
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext("2d");
    this.html = document.body.parentNode;
    this.htmlTop = this.html.offsetTop;
    this.htmlLeft = this.html.offsetLeft;
    this.shapes = [];
    this.dragging = false;
    this.selection = null;
    this.dragoffx = 0;
    this.dragoffy = 0;
    this.interval = 0;
    this.loadContext();
    this.startEvents();
  }

  getContext() {
    return this.ctx;
  }

  getCanvas() {
    return this.canvas;
  }

  loadContext() {
    if (document.defaultView && document.defaultView.getComputedStyle) {
      this.stylePaddingLeft =
        parseInt(
          document.defaultView.getComputedStyle(canvas, null)["paddingLeft"],
          10
        ) || 0;
      this.stylePaddingTop =
        parseInt(
          document.defaultView.getComputedStyle(canvas, null)["paddingTop"],
          10
        ) || 0;
      this.styleBorderLeft =
        parseInt(
          document.defaultView.getComputedStyle(canvas, null)[
            "borderLeftWidth"
          ],
          10
        ) || 0;
      this.styleBorderTop =
        parseInt(
          document.defaultView.getComputedStyle(canvas, null)["borderTopWidth"],
          10
        ) || 0;
    }
  }

  selectStart() {
    this.canvas.addEventListener("selectstart", e => {
      e.preventDefault();
      return false;
    });
  }

  dblClick() {
    this.canvas.addEventListener("dblclick", e => {
      let mouse = this.getMouse(e);
      let mx = mouse.x;
      let my = mouse.y;
      let shapes = this.shapes;
      for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].contains(mx, my) && shapes[i].modify) {
          let color = document.createElement("input");
          color.type = "color";
          $(color).trigger("click");
          let shape = shapes[i];
          color.addEventListener("change", () => {
            shape.updateColor(color.value);
            this.draw();
            color.remove();
          });
        }
      }
    });
  }

  mouseDown() {
    this.canvas.addEventListener("mousedown", e => {
      let mouse = this.getMouse(e);
      let mx = mouse.x;
      let my = mouse.y;
      let shapes = this.shapes;
      for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].contains(mx, my)) {
          let mySel = shapes[i];
          this.dragoffx = mx - mySel.x;
          this.dragoffy = my - mySel.y;
          this.dragging = true;
          this.selection = mySel;
          this.valid = false;
          return;
        }
      }
      if (this.selection) {
        this.selection = null;
        this.valid = false;
      }
    });
  }

  addShape(shape) {
    this.shapes.push(shape);
    this.valid = false;
    this.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  draw() {
    if (!this.valid) {
      let ctx = this.ctx;
      let shapes = this.shapes;
      this.clear();
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].draw(ctx);
      }
    }
  }

  mouseMove() {
    this.canvas.addEventListener("mousemove", e => {
      if (this.dragging) {
        let mouse = this.getMouse(e);
        this.selection.x = mouse.x - this.dragoffx;
        this.selection.y = mouse.y - this.dragoffy;
        this.valid = false;
        this.draw();
      }
    });
  }

  mouseUp() {
    this.canvas.addEventListener("mouseup", e => {
      this.dragging = false;
    });
  }

  getMouse(e) {
    let element = this.canvas,
      offsetX = 0,
      offsetY = 0,
      mx,
      my;

    // Compute the total offset
    if (element.offsetParent !== undefined) {
      do {
        offsetX += element.offsetLeft;
        offsetY += element.offsetTop;
      } while ((element = element.offsetParent));
    }

    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;
    return { x: mx, y: my };
  }

  startEvents() {
    this.selectStart();
    this.dblClick();
    this.mouseDown();
    this.mouseUp();
    this.mouseMove();
  }
}
