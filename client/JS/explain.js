const codeEditor = document.getElementById('inputEditor')
const codeExplainBtn = document.getElementById('code-explain-btn')
const outputContent = document.getElementById('outputExplanationContent')
let editors, loadInterval;


// code editor setup

window.onload = () => {
    editors = ace.edit("inputEditor");
    editors.setShowPrintMargin(false);
    editors.setTheme("ace/theme/monokai")
    editors.session.setMode(`ace/mode/python`)
}

codeExplainBtn.addEventListener('click', () => {
    editors = ace.edit('inputEditor');
    // getting the val of the input Editor
    // check there is any error in the input before proceding
    // TDOD : 
    let inputData = editors.getValue();
    // setting the value in the output Editor
    loadOutputfromOpenAi(inputData);
})

async function loadOutputfromOpenAi(inputData) {
    // editors = ace.edit('outputEditor');
    outputContent.innerHTML = "."
    loadInterval = setInterval(() => {
        // editors.session.setValue(editors.getValue() + ".")
        outputContent.innerHTML += "."
        if (outputContent.innerHTML == "....") {
            outputContent.innerHTML = ""
        }
    }, 300)
    // fetch data form the server
    let convertingPrompt = `explain the following code : `

    console.log(convertingPrompt, inputData)
    let response;
    try {
        response = await fetch("http://localhost:5000/explain", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                prompt: convertingPrompt + inputData
            })
        })
    } catch (error) {
        alert(error)
        clearInterval(loadInterval)
    }

    if (response.ok) {
        clearInterval(loadInterval)
        outputContent.innerHTML = ""
        const data = await response.json()
        const parsedData = data.bot.trim()
        typingTextEffect(parsedData)
        console.log("Data from the code Ai : ", data);
    } else {
        // TODO : show alert
        alert("Something went wrong")
        clearInterval(loadInterval)
        const err = await response.text();
        console.log(err)
    }
}

function typingTextEffect(text) {
    let index = 0;

    let interval = setInterval(() => {
        if (index < text.length) {
            outputContent.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}