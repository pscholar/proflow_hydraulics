/**contains functions that handle user interface for rapidly varied flow */

function prepareCalculation() {
  let discharge = parseFloat(document.getElementById("discharge").value);

  let upstreamDepth = parseFloat(
    document.getElementById("upstreamDepth").value
  );

  if (shape == 0) {
    let bottomWidth = parseFloat(document.getElementById("bottomWidth").value);

    let rectRVF = new RectangularRVF();
    rectRVF.solverRVF(upstreamDepth, bottomWidth, discharge);
    let answerMap = rectRVF.getAnswer();
    prepareValues(answerMap);
  } else if (shape == 1) {
    processAngles();

    let triRVF = new TriangularRVF(angleOne, angleTwo);
    let discharge = parseFloat(document.getElementById("discharge").value);

    let upstreamDepth = parseFloat(
      document.getElementById("upstreamDepth").value
    );

    triRVF.solverRVF(upstreamDepth, 0, discharge);
    let answerMap = triRVF.getAnswer();
    prepareValues(answerMap);
  } else if (shape == 2) {
    processAngles();

    let bottomWidth = parseFloat(document.getElementById("bottomWidth").value);

    let trapRVF = new TrapezoidRVF(angleOne, angleTwo);
    trapRVF.solverRVF(bottomWidth, upstreamDepth, discharge);
    let answerMap = trapRVF.getAnswer();
    prepareValues(answerMap);
  }
}
function prepareValues(value) {
  let htable = document.getElementById("hTable");
  if (htable) {
    clearElementComponents(htable);
  }
  let table = document.createElement("table");
  table.setAttribute("id", "hTable");
  let visualArea = document.getElementById("visualArea");
  visualArea.insertBefore(table, visualArea.firstChild);
  let row = document.createElement("tr");
  row.setAttribute("id", "extrarowHeader");
  let td_1 = document.createElement("td");
  td_1.setAttribute("colspan", 2);
  td_1.textContent = "Calculated Data";
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
