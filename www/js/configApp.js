//    var num = 0;
//    var c = 0;
//    var color = null;
//    var f = 0;
//    var font = null;

var selValue;
var textValue;
var sizeValue;

function onDeviceReady() {
    set();  
    readBack()
    readFont();
    readSize();
    readURL();

};
function set(){
//        if (num!=0) {
//            read();
//        }
//        if (c==0){
//            setcol();    
//        }
//        if (f==0){
//            setFCSS();    
//        }
    document.getElementById("btnhome").addEventListener("click", home);
    document.getElementById("submit").addEventListener("click", write);
    document.getElementById("palette").addEventListener("change", list);
    document.getElementById("testo").addEventListener("change", text);
    document.getElementById("fontsize").addEventListener("change", size);
}

function list(event){
    selValue = event.target.value;
    if (selValue == 'Bianco')
        selValue = '#f7f7f7';
    if (selValue == 'Crema')
        selValue = '#FAFAC8';
    if (selValue == 'Giallo')
        selValue = '#FFFF00';
    setcolor();
}

// versione web-safe, non dovrebbe essere necessaria

function text(event){
    textValue = event.target.value;
    if (textValue == 'Normal')
        textValue = 'Arial, Helvetica, sans-serif';
    if (textValue == 'Open Dyslexic')
        textValue = '"OpenDyslexic"';
    setfont();
}
function size(event){
    sizeValue = event.target.value;
    setsize();
}
function home(){
    window.location="index.html";
}
//Funzioni per leggere e impostare l'URL di connessione
function readURL(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("readme.txt", null, setURL, fail);
    }, fail);    
}
function setURL(fileEntry) {
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
            document.getElementById("initpage").value = this.result;
        }
        reader.readAsText(file);
    });
}
function write(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, function(fileEntry){
            fileEntry.createWriter(function(writer){
                writer.onwriteend = function(evt) {
                    readURL();
                };
                writer.write(document.getElementById("initpage").value);
            }, fail);
        }, fail);
    }, fail);
}
 
function fail(e) { };

//Funzioni per scrivere le impostazioni nei file di configurazione

function setfont(){  
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("fontCSS.txt", {create: true, exclusive: false}, function(fileEntry){
            fileEntry.createWriter(function(writer){
                writer.write(textValue);
                readFont();
            }, fail);
        }, fail);
    }, fail);
}
function setcolor(){  
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("backCSS.txt", {create: true, exclusive: false}, function(fileEntry){
            fileEntry.createWriter(function(writer){
                writer.write(selValue);
                readBack();
            }, fail);
        }, fail);
    }, fail);
}
function setsize(){  
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("fontsizeCSS.txt", {create: true, exclusive: false}, function(fileEntry){
            fileEntry.createWriter(function(writer){
                writer.write(sizeValue);
                readSize();
            }, fail);
        }, fail);
    }, fail);
}

//Funzioni per leggere i file di configurazioni e impostarli nel css della pagina

function readBack(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("backCSS.txt", null, setValue);
    });    
}
function readFont(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("fontCSS.txt", null, setFF);
    });    
}
function readSize(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("fontsizeCSS.txt", null, setFontSize);
    });    
}
function setFF(fileEntry) {
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
                document.body.style.fontFamily = this.result;
        }
        reader.readAsText(file);
    });
} 
function setValue(fileEntry) {
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
                document.body.style.backgroundColor = this.result;
        }
        reader.readAsText(file);
    });
}
function setFontSize(fileEntry) {
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
                document.body.style.fontSize = this.result;
        }
        reader.readAsText(file);
    });
} 