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
    document.getElementById("submit").addEventListener("click", write);
    document.getElementById("palette").addEventListener("change", list);
    document.getElementById("testo").addEventListener("change", text);
    document.getElementById("fontsize").addEventListener("change", size);
}

function list(event){
    selValue = event.target.value;
    setcolor();
}
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

//IMPOSTAZIONI URL CONNESSIONE
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

//IMPOSTAZIONE CONFIGURAZIONE BACKGROUND FONT E FONT-SIZE

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

//LETTURA CONFIGURAZIONI PER QUESTA PAGINA

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
function setValue(fileEntry) {
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
            if(this.result=='Standard'){
                document.getElementsByClassName("bg1")[0].style.backgroundColor = '#fffff9';  
                document.getElementsByClassName("bg2")[0].style.backgroundColor = '#fffa8f';  
            }
            else if(this.result=='Greyscale'){
                document.getElementsByClassName("bg1")[0].style.backgroundColor = '#ffffff';
                document.getElementsByClassName("bg2")[0].style.backgroundColor = '#f2f2f2'; 
            }
            else if(this.result=='Lavender'){
                document.getElementsByClassName("bg1")[0].style.backgroundColor = '#d3f8e2';
                document.getElementsByClassName("bg2")[0].style.backgroundColor = '#e4c1f9';
            }
        }
        reader.readAsText(file);
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
function setFontSize(fileEntry) {
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
                document.body.style.fontSize = this.result;
        }
        reader.readAsText(file);
    });
} 