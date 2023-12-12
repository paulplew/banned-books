let done = false;

const sketch = (s) => {
  let squares = [];

  let a;
  const size = 10;
  let numSquaresX, numSquaresY;
  let currentSquare = 0;
  let currentRow = 0;
  let framesBetweenLastRow = 0;

  function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    reset();
    frameRate(24);
  }

  const reset = () => {
    squares = [];
    let r = Math.ceil(height / size);
    for (let y = height; y >= 0; y -= size) {
      const row = [];
      for (let x = 0; x <= width; x += size) {
        squares.push(new Square(x, y, size));
      }
      //     squares.push(row);
    }
  };

  function draw() {
    background(0);

    const allComplete = squares.reduce(
      (accumulator, s) => accumulator && s.isVisible,
      true,
    );

    if (allComplete) {
      squares.forEach((s) => {
        if (Math.random() > 0.9) {
          s.beginFall();
        }
      });
    }

    squares.forEach((s) => {
      s.update();
      s.display();
    });

    squares = squares.filter((s) => !s.offScreen());

    // console.log(squares);
    if (squares.length === 0) {
      console.log("RESETTING");
      done = true;
      reset();
    }
  }

  const randomColor = () =>
    color(
      int(Math.random() * 256),
      int(Math.random() * 256),
      int(Math.random() * 256),
    );

  class Square {
    constructor(x, y, h) {
      this.x = x;
      this.y = y;
      this.height = h;

      this.color = randomColor();
      this.life = 0;
      this.deltaY = 10;

      this.isFalling = false;
      this.isVisible = false;
    }

    update() {
      if (!this.isVisible) {
        this.life += 0.1;
        // console.log(this.isVisible)
        if ((Math.pow(this.life, 2) / 10) * Math.random() > 300) {
          this.makeVisible();
        }
      }

      if (this.isFalling) {
        // console.log("FALLING")
        this.y += this.deltaY;
      }
    }

    makeVisible() {
      this.isVisible = true;
    }

    offScreen() {
      return this.y > height;
    }

    beginFall() {
      this.isFalling = true;
    }

    display() {
      if (this.isVisible) {
        push();
        fill(this.color);
        translate(this.x, this.y);
        rect(0, 0, this.height);
        pop();
      }
    }
  }
};

export default sketch;
