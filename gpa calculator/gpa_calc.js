let pSub = ["Math", "Pysics", "Electrical", "CAED", "Civil", "English", "DT", "Pysics Lab"];
let pCredit = [4, 3, 3, 3, 3, 2, 1, 1];
let cSub = ["Math", "Mech", "Electronics", "CProgramming", "Chemistry", "DT", "Chemistry Lab", "CProgramming Lab", "Workshop"];
let cCredit = [4, 3, 3, 3, 3, 1, 1, 1, 1];
let cycleDict = {"c": [cSub, cCredit], "p": [pSub, pCredit]};
let marks; let maxMark;
let pers; let maxPer;


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


function updateDep(i) {
  let m = document.getElementById("i" + i.toString()).value;
  let labPer = document.getElementById("lp" + i.toString());
  let labGp = document.getElementById("lgp" + i.toString());
  let textPer = ''; let textGp = '';
  if (m) {
    marks[i] = parseInt(m);
    let per = m * 2;
    pers[i] = per;
    if (per <= 100) {textPer = per.toString() + '%'; textGp = gradePoint(per).toString()}
    else {marks[i] = 0; pers[i] = 0;}
  }
  else {marks[i] = 0; pers[i] = 0;}
  labPer.innerText = textPer
  labGp.innerText = textGp

  let tMark = document.getElementById('tm');
  let tPer = document.getElementById('tp');
  let totalMarks = marks.reduce(function (a, b) {return a + b}, 0)
  if (totalMarks) {
    tMark.innerText = totalMarks.toString() + '/' + maxMark.toString();
    tPer.innerText = (pers.reduce(function (a, b) {return a + b}, 0) / pers.length).toString() + '%';
  }
  else {tMark.innerText = ''; tPer.innerText = '';}
}


function setEntry(inp, iName, i, s) {
  inp.id = iName + i.toString(); inp.type = "number"; inp.step = "1"; inp.max = "50"; inp.min = "0";
  inp.required = true; inp.className = "entry"; inp.placeholder = s
  inp.addEventListener("keypress", checkNum);
  inp.addEventListener("keyup", function (evt) {updateDep(i)});
}


function setForm() {
  let cycle = document.getElementById("cycle").value;
  let div = document.getElementById("d1");
  marks = []; pers = []
  div.innerHTML = '<div class="main">Credits</div><div class="main">Internal Marks Entry</div>' +
      '</div><div class="main">SEE Marks Entry (disabled)</div><div class="main">Percentage</div><div class="main">Grade Point</div>';
  let sub = cycleDict[cycle][0]; let credit = cycleDict[cycle][1];
  for (let i = 0; i < sub.length; i++) {
    let s = sub[i]; let c = credit[i];

    let labCredit = document.createElement("label"); labCredit.innerText = c; labCredit.className = "main";
    let inpInternal = document.createElement("input"); let inpSee = document.createElement("input");
    let labPer = document.createElement("label"); labPer.id = 'lp' + i.toString(); labPer.className = "dynamic";
    let labGp = document.createElement("label"); labGp.id = 'lgp' + i.toString(); labGp.className = "dynamic";
    setEntry(inpInternal, 'i', i, s); setEntry(inpSee, 'is', i, s)
    inpSee.disabled = true;

    div.appendChild(labCredit); div.appendChild(inpInternal); div.appendChild(inpSee); div.appendChild(labPer); div.appendChild(labGp);

    marks.push(0);
    pers.push(0);
  }
  maxMark = credit.length * 50; maxPer = credit.length * 100;
  let tCredit = document.createElement("label"); tCredit.className = "main";
  tCredit.innerText = credit.reduce(function (a, b) {return a + b}, 0);
  let tMark = document.createElement("label"); tMark.id = 'tm'; tMark.className = "dynamic";
  let tMarkSee = document.createElement("label"); tMarkSee.id = 'tms'; tMarkSee.className = "dynamic";
  let tPer = document.createElement("label"); tPer.id = 'tp'; tPer.className = "dynamic";
  let total = document.createElement('label'); total.innerText = "Total"; total.className = "main"
  div.appendChild(tCredit); div.appendChild(tMark); div.appendChild(tMarkSee); div.appendChild(tPer); div.appendChild(total);
}
