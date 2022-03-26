let pSub = ["Math", "Pysics", "Electrical", "CAED", "PysicsLab", "Civil", "English", "DT"];
let pCredit = [4, 3, 3, 3, 3, 3, 2, 1];
let cSub = ["Math", "CAED", "Electronics", "CProgramming", "Chemistry", "DT", "ChemistryLab", "CProgrammingLab", "Workshop"];
let cCredit = [4, 3, 3, 3, 3, 1, 1, 1, 1];
let cycleDict = {"c": [cSub, cCredit], "p": [pSub, pCredit]};


function gradePoint(percentage) {
  if (percentage >= 90) {return 10}
  else if (percentage >= 80) {return 9}
  else if (percentage >= 70) {return 8}
  else if (percentage >= 60) {return 7}
  else if (percentage >= 50) {return 6}
  else if (percentage >= 40) {return 4}
  else {return 0}
}


function validate() {
  let cycle = document.getElementById("cycle").value;
  let credit = cycleDict[cycle][1];

  let gp = 0; let cd = 0; let cgpaCd = 0;
  let c; let m;
  for (let i = 0; i < credit.length; i++) {
    c = credit[i];
    m = document.getElementById("i" + i.toString()).value;
    let currGp = c * gradePoint(m * 2)
    cd += c; gp += currGp;
    if (currGp !== 0) {cgpaCd += c}
  }
  const sgpa = gp / cd;
  const cgpa = gp / cgpaCd;

  alert("Your SGPA is: " + sgpa.toString() + '\n' +
        "Your CGPA is: " + cgpa.toString());
}


function checkNum(evt) {
  if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57)  {evt.preventDefault()}
}


function setForm() {
  let cycle = document.getElementById("cycle").value;
  let div = document.getElementById("d1"); div.innerHTML = '';
  let sub = cycleDict[cycle][0]; let credit = cycleDict[cycle][1];
  for (let i = 0; i < sub.length; i++) {
    let s = sub[i]; let c = credit[i];

    let inp = document.createElement("input");
    inp.id = "i" + i.toString(); inp.type = "number"; inp.step = "1"; inp.max = "50"; inp.min = "0";
    inp.required = true;
    inp.addEventListener("keypress", checkNum);

    let lab = document.createElement("label"); lab.innerText = s + "(Credits " + c.toString() + ")";

    div.appendChild(inp); div.appendChild(lab); div.appendChild(document.createElement("br"));
  }
}
