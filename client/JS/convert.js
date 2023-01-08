const codeEditor = document.querySelectorAll('.code-editor')
const codeConvertBtn = document.getElementById('code-convert-btn')
const clipboardBtn = document.getElementById('clipboard')
let editors, loadInterval, clipboardData;


// code editor setup

window.onload = () => {
    codeEditor.forEach((editor) => {
        editors = ace.edit(editor.id);
        editors.setShowPrintMargin(false);
        editors.setTheme("ace/theme/monokai")
        editors.session.setMode(`ace/mode/java`)
    })
}

function changeLang() {
    let lang1 = document.getElementById('language1')
    let lang2 = document.getElementById('language2')
    let val1 = lang1.value;
    let val2 = lang2.value;
    // console.log(val1);
    // console.log(val2);
    codeEditor.forEach((editor) => {
        // console.log(editor.id)
        if (editor.id == 'inputEditor') {
            editors = ace.edit(editor.id);
            editors.session.setMode(`ace/mode/${val1}`)
            // console.log("editor 1: ", editors.session)
        } else if (editor.id == 'outputEditor') {
            editors = ace.edit(editor.id);
            editors.session.setMode(`ace/mode/${val2}`)
            // console.log("editor 2: ", editors.session)
        }
    })
}

codeConvertBtn.addEventListener('click', () => {
    editors = ace.edit('inputEditor');
    // getting the val of the input Editor
    // check there is any error in the input before proceding
    // TDOD : 
    let inputData = editors.getValue();
    // setting the value in the output Editor
    loadOutputfromOpenAi(inputData);
})

async function loadOutputfromOpenAi(inputData) {
    editors = ace.edit('outputEditor');
    editors.setReadOnly(true);
    editors.session.setValue(".");
    loadInterval = setInterval(() => {
        editors.session.setValue(editors.getValue() + ".")
        if (editors.getValue() === "....") {
            editors.session.setValue("");
        }
    }, 300)
    // fetch data form the server
    let convertingPrompt = `convert the following ${document.getElementById('language1').value} code into ${document.getElementById('language2').value} : `

    console.log(convertingPrompt, inputData)
    let response;
    try {
        response = await fetch("http://localhost:5000/convert", {
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
        editors.session.setValue("")
        const data = await response.json()
        const parsedData = data.bot.trim()
        clipboardData = parsedData
        typingTextEffect(editors, parsedData)
        console.log("Data from the code Ai : ", data);
    } else {
        // TODO : show alert
        alert("Something went wrong")
        clearInterval(loadInterval)
        const err = await response.text();
        console.log(err)
    }
}

function typingTextEffect(editor, text) {
    let index = 0;

    let interval = setInterval(() => {
        if (index < text.length) {
            editor.session.setValue(editor.getValue() + text.charAt(index))
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)
}

clipboardBtn.addEventListener('click', () => {
    console.log("copied to the clipboard : ", clipboardData)
    navigator.clipboard.writeText(clipboardData)
})