/**contains functions for handling user interface for gradually varied flow */

function onGVFClick() {
  flowTask = 2;
  let uniformB = document.getElementById("uniformTd");
  uniformB.style.backgroundColor = "aqua";
  uniformB.style.color = "black";
  let rapidB = document.getElementById("rapidTd");
  rapidB.style.backgroundColor = "aqua";
  rapidB.style.color = "black";
  let tr = document.getElementById("rvfTable");
  let tLabel = document.getElementById("HydraulicJumpB");
  tLabel.textContent = "Water Profile Will be Plotted";
  tr.style.display = "flex";
  let gradualB = document.getElementById("gradualTd");
  gradualB.style.backgroundColor = "rgb(10, 6, 23)";
  gradualB.style.color = "white";
  prepareGVFInterface();
}
function prepareGVFAnswer() {
  let answer = 0;
  let tableDiv = 0;
  let extra = 0;
  let divTo = document.querySelector("#contentbody");
  let visualArea = document.getElementById("visualArea");
  let tB = document.getElementById("showtableGVF");
  if (tB) {
    visualArea.removeChild(tB);
  }
  let tableButton = document.createElement("button");
  tableButton.setAttribute("id", "showtableGVF");
  tableButton.textContent = "show tabular data";
  visualArea.insertBefore(tableButton, visualArea.lastElementChild);
  let discharge = parseFloat(document.getElementById("discharge").value);
  let depth = parseFloat(document.getElementById("upstreamdepth").value);
  let slope = parseFloat(document.getElementById("bedslope").value);
  let manning = parseFloat(document.getElementById("manning").value);
  if (shape == 0) {
    let width = parseFloat(document.getElementById("bottomwidth").value);
    let gvf = new RectangularGVF();
    answer = gvf.solver(discharge, width, depth, slope, manning);
    tableDiv = gvf.getDiv();
    tableDiv.setAttribute("class", "show");
    extra = gvf.getMoreAns();
  } else if (shape == 1) {
    processAngles();
    let gvf = new TriangularGVF(angleOne, angleTwo);
    answer = gvf.solver(discharge, 0, depth, slope, manning);
    tableDiv = gvf.getDiv();
    tableDiv.setAttribute("class", "show");
    extra = gvf.getMoreAns();
  } else if (shape == 2) {
    let width = parseFloat(document.getElementById("bottomwidth").value);

    processAngles();
    let gvf = new TrapezoidGVF(angleOne, angleTwo);
    answer = gvf.solver(discharge, width, depth, slope, manning);
    tableDiv = gvf.getDiv();
    tableDiv.setAttribute("class", "show");
    extra = gvf.getMoreAns();
  }
  tableButton.onclick = function () {
    divTo.appendChild(tableDiv);
    document.getElementById("visualDiv").style.display = "block";
  };

  let table = document.getElementById("tableEnter");
  let tr = document.createElement("tr");
  tr.setAttribute("id", "gvfTr");
  let td = document.createElement("td");
  let gTd = document.getElementById("gvfTr");
  if (gTd) {
    table.removeChild(gTd);
  }
  let text = "";

  if (direct <= 1) {
    if (answer > 0) {
      text =
        "backwater curve: " +
        answer.toFixed(2) +
        " m upstream of control point";
    } else {
      text =
        "backwater curve: " + answer.toFixed(2) * -1 + " m upstream 0f control";
    }
  } else {
    if (answer > 0) {
      text =
        "water curve: " + answer.toFixed(2) + " m downstream of control point";
    } else {
      text =
        "water curve: " +
        answer.toFixed(2) * -1 +
        " m downstream of control point";
    }
  }

  td.textContent = text;
  td.setAttribute("id", "gvfAns");
  td.setAttribute("colspan", "2");
  tr.appendChild(td);
  table.appendChild(tr);
  prepareExtraOut(extra);
}

function prepareGVFInterface() {
  let imageDiv = document.getElementById("shapeId");
  let check = document.getElementById("hjumpImage");
  if (check) {
    imageDiv.removeChild(check);
  }
  let taskDiv = document.getElementById("taskDiv");
  taskDiv.style.display = "none";
  let svgDiv = document.getElementById("svg");
  svgDiv.style.display = "block";
  let table = document.getElementById("tableEnter");
  clearElementComponents(table);
  let label1 = createLabel("hLabel", "Bottom Width b");
  let label2 = createLabel("hLabel", "Known depth control");
  let label3 = createLabel("hLabel", "Discharge Q");
  let label4 = createLabel("hLabel", "Mannings n");
  let label5 = createLabel("hLabel", "Bed Slope So");
  let input1 = createInput("inputArea", "bottomwidth");
  let input2 = createInput("inputArea", "upstreamdepth");
  let input3 = createInput("inputArea", "discharge");
  let input4 = createInput("inputArea", "manning");
  let input5 = createInput("inputArea", "bedslope");
  let tr1 = createHRows(label1, input1);
  let tr2 = createHRows(label2, input2);
  let tr3 = createHRows(label3, input3);
  let tr4 = createHRows(label4, input4);
  let tr5 = createHRows(label5, input5);

  if (shape == 1) {
    table.appendChild(tr2);
    table.appendChild(tr3);
    table.appendChild(tr4);
    table.appendChild(tr5);
  } else {
    table.appendChild(tr1);
    table.appendChild(tr2);
    table.appendChild(tr3);
    table.appendChild(tr4);
    table.appendChild(tr5);
  }
  let h3 = document.getElementById("supportedheader");
  h3.textContent = "Key Of Symbols";
  let supportDiv = document.getElementById("tableCombinationsDiv");
  let supportTable = document.getElementById("combinationsTable");
  supportDiv.style.display = "block";
  clearElementComponents(supportTable);
  createTableRows(supportTable, "Y", "depth at a location");
  createTableRows(supportTable, "A ", "Area");
  createTableRows(supportTable, "P", "Wetted Perimeter");
  createTableRows(supportTable, "R", "Hydraulic radius");
  createTableRows(supportTable, "V", "mean velocity");
  createTableRows(supportTable, "E", "Specifi Energy");
  createTableRows(supportTable, "dE ", "change in E");
  createTableRows(supportTable, "Sf", "Friction slope");
  createTableRows(supportTable, "AvgSf", "Average Sf");
  createTableRows(supportTable, "dx", "Change in x");
}
