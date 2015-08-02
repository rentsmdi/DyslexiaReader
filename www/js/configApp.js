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
    var btnhome = document.getElementById("btnhome");
    btnhome.addEventListener("click", home);
    var imp = document.getElementById("submit");
    submit.addEventListener("click", write);
    var col = document.getElementById("palette");
    col.addEventListener("change", list);
    var testo = document.getElementById("testo");
    testo.addEventListener("change", text);
    var fontsize = document.getElementById("fontsize");
    fontsize.addEventListener("change", size);
}

function list(event){
    sizeValue = event.target.value;
    if (selValue == 'Bianco')
        selValue = '#FFFFFF';
    if (selValue == 'Crema')
        selValue = '#FAFAC8';
    if (selValue == 'Giallo')
        selValue = '#FFFF00';
    setcolor();
}
// versione web-safe, non dovrebbe essere necessaria

function text(event){
    textValue = event.target.value;
    if (textValue == 'Arial')
        textValue = 'Arial, Helvetica, sans-serif';
    if (textValue == 'Open Dyslexic')
        textValue = '"OpenDyslexic"';
//        if (textValue == 'Verdana')
//            textValue = 'Verdana, Geneva, sans-serif';
//        if (textValue == 'Tahoma')
//            textValue = 'Tahoma, Geneva, sans-serif';
//        if (textValue == 'Trebuchet')
//            textValue = '"Trebuchet MS", Helvetica, sans-serif';
//        if (textValue == 'Helvetica Neue')
//            textValue = '"Helvetica Neue", Helvetica, Arial, sans-serif';
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