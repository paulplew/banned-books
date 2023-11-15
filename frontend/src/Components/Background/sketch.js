const sketch = (s) => {
  let size = 100;

  s.setup = () => {
    const canvas = s.createCanvas(s.windowWidth, s.windowHeight);
    canvas.parent("background");

    s.noStroke();
    s.colorMode(s.RGB, 255, 255, 255, 1);
    s.frameRate(60);
  };

  s.draw = () => {
    s.background(s.color(255, 255, 255));
    s.fill(255, 0, 0);

    const frames = s.frameCount % 60;
    const growing = frames > 30;

    if (growing) {
      size += 10;
    } else {
      size -= 10;
    }

    s.circle(s.width / 2, s.height / 2, size);
  };

  s.windowResized = () => {
    s.resizeCanvas(s.windowWidth, s.windowHeight);
  };
};

export default sketch;
