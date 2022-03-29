function customTag(tagName, fn) {
    document.createElement(tagName);
    let tagInstances = document.getElementsByTagName(tagName);
    for (let i = 0; i < tagInstances.length; i++) {
        fn(tagInstances[i]);
    }
}

function inputSet(elee, elee2, eLabel, placeholder) {
    elee.placeholder = placeholder;
    let handleClick = function () {
        if (document.activeElement !== elee && document.activeElement !== elee2 && !elee.value && !elee2.value) {
            eLabel.classList.remove('typed')
        }
        else eLabel.classList.add('typed')
    }
    document.addEventListener('focusout', handleClick, true);
    document.addEventListener('focusin', handleClick, true);
    elee.onkeyup = function (evt) {
        if (elee.value) eLabel.classList.add('typed')
        else if (document.activeElement !== elee) eLabel.classList.remove('typed')
    };
}

function slidingInput(element) {
    let attributes = element.attributes;
    for (let attr in attributes) {
        if (attr === "length") break
        element[attributes[attr].name] = attributes[attr].value;
    }
    let label = element.label, placeholder1 = element.placeholder1, placeholder2 = element.placeholder2;
    let eLabel = document.createElement("label")
    let eInput1 = document.createElement("input"), eInput2 = document.createElement("input");
    let innerHTML = element.innerHTML;
    if (innerHTML) eLabel.innerHTML = innerHTML;
    else if (label) eLabel.innerText = label;

    inputSet(eInput1, eInput2, eLabel, placeholder1); inputSet(eInput2, eInput1, eLabel, placeholder2)

    let div = document.createElement("div");
    div.appendChild(eLabel);
    div.appendChild(eInput1); div.appendChild(eInput2);
    element.appendChild(div);
}

customTag("sliding-input", slidingInput);
