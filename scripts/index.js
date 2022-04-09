document.querySelectorAll("input[type=number]").forEach(input => input.addEventListener("input", function() {
    document.querySelector(`#${this.parentElement.parentElement.id} button`).disabled = false;
}, { once: true }));

document.querySelector("#calculator button").onclick = () => {
    const number = parseInt(document.querySelector("#user-number").value);
    const output =  document.querySelector("#calculated-sum");
    output.classList.add("visible");
    output.innerHTML = `${number * (Math.abs(number) + 1) / 2}`;
}

document.querySelector("#highlight-links button").onclick = function() {
    const links = document.querySelectorAll("a");
    links.forEach(link => link.classList.add("highlight"));
    this.disabled = true;
}

document.querySelector("#user-data button").onclick = function() {
    const ul = document.querySelector("#output-user-data");
    for(let [information, value] of Object.entries(userData)) {
        const li = document.createElement("li");
        li.innerHTML = `${information}: ${value}`;
        ul.appendChild(li);
    }
    this.disabled = true;
}

const displayRoll = (roll) => {
    const ul = document.querySelector("#dice-rolls");
    const li = document.createElement("li");
    li.innerHTML = `#${ul.children.length + 1}: You rolled ${roll}.`;
    ul.appendChild(li);
}

const cleanDisplay = () => {
    const ul = document.querySelector("#dice-rolls");
    while(ul.firstChild) { ul.removeChild(ul.firstChild); }
}

const roll = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    displayRoll(roll);
    return roll;
}

document.querySelector("#statistics button").onclick = () => {
    cleanDisplay();
    const rolls = document.querySelector("#output-total-rolls");
    const guess = (document.querySelector("#output-target-number").innerHTML = document.querySelector("#user-target-number").value);
    rolls.innerHTML = `${1}`;
    while (roll() !== parseInt(guess)) { rolls.innerHTML++;}
}