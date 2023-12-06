const projectionSketch = (s, subjects) => {
  let fallingSubjects = [];
  let hexagon;
  let colors = [
    [236, 179, 79],
    [203, 143, 50],
    [159, 116, 49],
    [110, 70, 22],
    [82, 50, 17],
  ];
  s.setup = () => {
    const background = document.getElementById("projection-container");
    const canvas = s.createCanvas(
      background.clientWidth,
      background.clientHeight,
    );
    canvas.parent("projection-container");

    s.textAlign(s.CENTER);
    s.frameRate(60);
    s.noStroke();
    s.angleMode(s.DEGREES);
    s.textSize(16);
    hexagon = new Hexagon(
      s.width / 2,
      s.height / 2,
      Math.min(s.width, s.height) * 0.95,
      7,
      7,
      7,
    );
  };
  s.windowResized = () => {
    const background = document.getElementById("projection-container");
    s.resizeCanvas(background.clientWidth, background.clientHeight);
    hexagon = new Hexagon(
      s.width / 2,
      s.height / 2,
      Math.min(s.width, s.height) * 0.95,
      7,
      7,
      7,
    );
  };

  s.draw = () => {
    s.background(0);
    hexagon.display();

    if (s.frameCount % 30 === 0) {
      const c = colors[Math.floor(Math.random() * colors.length)];
      let newBox = new FallingSubject(
        Math.min(s.width / 2, s.height / 2),
        randomSubject(),
        ...c,
      );
      fallingSubjects.push(newBox);
    }

    s.push();
    s.beginClip();
    hexagon.display();
    s.endClip();
    // Update and display each fallingSubject
    fallingSubjects.forEach((subject) => {
      subject.update();
      subject.display();
    });
    s.pop();

    fallingSubjects = fallingSubjects.filter((c) => !c.dead());
  };

  class Hexagon {
    constructor(x, y, h, r, g, b) {
      this.x = x;
      this.y = y;
      this.height = h;
      this.r = r;
      this.g = g;
      this.b = b;
      this.opacity = 255;

      this.root3__2 = Math.sqrt(3) / 2;
    }

    display() {
      s.push();
      s.translate(this.x, this.y);
      s.scale(this.height / 2);
      s.strokeWeight(0.005);
      s.stroke(25);
      s.rotate(135);
      s.fill(this.r, this.g, this.b, this.opacity);
      s.beginShape();
      s.vertex(0, 1);
      s.vertex(this.root3__2, 0.5);
      s.vertex(this.root3__2, -0.5);
      s.vertex(0, -1);
      s.vertex(this.root3__2 * -1, -0.5);
      s.vertex(this.root3__2 * -1, 0.5);
      s.endShape(s.CLOSE);
      s.pop();
    }
  }

  const randomSubject = () => {
    const index = Math.floor(Math.random() * subjects.length);
    return subjects[index];
  };

  class FallingSubject {
    constructor(radius, subject, r, g, b) {
      this.subject = subject;
      this.END_X = s.width / 2;
      this.END_Y = s.height / 2;
      this.ANGLE = Math.random() * s.TWO_PI;

      this.x = Math.sin(this.ANGLE) * radius;
      this.y = Math.cos(this.ANGLE) * radius;

      this.size = 25;
      this.radius = radius;
      this.r = r;
      this.g = g;
      this.b = b;
      this.percentComplete = 1;
      this.opacity = 255;

      this.angularVelocity = 0;
      this.alpha = s.random(0.01, -0.01);
      this.rotation = 0;
    }

    display() {
      if (!this.dead()) {
        s.textSize(this.size);
        s.push();
        s.translate(this.x + this.END_X, this.y + this.END_Y);
        s.rotate(this.rotation);
        s.fill(this.r, this.g, this.b, Math.floor(this.opacity));
        s.text(this.subject, 0, 0);
        s.pop();
      }
    }

    update() {
      this.angularVelocity += this.alpha;
      this.rotation += this.angularVelocity;

      this.percentComplete -= 0.005;
      const delta = 1 - Math.log(Math.pow(this.percentComplete, -2)) / 100;
      this.size *= delta;
      this.opacity *= delta;
      console.log(this.opacity);

      const partialRadius = this.percentComplete * this.radius;
      this.y = Math.sin(this.ANGLE) * partialRadius;
      this.x = Math.cos(this.ANGLE) * partialRadius;
    }

    dead() {
      return this.percentComplete <= 0 || this.opacity < 1e-2;
    }
  }
};

export default projectionSketch;
