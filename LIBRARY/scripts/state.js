/**contains functions that handle state of the program */

function initStates(value, shp) {
  shape = shp;
  switch (value) {
    case 0:
      initialUniformState();
      break;
    case 1:
      initialRapidState();
      break;
    case 2:
      initialGradualState();
  }
}
function initialUniformState() {
  flowTask = 0;
  let htable = document.getElementById("hTable");
  deleteElement(htable);
  let tableEnter = document.getElementById("tableEnter");
  clearElement(tableEnter);
  let showTableButton = document.getElementById("showtableGVF");
  deleteElement(showTableButton);
  let svg = document.getElementById("svg");
  clearElement(svg);
  svg.style.display = "block";
  let extraTable = document.getElementById("extraOut");
  clearElement(extraTable);
  let graphTitle = document.getElementById("graphTitle");
  clearElement(graphTitle);
  /** Button Colors */
  {
    let uniformB = document.getElementById("uniformTd");
    uniformB.style.backgroundColor = "rgb(10, 6, 23)";
    uniformB.style.color = "white";
    let rapidB = document.getElementById("rapidTd");
    rapidB.style.backgroundColor = "aqua";
    rapidB.style.color = "black";
    let gradualB = document.getElementById("gradualTd");
    gradualB.style.backgroundColor = "aqua";
    gradualB.style.color = "black";
  }
  /**Images*/
  let rapidImage = document.getElementById("hjumpImage");
  deleteElement(rapidImage);
  /* rvf table */
  let rvfTable = document.getElementById("rvfTable");
  rvfTable.style.display = "none";
  /** Unifrom Flow Task Header */
  let uniTaskHeader = document.getElementById("taskDiv");
  uniTaskHeader.style.display = "flex";
  /* combinations div */
  let combDiv = document.getElementById("tableCombinationsDiv");
  combDiv.style.display = "block";
  let h3 = document.getElementById("supportedheader");
  h3.textContent = "Supported Combinations";
  let combinationTable = document.getElementById("combinationsTable");
  clearElement(combinationTable);
  PrepareSections(shape);
}
function initialRapidState() {
  flowTask = 1;
  let tableEnter = document.getElementById("tableEnter");
  clearElement(tableEnter);
  let showTableButton = document.getElementById("showtableGVF");
  deleteElement(showTableButton);
  let svg = document.getElementById("svg");
  clearElement(svg);
  let extraTable = document.getElementById("extraOut");
  clearElement(extraTable);
  let graphTitle = document.getElementById("graphTitle");
  clearElement(graphTitle);
  let rvfTable = document.getElementById("rvfTable");
  rvfTable.style.display = "flex";
  let tLabel = document.getElementById("HydraulicJumpB");
  tLabel.textContent = "Hydraulic Jump Throgh Horizontal Channel";
  /** Button Colors */
  {
    let uniformB = document.getElementById("uniformTd");
    uniformB.style.backgroundColor = "aqua";
    uniformB.style.color = "black";
    let rapidB = document.getElementById("rapidTd");
    rapidB.style.backgroundColor = "rgb(10, 6, 23)";
    rapidB.style.color = "white";
    let gradualB = document.getElementById("gradualTd");
    gradualB.style.backgroundColor = "aqua";
    gradualB.style.color = "black";
  }
  createJumpInterface();
}
function initialGradualState() {
  flowTask = 2;
  let htable = document.getElementById("hTable");
  deleteElement(htable);
  let tableEnter = document.getElementById("tableEnter");
  clearElement(tableEnter);
  let showTableButton = document.getElementById("showtableGVF");
  deleteElement(showTableButton);
  let svg = document.getElementById("svg");
  clearElement(svg);
  let extraTable = document.getElementById("extraOut");
  clearElement(extraTable);
  let graphTitle = document.getElementById("graphTitle");
  clearElement(graphTitle);
  let rvfTable = document.getElementById("rvfTable");
  rvfTable.style.display = "flex";
  let tLabel = document.getElementById("HydraulicJumpB");
  tLabel.textContent = "Water Profile Will be Plotted";
  /** Button Colors */
  {
    let uniformB = document.getElementById("uniformTd");
    uniformB.style.backgroundColor = "aqua";
    uniformB.style.color = "black";
    let rapidB = document.getElementById("rapidTd");
    rapidB.style.backgroundColor = "aqua";
    rapidB.style.color = "black";
    let gradualB = document.getElementById("gradualTd");
    gradualB.style.backgroundColor = "rgb(10, 6, 23)";
    gradualB.style.color = "white";
  }
  prepareGVFInterface();
}

function clearElement(element) {
  if (element) {
    clearElementComponents(element);
  }
}
function deleteElement(element) {
  if (element) {
    let parent = element.parentElement;
    if (parent) {
      parent.removeChild(element);
    }
  }
}
