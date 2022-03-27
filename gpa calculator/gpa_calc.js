let pSub = ["Math", "Pysics", "Electrical", "CAED", "Civil", "English", "DT", "Pysics Lab"];
let pCredit = [4, 3, 3, 3, 3, 2, 1, 1];
let cSub = ["Math", "Mech", "Electronics", "CProgramming", "Chemistry", "DT", "Chemistry Lab", "CProgramming Lab", "Workshop"];
let cCredit = [4, 3, 3, 3, 3, 1, 1, 1, 1];
let cycleDict = {"c": [cSub, cCredit], "p": [pSub, pCredit]};
let marksInt, marksSee, maxMark, pers, maxPer;


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
  let cycle = document.getElementById("cycle").value, credit = cycleDict[cycle][1];

  let gp = 0, cd = 0, cgpaCd = 0;
  let c, mi, ms;
  for (let i = 0; i < credit.length; i++) {
    c = credit[i];
    mi = document.getElementById("ii" + i.toString()).value;
    ms = document.getElementById("is" + i.toString()).value;  // todo: for see marks
    let per = mi * 2, currGp = c * gradePoint(per);
    cd += c; gp += currGp;
    if (currGp !== 0) {cgpaCd += c}
  }
  const sgpa = gp / cd, cgpa = gp / cgpaCd;
  alert("Your SGPA is: " + sgpa.toString() + '\n' +
        "Your CGPA is: " + cgpa.toString());
}


function sum(array) {return array.reduce(function (a, b) {return a + b}, 0);}


function checkNum(evt) {
  if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57)  {evt.preventDefault()}
}


function updateDep(i) {
  let mi = document.getElementById("ii" + i.toString()).value;
  let ms = document.getElementById('is' + i.toString()).value;  // todo: for see marks
  let labPerGp = document.getElementById("lpg" + i.toString());
  let textPerGp = '';
  if (mi) {
    marksInt[i] = parseInt(mi);
    let per = mi * 2;
    pers[i] = per;
    if (per <= 100) {
      textPerGp =
        '<text style="float: left">' + per.toString() + '%' + '</text>' +
        '<text style="float: right">' + ' (' + gradePoint(per).toString() + ')' + '</text>';
    }
    else {marksInt[i] = 0; pers[i] = 0;}
  }
  else {marksInt[i] = 0; pers[i] = 0;}
  labPerGp.innerHTML = textPerGp;

  let labTMarkInt = document.getElementById('tmi'), labTPerGp = document.getElementById('tpg');
  let totalMarks = sum(marksInt);
  if (totalMarks) {
    labTMarkInt.innerText = totalMarks.toString() + '/' + maxMark.toString();
    labTPerGp.innerText = (sum(pers) / pers.length).toFixed(2).toString() + '%';
  }
  else {labTMarkInt.innerText = ''; labTPerGp.innerText = '';}
}


function setEntry(inp, iName, i) {
  inp.id = iName + i.toString(); inp.type = "number"; inp.step = "1"; inp.max = "50"; inp.min = "0";
  inp.required = true; inp.className = "entry"; inp.placeholder = "0-50"
  inp.addEventListener("keypress", checkNum); inp.addEventListener("keyup", function (_) {updateDep(i)});
}


function setForm() {
  let cycle = document.getElementById("cycle").value;
  let div = document.getElementById("d1");
  let sub = cycleDict[cycle][0]; let credit = cycleDict[cycle][1];
  marksInt = []; marksSee = []; pers = []; maxMark = credit.length * 50; maxPer = credit.length * 100;
  div.innerHTML =
    '<div class="head">Course (Credits)</div>' +
    '<div class="head">Internal Marks Entry</div>' +
    '<div class="head">SEE Marks Entry (X)</div>' +
    '<div class="head">% (GP)</div>';
  for (let i = 0; i < sub.length; i++) {
    let s = sub[i]; let c = credit[i];

    let labSub = document.createElement("label");
    labSub.id = 'ls'
    labSub.innerHTML =
        '<text style="float: left">' + s + '</text>' +
        '<text style="float: right">' + ' (' + c.toString() + ')' + '</text>';
    labSub.className = "head";
    div.appendChild(labSub);

    let inpInternal = document.createElement("input"); let inpSee = document.createElement("input");
    setEntry(inpInternal, 'ii', i); setEntry(inpSee, 'is', i)
    inpSee.disabled = true;
    div.appendChild(inpInternal); div.appendChild(inpSee);

    let labPerGp = document.createElement("label");
    labPerGp.id = 'lpg' + i.toString();
    labPerGp.className = "dynamic";
    div.appendChild(labPerGp);

    marksInt.push(0); marksInt.push(0); pers.push(0);
  }
  let labTotal = document.createElement('label');
  labTotal.innerText = "Total" + ' (' + sum(credit).toString() + ')' + ' = ';
  labTotal.className = "head";
  div.appendChild(labTotal);

  let labTMarkInt = document.createElement("label"); labTMarkInt.id = 'tmi'; labTMarkInt.className = "dynamic";
  let labTMarkSee = document.createElement("label"); labTMarkSee.id = 'tms'; labTMarkSee.className = "dynamic";
  div.appendChild(labTMarkInt); div.appendChild(labTMarkSee);

  let labTPerGp = document.createElement("label"); labTPerGp.id = 'tpg'; labTPerGp.className = "dynamic";
  div.appendChild(labTPerGp);
}
