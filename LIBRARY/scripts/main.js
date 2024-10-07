/**
 * glues the program together
 */

/*Global Variables */
var flowTask = 0;
var combinations = new Map();
var dcomb = [3, 8, 19, 20];
var ycomb = [27, 16, 5, 9];
var frcomb = [5, 19];
var recomb = [16, 17];
var vecomb = [18, 14, 19, 12];
var Tdcomb = [3, 5, 16, 20];
var Tycomb = [24, 9, 13, 2];
var Tfrcomb = [5, 16];
var Trecomb = [16, 14];
var Tvecomb = [18, 14, 16, 12];
var flowType = 0;
var trComb = new Map();
trComb.set("discharge", Tdcomb);
trComb.set("normaldepth", Tycomb);
trComb.set("froude", Tfrcomb);
trComb.set("reynold's", Trecomb);
trComb.set("velocity", Tvecomb);
combinations.set("discharge", dcomb);
combinations.set("normaldepth", ycomb);
combinations.set("froude", frcomb);
combinations.set("reynold's", recomb);
combinations.set("velocity", vecomb);
var ranking = new Map();
var extraMap = null;
ranking.set("V", 1);
ranking.set("A", 2);
ranking.set("b", 3);
ranking.set("Y", 4);
ranking.set("So", 5);
ranking.set("R", 6);
ranking.set("n", 7);
ranking.set("Fr", 8);
ranking.set("v", 9);
ranking.set("Re", 10);
ranking.set("Q", 12);
var shape = 0;
var angleOne = 0;
var angleTwo = 0;
var sumComb = 0;
var normComb = 0;
var localhost = "";
var svg = null;
document.getElementById("svg");
var plotArea = null;

window.onload = function () {
  addButtonListeners();
  svg = document.getElementById("svg");
  plotArea = new svgHandler(svg);
  //readCreateCookie();
};
/*window.onclick = function(event){
    if(!event.target.matches('.majordrop')){
        var dropdowns = Array.from(document.getElementsByClassName('majord'));
        dropdowns.forEach(element => {
            if(element.classList.contains('show')){
                element.classList.remove('show');
            }
        });
    }
} */
function displaySections() {
  let flowButton = document.getElementById("flowButton");
  flowButton.style.borderStyle = "dotted";
  flowButton.style.borderColor = "red";
  flowButton.style.backgroundColor = "white";
  flowButton.style.color = "black";
  let sectDiv = document.getElementById("operateSections");
  sectDiv.style.display = "block";
  let sectTable = document.getElementById("sectionsTable");
  sectTable.style.display = "block";
}
function displayProjectsCreator() {
  let projectCreator = document.getElementById("operationSelection");
  projectCreator.style.display = "flex";
  let intropop = document.getElementById("intropop");
  intropop.style.display = "none";
  let flowButton = document.getElementById("flowButton");
  flowButton.style.borderStyle = "dotted";
  flowButton.style.borderColor = "red";
  flowButton.style.backgroundColor = "white";
  flowButton.style.color = "black";
  let sectDiv = document.getElementById("operateSections");
  sectDiv.style.display = "block";
  let sectTable = document.getElementById("sectionsTable");
  sectTable.style.display = "block";
}
function addButtonListeners() {
  let flowButton = document.getElementById("flowButton");
  flowButton.addEventListener("click", displaySections, false);
  let createProject = document.getElementById("createProject");
  createProject.addEventListener("click", displayProjectsCreator, false);
  let hover_1 = document.getElementById("hover1");
  hover_1.addEventListener("click", hoverDropDownsOne, false);
  let hover_2 = document.getElementById("hover2");
  hover_2.addEventListener("click", hoverDropDownsTwo, false);
  const query = document.querySelectorAll('input[name="taskSelect"]');
  for (const t of query) {
    t.addEventListener("change", taskLabelSetter, false);
  }
  let okButton = document.getElementById("okbutton");
  okButton.addEventListener("click", okButtonClick, false);
  let solve = document.getElementById("solve");
  solve.addEventListener("click", prepareData, false);
  let refresh = document.getElementById("resetter");
  refresh.addEventListener("click", resetInputs, false);
  let newButton = document.getElementById("newButton");
  newButton.addEventListener("click", newClick, false);
  let uniformB = document.getElementById("uniformTd");
  uniformB.addEventListener(
    "click",
    function () {
      uniformB.style.backgroundColor = "black";
      uniformB.style.color = "white";
      let rapidB = document.getElementById("rapidTd");
      rapidB.style.backgroundColor = "aqua";
      rapidB.style.color = "black";
      let tr = document.getElementById("rvfTable");
      tr.style.display = "none";
      flowType = 0;
    },
    false
  );
}
function hoverDropDownsOne() {
  document.getElementById("finddropdown").classList.toggle("show");
}
function hoverDropDownsTwo() {
  prepareParameterList(
    document.getElementById("tasklabel_1").textContent.trim()
  );
  clearElementComponents(document.getElementById("tableEnter"));
  document.getElementById("parameterdropdown").classList.toggle("show");
}

function createTableRows(table, text1, text2) {
  /**
   * This function is called to add rows to combination tables
   */
  let row = document.createElement("tr");
  row.setAttribute("class", "combinationsHeader");
  let rowpart = document.createElement("td");
  rowpart.textContent = text1;
  rowpart.setAttribute("class", "combinationsHeader1");
  let rowpart1 = document.createElement("td");
  rowpart1.textContent = text2;
  rowpart1.setAttribute("class", "combinationsHeader2");
  row.appendChild(rowpart);
  row.appendChild(rowpart1);
  table.appendChild(row);
}

function PrepareSections(value) {
  shape = value;
  if (shape == 0) {
    document.getElementById("extraOut").style.maxHeight = "";
  }
  let projectCreator = document.getElementById("operationSelection");
  projectCreator.style.display = "none";
  let workingDiv = document.getElementById("workingDiv");
  workingDiv.style.display = "flex";
  let combinationTable = document.getElementById("combinationsTable");
  if (shape != 1) {
    clearElementComponents(combinationTable);
    createTableRows(combinationTable, "input", "output");
    createTableRows(combinationTable, "V A", "Q");
    createTableRows(combinationTable, "V b y", "Q");
    createTableRows(combinationTable, "So n b y", "Q");
    createTableRows(combinationTable, "R So n A", "Q");
    createTableRows(combinationTable, "So n b Q", "y");
    createTableRows(combinationTable, "V b Q", "y");
    createTableRows(combinationTable, "A b", "y");
    createTableRows(combinationTable, "Fr V", "y");
    createTableRows(combinationTable, "Q A", "V");
    createTableRows(combinationTable, "R So n", "V");
    createTableRows(combinationTable, "Fr y", "V");
    createTableRows(combinationTable, "So n b y", "V");
    createTableRows(combinationTable, " V R v", "Re");
    createTableRows(combinationTable, "V  y b v", "Re");
    createTableRows(combinationTable, "V y", "Fr");
    createTableRows(combinationTable, "So n b y", "Fr");
    let parameterTable = document.getElementById("parameterTable");
    clearElementComponents(parameterTable);
    createParameterCheckBox(parameterTable, "velocity-V", "V");
    createParameterCheckBox(parameterTable, "area-A", "A");
    createParameterCheckBox(parameterTable, "bottom width-b", "b");
    createParameterCheckBox(parameterTable, "normal depth-y", "Y");
    createParameterCheckBox(parameterTable, "bedslope-So", "So");
    createParameterCheckBox(parameterTable, "mannings-n", "n");
    createParameterCheckBox(parameterTable, "hydraulic radius-R", "R");
  } else {
    clearElementComponents(combinationTable);
    createTableRows(combinationTable, "input", "output");
    createTableRows(combinationTable, "V A", "Q");
    createTableRows(combinationTable, "V  y", "Q");
    createTableRows(combinationTable, "So n  y", "Q");
    createTableRows(combinationTable, "R So n A", "Q");
    createTableRows(combinationTable, "So n  Q", "y");
    createTableRows(combinationTable, "V  Q", "y");
    createTableRows(combinationTable, "Fr V", "y");
    createTableRows(combinationTable, "Q A", "V");
    createTableRows(combinationTable, "R So n", "V");
    createTableRows(combinationTable, "Fr y", "V");
    createTableRows(combinationTable, "So n  y", "V");
    createTableRows(combinationTable, " V R v", "Re");
    createTableRows(combinationTable, "V  y  v", "Re");
    createTableRows(combinationTable, "V y", "Fr");
    createTableRows(combinationTable, "So n y", "Fr");
    let parameterTable = document.getElementById("parameterTable");
    clearElementComponents(parameterTable);
    createParameterCheckBox(parameterTable, "velocity-V", "V");
    createParameterCheckBox(parameterTable, "area-A", "A");
    createParameterCheckBox(parameterTable, "depth-y", "Y");
    createParameterCheckBox(parameterTable, "bedslope-So", "So");
    createParameterCheckBox(parameterTable, "mannings-n", "n");
    createParameterCheckBox(parameterTable, "hydraulic radius-R", "R");
  }

  let arrayChecks = Array.from(document.getElementsByClassName("inputChecks"));
  arrayChecks.forEach((element) => {
    element.addEventListener("change", checkListener, false);
  });
  let extra = document.getElementById("extraDiv");
  switch (value) {
    case 0:
      let rectangleImage = document.getElementById("shapeshow");
      rectangleImage.setAttribute(
        "src",
        "LIBRARY/images/uniformrectangular.png"
      );
      extra.style.display = "none";
      break;
    case 1:
      let triangleImage = document.getElementById("shapeshow");
      triangleImage.setAttribute("src", "LIBRARY/images/uniformTriangular.png");
      extra.style.display = "block";
      break;
    case 2:
      let trapezoidImage = document.getElementById("shapeshow");
      trapezoidImage.setAttribute("src", "LIBRARY/images/uniformTrapezium.png");
      extra.style.display = "block";
  }
}

function createParameterCheckBox(table, text, value) {
  /**
   * This function is called to add rows to combination tables
   */
  let strg = "have" + text;
  let row = document.createElement("tr");
  let rowpart = document.createElement("td");
  let input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", strg);
  input.setAttribute("value", value);
  input.setAttribute("class", "inputChecks");
  let label = document.createElement("label");
  label.setAttribute("for", strg);
  label.textContent = text;
  rowpart.appendChild(input);
  rowpart.appendChild(label);
  row.appendChild(rowpart);
  table.appendChild(row);
}
function clearElementComponents(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
function taskLabelSetter() {
  let label = document.getElementById("tasklabel_1");

  if (this.checked) {
    label.textContent = this.value;
    prepareParameterList(this.value);
    document.getElementById("finddropdown").classList.toggle("show");
  }
}
function prepareParameterList(value) {
  if (shape != 1) {
    switch (value) {
      case "discharge":
        let parameterTable = document.getElementById("parameterTable");
        clearElementComponents(parameterTable);
        createParameterCheckBox(parameterTable, "velocity-V", "V");
        createParameterCheckBox(parameterTable, "area-A", "A");
        createParameterCheckBox(parameterTable, "bottom width-b", "b");
        createParameterCheckBox(parameterTable, "normal depth-y", "Y");
        createParameterCheckBox(parameterTable, "bedslope-So", "So");
        createParameterCheckBox(parameterTable, "mannings-n", "n");
        createParameterCheckBox(parameterTable, "hydraulic radius-R", "R");
        break;
      case "normaldepth":
        let parameterTable1 = document.getElementById("parameterTable");
        clearElementComponents(parameterTable1);
        createParameterCheckBox(parameterTable1, "velocity-V", "V");
        createParameterCheckBox(parameterTable1, "area-A", "A");
        createParameterCheckBox(parameterTable1, "bottom width-b", "b");
        createParameterCheckBox(parameterTable1, "discharge-Q", "Q");
        createParameterCheckBox(parameterTable1, "bedslope-So", "So");
        createParameterCheckBox(parameterTable1, "mannings-n", "n");
        createParameterCheckBox(parameterTable1, "hydraulic radius-R", "R");
        createParameterCheckBox(parameterTable1, "Froude-Fr", "Fr");
        break;
      case "reynold's":
        let parameterTable2 = document.getElementById("parameterTable");
        clearElementComponents(parameterTable2);
        createParameterCheckBox(parameterTable2, "velocity-V", "V");
        createParameterCheckBox(parameterTable2, "kinematic viscocity-v", "v");
        createParameterCheckBox(parameterTable2, "hydraulic radius-R", "R");
        createParameterCheckBox(parameterTable2, "normal depth-y", "Y");
        createParameterCheckBox(parameterTable2, "bottom width-b", "b");
        break;
      case "froude":
        let parameterTable3 = document.getElementById("parameterTable");
        clearElementComponents(parameterTable3);
        createParameterCheckBox(parameterTable3, "velocity-V", "V");
        createParameterCheckBox(parameterTable3, "normal depth-y", "Y");
        createParameterCheckBox(parameterTable3, "bedslope-So", "So");
        createParameterCheckBox(parameterTable3, "mannings-n", "n");
        createParameterCheckBox(parameterTable3, "bottom width-b", "b");
        break;
      case "velocity":
        let parameterTable4 = document.getElementById("parameterTable");
        clearElementComponents(parameterTable4);
        createParameterCheckBox(parameterTable4, "bedslope-So", "So");
        createParameterCheckBox(parameterTable4, "mannings-n", "n");
        createParameterCheckBox(parameterTable4, "bottom width-b", "b");
        createParameterCheckBox(parameterTable4, "normal depth-y", "Y");
        createParameterCheckBox(parameterTable4, "froude-Fr", "Fr");
        createParameterCheckBox(parameterTable4, "hydraulic radius-R", "R");
        createParameterCheckBox(parameterTable4, "discharge-Q", "Q");
        createParameterCheckBox(parameterTable4, "area-A", "A");
    }
  } else if (shape == 1) {
    switch (value) {
      case "discharge":
        let parameterTable = document.getElementById("parameterTable");
        clearElementComponents(parameterTable);
        createParameterCheckBox(parameterTable, "velocity-V", "V");
        createParameterCheckBox(parameterTable, "area-A", "A");
        createParameterCheckBox(parameterTable, "normal depth-y", "Y");
        createParameterCheckBox(parameterTable, "bedslope-So", "So");
        createParameterCheckBox(parameterTable, "mannings-n", "n");
        createParameterCheckBox(parameterTable, "hydraulic radius-R", "R");
        break;
      case "normaldepth":
        let parameterTable1 = document.getElementById("parameterTable");
        clearElementComponents(parameterTable1);
        createParameterCheckBox(parameterTable1, "velocity-V", "V");
        createParameterCheckBox(parameterTable1, "area-A", "A");
        createParameterCheckBox(parameterTable1, "discharge-Q", "Q");
        createParameterCheckBox(parameterTable1, "bedslope-So", "So");
        createParameterCheckBox(parameterTable1, "mannings-n", "n");
        createParameterCheckBox(parameterTable1, "hydraulic radius-R", "R");
        createParameterCheckBox(parameterTable1, "froude-Fr", "Fr");
        break;
      case "reynold's":
        let parameterTable2 = document.getElementById("parameterTable");
        clearElementComponents(parameterTable2);
        createParameterCheckBox(parameterTable2, "velocity-V", "V");
        createParameterCheckBox(parameterTable2, "kinematic viscocity-v", "v");
        createParameterCheckBox(parameterTable2, "hydraulic radius-R", "R");
        createParameterCheckBox(parameterTable2, "normal depth-y", "Y");
        break;
      case "froude":
        let parameterTable3 = document.getElementById("parameterTable");
        clearElementComponents(parameterTable3);
        createParameterCheckBox(parameterTable3, "velocity-V", "V");
        createParameterCheckBox(parameterTable3, "normal depth-y", "Y");
        createParameterCheckBox(parameterTable3, "bedslope-So", "So");
        createParameterCheckBox(parameterTable3, "mannings-n", "n");
        break;
      case "velocity":
        let parameterTable4 = document.getElementById("parameterTable");
        clearElementComponents(parameterTable4);
        createParameterCheckBox(parameterTable4, "bedslope-So", "So");
        createParameterCheckBox(parameterTable4, "mannings-n", "n");
        createParameterCheckBox(parameterTable4, "normal depth-y", "Y");
        createParameterCheckBox(parameterTable4, "froude-Fr", "Fr");
        createParameterCheckBox(parameterTable4, "hydro radius-R", "R");
        createParameterCheckBox(parameterTable4, "discharge-Q", "Q");
        createParameterCheckBox(parameterTable4, "area-A", "A");
    }
  }
  let arrayChecks = Array.from(document.getElementsByClassName("inputChecks"));
  arrayChecks.forEach((element) => {
    element.addEventListener("change", checkListener, false);
  });
  let tableEnter = document.getElementById("tableEnter");
  clearElementComponents(tableEnter);
}

function createInputArea(value) {
  let str = value + "L";
  let strRow = value + "T";
  let row = document.createElement("tr");
  row.setAttribute("id", strRow);
  let td1 = document.createElement("td");
  td1.setAttribute("class", "labelV");
  let td2 = document.createElement("td");
  td2.setAttribute("class", "labelI");
  let input = document.createElement("input");
  input.setAttribute("id", value);
  input.setAttribute("class", "inputArea");
  let label = document.createElement("label");
  label.setAttribute("id", str);
  if (value === "μ") {
    label.textContent = "vs";
  } else {
    label.textContent = value;
  }

  td1.appendChild(label);
  td2.appendChild(input);
  row.appendChild(td1);
  row.appendChild(td2);
  let inputDiv = document.getElementById("tableEnter");
  inputDiv.insertBefore(row, inputDiv.lastChild);
}

function removeInputArea(value) {
  let row = document.getElementById(value + "T");
  let inputDiv = document.getElementById("tableEnter");
  if (row) {
    inputDiv.removeChild(row);
  }
}

function checkListener() {
  if (this.checked) {
    createInputArea(this.value);
    sumComb += ranking.get(this.value);
  } else {
    removeInputArea(this.value);
    sumComb -= ranking.get(this.value);
  }
}

function checkCombination() {
  let str = document.getElementById("tasklabel_1").textContent.trim();

  let array = combinations.get(str);
  if (shape == 1) {
    array = trComb.get(str);
  }
  if (array) {
    for (i = 0; i < array.length; i++) {
      if (sumComb == array[i]) {
        return true;
      }
    }
  }

  return false;
}

function okButtonClick() {
  if (checkCombination()) {
    document.getElementById("parameterdropdown").classList.toggle("show");
    normComb = sumComb;
    sumComb = 0;
  } else {
    prepareParameterList(
      document.getElementById("tasklabel_1").textContent.trim()
    );
    clearElementComponents(document.getElementById("tableEnter"));
    alert(
      "Selected Combination is not supported, check combinations table for reference."
    );
    sumComb = 0;
  }
}

function prepareData() {
  if (flowTask == 0) {
    plotArea.refreshSvg();
    let task = document.getElementById("tasklabel_1").textContent.trim();
    switch (task) {
      case "discharge":
        let value = handleDischarge(normComb);
        prepareAnswer(task, value);
        prepareExtraOut(extraMap);
        break;
      case "normaldepth":
        let value1 = handleDepth(normComb);
        prepareAnswer(task, value1);
        prepareExtraOut(extraMap);
        break;
      case "velocity":
        let value2 = handleVelocity(normComb);
        prepareAnswer(task, value2);
        prepareExtraOut(extraMap);
        break;
      case "reynold's":
        let value3 = handleReynold(normComb);
        prepareAnswer(task, value3);
        prepareExtraOut(extraMap);
        break;
      case "froude":
        let value4 = handleFroude(normComb);
        prepareAnswer(task, value4);
        prepareExtraOut(extraMap);
    }
  } else if (flowTask == 1) {
    prepareCalculation();
  } else if (flowTask == 2) {
    prepareGVFAnswer();
  }
}

function prepareAnswer(text, value) {
  let table = document.getElementById("tableEnter");
  let rowe = document.getElementById("ansRow");
  if (rowe) {
    table.removeChild(rowe);
  }
  let row = document.createElement("tr");
  row.setAttribute("id", "ansRow");
  let td_1 = document.createElement("td");
  td_1.setAttribute("id", "answertd");
  td_1.setAttribute("colspan", "2");
  td_1.textContent = text + " : " + parseFloat(value).toFixed(3);
  row.appendChild(td_1);
  table.appendChild(row);
}

function prepareExtraOut(value) {
  let table = document.getElementById("extraOut");
  clearElementComponents(table);
  let row = document.createElement("tr");
  row.setAttribute("id", "extrarowHeader");
  let td_1 = document.createElement("td");
  td_1.setAttribute("colspan", 2);
  td_1.textContent = "Extra Outputs";
  row.appendChild(td_1);
  table.appendChild(row);
  for (let [key, v] of value) {
    let row = document.createElement("tr");
    row.setAttribute("class", "extrarow");
    let td_1 = document.createElement("td");
    td_1.setAttribute("class", "extravalue");
    let td_2 = document.createElement("td");
    td_2.setAttribute("class", "extravalue");
    td_1.textContent = key + "";
    td_2.textContent = v + "";
    row.appendChild(td_1);
    row.appendChild(td_2);
    table.appendChild(row);
  }
}

function handleDischarge(combination) {
  let rectangle = shapeSelect();
  if (shape == 1) {
    switch (combination) {
      case 3:
        velocity = parseFloat(document.getElementById("V").value);
        area = parseFloat(document.getElementById("A").value);
        let answer1 = rectangle.findDischrageVA(velocity, area);
        extraMap = rectangle.getExtraAnswer();
        return answer1;
      case 5:
        velocity = parseFloat(document.getElementById("V").value);
        width = 0;
        depth = parseFloat(document.getElementById("Y").value);
        plotArea.drawCurve(
          0.001,
          depth,
          function (i) {
            return rectangle.findDischargeVBY(velocity, width, i);
          },
          {
            xlabel: "y",
            ylabel: "Q",
            title: "Variation of Q with normal depth",
          }
        );
        let answer2 = rectangle.findDischargeVBY(velocity, width, depth);
        extraMap = rectangle.getExtraAnswer();

        return answer2;

      case 16:
        bedslope = parseFloat(document.getElementById("So").value);
        manning = parseFloat(document.getElementById("n").value);
        width = 0;
        depth = parseFloat(document.getElementById("Y").value);
        plotArea.drawCurve(
          0.001,
          depth,
          function (i) {
            return rectangle.findDischargeSNBY(bedslope, manning, width, i);
          },
          {
            xlabel: "y",
            ylabel: "Q",
            title: "Variation of Q with normal depth",
          }
        );
        let answer3 = rectangle.findDischargeSNBY(
          bedslope,
          manning,
          width,
          depth
        );
        extraMap = rectangle.getExtraAnswer();

        return answer3;

      case 20:
        bedslope = parseFloat(document.getElementById("So").value);
        manning = parseFloat(document.getElementById("n").value);
        area = parseFloat(document.getElementById("A").value);
        radius = parseFloat(document.getElementById("R").value);
        let answer4 = rectangle.findDischargeRSNA(
          radius,
          bedslope,
          manning,
          area
        );
        extraMap = rectangle.getExtraAnswer();
        return answer4;
    }
  } else {
    switch (combination) {
      case 3:
        velocity = parseFloat(document.getElementById("V").value);
        area = parseFloat(document.getElementById("A").value);
        let answer1 = rectangle.findDischrageVA(velocity, area);
        extraMap = rectangle.getExtraAnswer();
        return answer1;
      case 8:
        velocity = parseFloat(document.getElementById("V").value);
        width = parseFloat(document.getElementById("b").value);
        depth = parseFloat(document.getElementById("Y").value);
        let answer2 = rectangle.findDischargeVBY(velocity, width, depth);
        extraMap = rectangle.getExtraAnswer();

        return answer2;

      case 19:
        bedslope = parseFloat(document.getElementById("So").value);
        manning = parseFloat(document.getElementById("n").value);
        width = parseFloat(document.getElementById("b").value);
        depth = parseFloat(document.getElementById("Y").value);
        plotArea.drawCurve(
          0.001,
          depth,
          function (i) {
            return rectangle.findDischargeSNBY(bedslope, manning, width, i);
          },
          {
            xlabel: "y",
            ylabel: "Q",
            title: "Variation of Q with normal depth",
          }
        );
        let answer3 = rectangle.findDischargeSNBY(
          bedslope,
          manning,
          width,
          depth
        );
        extraMap = rectangle.getExtraAnswer();
        return answer3;

      case 20:
        bedslope = parseFloat(document.getElementById("So").value);

        manning = parseFloat(document.getElementById("n").value);

        area = parseFloat(document.getElementById("A").value);

        radius = parseFloat(document.getElementById("R").value);

        let answer4 = rectangle.findDischargeRSNA(
          radius,
          bedslope,
          manning,
          area
        );

        extraMap = rectangle.getExtraAnswer();

        return answer4;
    }
  }
}

function handleDepth(combination) {
  let rectangle = shapeSelect();
  if (shape == 1) {
    switch (combination) {
      case 2:
        area = parseFloat(document.getElementById("A").value);

        let answer1 = parseFloat(rectangle.findDepthA(area));

        extraMap = rectangle.getExtraAnswer();
        return answer1;

      case 13:
        velocity = parseFloat(document.getElementById("V").value);

        discharge = parseFloat(document.getElementById("Q").value);

        let answer2 = parseFloat(rectangle.findDepthVQ(velocity, discharge));

        extraMap = rectangle.getExtraAnswer();
        return answer2;

      case 24:
        bedslope = parseFloat(document.getElementById("So").value);

        manning = parseFloat(document.getElementById("n").value);

        width = 0;
        discharge = parseFloat(document.getElementById("Q").value);

        let depth = rectangle.findDepthQWNS(
          discharge,
          width,
          manning,
          bedslope
        );
        plotArea.drawCurve(
          0.001,
          depth,
          function (i) {
            return rectangle.findDischargeSNBY(bedslope, manning, width, i);
          },
          {
            xlabel: "y",
            ylabel: "Q",
            title: "Variation of Q with normal depth",
          }
        );

        let answer3 = rectangle.findDepthQWNS(
          discharge,
          width,
          manning,
          bedslope
        );

        extraMap = rectangle.getExtraAnswer();
        return answer3;

      case 9:
        velocity = parseFloat(document.getElementById("V").value);

        froude = parseFloat(document.getElementById("Fr").value);

        let answer4 = rectangle.findDepthFV(froude, velocity);

        extraMap = rectangle.getExtraAnswer();
        return answer4;
    }
  } else {
    switch (combination) {
      case 5:
        width = parseFloat(document.getElementById("b").value);

        area = parseFloat(document.getElementById("A").value);

        let answer1 = parseFloat(rectangle.findDepthAB(area, width));

        extraMap = rectangle.getExtraAnswer();
        return answer1;

      case 16:
        velocity = parseFloat(document.getElementById("V").value);

        width = parseFloat(document.getElementById("b").value);

        discharge = parseFloat(document.getElementById("Q").value);

        if (shape == 2) {
          return "not suppored";
        } else {
          let answer2 = parseFloat(
            rectangle.findDepthVBQ(velocity, width, discharge)
          );

          extraMap = rectangle.getExtraAnswer();
          return answer2;
        }

      case 27:
        bedslope = parseFloat(document.getElementById("So").value);

        manning = parseFloat(document.getElementById("n").value);

        width = parseFloat(document.getElementById("b").value);

        discharge = parseFloat(document.getElementById("Q").value);

        let depth = rectangle.findDepthQWNS(
          discharge,
          width,
          manning,
          bedslope
        );
        plotArea.drawCurve(
          0.001,
          depth,
          function (i) {
            return rectangle.findDischargeSNBY(bedslope, manning, width, i);
          },
          {
            xlabel: "y",
            ylabel: "Q",
            title: "Variation of Q with normal depth",
          }
        );
        let answer3 = rectangle.findDepthQWNS(
          discharge,
          width,
          manning,
          bedslope
        );
        extraMap = rectangle.getExtraAnswer();
        return answer3;

      case 9:
        velocity = parseFloat(document.getElementById("V").value);

        froude = parseFloat(document.getElementById("Fr").value);

        let answer4 = rectangle.findDepthFV(froude, velocity);

        extraMap = rectangle.getExtraAnswer();
        return answer4;
    }
  }
}

function setWidth(width) {
  if (isNaN(width)) {
    return parseFloat(0);
  } else {
    return width;
  }
}

function handleFroude(combination) {
  let rectangle = shapeSelect();
  if (shape == 1) {
    switch (combination) {
      case 5:
        velocity = parseFloat(document.getElementById("V").value);

        depth = parseFloat(document.getElementById("Y").value);

        let answer1 = rectangle.findFroudeVD2(velocity, depth);

        extraMap = rectangle.getExtraAnswer();
        return answer1;

      case 16:
        bedslope = parseFloat(document.getElementById("So").value);

        manning = parseFloat(document.getElementById("n").value);

        depth = parseFloat(document.getElementById("Y").value);

        width = 0;
        let answer2 = rectangle.findFroudeSNBY(bedslope, manning, width, depth);

        extraMap = rectangle.getExtraAnswer();
        return answer2;
    }
  } else {
    switch (combination) {
      case 5:
        velocity = parseFloat(document.getElementById("V").value);

        depth = parseFloat(document.getElementById("Y").value);

        if (shape == 2) {
          return "combinaion not supported";
        } else {
          let answer1 = rectangle.findFroudeVD(velocity, depth);

          extraMap = rectangle.getExtraAnswer();
          return answer1;
        }

      case 19:
        bedslope = parseFloat(document.getElementById("So").value);

        manning = parseFloat(document.getElementById("n").value);

        width = parseFloat(document.getElementById("b").value);

        depth = parseFloat(document.getElementById("Y").value);

        let answer2 = rectangle.findFroudeSNBY(bedslope, manning, width, depth);

        extraMap = rectangle.getExtraAnswer();
        return answer2;
    }
  }
}

function handleReynold(combination) {
  let rectangle = shapeSelect();
  if (shape == 1) {
    switch (combination) {
      case 16:
        velocity = parseFloat(document.getElementById("V").value);

        radius = parseFloat(document.getElementById("R").value);

        viscocity = parseFloat(document.getElementById("v").value);

        let answer1 = rectangle.findReynoldVRU(velocity, radius, viscocity);

        extraMap = rectangle.getExtraAnswer();
        return answer1;

      case 14:
        velocity = parseFloat(document.getElementById("V").value);

        width = 0;
        viscocity = parseFloat(document.getElementById("v").value);

        depth = parseFloat(document.getElementById("Y").value);

        let answer2 = rectangle.findReynoldVYBU(
          velocity,
          depth,
          width,
          viscocity
        );

        extraMap = rectangle.getExtraAnswer();
        return answer2;
    }
  } else {
    switch (combination) {
      case 16:
        velocity = parseFloat(document.getElementById("V").value);

        radius = parseFloat(document.getElementById("R").value);

        viscocity = parseFloat(document.getElementById("v").value);

        let answer1 = rectangle.findReynoldVRU(velocity, radius, viscocity);

        extraMap = rectangle.getExtraAnswer();
        return answer1;

      case 17:
        velocity = parseFloat(document.getElementById("V").value);

        width = parseFloat(document.getElementById("b").value);

        viscocity = parseFloat(document.getElementById("v").value);

        depth = parseFloat(document.getElementById("Y").value);

        let answer2 = rectangle.findReynoldVYBU(
          velocity,
          depth,
          width,
          viscocity
        );

        extraMap = rectangle.getExtraAnswer();
        return answer2;
    }
  }
}

function handleVelocity(combination) {
  let rectangle = shapeSelect();
  if (shape == 1) {
    switch (combination) {
      case 18:
        radius = parseFloat(document.getElementById("R").value);

        bedslope = parseFloat(document.getElementById("So").value);

        manning = parseFloat(document.getElementById("n").value);

        let answer1 = rectangle.findVelocityMRS(manning, radius, bedslope);

        extraMap = rectangle.getExtraAnswer();
        return answer1;
      case 14:
        area = parseFloat(document.getElementById("A").value);

        discharge = parseFloat(document.getElementById("Q").value);

        let answer2 = rectangle.findVelocityQA(discharge, area);

        extraMap = rectangle.getExtraAnswer();
        return answer2;
      case 12:
        depth = parseFloat(document.getElementById("Y").value);

        froude = parseFloat(document.getElementById("Fr").value);

        plotArea.drawCurve(
          0.001,
          depth,
          function (i) {
            return rectangle.findVelocityFY(froude, i);
          },
          {
            xlabel: "y",
            ylabel: "V",
            title: "Variation of Velocity with normal depth",
          }
        );
        let answer4 = rectangle.findVelocityFY(froude, depth);

        extraMap = rectangle.getExtraAnswer();
        return answer4;

      case 16:
        bedslope = parseFloat(document.getElementById("So").value);

        manning = parseFloat(document.getElementById("n").value);

        width = 0;
        depth = parseFloat(document.getElementById("Y").value);

        plotArea.drawCurve(
          0.001,
          depth,
          function (i) {
            return rectangle.findVelocitySNBY(bedslope, manning, width, i);
          },
          {
            xlabel: "y",
            ylabel: "V",
            title: "Variation of Velocity with normal depth",
          }
        );
        let answer3 = rectangle.findVelocitySNBY(
          bedslope,
          manning,
          width,
          depth
        );

        extraMap = rectangle.getExtraAnswer();
        return answer3;
    }
  } else {
    switch (combination) {
      case 18:
        radius = parseFloat(document.getElementById("R").value);

        bedslope = parseFloat(document.getElementById("So").value);

        manning = parseFloat(document.getElementById("n").value);

        let answer1 = rectangle.findVelocityMRS(manning, radius, bedslope);

        extraMap = rectangle.getExtraAnswer();
        return answer1;
      case 14:
        area = parseFloat(document.getElementById("A").value);

        discharge = parseFloat(document.getElementById("Q").value);

        let answer2 = rectangle.findVelocityQA(discharge, area);

        extraMap = rectangle.getExtraAnswer();
        return answer2;
      case 12:
        depth = parseFloat(document.getElementById("Y").value);

        froude = parseFloat(document.getElementById("Fr").value);

        if (shape == 2) {
          alert(
            "we are sorry ! combinaion not supported, NAN value will be displayed"
          );
          return "combinaion not supported, width is needed";
        }
        plotArea.drawCurve(
          0.001,
          depth,
          function (i) {
            return rectangle.findVelocityFY(froude, i);
          },
          {
            xlabel: "y",
            ylabel: "V",
            title: "Variation of Velocity with normal depth",
          }
        );
        let answer4 = rectangle.findVelocityFY(froude, depth);

        extraMap = rectangle.getExtraAnswer();
        return answer4;

      case 19:
        bedslope = parseFloat(document.getElementById("So").value);

        manning = parseFloat(document.getElementById("n").value);

        width = parseFloat(document.getElementById("b").value);

        depth = parseFloat(document.getElementById("Y").value);

        plotArea.drawCurve(
          0.001,
          depth,
          function (i) {
            return rectangle.findVelocitySNBY(bedslope, manning, width, i);
          },
          {
            xlabel: "y",
            ylabel: "V",
            title: "Variation of Velocity with normal depth",
          }
        );
        let answer3 = rectangle.findVelocitySNBY(
          bedslope,
          manning,
          width,
          depth
        );

        extraMap = rectangle.getExtraAnswer();
        return answer3;
    }
  }
}
function resetInputs() {
  let inputs = Array.from(document.getElementsByClassName("inputArea"));
  inputs.forEach((element) => {
    element.value = "";
  });
  clearElementComponents(svg);
  plotArea.initAxis();
  let table1 = document.getElementById("extraOut");
  clearElementComponents(table1);
}

/*Working on new button click */
function newClick() {
  let intropop = document.getElementById("intropop");
  intropop.style.display = "block";
}

function readCreateCookie() {
  try {
    let x = getCookie("name");
    if (x === "") {
      window.alert(
        "If it's your first time to ProFlow, Your advised to click on the TUTORIAL ON USE button to learn how to use the App, Click OK to close this popup"
      );
      document.cookie = "name=5; expires=Thu, 18 Dec 2025 12:00:00 UTC";
    }
  } catch (e) {}
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function onCloseClick() {
  let intropop = document.getElementById("intropop");
  intropop.style.display = "none";
}

function processAngles() {
  let y1 = document.getElementById("y1").value;
  let x1 = document.getElementById("x1").value;
  let y2 = document.getElementById("y2").value;
  let x2 = document.getElementById("x2").value;
  let ang1 = document.getElementById("ang1").value;
  let ang2 = document.getElementById("ang2").value;

  if (isNaN(parseFloat(y1)) || isNaN(parseFloat(x1))) {
    if (ang1 === "") {
      alert(
        "You need to specify angle slopes of the slanting sides, refer to the diagram for reference"
      );
    } else {
      try {
        angleOne = (parseFloat(ang1) * Math.PI) / 180;
      } catch (e) {
        alert(e.messsage);
      }
    }
  } else {
    angleOne = parseFloat(Math.atan(x1 / y1));
  }

  if (isNaN(parseFloat(y2)) || isNaN(parseFloat(x2))) {
    if (ang2 == "") {
      alert(
        "You need to specify angle slopes of the slanting sides, refer to the diagram for reference"
      );
    } else {
      try {
        angleTwo = (parseFloat(ang2) * Math.PI) / 180;
      } catch (e) {
        alert(e.messsage);
      }
    }
  } else {
    try {
      angleTwo = parseFloat(Math.atan(x2 / y2));
    } catch (e) {
      alert(e.message);
    }
  }
}

function shapeSelect() {
  switch (shape) {
    case 0:
      return new UniformRectangular();
    case 1:
      processAngles();
      return new UniformTriangular(angleOne, angleTwo);
    case 2:
      processAngles();
      return new UniformTrapezoid(angleOne, angleTwo);
  }
}
function feedbackCreator() {}
