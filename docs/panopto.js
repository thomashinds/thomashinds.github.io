import init, { process } from './panopto-pkg/panopto.js';

async function readSingleFile(e) {
    await init();

    let add_lines = document.getElementById('blank-lines').checked;
    console.log(add_lines);

    var file;
    if (e.target.files) {
        file = e.target.files[0];
    }
    else {
        file = document.getElementById('file-input').files[0];
    }

    if (!file) {
        return;
    }
    var reader = new FileReader();

    reader.onload = function (e) {
        var contents = e.target.result;
        displayContents(process(contents, add_lines));
    };

    reader.readAsText(file);
}

function displayContents(contents) {
    var element = document.getElementById('file-content');
    element.textContent = contents;
}

function copyText(e) {
    var element = document.getElementById('file-content');
    var text = element.innerText;
    navigator.clipboard.writeText(text);

    e.target.textContent = "Copied!"
    setTimeout( () => e.target.textContent = "Copy text", 3000 )
}

document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);

document.getElementById('blank-lines')
    .addEventListener('change', readSingleFile, false);

document.getElementById('copy-output')
    .addEventListener('click', copyText, false);