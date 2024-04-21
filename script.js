var uncatWords = [];
var learnedWords = [];

document.getElementById("fileupload").addEventListener("click", function () {
  document.getElementById("fileinput").click();
});

document.getElementById("fileinput").addEventListener("change", handleFile, false);

function handleFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  document.getElementById('filename').innerHTML = file.name;

  reader.onload = function (e) {
    const contents = e.target.result;

    const jsonData = JSON.parse(contents);
    document.getElementById('wordscount').innerHTML = jsonData.uncategorized.length + jsonData.learned.length;

    jsonData.uncategorized.forEach(element => {
        uncatWords.push(element.toLowerCase())
    });

    jsonData.learned.forEach(element => {
        learnedWords.push(element.toLowerCase())
    });

    loadUncatWords();
    loadLearnedWords();

    document.getElementById("content").style = "visibility:isible";
    document.getElementById("datasave").style = "visibility:isible";
  };
  reader.readAsText(file);
}

function finallyLearned(elem) {
    uncatWords.splice(uncatWords.indexOf(elem.parentNode.querySelector("h2").textContent), 1)
    learnedWords.push(elem.parentNode.querySelector("h2").textContent)
    clearUncatWords();
    loadUncatWords();
    clearLearnedWords();
    loadLearnedWords();
}
function iForgotIt(elem) {
    learnedWords.splice(learnedWords.indexOf(elem.parentNode.querySelector("h2").textContent), 1)
    uncatWords.push(elem.parentNode.querySelector("h2").textContent)
    clearLearnedWords();
    loadLearnedWords();
    clearUncatWords();
    loadUncatWords();
}

function loadUncatWords() {
    const divuncat = document.getElementById('uncategorized')

    const divelem = document.createElement("div")

    const h1elem = document.createElement("h1")
    h1elem.innerHTML = `TODO (${uncatWords.length})`
    h1elem.style.fontSize = "24px"
    divelem.appendChild(h1elem)

    divuncat.appendChild(divelem)

    uncatWords.sort()
    uncatWords.forEach(element => {
        const divelem = document.createElement("div")
        divelem.setAttribute("class", "elem")

        const h2elem = document.createElement("h2")
        h2elem.innerHTML = element
        divelem.appendChild(h2elem)

        const btnelem = document.createElement("button")
        btnelem.setAttribute("type", "button")
        btnelem.setAttribute("onclick", "finallyLearned(this)")

        const imgelem = document.createElement("img")
        imgelem.setAttribute("src", "ok_32.png")
        btnelem.appendChild(imgelem)
        divelem.appendChild(btnelem)

        divuncat.appendChild(divelem)
    }); 
}
function loadLearnedWords() {
    const divlearnedcat = document.getElementById('learned')

    const divelem = document.createElement("div")

    const h1elem = document.createElement("h1")
    h1elem.innerHTML = `DONE (${learnedWords.length})`
    h1elem.style.fontSize = "24px"
    divelem.appendChild(h1elem)

    divlearnedcat.appendChild(divelem)

    learnedWords.sort()
    learnedWords.forEach(element => {
        const divelem = document.createElement("div")
        divelem.setAttribute("class", "elem")

        const h2elem = document.createElement("h2")
        h2elem.innerHTML = element
        divelem.appendChild(h2elem)

        const btnelem = document.createElement("button")
        btnelem.setAttribute("type", "button")
        btnelem.setAttribute("onclick", "iForgotIt(this)")

        const imgelem = document.createElement("img")
        imgelem.setAttribute("src", "x_32.png")
        btnelem.appendChild(imgelem)
        divelem.appendChild(btnelem)

        divlearnedcat.appendChild(divelem)
    });
}

function clearUncatWords() {
    let elements = document.getElementById('uncategorized');
    while (elements.firstChild) {
        elements.removeChild(elements.firstChild);
    }
}
function clearLearnedWords() {
    let elements = document.getElementById('learned');
    while (elements.firstChild) {
        elements.removeChild(elements.firstChild);
    }
}

function saveData() {
    let data = {"uncategorized": uncatWords, "learned": learnedWords}
    saveDataToFile(data, document.getElementById('filename').textContent)
}
function saveDataToFile(data, filename) {
    var jsonStr = JSON.stringify(data, null, 2);
    var blob = new Blob([jsonStr], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
  
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  
    URL.revokeObjectURL(url);
}

/*function addUncatWord(word) {
    const divuncat = document.getElementById('uncategorized')

    const divelem = document.createElement("div")
    divelem.setAttribute("class", "elem")

    const h2elem = document.createElement("h2")
    h2elem.innerHTML = word
    divelem.appendChild(h2elem)

    const btnelem = document.createElement("button")
    btnelem.setAttribute("type", "button")
    btnelem.setAttribute("onclick", "finallyLearned(this)")

    const imgelem = document.createElement("img")
    imgelem.setAttribute("src", "ok_32.png")
    btnelem.appendChild(imgelem)
    divelem.appendChild(btnelem)

    divuncat.appendChild(divelem)
}
function addLearnedWord(word) {
    const divlearnedcat = document.getElementById('learned')

    const divelem = document.createElement("div")
    divelem.setAttribute("class", "elem")

    const h2elem = document.createElement("h2")
    h2elem.innerHTML = word
    divelem.appendChild(h2elem)

    const btnelem = document.createElement("button")
    btnelem.setAttribute("type", "button")
    btnelem.setAttribute("onclick", "iForgotIt(this)")

    const imgelem = document.createElement("img")
    imgelem.setAttribute("src", "x_32.png")
    btnelem.appendChild(imgelem)
    divelem.appendChild(btnelem)

    divlearnedcat.appendChild(divelem)
}*/