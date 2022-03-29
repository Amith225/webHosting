let pSub = ["Math", "Pysics", "Electrical", "CAED", "Civil", "English", "DT", "Pysics Lab"];
let pCredit = [4, 3, 3, 3, 3, 2, 1, 1];
let cSub = ["Math", "Mech", "Electronics", "CProgramming", "Chemistry", "DT", "Chemistry Lab", "CProgramming Lab", "Workshop"];
let cCredit = [4, 3, 3, 3, 3, 1, 1, 1, 1];
let cycleDict = {"hide": [[], []], "c": [cSub, cCredit], "p": [pSub, pCredit]};

function setForm() {
    for (let cycle in cycleDict) {
        let sub = cycleDict[cycle][0], credit = cycleDict[cycle][1];
        let container = document.getElementById(cycle);
        for (let i = 0; i < sub.length; i++) {
            let sii = document.createElement("sliding-input");
            sii.id = 'ii' + i.toString();
            sii.label = sub[i] + ' (credits:' +credit[i].toString() + ')';
            sii.placeholder = '0-50';
            container.appendChild(sii);
            slidingInput(sii);
        }
        container.hidden = true;
    }
}

function changeForm() {
    let cycleValue = document.getElementById("cycle").value;
    for (let cycle in cycleDict) {
        let container = document.getElementById(cycle);
        if (cycleValue === cycle) container.hidden = false;
        else container.hidden = true;
    }
}
