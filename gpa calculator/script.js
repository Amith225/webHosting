let pSub = ["Math", "Physics", "Electrical", "CAED", "Civil", "English", "DT", "Physics Lab"];
let pCredit = [4, 3, 3, 3, 3, 2, 1, 1];
let cSub = ["Math", "Mech", "Electronics", "CProgramming", "Chemistry", "DT", "Chemistry Lab", "CProgramming Lab", "Workshop"];
let cCredit = [4, 3, 3, 3, 3, 1, 1, 1, 1];
let cycleDict = {
    "hide": [[], [], [], [], 0, []],
    "c": [cSub, cCredit, [], [], 0, []],
    "p": [pSub, pCredit, [], [], 0, []]
};

function setForm() {
    for (let cycle in cycleDict) {
        let sub = cycleDict[cycle][0], credit = cycleDict[cycle][1];
        let container = document.getElementById(cycle);
        let c = cycleDict[cycle];
        let marksInt = c[2], marksSee = c[3], maxMark = c[4], pers = c[5];
        c[4] = 50 * sub.length;
        for (let i = 0; i < sub.length; i++) {
            marksInt.push(0);
            marksSee.push(0);
            pers.push(0);
            let si = document.createElement("sliding-input");
            si.id = 'i' + "cycle" + i.toString();
            si.label = sub[i] + '\n(credits:' + credit[i].toString() + ')';
            si.placeholder1 = '0-50 (CIE)';
            si.placeholder2 = '0-50 (SEE)';
            container.appendChild(si)

            let l = document.createElement("label");
            l.id = 'lpg' + cycle + i.toString();
            l.className = "neo glass";
            l.innerHTML = " GP<br>" + '&nbsp;&nbsp;&nbsp;' + "%";
            l.style = "align-self: center; text-align: right;"
            container.appendChild(l);

            slidingInput(si);
            let children = si.children[0].children;
            let lab = children[0], inpCie = children[1], inpSee = children[2];
            // lab.classList.add("glass");
            inpCie.id = 'ii' + cycle + i.toString();
            inpSee.id = 'is' + cycle + i.toString();
            inpCie.required = true;
            inpSee.required = false;
            inpSee.disabled = true; // #todo
            inpCie.type = "number";
            inpSee.type = "number";
            inpCie.step = 1;
            inpSee.step = 1;
            inpCie.min = 0;
            inpSee.min = 0;
            inpCie.max = 50;
            inpSee.max = 50;
            inpCie.addEventListener('keypress', function (e) {
                checkNum(e, inpCie)
            });
            inpSee.addEventListener('keypress', function (e) {
                checkNum(e, inpSee)
            });
            inpCie.addEventListener("keyup", function () {
                updateDep(i, cycle)
            });
            inpSee.addEventListener("keyup", function () {
                updateDep(i, cycle)
            })
        }
        container.classList.add("hidden");
    }
}

function changeForm() {
    let cycleValue = document.getElementById("cycle").value, chk = document.getElementById("chk");
    enableInpSee(!chk.checked, cycleValue, true);
    for (let cycle in cycleDict) {
        let container = document.getElementById(cycle);
        if (cycleValue !== cycle) {
            container.classList.add("hidden");
            changeRequired(container, cycle, false)
        } else {
            container.classList.remove("hidden");
            changeRequired(container, cycle, true);
            updateDep(0, cycle);
            let labGpa = document.getElementById("gpa");
            labGpa.innerText = " CGPA\n SGPA";
        }
    }
}


function changeRequired(container, cycle, value) {
    let sub = cycleDict[cycle][0];
    for (let i = 0; i < sub.length; i++) {
        let inpCie = document.getElementById('ii' + cycle + i.toString());
        let inpSee = document.getElementById("is" + cycle + i.toString());
        inpCie.required = value;
        inpSee.required = value;
    }
}


function gradePoint(percentage) {
    if (percentage >= 90) {
        return 10
    } else if (percentage >= 80) {
        return 9
    } else if (percentage >= 70) {
        return 8
    } else if (percentage >= 60) {
        return 7
    } else if (percentage >= 50) {
        return 6
    } else if (percentage >= 40) {
        return 4
    } else {
        return 0
    }
}


function calculate() {
    let cycle = document.getElementById("cycle").value, credit = cycleDict[cycle][1];

    let gp = 0, cd = 0, cgpaCd = 0;
    let c, mi, ms;
    for (let i = 0; i < credit.length; i++) {
        c = credit[i];
        mi = document.getElementById("ii" + cycle + i.toString()).value;
        ms = document.getElementById("is" + cycle + i.toString()).value;
        let mii = mi, mss = ms;
        if (!mi) {
            mii = ms
        }
        if (!ms) {
            mss = mi
        }
        let m = parseInt(mii) + parseInt(mss);
        let per = m, currGp = c * gradePoint(per);
        cd += c;
        gp += currGp;
        if (currGp !== 0) {
            cgpaCd += c
        }
    }
    const sgpa = gp / cd, cgpa = gp / cgpaCd;
    let labGpa = document.getElementById("gpa");
    labGpa.innerText = cgpa.toString() + " CGPA\n" + sgpa.toString() + " SGPA";
}


function sum(array) {
    return array.reduce(function (a, b) {
        return a + b
    }, 0);
}


function checkNum(evt, elee) {
    let val = elee.value + evt.key
    if (evt.which !== 8 && evt.which !== 0 && evt.which < 48 || evt.which > 57 || val.length > 3) {
        evt.preventDefault()
    }
}


function updateDep(i, cycle) {
    let c = cycleDict[cycle];
    let marksInt = c[2], marksSee = c[3], maxMark = c[4], pers = c[5];

    let mi = document.getElementById("ii" + cycle + i.toString()).value;
    let ms = document.getElementById('is' + cycle + i.toString()).value;
    let labPerGp = document.getElementById("lpg" + cycle + i.toString());
    let textPerGp = ' Credit<br>' + '&nbsp;&nbsp;&nbsp;' + '%';
    let mii = mi, mss = ms;
    if (!mi) {
        mii = ms
    }
    if (!ms) {
        mss = mi
    }
    let m = parseInt(mii) + parseInt(mss);
    if (m) {
        if (mi) marksInt[i] = parseInt(mi);
        if (ms) marksSee[i] = parseInt(ms);
        let per = m;
        pers[i] = per * cycleDict[cycle][1][i];
        if (per <= 100) {
            textPerGp = gradePoint(per).toString() + ' GP' + '<br>' + per.toString() + '&nbsp;&nbsp;&nbsp;' + '%'
        } else {
            marksInt[i] = 0;
            marksSee[i] = 0;
            pers[i] = 0;
        }
    } else {
        marksInt[i] = 0;
        marksSee[i] = 0;
        pers[i] = 0;
    }
    labPerGp.innerHTML = textPerGp;

    let labTMark = document.getElementById('tm'), tMarkText = ''
    let labTPerGp = document.getElementById('lpg'), tPerGp = 'GP<br>&nbsp;&nbsp;&nbsp;%'

    let totalMarksI = sum(marksInt), totalMarksS = sum(marksSee);
    if (totalMarksI) {
        tMarkText += 'CIE: ' + totalMarksI.toString() + '/' + maxMark.toString() +
            ' (' + (totalMarksI / maxMark * 100).toFixed(2).toString() + ')' + '%';
    } else {
        tMarkText = 'CIE: ';
    }
    if (totalMarksS) {
        tMarkText += '\n' + 'SEE: ' + totalMarksS.toString() + '/' + maxMark.toString() +
            ' (' + (totalMarksI / maxMark * 100).toFixed(2).toString() + ')' + '%';
    } else {
        tMarkText += '\n' + 'SEE: ';
    }
    if (totalMarksI || totalMarksS) {
        tPerGp = 'Credit<br>' + (sum(pers) / sum(cycleDict[cycle][1])).toFixed(2).toString() + '&nbsp;&nbsp;&nbsp;%';
    }
    labTPerGp.innerHTML = tPerGp;
    labTMark.innerText = tMarkText;

    calculate();
}


function enableInpSee(disable = false, cycle, toClear=true) {
    for (let i = 0; i < cycleDict[cycle][0].length; i++) {
        let inpSee = document.getElementById('is' + cycle + i.toString());
        inpSee.disabled = disable;
        inpSee.required = !disable;
        if (toClear) clear();
    }
}

function clear() {
    let form = document.getElementById("form-container");
    let elee = form.getElementsByTagName("input");
    for (let e in elee) {
        elee[e].value = '';
    }
}

$(document).ready(function () {
    $(document).on('submit', '#form-container', function () {
        return false;
    });
});
