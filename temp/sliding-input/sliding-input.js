function customTag(tagName, fn) {
    document.createElement(tagName);
    let tagInstances = document.getElementsByTagName(tagName);
    for (let i = 0; i < tagInstances.length; i++) {
        fn(tagInstances[i]);
    }
}

function slidingInput(element) {
    let attributes = element.attributes;
    for (let attr in attributes) {
        if (attr === "length") break
        element[attributes[attr].name] = attributes[attr].value;
    }
    let label = element.label, placeholder = element.placeholder;
    let eLabel = document.createElement("label"), eInput = document.createElement("input");
    let innerHTML = element.innerHTML;
    if (innerHTML) eLabel.innerHTML = innerHTML;
    else if (label) eLabel.innerText = label;

    eLabel.for = eInput;
    eInput.placeholder = placeholder;
    let handleClick = function () {
        if (document.activeElement !== eInput && !eInput.value) eLabel.classList.remove('typed')
        else eLabel.classList.add('typed')
    }
    document.addEventListener('focusout', handleClick, true);
    document.addEventListener('focusin', handleClick, true);
    eInput.onkeyup = function (evt) {
        if (eInput.value) eLabel.classList.add('typed')
        else if (document.activeElement !== eInput) eLabel.classList.remove('typed')
    };

    let div = document.createElement("div");
    div.appendChild(eLabel);
    div.appendChild(eInput);
    element.appendChild(div);
}

customTag("sliding-input", slidingInput);
