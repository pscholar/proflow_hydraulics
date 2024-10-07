/**
 * Contains the class that handles drawing of graphs
 */

class svgHandler {
  svg = null;
  cmpx = 37.795;
  origin = [0, 0];
  static numOfXLines = 0;
  static numOfYLines = 0;
  static markedX = 0;
  static markedY = 0;
  svgWidth = 0;
  svgHeight = 0;
  curveDrawn = 0;
  textScaler = 1;
  xtextScaler = 1;
  //bad practice
  obj = { xlabel: "y", ylabel: "Q", title: "Variation of Q with normal depth" };
  constructor(svg) {
    this.svg = svg;
    this.svgWidth = svg.getAttribute("width");
    this.svgHeight = svg.getAttribute("height");
  }
  initAxis() {
    this.numOfXLines = 0;
    this.numOfYLines = 0;
    this.markedX = 0;
    this.markedY = 0;
    this.drawGridX(this.svgWidth, this.svgHeight);
    this.drawGridY(this.svgWidth, this.svgHeight);
    this.drawGridX2(this.svgWidth, this.svgHeight);
    this.drawGridY2(this.svgWidth, this.svgHeight);
    this.drawXAxis(this.numOfXLines, this.svgHeight);
    this.drawYAxis(this.numOfYLines, this.svgHeight);
    this.markX(this.numOfXLines, this.svgHeight);
    this.markY(this.numOfYLines, this.svgHeight);
  }
  convertCmPx(length) {
    return length * this.cmpx;
  }
  intervalCal(maxX, minX, numOfPoints) {
    let interval = (maxX - minX) / numOfPoints;
    return interval;
  }
  scale(maxX, minX, maxY, minY) {
    let availX = this.markedX * this.cmpx;
    let availY = this.markedY * this.cmpx;
    let scaleX = (this.convertCmPx(maxX) - this.convertCmPx(minX)) / availX;
    let scaleY = (this.convertCmPx(maxY) - this.convertCmPx(minY)) / availY;
    if (this.convertCmPx(maxY) / scaleY > availY) {
      scaleY = this.convertCmPx(maxY) / availY;
    }
    if (this.convertCmPx(maxX) / scaleX > availX) {
      scaleX = this.convertCmPx(maxX) / availX;
    }

    return [scaleX, scaleY];
  }
  drawGridX(svgW, svgH) {
    let x1 = this.cmpx;
    let i = 0;
    for (i = x1; i <= svgW; i += this.cmpx) {
      let line = this.drawLine(x1, 0, x1, svgH);
      this.svg.appendChild(line);
      this.numOfXLines += 1;
      x1 = x1 + this.cmpx;
    }
  }
  drawGridY(svgW, svgH) {
    let y1 = svgH;
    let x1 = 0;
    let x2 = svgW;
    let i = 0;
    for (i = y1; i >= 0; i -= this.cmpx) {
      y1 = y1 - this.cmpx;
      let line = this.drawLine(x1, y1, x2, y1);
      this.svg.appendChild(line);
      this.numOfYLines += 1;
    }
  }
  drawXAxis(nOfX, svgH) {
    let x1 = 2 * this.cmpx - 10;
    this.origin[0] = parseFloat(2 * this.cmpx);
    let y = svgH - 2 * this.cmpx;
    let x2 = nOfX * this.cmpx + 10;
    let line = this.drawLine(x1, y, x2, y);
    line.setAttributeNS(null, "stroke", "black");
    line.setAttributeNS(null, "stroke-width", "2");
    this.svg.appendChild(line);
  }
  drawYAxis(nOfY, svgH) {
    let x = 2 * this.cmpx;
    let y1 = svgH - 2 * this.cmpx + 10;
    this.origin[1] = parseFloat(svgH - 2 * this.cmpx);
    let y2 = svgH - (nOfY - 1) * this.cmpx - 10;
    let line = this.drawLine(x, y1, x, y2);
    line.setAttributeNS(null, "stroke", "black");
    line.setAttributeNS(null, "stroke-width", "2");
    this.svg.appendChild(line);
  }
  markX(nofX, svgH) {
    let y1 = svgH - 2 * this.cmpx - 5;
    let y2 = svgH - 2 * this.cmpx + 5;
    let x = 3 * this.cmpx;
    let i = 0;
    for (i = 0; i < nofX - 2; i++) {
      let line = this.drawLine(x, y1, x, y2);
      line.setAttributeNS(null, "stroke", "black");
      line.setAttributeNS(null, "stroke-width", "1");
      this.svg.appendChild(line);
      this.markedX += 1;
      x = x + this.cmpx;
    }
  }
  markY(numOfY, svgH) {
    let y = svgH - 3 * this.cmpx;
    let x1 = 2 * this.cmpx - 5;
    let x2 = 2 * this.cmpx + 5;
    for (let i = 0; i < numOfY - 3; i += 1) {
      let line = this.drawLine(x1, y, x2, y);
      line.setAttributeNS(null, "stroke", "black");
      line.setAttributeNS(null, "stroke-width", "1");
      this.svg.appendChild(line);
      this.markedY += 1;
      y = y - this.cmpx;
    }
  }
  drawLine(x1, y1, x2, y2) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttributeNS(null, "x1", x1);
    line.setAttributeNS(null, "y1", y1);
    line.setAttributeNS(null, "x2", x2);
    line.setAttributeNS(null, "y2", y2);
    line.setAttributeNS(null, "stroke", "lightgreen");
    line.setAttributeNS(null, "stroke-width", "0.2px");
    return line;
  }
  drawCurve(min, max, callback, obj) {
    this.refreshSvg();
    this.initAxis();
    var maxX = max;
    if (this.curveDrawn == 1) {
      this.refreshSvg();
    }
    if (maxX < 999.9) this.xtextScaler = 1;
    if (maxX > 999.9) this.xtextScaler = 1000;
    if (maxX > 999999.9) this.xtextScaler = 1000;
    var minX = min;
    let numOfPoints = 100;
    var gap = this.intervalCal(maxX, minX, numOfPoints);
    let maxY = callback(maxX);
    if (maxY < 999.9) this.textScaler = 1;
    if (maxY > 999.9) this.textScaler = 1000;
    if (maxY > 999999.9) this.textScaler = 1000000;
    let minY = callback(minX);
    var scaleArray = this.scale(maxX, minX, maxY, minY);
    var scaleX = scaleArray[0];
    var scaleY = scaleArray[1];
    let poly = document.getElementById("curvepoly");
    if (poly) {
      for (let i = minX; i <= maxX; i += gap) {
        let point = svg.createSVGPoint();
        let x = parseFloat(this.convertCmPx(i) / scaleX + this.origin[0]);
        let y = this.origin[1] - this.convertCmPx(callback(i)) / scaleY;
        point.x = x;
        point.y = y;
        poly.points.appendItem(point);
      }
    }
    //this is bad practice, let the title element be passed as an object
    //to the constructor
    document.getElementById("graphTitle").textContent = obj.title;
    this.drawTextXMark(scaleX, obj.xlabel);
    this.drawTextYMark(scaleY, obj.ylabel);
    this.curveDrawn = 1;
  }
  drawText(string, x, y) {
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.textContent = string;
    text.setAttributeNS(null, "x", x);
    text.setAttributeNS(null, "y", y);
    text.setAttributeNS(null, "class", "markings");
    return text;
  }
  drawTextXMark(scale, xlabel) {
    let x = this.origin[0];
    let y = this.svgHeight - 2 * this.cmpx + 20;
    let text = this.drawText(0, x, y);
    this.svg.appendChild(text);
    for (let i = 1; i <= this.markedX; i++) {
      x = x + this.cmpx;
      let trueVal =
        ((x - this.origin[0]) * scale) / this.cmpx / this.xtextScaler;
      let forplot = trueVal.toFixed(1);
      let text = this.drawText(forplot, x + 6, y);
      this.svg.appendChild(text);
    }

    let xaxislabel = xlabel + " ( " + this.xtextScaler + "'s )";
    let text1 = this.drawText(
      xaxislabel,
      this.svgWidth / 2,
      this.svgHeight - 35
    );
    text1.setAttributeNS(null, "class", "xaxisLabel");
    this.svg.appendChild(text1);
  }
  drawTextYMark(scale, ylabel) {
    let x = this.origin[0] - 25;
    let y = this.svgHeight - 2 * this.cmpx;
    for (let i = 0; i <= this.markedY; i++) {
      let trueVal =
        ((this.origin[1] - y) * scale) / this.cmpx / this.textScaler;
      let forplot = trueVal.toFixed(1) + "";
      let text = this.drawText(forplot, x, y);
      y = y - this.cmpx;
      this.svg.appendChild(text);
    }

    let yaxislabel = ylabel + " ( " + this.textScaler + "'s )";
    let text = this.drawText(yaxislabel, 25, this.svgHeight / 2);
    text.setAttributeNS(null, "class", "yaxisLabel");
    this.svg.appendChild(text);
  }

  refreshSvg() {
    while (svg.firstChild) {
      this.svg.removeChild(svg.firstChild);
    }
    //this is bad practice, let the title element be passed as an object
    //to the constructor
    let title = document.getElementById("graphTitle");
    title.textContent = "";
    let poly = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polyline"
    );
    poly.setAttributeNS(null, "id", "curvepoly");
    poly.setAttributeNS(null, "fill", "none");
    poly.setAttributeNS(null, "stroke", "red");
    poly.setAttributeNS(null, "stroke-width", 2);
    this.svg.appendChild(poly);
    this.initAxis();
  }

  /** 
    Following script is for special plots
    */
  drawCurveS(min, max, callback) {
    this.refreshSvg();
    this.initAxis();
    var minY = min;
    var maxY = max;
    if (maxY < 999.9) this.textScaler = 1;
    if (maxY > 999.9) this.textScaler = 1000;
    if (maxY > 999999.9) this.textScaler = 1000000;
    let numOfPoints = 500;
    var gap = this.intervalCal(maxY, minY, numOfPoints);
    let arrY = [];
    let k = 0;
    let arrX = [];
    for (let i = minY; i <= maxY; i += gap) {
      arrY[k] = i;
      arrX[k] = callback(i);
      k++;
    }
    let maxX = this.findMax(arrX);
    let minX = this.findMin(arrX);
    if (maxX < 999.9) this.xtextScaler = 1;
    if (maxX > 999.9) this.xtextScaler = 1000;
    if (maxX > 999999.9) this.xtextScaler = 1000;
    var scaleArray = this.scale(maxX, minX, maxY, minY);
    var scaleX = scaleArray[0];
    var scaleY = scaleArray[1];
    let poly = document.getElementById("curvepoly");
    if (poly) {
      for (let i = minY; i <= maxY; i += gap) {
        let point = this.svg.createSVGPoint();
        let y = this.origin[1] - parseFloat(this.convertCmPx(i) / scaleY);
        let x = parseFloat(
          this.convertCmPx(callback(i)) / scaleX + this.origin[0]
        );
        point.x = x;
        point.y = y;
        poly.points.appendItem(point);
      }
    }
    //this is bad practice, let the title element be passed as an object
    //to the constructor
    document.getElementById("graphTitle").textContent =
      "Normal Depth against Specific Energy";
    this.drawTextXMark(scaleX, "Specific Energy");
    this.drawTextYMark(scaleY, "y");
    this.curveDrawn = 1;
  }

  findMin(arr) {
    let min = arr[0];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      }
    }
    return min;
  }

  findMax(arr) {
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }
  drawGridX2(svgW, svgH) {
    let cpp = this.cmpx / 5;
    let x1 = cpp;
    let i = 0;
    for (i = x1; i <= svgW; i += cpp) {
      let line = this.drawLine(x1, 0, x1, svgH);
      this.svg.appendChild(line);
      x1 = x1 + cpp;
    }
  }
  drawGridY2(svgW, svgH) {
    let cpp = this.cmpx / 5;
    let y1 = svgH;
    let x1 = 0;
    let x2 = svgW;
    let i = 0;
    for (i = y1; i >= 0; i -= cpp) {
      y1 = y1 - cpp;
      let line = this.drawLine(x1, y1, x2, y1);
      this.svg.appendChild(line);
    }
  }

  //For passed in arrays
  drawCurveA(arrX, arrY, obj) {
    this.refreshSvg();
    this.initAxis();
    var minY = this.findMin(arrY);
    var maxY = this.findMax(arrY);
    if (maxY < 999.9) this.textScaler = 1;
    if (maxY > 999.9) this.textScaler = 1000;
    if (maxY > 999999.9) this.textScaler = 1000000;
    let maxX = this.findMax(arrX);
    let minX = this.findMin(arrX);
    var gap = this.intervalCal(maxX, minX, arrX.length);
    if (maxX < 999.9) this.xtextScaler = 1;
    if (maxX > 999.9) this.xtextScaler = 1000;
    if (maxX > 999999.9) this.xtextScaler = 1000;
    var scaleArray = this.scale(maxX, minX, maxY, minY);
    var scaleX = scaleArray[0];
    var scaleY = scaleArray[1];
    let poly = document.getElementById("curvepoly");
    if (poly) {
      for (let i = 0; i < arrX.length; i++) {
        let point = this.svg.createSVGPoint();
        //let circle = document.createElementNS("http://www.w3.org/2000/svg",'circle');
        //circle.setAttribute("class","cirt");
        let y = this.origin[1] - parseFloat(this.convertCmPx(arrY[i]) / scaleY);
        let x = parseFloat(this.convertCmPx(arrX[i]) / scaleX + this.origin[0]);
        //circle.setAttributeNS(null,"cy",y);
        //circle.setAttributeNS(null,"cx",x);
        //circle.setAttributeNS(null,"r",2);
        //console.log("Here");
        point.x = x;
        point.y = y;
        //console.log(this.svg);
        //this.svg.appendChild(circle);
        poly.points.appendItem(point);
      }
    }
    //this is bad practice, let the title element be passed as an object
    //to the constructor
    document.getElementById("graphTitle").textContent = obj.title;
    this.drawTextXMark(scaleX, obj.xlabel);
    this.drawTextYMark(scaleY, obj.ylabel);
    this.curveDrawn = 1;
  }
} //end of class
