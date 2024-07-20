import p5 from "p5"

const app = document.getElementById("app") as HTMLElement

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(app.clientWidth, app.clientHeight)
    p.ellipse(p.width / 2, p.height / 2, 50, 50)
  }

  p.draw = () => {
    p.background(0)
    p.ellipse(p.width / 2, p.height / 2, 50, 50)
  }
  p.windowResized = () => {
    p.resizeCanvas(app.clientWidth, app.clientHeight)
  }
}
new p5(sketch, app as HTMLElement)
