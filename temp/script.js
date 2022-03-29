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
            let si = document.createElement("sliding-input");
            si.id = 'ii' + i.toString(); // todo
            si.label = sub[i] + ' (credits:' +credit[i].toString() + ')';
            si.placeholder1 = '0-50 (CIE)'; si.placeholder2 = '0-50 (SEE)';
            container.appendChild(si)

            let l = document.createElement("label");
            l.innerText = "GP \n %";
            l.style = "align-self: center"
            container.appendChild(l);

            slidingInput(si);
        }
        container.classList.add("hidden");
    }
}

function changeForm() {
    let cycleValue = document.getElementById("cycle").value;
    for (let cycle in cycleDict) {
        let container = document.getElementById(cycle);
        if (cycleValue !== cycle) container.classList.add("hidden")
        else container.classList.remove("hidden")
    }
}
