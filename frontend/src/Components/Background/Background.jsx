import React, { useContext, useEffect, useState } from "react";
import p5 from "p5";
import { BookContext } from "../../Contexts/BookContext.js";

const fixName = (name) => {
  const names = name.replaceAll(",", "").split(" ");
  return `${names[1]} ${names[0]}`;
};

const Background = () => {
  const { author, title, description, isbn, fetchBook } =
    useContext(BookContext);
  const [isDone, setIsDone] = useState(true);
  const [url, setURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/200px-SMPTE_Color_Bars.svg.png",
  );

  useEffect(() => {
    const wrapper = () => {
      const next = async () => {
        await fetchBook().then(() => {
          setIsDone(false);
        });
      };
      next().catch(console.error);
    };
    if (isDone) {
      wrapper();
    }
  }, [isDone]);

  useEffect(() => {
    setURL(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);
  }, [isbn]);

  useEffect(() => {
    if (!isDone) {
      const renderer = new p5((s) => {
        let squares = [];
        const size = 40;
        s.setup = () => {
          const background = document.getElementById("background");
          const canvas = s.createCanvas(
            background.clientWidth,
            background.clientHeight,
          );
          canvas.parent("background");
          s.noStroke();
          reset();
          s.frameRate(24);
        };

        s.draw = () => {
          const allComplete = squares.reduce(
            (accumulator, s) => accumulator && s.isVisible,
            true,
          );

          if (allComplete) {
            s.background(0);
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

          if (squares.length === 0) {
            console.log("RESETTING");
            setIsDone(true);
            reset();
          }
        };

        const reset = () => {
          squares = [];
          for (let y = s.height; y >= 0; y -= size) {
            for (let x = 0; x <= s.width; x += size) {
              squares.push(new Square(x, y, size));
            }
          }
        };

        const randomColor = () =>
          s.color(
            s.int(Math.random() * 136),
            s.int(Math.random() * 136),
            s.int(Math.random() * 136),
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
              if ((Math.pow(this.life, 2) / 10) * Math.random() > 30) {
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
            return this.y > s.height;
          }

          beginFall() {
            this.isFalling = true;
          }

          display() {
            if (this.isVisible) {
              s.push();
              s.fill(this.color);
              s.translate(this.x, this.y);
              s.rect(0, 0, this.height);
              s.pop();
            }
          }
        }
      });
      return () => renderer.remove();
    }
  }, [isDone]);

  return (
    <>
      <div
        id="background"
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          zIndex: "100",
        }}
      ></div>
      {isDone ? (
        <></>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <img src={url} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "black",
              color: "rgb(200, 200, 200)",
              maxWidth: "450px",
              margin: "20px",
            }}
          >
            <h1 style={{ margin: "15px 5px", fontSize: "large" }}>
              {description}
            </h1>
            <h2
              style={{
                margin: "5px",
                alignSelf: "flex-end",
                textAlign: "right",
              }}
            >
              {title}
            </h2>
            <p style={{ margin: "5px", alignSelf: "flex-end" }}>
              {fixName(author)}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Background;
