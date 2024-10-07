/**
 * contains functions that handles user interface of study option
 */

function onStudy() {
  //user_sectorInput.setAttribute('rows','10');
  //user_sectorInput.setAttribute('cols','100');
  // div for holding links.
  let headerDiv = document.createElement("div"); // header to hold a header and cross.
  let txt1 = "Open Channel Hydraulics Course by Mrigank Saurav";
  let txt2 = "Lecture Series on hydraulics by Dr. Arup Kumar Sarma";
  let a1 = createLink(
    "https://youtube.com/playlist?list=PLk7ptZcI9vmjtIq3KnJZWvlHEr7P_EKA2",
    txt1
  );
  let a2 = createLink(
    "https://freevideolectures.com/course/90/hydraulics",
    txt2
  );
  let txt3 = "Open channel hydraulics course by Abhijit";
  let a3 = createLink("https://youtu.be/dLLxaEiGF-c", txt3);
  let d1 = createDiv(a1);
  let d2 = createDiv(a2);
  let d3 = createDiv(a3);
  headerDiv.setAttribute("id", "headerDiv");
  let headLabel = document.createElement("label");
  headLabel.setAttribute("id", "headLabel");
  let headText = document.createTextNode("Further Your Understanding ");
  headLabel.appendChild(headText);
  let divTo = document.querySelector("#contentbody");
  let db = document.getElementById("accountDiv");
  if (db) {
    divTo.removeChild(db);
  }
  let headCancel = document.createElement("button");
  headCancel.setAttribute("id", "headCancel");
  headCancel.addEventListener(
    "click",
    () => {
      divTo.removeChild(mainDiv);
    },
    false
  );
  let cancelText = document.createTextNode("x");
  headCancel.appendChild(cancelText);
  headerDiv.appendChild(headLabel);
  headerDiv.appendChild(headCancel);
  let mainDiv = document.createElement("div"); // content div.
  mainDiv.setAttribute("id", "accountDiv2");
  mainDiv.appendChild(headerDiv);
  mainDiv.appendChild(d1);
  mainDiv.appendChild(d2);
  mainDiv.appendChild(d3);
  divTo.appendChild(mainDiv);
}
function createLink(link, text) {
  let a = document.createElement("a");
  let label = document.createElement("label");
  label.setAttribute("class", "labelLink");
  label.textContent = text;
  a.appendChild(label);
  a.setAttribute("href", link);
  a.setAttribute("target", "_blank");
  a.setAttribute("class", "studylinks");
  return a;
}
function createDiv(link) {
  let Div1 = document.createElement("div");
  Div1.setAttribute("class", "linkDiv");
  Div1.appendChild(document.createElement("br"));
  Div1.appendChild(link);
  return Div1;
}
