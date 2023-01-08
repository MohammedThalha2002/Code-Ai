const codeEditor = document.querySelectorAll('.code-editor')
let editors;


// code editor setup

window.onload = () => {
    codeEditor.forEach((editor) => {
        editors = ace.edit(editor.id);
        editors.setTheme("ace/theme/monokai")
    })
}

function changeLang() {
    let lang1 = document.getElementById('language1')
    let lang2 = document.getElementById('language2')
    let val1 = lang1.options[lang1.selectedIndex].text;
    let val2 = lang2.options[lang2.selectedIndex].text;
    codeEditor.forEach((editor) => {
        if (editor.id == 'language1') {
            editors.session.setMode(`ace/mode/${val1}`)
        } else if (editor.id == 'language2') {
            editors.session.session.setMode(`ace/mode/${val2}`)
        }
    })
}