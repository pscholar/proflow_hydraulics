/**contains functions for handling the plot area */

function handlePlot(text, shape, svg) {
  switch (text) {
    case "Q vs y":
      plotQY(shape, svg);
      break;
    case "Q vs b":
      plotQb(shape, svg);
  }
}

function plotQY(shape, svg) {
  switch (shape) {
    case 0:
      let rectangle = new UniformRectangular();
      svg.drawCurve("Hello", function (i) {
        return rectangle.findDischargeSNBY(0.0006, 0.016, 10, i);
      });
      break;
    case 1:
      break;
    case 2:
  }
}

function plotQb(shape, svg) {}
