/**
 * contains functions for dynamic user interface of hydyraulic jump.
 */
function createJumpInterface() {
  let imageDiv = document.getElementById("shapeId");
  let check = document.getElementById("hjumpImage");
  if (check) {
    imageDiv.removeChild(check);
  }
  let supportDiv = document.getElementById("tableCombinationsDiv");
  supportDiv.style.display = "none";
  let taskDiv = document.getElementById("taskDiv");
  taskDiv.style.display = "none";
  let svgDiv = document.getElementById("svg");
  svgDiv.style.display = "none";
  let img = document.createElement("img");
  img.setAttribute("src", "LIBRARY/images/hjump.png");
  img.setAttribute("class", "shapeshows");
  img.setAttribute("id", "hjumpImage");
  img.style.marginTop = "10px";
  imageDiv.appendChild(img);
  let table = document.getElementById("tableEnter");
  clearElementComponents(table);
  let label1 = createLabel("rLabel", "Bottom Width b");
  let label2 = createLabel("rLabel", "Upstream Depth y1");
  let label3 = createLabel("rLabel", "Discharge Q");
  let input1 = createInput("inputArea", "bottomWidth");
  let input2 = createInput("inputArea", "upstreamDepth");
  let input3 = createInput("inputArea", "discharge");
  let tr1 = createHRows(label1, input1);
  let tr2 = createHRows(label2, input2);
  let tr3 = createHRows(label3, input3);
  if (shape == 1) {
    table.appendChild(tr2);
    table.appendChild(tr3);
  } else {
    table.appendChild(tr1);
    table.appendChild(tr2);
    table.appendChild(tr3);
  }
}
function createHRows(label, input) {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  td1.setAttribute("class", "rvfTd1");
  td2.setAttribute("class", "rvfTd2");
  tr.setAttribute("class", "rvfTr");
  tr.style.borderStyle = "solid";
  td1.appendChild(label);
  td2.appendChild(input);
  tr.appendChild(td1);
  tr.appendChild(td2);
  return tr;
}
function createInput(className, id) {
  let input = document.createElement("input");
  input.setAttribute("class", className);
  input.setAttribute("id", id);
  return input;
}
function createLabel(className, text) {
  let label = document.createElement("label");
  label.setAttribute("class", className);
  label.textContent = text;
  return label;
}
