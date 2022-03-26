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
    let per = m * 2;
    let currGp = c * gradePoint(per)
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


function updatePer(i) {
  let m = document.getElementById("i" + i.toString()).value;
  let labPer = document.getElementById("lp" + i.toString());
  let text;
  if (m) {
    let per = m * 2;
    if (per <= 100) {text = per.toString()}
    else {text = ''}
  }
  else {text = ''}
  labPer.innerText = text
}


function setForm() {
  let cycle = document.getElementById("cycle").value;
  let div = document.getElementById("d1");
  div.innerHTML = '<div class="head">Subject</div><div class="head">Credits</div>' +
      '<div class="head">Internal Marks Entry</div><div class="head">Percentage</div>';
  let sub = cycleDict[cycle][0]; let credit = cycleDict[cycle][1];
  for (let i = 0; i < sub.length; i++) {
    let s = sub[i]; let c = credit[i];

    let labSub = document.createElement("label"); labSub.innerText = s; labSub.className = "cell";
    let labCredit = document.createElement("label"); labCredit.innerText = c; labCredit.className = "cell";
    let inp = document.createElement("input");
    let labPer = document.createElement("label");
    labPer.id = 'lp' + i.toString(); labPer.innerText = ''; labPer.className = "cell";
    inp.id = "i" + i.toString(); inp.type = "number"; inp.step = "1"; inp.max = "50"; inp.min = "0";
    inp.required = true;
    inp.addEventListener("keypress", checkNum);
    inp.addEventListener("keyup", function (evt) {updatePer(i)})

    div.appendChild(labSub); div.appendChild(labCredit); div.appendChild(inp); div.appendChild(labPer)
  }
}
