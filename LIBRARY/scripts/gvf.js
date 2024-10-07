/**
 * contains classes for computing flow characteristics for rectangular,
 * triangular and trapezoidal sections for gradually varied flow condition.
 */

var direct = 0;
class RectangularGVF extends UniformRectangular {
  moreAns = new Map();
  div = null;
  getMoreAns() {
    return this.moreAns;
  }
  getDiv() {
    return this.div;
  }
  classifySlope(yn, yc, y) {
    let oldyc = yc;
    y = y.toFixed(2);
    yc = yc.toFixed(2);
    if (y == yc) {
      if (yn > oldyc) {
        this.moreAns.set("GVF Profile", "mild slope (M)");
      } else if (oldyc > yn) {
        this.moreAns.set("GVF Profile", "steep slope (S)");
      }
      return;
    }
    if (y > yn && yn > yc) {
      this.moreAns.set("GVF Profile", "mild slope (M1)");
    } else if (yn > y && y > yc) {
      this.moreAns.set("GVF Profile", "mild slope (M2)");
    } else if (yn > yc && yc > y) {
      this.moreAns.set("GVF Profile", "mild slope (M3)");
    } else if (y > yc && yc > yn) {
      this.moreAns.set("GVF Profile", "steep slope (S1)");
    } else if (yc > y && y > yn) {
      this.moreAns.set("GVF Profile", "steep slope (S2)");
    } else if (yc > yn && yn > y) {
      this.moreAns.set("GVF Profile", "steep slope (S3)");
    } else if (y > yn && y == yc) {
      this.moreAns.set("GVF Profile", "critical slope (C1)");
    } else if (y < yn && yc == yn) {
      this.moreAns.set("GVF Profile", "critical slope (C3)");
    } else if (y > yc) {
      this.moreAns.set("GVF Profile", "H2");
    } else if (y < yc) {
      this.moreAns.set("GVF Profile", "H3");
    } else if (y > yc) {
      this.moreAns.set("GVF Profile", "A2");
    } else if (y < yc) {
      this.moreAns.set("GVF Profile", "A3");
    }
  }
  solver(discharge, width, depth, slope, manning) {
    let areaT = super.findAreaDW(depth, width);
    let velocity = super.findVelocityQA(discharge, areaT);
    direct = super.findFroudeVD(velocity, depth);
    let ndepth = super.findDepthQWNS(discharge, width, manning, slope);
    this.moreAns.set("normal depth", ndepth.toFixed(3));
    let criticalDepth = super.findCriticalDepthQ(discharge, width);
    this.moreAns.set("critical depth", criticalDepth.toFixed(3));
    this.classifySlope(ndepth, criticalDepth, depth);
    let nsteps = Math.ceil((depth - ndepth) / 0.1);
    if (nsteps < 0) {
      nsteps *= -1;
    }
    let interval = (depth - ndepth) / nsteps;
    let arrDepths = new Array(nsteps + 1);
    arrDepths[0] = depth;
    for (let i = 1; i < arrDepths.length; i++) {
      arrDepths[i] = arrDepths[i - 1] - interval;
    }
    let arrAreas = new Array(nsteps + 1);
    for (let i = 0; i < arrAreas.length; i++) {
      arrAreas[i] = super.findAreaDW(arrDepths[i], width);
    }
    let arrPerimeters = new Array(nsteps + 1);
    for (let i = 0; i < arrPerimeters.length; i++) {
      arrPerimeters[i] = super.findPerimeterWD(width, arrDepths[i]);
    }
    let arrVelocity = new Array(nsteps + 1);
    for (let i = 0; i < arrVelocity.length; i++) {
      arrVelocity[i] = super.findVelocityQA(discharge, arrAreas[i]);
    }
    let arrEnergy = new Array(nsteps + 1);
    for (let i = 0; i < arrEnergy.length; i++) {
      arrEnergy[i] = super.findSpecificEnergyVD(arrVelocity[i], arrDepths[i]);
    }
    let arrRadius = new Array(nsteps + 1);
    for (let i = 0; i < arrRadius.length; i++) {
      arrRadius[i] = super.findRadiusAP(arrAreas[i], arrPerimeters[i]);
    }
    let arrFSlope = new Array(nsteps + 1);
    for (let i = 0; i < arrFSlope.length; i++) {
      arrFSlope[i] = this.findFrictionSlope(
        manning,
        discharge,
        arrAreas[i],
        arrRadius[i]
      );
    }
    let avgFSlope = new Array(nsteps);
    for (let i = 0; i < avgFSlope.length; i++) {
      avgFSlope[i] = (arrFSlope[i] + arrFSlope[i + 1]) / 2;
    }
    let arrSDiff = new Array(nsteps);
    for (let i = 0; i < arrSDiff.length; i++) {
      arrSDiff[i] = slope - avgFSlope[i];
    }
    let arrEChange = new Array(nsteps);
    for (let i = 0; i < arrEChange.length; i++) {
      arrEChange[i] = arrEnergy[i + 1] - arrEnergy[i];
    }
    let arrXLength = new Array(nsteps);
    for (let i = 0; i < arrXLength.length; i++) {
      arrXLength[i] = arrEChange[i] / arrSDiff[i];
    }
    let sum = 0;
    arrXLength.forEach((element) => {
      sum += element;
    });
    this.div = prepareTable(
      arrDepths,
      arrAreas,
      arrPerimeters,
      arrRadius,
      arrVelocity,
      arrEnergy,
      arrEChange,
      arrFSlope,
      avgFSlope,
      arrSDiff,
      arrXLength
    );
    return sum;
  }
  findFrictionSlope(manning, discharge, area, radius) {
    return Math.pow(
      (manning * discharge) / (area * Math.pow(radius, 2 / 3)),
      2
    );
  }
}

class TriangularGVF extends UniformTriangular {
  moreAns = new Map();
  div = null;
  constructor(con_1, con_2) {
    super(con_1, con_2);
  }
  getMoreAns() {
    return this.moreAns;
  }
  getDiv() {
    return this.div;
  }
  classifySlope(yn, yc, y) {
    let oldyc = yc;
    y = y.toFixed(2);
    yc = yc.toFixed(2);
    if (y == yc) {
      if (yn > oldyc) {
        this.moreAns.set("GVF Profile", "mild slope (M)");
      } else if (oldyc > yn) {
        this.moreAns.set("GVF Profile", "steep slope (S)");
      }
      return;
    }
    if (y > yn && yn > yc) {
      this.moreAns.set("GVF Profile", "mild slope (M1)");
    } else if (yn > y && y > yc) {
      this.moreAns.set("GVF Profile", "mild slope (M2)");
    } else if (yn > yc && yc > y) {
      this.moreAns.set("GVF Profile", "mild slope (M3)");
    } else if (y > yc && yc > yn) {
      this.moreAns.set("GVF Profile", "steep slope (S1)");
    } else if (yc > y && y > yn) {
      this.moreAns.set("GVF Profile", "steep slope (S2)");
    } else if (yc > yn && yn > y) {
      this.moreAns.set("GVF Profile", "steep slope (S3)");
    } else if (y > yn && y == yc) {
      this.moreAns.set("GVF Profile", "critical slope (C1)");
    } else if (y < yn && yc == yn) {
      this.moreAns.set("GVF Profile", "critical slope (C3)");
    } else if (y > yc) {
      this.moreAns.set("GVF Profile", "H2");
    } else if (y < yc) {
      this.moreAns.set("GVF Profile", "H3");
    } else if (y > yc) {
      this.moreAns.set("GVF Profile", "A2");
    } else if (y < yc) {
      this.moreAns.set("GVF Profile", "A3");
    }
  }
  solver(discharge, width, depth, slope, manning) {
    let areaT = super.findAreaDW(depth, width);
    let velocity = super.findVelocityQA(discharge, areaT);
    let topTB = super.findTopWidth(depth);
    let meanDepthT = super.findMeanDepthAT(areaT, topTB);
    direct = super.findFroudeVD(velocity, meanDepthT);
    let ndepth = super.findDepthQWNS(discharge, width, manning, slope);
    this.moreAns.set("normal depth", ndepth.toFixed(3));
    let criticalDepth = super.findCriticalDepthQ(discharge);
    this.moreAns.set("critical depth", criticalDepth.toFixed(3));
    this.classifySlope(ndepth, criticalDepth, depth);
    let nsteps = Math.ceil((depth - ndepth) / 0.1);
    if (nsteps < 0) {
      nsteps *= -1;
    }
    let interval = (depth - ndepth) / nsteps;
    let arrDepths = new Array(nsteps + 1);
    arrDepths[0] = depth;
    for (let i = 1; i < arrDepths.length; i++) {
      arrDepths[i] = arrDepths[i - 1] - interval;
    }
    let arrAreas = new Array(nsteps + 1);
    for (let i = 0; i < arrAreas.length; i++) {
      arrAreas[i] = super.findAreaDW(arrDepths[i], width);
    }
    let arrPerimeters = new Array(nsteps + 1);
    for (let i = 0; i < arrPerimeters.length; i++) {
      arrPerimeters[i] = super.findPerimeterWD(width, arrDepths[i]);
    }
    let arrVelocity = new Array(nsteps + 1);
    for (let i = 0; i < arrVelocity.length; i++) {
      arrVelocity[i] = super.findVelocityQA(discharge, arrAreas[i]);
    }
    let arrEnergy = new Array(nsteps + 1);
    for (let i = 0; i < arrEnergy.length; i++) {
      arrEnergy[i] = super.findSpecificEnergyVD(arrVelocity[i], arrDepths[i]);
    }
    let arrRadius = new Array(nsteps + 1);
    for (let i = 0; i < arrRadius.length; i++) {
      arrRadius[i] = super.findRadiusAP(arrAreas[i], arrPerimeters[i]);
    }
    let arrFSlope = new Array(nsteps + 1);
    for (let i = 0; i < arrFSlope.length; i++) {
      arrFSlope[i] = this.findFrictionSlope(
        manning,
        discharge,
        arrAreas[i],
        arrRadius[i]
      );
    }
    let avgFSlope = new Array(nsteps);
    for (let i = 0; i < avgFSlope.length; i++) {
      avgFSlope[i] = (arrFSlope[i] + arrFSlope[i + 1]) / 2;
    }
    let arrSDiff = new Array(nsteps);
    for (let i = 0; i < arrSDiff.length; i++) {
      arrSDiff[i] = slope - avgFSlope[i];
    }
    let arrEChange = new Array(nsteps);
    for (let i = 0; i < arrEChange.length; i++) {
      arrEChange[i] = arrEnergy[i + 1] - arrEnergy[i];
    }
    let arrXLength = new Array(nsteps);
    for (let i = 0; i < arrXLength.length; i++) {
      arrXLength[i] = arrEChange[i] / arrSDiff[i];
    }
    let sum = 0;
    arrXLength.forEach((element) => {
      sum += element;
    });
    this.div = prepareTable(
      arrDepths,
      arrAreas,
      arrPerimeters,
      arrRadius,
      arrVelocity,
      arrEnergy,
      arrEChange,
      arrFSlope,
      avgFSlope,
      arrSDiff,
      arrXLength
    );
    return sum;
  }
  findFrictionSlope(manning, discharge, area, radius) {
    return Math.pow(
      (manning * discharge) / (area * Math.pow(radius, 2 / 3)),
      2
    );
  }
}
class TrapezoidGVF extends UniformTrapezoid {
  moreAns = new Map();
  constructor(con_1, con_2) {
    super(con_1, con_2);
  }
  div = null;
  getMoreAns() {
    return this.moreAns;
  }
  getDiv() {
    return this.div;
  }
  classifySlope(yn, yc, y) {
    let oldyc = yc;
    y = y.toFixed(2);
    yc = yc.toFixed(2);
    if (y == yc) {
      if (yn > oldyc) {
        this.moreAns.set("GVF Profile", "mild slope (M)");
      } else if (oldyc > yn) {
        this.moreAns.set("GVF Profile", "steep slope (S)");
      }
      return;
    }
    if (y > yn && yn > yc) {
      this.moreAns.set("GVF Profile", "mild slope (M1)");
      return 1;
    } else if (yn > y && y > yc) {
      this.moreAns.set("GVF Profile", "mild slope (M2)");
      return 1;
    } else if (yn > yc && yc > y) {
      this.moreAns.set("GVF Profile", "mild slope (M3)");
      return 3;
    } else if (y > yc && yc > yn) {
      this.moreAns.set("GVF Profile", "steep slope (S1)");
      return 3;
    } else if (yc > y && y > yn) {
      this.moreAns.set("GVF Profile", "steep slope (S2)");
      return 3;
    } else if (yc > yn && yn > y) {
      this.moreAns.set("GVF Profile", "steep slope (S3)");
      return 3;
    } else if (y > yn && y == yc) {
      this.moreAns.set("GVF Profile", "critical slope (C1)");
      return 1;
    } else if (y < yn && yc == yn) {
      this.moreAns.set("GVF Profile", "critical slope (C3)");
      return 1;
    } else if (y > yc) {
      this.moreAns.set("GVF Profile", "H2");
      return 1;
    } else if (y < yc) {
      this.moreAns.set("GVF Profile", "H3");
      return 1;
    } else if (y > yc) {
      this.moreAns.set("GVF Profile", "A2");
      return 1;
    } else if (y < yc) {
      this.moreAns.set("GVF Profile", "A3");
      return 1;
    }
  }
  solver(discharge, width, depth, slope, manning) {
    let areaT = super.findAreaDW(depth, width);
    let velocity = super.findVelocityQA(discharge, areaT);
    let topTB = super.findTopWidth(depth, width);
    let meanDepthT = super.findMeanDepthAT(areaT, topTB);
    direct = super.findFroudeVD(velocity, meanDepthT).toFixed(1);
    let ndepth = super.findDepthQWNS(discharge, width, manning, slope);

    this.moreAns.set("normal depth", ndepth.toFixed(3));
    let criticalDepth = super.findCriticalDepthQ(discharge, width);
    this.moreAns.set("critical depth", criticalDepth.toFixed(3));
    let nsteps = Math.ceil((depth - ndepth) / 0.1);
    if (nsteps < 0) {
      nsteps *= -1;
    }

    let interval = (depth - ndepth) / nsteps;

    let arrDepths = new Array(nsteps + 1);
    arrDepths[0] = depth;
    for (let i = 1; i < arrDepths.length; i++) {
      arrDepths[i] = arrDepths[i - 1] - interval;
    }
    let arrAreas = new Array(nsteps + 1);
    for (let i = 0; i < arrAreas.length; i++) {
      arrAreas[i] = super.findAreaDW(arrDepths[i], width);
    }
    let arrPerimeters = new Array(nsteps + 1);
    for (let i = 0; i < arrPerimeters.length; i++) {
      arrPerimeters[i] = super.findPerimeterWD(width, arrDepths[i]);
    }
    let arrVelocity = new Array(nsteps + 1);
    for (let i = 0; i < arrVelocity.length; i++) {
      arrVelocity[i] = super.findVelocityQA(discharge, arrAreas[i]);
    }
    let arrEnergy = new Array(nsteps + 1);
    for (let i = 0; i < arrEnergy.length; i++) {
      arrEnergy[i] = super.findSpecificEnergyVD(arrVelocity[i], arrDepths[i]);
    }
    let arrRadius = new Array(nsteps + 1);
    for (let i = 0; i < arrRadius.length; i++) {
      arrRadius[i] = super.findRadiusAP(arrAreas[i], arrPerimeters[i]);
    }
    let arrFSlope = new Array(nsteps + 1);
    for (let i = 0; i < arrFSlope.length; i++) {
      arrFSlope[i] = this.findFrictionSlope(
        manning,
        discharge,
        arrAreas[i],
        arrRadius[i]
      );
    }
    let avgFSlope = new Array(nsteps);
    for (let i = 0; i < avgFSlope.length; i++) {
      avgFSlope[i] = (arrFSlope[i] + arrFSlope[i + 1]) / 2;
    }
    let arrSDiff = new Array(nsteps);
    for (let i = 0; i < arrSDiff.length; i++) {
      arrSDiff[i] = slope - avgFSlope[i];
    }
    let arrEChange = new Array(nsteps);
    for (let i = 0; i < arrEChange.length; i++) {
      arrEChange[i] = arrEnergy[i + 1] - arrEnergy[i];
    }
    let arrXLength = new Array(nsteps);
    for (let i = 0; i < arrXLength.length; i++) {
      arrXLength[i] = arrEChange[i] / arrSDiff[i];
    }
    let sum = 0;
    arrXLength.forEach((element) => {
      sum += element;
    });
    this.div = prepareTable(
      arrDepths,
      arrAreas,
      arrPerimeters,
      arrRadius,
      arrVelocity,
      arrEnergy,
      arrEChange,
      arrFSlope,
      avgFSlope,
      arrSDiff,
      arrXLength
    );
    return sum;
  }
  findFrictionSlope(manning, discharge, area, radius) {
    return Math.pow(
      (manning * discharge) / (area * Math.pow(radius, 2 / 3)),
      2
    );
  }
}
function prepareTable(
  arrDepths,
  arrAreas,
  arrPerimeters,
  arrRadius,
  arrVelocity,
  arrEnergy,
  arrEChange,
  arrFSlope,
  avgFSlope,
  arrSDiff,
  arrXLength
) {
  let testDiv = document.getElementById("visualDiv");
  let divTo = document.querySelector("#contentbody");
  if (testDiv) {
    divTo.removeChild(testDiv);
  }
  let visualDiv = document.createElement("div");
  visualDiv.setAttribute("id", "visualDiv");
  let table = document.createElement("table");
  table.setAttribute("id", "gvfTable");
  let tr1 = prepareGVFRow(
    "y",
    "A",
    "P",
    "R",
    "V",
    "Es",
    "dEs",
    "Sf",
    "AvgSf",
    "So-AvgSf",
    "dx"
  );
  table.appendChild(tr1);
  let i = 0;
  for (i = 0; i < arrXLength.length; i++) {
    let tr1 = prepareGVFRow(
      arrDepths[i].toFixed(3),
      arrAreas[i].toFixed(3),
      arrPerimeters[i].toFixed(3),
      arrRadius[i].toFixed(3),
      arrVelocity[i].toFixed(3),
      arrEnergy[i].toFixed(3),
      "",
      arrFSlope[i].toExponential(2),
      "",
      "",
      ""
    );
    let tr2 = prepareGVFRow(
      "",
      "",
      "",
      "",
      "",
      "",
      arrEChange[i].toFixed(3),
      "",
      avgFSlope[i].toExponential(2),
      arrSDiff[i].toExponential(2),
      arrXLength[i].toFixed(3)
    );
    table.appendChild(tr1);
    table.appendChild(tr2);
  }
  let tr2 = prepareGVFRow(
    arrDepths[i].toFixed(3),
    arrAreas[i].toFixed(3),
    arrPerimeters[i].toFixed(3),
    arrRadius[i].toFixed(3),
    arrVelocity[i].toFixed(3),
    arrEnergy[i].toFixed(3),
    "",
    arrFSlope[i].toExponential(2),
    "",
    "",
    ""
  );
  table.appendChild(tr2);
  let svgl = document.getElementById("svg");
  svgl.style.display = "block";
  let plotHandle = new svgHandler(svgl);
  let arrX = PreparePlot(arrXLength);
  let arr = null;

  arr = arrDepths;
  plotHandle.drawCurveA(arrX, arr, {
    title: "Water Surface Profile",
    xlabel: "x (m)",
    ylabel: "y",
  });
  let headerDiv = document.createElement("div"); // header to hold a header and cross.
  headerDiv.setAttribute("id", "headerDiv2");
  let headLabel = document.createElement("label");
  headLabel.setAttribute("id", "headLabel");
  let headText = document.createTextNode("Method Used : Direct Step Method");
  headLabel.appendChild(headText);
  let headCancel = document.createElement("button");
  headCancel.setAttribute("id", "headCancel2");
  headCancel.addEventListener(
    "click",
    () => {
      divTo.removeChild(visualDiv);
    },
    false
  );
  let cancelText = document.createTextNode("x");
  headCancel.appendChild(cancelText);
  headerDiv.appendChild(headLabel);
  headerDiv.appendChild(headCancel);
  visualDiv.appendChild(headerDiv);
  visualDiv.appendChild(table);
  return visualDiv;
}
function PreparePlot(arrXLength) {
  let arrX = [];
  arrX[0] = 0;
  let sum = 0;
  let j = 1;
  let multiFact = -1;
  for (let i = 0; i < arrXLength.length; i++) {
    sum = sum + arrXLength[i] * multiFact;
    arrX[j] = sum;
    j++;
  }
  return arrX;
}
function prepareGVFRow(y, a, p, r, v, e, de, sf, avsf, diff, dx) {
  let tr = document.createElement("tr");
  tr.setAttribute("class", "gvfTr");
  prepareGVFTd(tr, y);
  prepareGVFTd(tr, a);
  prepareGVFTd(tr, p);
  prepareGVFTd(tr, r);
  prepareGVFTd(tr, v);
  prepareGVFTd(tr, e);
  prepareGVFTd(tr, de);
  prepareGVFTd(tr, sf);
  prepareGVFTd(tr, avsf);
  prepareGVFTd(tr, diff);
  prepareGVFTd(tr, dx);
  return tr;
}
function prepareGVFTd(tr, text) {
  let td1 = document.createElement("td");
  td1.setAttribute("class", "gvfTd");
  td1.textContent = text;
  tr.appendChild(td1);
}
