var filecss = null;
var variables = null;

var fileConn = "conn08.txt";

var selValue = null;
var textValue = null;
var sizeValue = null;

var back = null;
var fontCSS = null;
var text = null;
var font = null;
var intlinea = null;
var wspc = null;
var lspc = null;

var CSScode = 'cssCode3.txt';

// FUNZIONI
function onDeviceReady() {
    readBack()
    readFont();
    readSize();
    readURL();
    set();
    loadCSS();
};

function set() {
    document.getElementById("palette").addEventListener("change", list, false);
    document.getElementById("testo").addEventListener("change", textapp, false);
    document.getElementById("fontsize").addEventListener("change", size, false);
    document.getElementById("palettenav").addEventListener("change", background, false);    
    document.getElementById("fontfamilynav").addEventListener("change", ffamily, false);    
    document.getElementById("colornav").addEventListener("change", textcolor, false);
    document.getElementById("fontsizenav").addEventListener("change", fontsize, false);
    document.getElementById("interlinea").addEventListener("change", inter, false);
    document.getElementById("wspace").addEventListener("change", wspacing, false);
    document.getElementById("lspace").addEventListener("change", lspacing, false);
    document.getElementById("save").addEventListener("click", saveConfiguration, false);
    document.addEventListener("backbutton", function(event){
        window.location="index.html";
    }, false);
}
// LETTURA VARIABILI "VISUALIZZAZIONE CONTENUTI WEB"
function loadCSS(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("variables1.txt", null, function(fileEntry){
            fileEntry.file(function(file) {
            var reader = new FileReader();
            reader.onloadend = function(e) {
                setCSS(this.result);
            }
            reader.readAsText(file);
            });
        }, function(e){ });
    });
}
function setCSS(css){
    var first = css.indexOf("0@");
    var last = css.indexOf("1@");
    back = css.slice(first+2, last);
    document.getElementById("palettenav").value = back;
    document.getElementById("testsettings").style.backgroundColor = back;
    
    first = css.indexOf("1@");
    last = css.indexOf("2@");
    fontCSS = css.slice(first+2, last);                 
    if (fontCSS == "'Roboto', sans-serif")
        document.getElementById("fontfamilynav").value = "0";
    if (fontCSS == "'OpenDyslexic'")
        document.getElementById("fontfamilynav").value = "1";
    if (fontCSS == "'Chelsea Market', cursive")
        document.getElementById("fontfamilynav").value = "2";
    if (fontCSS == "'Slackey', cursive")
        document.getElementById("fontfamilynav").value = "3";
    if (fontCSS == "'Open Sans', sans-serif")
        document.getElementById("fontfamilynav").value = "4";
    if (fontCSS == "'Exo', sans-serif")
        document.getElementById("fontfamilynav").value = "5";
    if (fontCSS == "'Ubuntu', sans-serif")
        document.getElementById("fontfamilynav").value = "6";
    document.getElementById("testsettings").style.fontFamily = fontCSS;
    
    first = css.indexOf("2@");
    last = css.indexOf("3@");
    text = css.slice(first+2, last);
    document.getElementById("colornav").value = text;
    document.getElementById("testsettings").style.color = text;
    
    first = css.indexOf("3@");
    last = css.indexOf("4@");
    font = css.slice(first+2, last);
    document.getElementById("fontsizenav").value = font;
    document.getElementById("testsettings").style.fontSize = font;
    
    first = css.indexOf("4@");
    last = css.indexOf("5@");
    intlinea = css.slice(first+2, last);
    document.getElementById("interlinea").value = intlinea;
    document.getElementById("testsettings").style.lineHeight = intlinea;
    
    first = css.indexOf("5@");
    last = css.indexOf("6@");
    wspc = css.slice(first+2, last);
    document.getElementById("wspace").value = wspc;
    document.getElementById("testsettings").style.wordSpacing = wspc;
    
    first = css.indexOf("6@");
    last = css.indexOf("7@");
    lspc = css.slice(first+2, last);
    document.getElementById("lspace").value = lspc;
    document.getElementById("testsettings").style.letterSpacing = lspc;
}

//IMPOSTAZIONI URL PAGINA INIZIALE
function writeURL(){
    alert("Le impostazioni sono state salvate con successo!"); 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile(fileConn, {create: true, exclusive: false}, function(fileEntry){
            fileEntry.createWriter(function(writer){
                writer.onwriteend = function(evt) {
                    window.location = "impostazioni.html";
                };
                if ((document.getElementById("initpage").value.length)<= 0)
                    writer.write("www.google.it");
                else 
                    writer.write(document.getElementById("initpage").value);
            });
        }, function(e){alert("Problemi nel salvataggio delle impostazioni.")});
    }, function(e){alert("Problemi nel salvataggio delle impostazioni.")});
}
function readURL(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile(fileConn, null, setURL);
    });    
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

//IMPOSTAZIONI APPLICAZIONE
function list(event){
    event.preventDefault();
    selValue = event.target.value;
    if(selValue=='Standard'){
        document.getElementsByClassName("bg1")[0].style.backgroundColor = '#fffff9';  
        document.getElementsByClassName("bg2")[0].style.backgroundColor = '#fffa8f'; 
    }
    else if(selValue=='Greyscale'){
        document.getElementsByClassName("bg1")[0].style.backgroundColor = '#ffffff';
        document.getElementsByClassName("bg2")[0].style.backgroundColor = '#f2f2f2'; 
    }
    else if(selValue=='Lavender'){
        document.getElementsByClassName("bg1")[0].style.backgroundColor = '#d8ffe8';
        document.getElementsByClassName("bg2")[0].style.backgroundColor = '#ebd6ff';
    }
}
function textapp(event){
    event.preventDefault();
    textValue = event.target.value;
    if (textValue == '0')
        textValue = "'Roboto', sans-serif";
    if (textValue == '1')
        textValue = "'OpenDyslexic'";
    if (textValue == '2')
        textValue = "'Chelsea Market', cursive";
    if (textValue == '3')
        textValue = "'Slackey', cursive";
    if (textValue == '4')
        textValue = "'Open Sans', sans-serif";
    if (textValue == '5')
        textValue = "'Exo', sans-serif";
    if (textValue == '6')
        textValue = "'Ubuntu', sans-serif";
    document.body.style.fontFamily = textValue;
}
function size(event){
    event.preventDefault();
    sizeValue = event.target.value;
    document.body.style.fontSize = sizeValue;
};
function saveAll(){
    setcolor();
    setfont()
    setsize();
}

//SALVATAGGIO IMPOSTAZIONI APPLICAZIONE
function setcolor(){  
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("backCSS2.txt", {create: true, exclusive: false}, function(fileEntry){
            fileEntry.createWriter(function(writer){
                writer.write(selValue);
            });
        });
    });
};
function setfont(){  
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("fontCSS2.txt", {create: true, exclusive: false}, function(fileEntry){
            fileEntry.createWriter(function(writer){
                writer.write(textValue);
            });
        });
    });
};
function setsize(){  
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("fontsizeCSS2.txt", {create: true, exclusive: false}, function(fileEntry){
            fileEntry.createWriter(function(writer){
                writer.write(sizeValue);
            });
        });
    });
};


//LETTURA DA FILE E APPLICAZIONE DELLE IMPOSTAZIONI APPLICAZIONE (no pagina iniziale)
function readBack(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("backCSS2.txt", null, setValue);
    });    
}
function readFont(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("fontCSS2.txt", null, setFF);
    });    
}
function readSize(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("fontsizeCSS2.txt", null, setFontSize);
    });    
}
function setValue(fileEntry) {
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
            selValue = this.result;
            if(this.result=='Standard'){
                document.getElementsByClassName("bg1")[0].style.backgroundColor = '#fffff9';  
                document.getElementsByClassName("bg2")[0].style.backgroundColor = '#fffa8f'; 
                document.getElementById("palette").value = this.result;
            }
            else if(this.result=='Greyscale'){
                document.getElementsByClassName("bg1")[0].style.backgroundColor = '#ffffff';
                document.getElementsByClassName("bg2")[0].style.backgroundColor = '#f2f2f2'; 
                document.getElementById("palette").value = this.result;
            }
            else if(this.result=='Lavender'){
                document.getElementsByClassName("bg1")[0].style.backgroundColor = '#d8ffe8';
                document.getElementsByClassName("bg2")[0].style.backgroundColor = '#ebd6ff';
                document.getElementById("palette").value = this.result;
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
            textValue = this.result;
            if (this.result == "'Roboto', sans-serif")
                document.getElementById("testo").value = "0"; 
            if (this.result == "'OpenDyslexic'")
                document.getElementById("testo").value = "1";
            if (this.result == "'Chelsea Market', cursive")
                document.getElementById("testo").value = "2";
            if (this.result == "'Slackey', cursive")
                document.getElementById("testo").value = "3";
            if (this.result == "'Open Sans', sans-serif")
                document.getElementById("testo").value = "4";
            if (this.result == "'Exo', sans-serif")
                document.getElementById("testo").value = "5";  
            if (this.result == "'Ubuntu', sans-serif")
                document.getElementById("testo").value = "6";
        }
        reader.readAsText(file);
    });
} 
function setFontSize(fileEntry) {
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
            document.body.style.fontSize = this.result;
            document.getElementById("fontsize").value = this.result;
            sizeValue = this.result;
        }
        reader.readAsText(file);
    });
} 

//FUNZIONI PER LE IMPOSTAZIONI VISUALIZZAZIONE CONTENUTI WEB
function background(event){
    event.preventDefault();
    back = event.target.value;
    document.getElementById("testsettings").style.backgroundColor = back;
};

function ffamily(event){
    event.preventDefault();
    fontCSS = event.target.value;
    if (fontCSS == '0')
        fontCSS = 'Arial, Helvetica, sans-serif';
    if (fontCSS == '1')
        fontCSS = '"OpenDyslexic"';
    if (fontCSS == '2')
        fontCSS = "'Chelsea Market', cursive";
    if (fontCSS == '3')
        fontCSS = "'Slackey', cursive";
    if (fontCSS == '4')
        fontCSS = "'Open Sans', sans-serif";
    if (fontCSS == '5')
        fontCSS = "'Exo', sans-serif";
    if (fontCSS == '6')
        fontCSS =  "'Ubuntu', sans-serif";
    document.getElementById("testsettings").style.fontFamily = fontCSS;
}
function textcolor(event){
    event.preventDefault();
    text = event.target.value;
    document.getElementById("testsettings").style.color = text;
};
function fontsize(event){
    event.preventDefault();
    font = event.target.value;
    document.getElementById("testsettings").style.fontSize = font;
};
function inter(event){
    event.preventDefault();
    intlinea = event.target.value;
    document.getElementById("testsettings").style.lineHeight = intlinea;
};
function wspacing(event){
    event.preventDefault();
    wspc = event.target.value;
    document.getElementById("testsettings").style.wordSpacing = wspc;
}
function lspacing(event){
    event.preventDefault();
    lspc = event.target.value;
    document.getElementById("testsettings").style.letterSpacing = lspc;
}
// BOTTONE SALVA
function saveConfiguration(event){
    event.preventDefault();
    saveAll();
    if (text!=null && back!=null && font!=null && fontCSS!=null && intlinea!= null && wspc!=null && lspc!=null){
        variables =  "0@"+back+"1@"+fontCSS+"2@"+text+"3@"+font+"4@"+intlinea+"5@"+wspc+"6@"+lspc+"7@";
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile("variables1.txt", {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.write(variables);
                });
            });
        });
        
        filecss = "@import url(http://fonts.googleapis.com/css?family=Chelsea+Market);  @import url(https://fonts.googleapis.com/css?family=Slackey); @import url(https://fonts.googleapis.com/css?family=Open+Sans); @import url(https://fonts.googleapis.com/css?family=Exo); @import url(https://fonts.googleapis.com/css?family=Ubuntu); @import url(http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.ttf); @font-face{font-family: 'OpenDyslexic'; !important; src: url('http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.eot'); src: url('http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.eot') format('embedded-opentype'), url('http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.woff') format('woff'), url('http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.ttf') format('truetype');}          @font-face {font-family: "+fontCSS+" !important; } html, body, div, p, h1, h2, h3, h4, h5, li, ul, ol, table, td, tr, a, list {color: "+text+" !important; text-transform: lowercase !important; text-decoration: none !important; font-family: "+fontCSS+" !important; } html, body, div, p, h1, h2, h3, h4, h5, li, ul, ol, br, table, td, tr, a, list, article, section {background-color: "+back+" !important; } h1, h2, h3, h4, h5 { font-family: "+fontCSS+" !important; } h1{ font-weight: bold !important; font-size: 24px !important; letter-spacing:"+lspc+" !important; word-spacing:"+wspc+" !important;} body {margin: 0px !important; padding: 0px !important;} div, p, article, section { font-family: "+fontCSS+" !important; border: 0px !important; font-size: "+font+"  !important; } p, li { line-height:"+intlinea+" !important;  letter-spacing:"+lspc+" !important; word-spacing:"+wspc+" !important; text-align: left !important; } input, textarea, select{ font-family: "+fontCSS+" !important; background: white !important; border: 1px solid black !important; } form, fieldset {  background: none !important; }";
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile(CSScode, {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.onwriteend = function(evt) {
//affinchè tutte le modifiche siano effettive, è necessario ricaricare la pagina ma questo può essere fatto solo nella funzione writeURL, al termine della scrittura nel file altrimenti non viene salvato il link.                          
                        writeURL();
                    };
                    writer.write(filecss);
                });
            });
        });    
    }
    else if (text==null && back==null && font==null && fontCSS==null && intlinea==null && wspc==null && lspc==null){
        //vedi commento precedente
        writeURL();    
    }
    else {            
        alert("Impostare tutte le variabili della navigazione avanzata!");       
    } 
}