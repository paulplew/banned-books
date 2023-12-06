const sketch = (s, colors, image) => {
  let dots = ".";
  let startX = 0;
  let startY = 0;
  let imageHeight = 0;
  let imageWidth = 0;
  let boxSize = 0;
  let finalColors = [];

  s.setup = () => {
    const background = document.getElementById("background");
    const canvas = s.createCanvas(
      background.clientWidth,
      background.clientHeight,
    );
    canvas.parent("background");

    s.noStroke();
    s.colorMode(s.RGB, 255, 255, 255, 1);
    s.frameRate(30);

    try {
      boxSize = Math.min(
        s.windowHeight / colors.length,
        s.windowWidth / colors[0].length,
      );
      imageWidth = boxSize * colors[0].length;
      imageHeight = boxSize * colors.length;
    } catch (error) {}

    const PADDING = 30;
    startX = s.width - imageWidth - PADDING;
    startY = s.height / 2 - imageHeight / 2;

    if (colors.length > 0) {
      drawFull();
      finalColors = colors.map((row) => {
        return row.map((_) => {
          return [
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
          ];
        });
      });
    }
  };

  s.draw = () => {
    if (colors.length === 0) {
      if (s.frameCount % 10 === 0) {
        s.background(0, 0, 0);
        if (dots.length === 3) {
          dots = ".";
        } else {
          dots = dots + ".";
        }
      }
      s.textSize(17);
      s.fill(200, 200, 200);
      s.text(`Loading ${dots}`, s.width / 2, s.height / 2);
      s.textSize(5);
    } else {
      colors = colors.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          const newCell = Math.random() > 0.999;
          if (newCell) {
            const [r, g, b] = cell;
            const positionX = startX + cellIndex * boxSize;
            const positionY = startY + rowIndex * boxSize;
            s.fill(r, g, b);
            s.rect(positionX, positionY, boxSize);
          }

          return newCell ? finalColors[rowIndex][cellIndex] : cell;
        });
      });
    }
  };

  const drawFull = () => {
    s.background(0, 0, 0);
    colors.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const [r, g, b] = cell;
        const positionX = startX + cellIndex * boxSize;
        const positionY = startY + rowIndex * boxSize;
        s.fill(r, g, b);
        s.rect(positionX, positionY, boxSize);
      });
    });
  };

  s.windowResized = () => {
    const background = document.getElementById("background");
    s.resizeCanvas(background.clientWidth, background.clientHeight);

    try {
      boxSize = Math.min(s.height / colors.length, s.width / colors[0].length);
      imageWidth = boxSize * colors.length;
      imageHeight = boxSize * colors[0].length;
    } catch (error) {}

    startX = s.width / 2 - imageHeight / 2;
    startY = s.height / 2 - imageWidth / 2;

    drawFull();
  };
};

export default sketch;
