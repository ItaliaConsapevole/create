let a=[];

document.getElementById('fileInput').addEventListener('change',input);
function input(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    let loaded = 0;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

                // Definiamo cosa fare quando il file è letto
        reader.onload = function(e) {
            try {
                        // Parsiamo il JSON
                const jsonData = JSON.parse(e.target.result);
                        // Aggiungiamo all'array
                if (Array.isArray(jsonData)) {
                    a = a.concat(jsonData);
                } else {
                    a.push(jsonData);
                }
                loaded++;
                console.log(`File ${file.name} caricato correttamente.`);
                if (loaded === files.length) {
                    console.log("Tutti i file sono stati importati nell'array:", a);
                    alert("File importati con successo! Controlla la console.");
                    update();
                }
            } catch (err) {
                console.error(`Errore nel parsing del file ${file.name}:`, err);
            }
        }
        reader.readAsText(file);
    }
}
function update(){
    if(a.length < 2) return;
    let head = Object.keys(a[1]);
    let HTML = '<tr><th>id</th>';
    for(let i=0;i<head.length; i++){
        HTML += '<th>' + head[i] + '</th>';
    }
    HTML += '</tr>';
    document.getElementById('head').innerHTML = HTML;
    HTML = '';
    for(let i=1;i<a.length; i++){
        HTML += '<tr><td>' + i + '</td>';
        for(let j=0;j<head.length;j++){
            HTML += '<td>' + a[i][head[j]] + '</td>';
        }
        HTML += '</tr>';
    }
    document.getElementById('content').innerHTML = HTML;
}
function addRow(b){
    if(b==0){
    let obj = {};
    let tr = document.getElementById('head').children[0];
    let ths = tr.children;
    for(let i=1; i<ths.length; i++){
        let key = ths[i].innerText;
        let value = prompt("Inserisci il valore per " + key);
        obj[key] = value;
    }
    a.push(obj);
}else{
    let id = prompt("Inserisci l'id dopo il quale inserire la riga");
    if(isNaN(id) || id < 0 || id >= a.length) {
        alert("ID non valido");
        return;
    }
    let obj = {};
    let tr = document.getElementById('head').children[0];
    let ths = tr.children;
    for(let i=1; i<ths.length; i++){
        let key = ths[i].innerText;
        let value = prompt("Inserisci il valore per " + key);
        obj[key] = value;
    }
    a.splice(parseInt(id)+1, 0, obj);
    
}
    a[0]++;
    update();
}
function deleteRow(){
    let id = prompt("Inserisci l'id della riga da eliminare");
    if(isNaN(id) || id < 0 || id >= a.length) {
        alert("ID non valido");
        return;
    }
    a.splice(parseInt(id), 1);
    a[0]--;
    update();
}
function exportJSON(){
    const dataStr = JSON.stringify(a, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const aElement = document.createElement("a");
    aElement.setAttribute("href", url);
    aElement.setAttribute("download", "data.json");
    document.body.appendChild(aElement);
    aElement.click();
    document.body.removeChild(aElement);
}


