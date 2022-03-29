let pSub = ["Math", "Pysics", "Electrical", "CAED", "Civil", "English", "DT", "Pysics Lab"]
let pCredit = [4, 3, 3, 3, 3, 2, 1, 1]
let cSub = ["Math", "Mech", "Electronics", "CProgramming", "Chemistry", "DT", "Chemistry Lab", "CProgramming Lab", "Workshop"]
let cCredit = [4, 3, 3, 3, 3, 1, 1, 1, 1]
let cycleDict = {"c": [cSub, cCredit], "p": [pSub, pCredit]}

function __setFieldInput(thee, parent) {
    let lab = thee.context.attributes.label.nodeValue, ph = thee.context.attributes.placeholder.nodeValue
    let input = document.createElement("input"), label = document.createElement("label")
    let div = document.createElement("div")
    input.type = "text"
    input.placeholder = ph
    input.id = lab
    label.for = lab
    label.innerText = lab
    div.appendChild(input); div.appendChild(label)
    parent[0].appendChild(div)
}

function __setForm(thee) {
    $('#'+thee[0].id+' fieldInput').each(function () {__setFieldInput($(this), thee)})
}

function setForm() {
    $('#form div').each(function () {__setForm($(this))})
}
