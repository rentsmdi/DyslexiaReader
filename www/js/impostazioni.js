    var filecss = null;

    var fileConn = "conn05.txt";

    var selValue = null;
    var textValue = null;
    var sizeValue = null;

    var back = null;
    var font = null;
    var fontCSS = null;
    var text = null;
    var intlinea = null;
    var wspc = null;
    var lspc = null;

    var CSScode = 'cssCode.txt';

// FUNZIONI
    function onDeviceReady() {
        readBack()
        readFont();
        readSize();
        readURL();
        set();
    };
    function set(){
        document.getElementById("palette").addEventListener("change", paletteApp, false);
        document.getElementById("testo").addEventListener("change", textApp, false);
        document.getElementById("fontsize").addEventListener("change", sizeApp, false);
        document.getElementById("palettenav").addEventListener("change", background, false);
        document.getElementById("fontsizenav").addEventListener("change", fontsize, false); 
        document.getElementById("fontfamilynav").addEventListener("change", ffamily, false); 
        document.getElementById("colornav").addEventListener("change", textcolor, false);
        document.getElementById("interlinea").addEventListener("change", inter, false);
        document.getElementById("wspace").addEventListener("change", wspacing, false);
        document.getElementById("lspace").addEventListener("change", lspacing, false);
        document.getElementById("save").addEventListener("touchend", saveAll, false);
        document.addEventListener("backbutton", function(event){
            window.location="index.html";
        }, false);
    }

// IMPOSTAZIONI APPLICAZIONE
    function paletteApp(event){
        event.preventDefault();
        selValue = event.target.value;
        setcolor();
    }
    function textApp(event){
        event.preventDefault();
        textValue = event.target.value;
        if (textValue == 'Standard')
            textValue = "'Roboto', sans-serif";
        if (textValue == 'Open Dyslexic')
            textValue = "'OpenDyslexic'";
        if (textValue == 'Chelsea Market')
            textValue = "'Chelsea Market', cursive";
        if (textValue == 'Slackey')
            textValue = "'Slackey', cursive";
        if (textValue == 'Open Sans')
            textValue = "'Open Sans', sans-serif";
        if (textValue == 'Exo')
            textValue = "'Exo', sans-serif";
        if (textValue == 'Ubuntu')
            textValue = "'Ubuntu', sans-serif";
        setfont();
    }
    function sizeApp(event){
        event.preventDefault();
        sizeValue = event.target.value;
        if (sizeValue == 'Piccolo')
            sizeValue = "small";
        if (sizeValue == 'Normale')
            sizeValue = "medium";
        if (sizeValue == 'Grande')
            sizeValue = "x-large";
        setsize();
    };

//SALVATAGGIO IMPOSTAZIONI APPLICAZIONE
    function setfont(){  
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile("fontCSS.txt", {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.write(textValue);
                });
            });
        });
    };
    function setcolor(){  
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile("backCSS.txt", {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.write(selValue);
                });
            });
        });
    };
    function setsize(){  
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile("fontsizeCSS.txt", {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.write(sizeValue);
                });
            });
        });
    };

//IMPOSTAZIONI URL PAGINA INIZIALE
    function writeURL(){
        alert("Impostazioni salvate!"); 
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile(fileConn, {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                        writer.onwriteend = function(evt) {
                            window.location = "impostazioni.html";
                        };
                        writer.write(document.getElementById("initpage").value);
                });
            }, function(e){alert("Problemi nel salvataggio.")});
        }, function(e){alert("Problemi nel salvataggio.")});
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

//LETTURA DA FILE E APPLICAZIONE DELLE IMPOSTAZIONI APPLICAZIONE
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
                    document.getElementsByClassName("bg1")[0].style.backgroundColor = '#d8ffe8';
                    document.getElementsByClassName("bg2")[0].style.backgroundColor = '#ebd6ff';
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

//FUNZIONI PER LE IMPOSTAZIONI VISUALIZZAZIONE CONTENUTI WEB
    function background(event){
        event.preventDefault();
        back = event.target.value;
        if (back == 'Bianco')
            back = '#f7f7f7';
        if (back == 'Crema')
            back = '#FAFAC8';
        if (back == 'Giallo')
            back = '#FFFF00';
        if (back == 'Blu')
            back = '#0000FF';
        document.getElementById("testsettings").style.backgroundColor = back;
    };
    function textcolor(event){
        event.preventDefault();
        text = event.target.value;
        if (text == 'Bianco')
            text = '#f7f7f7';
        if (text == 'Nero')
            text = '#000000';
        if (text == 'Marrone')
            text = '#964B00';
        if (text == 'Blu')
            text = '#0000FF';
        document.getElementById("testsettings").style.color = text;
    };
    function ffamily(event){
        event.preventDefault();
        fontCSS = event.target.value;
        if (fontCSS == 'Standard')
            fontCSS = 'Arial, Helvetica, sans-serif';
        if (fontCSS == 'Open Dyslexic')
            fontCSS = '"OpenDyslexic"';
        if (fontCSS == 'Chelsea Market')
            fontCSS = "'Chelsea Market', cursive";
        if (fontCSS == 'Open Sans')
            fontCSS = "'Open Sans', sans-serif";
        if (fontCSS == 'Exo')
            fontCSS = "'Exo', sans-serif";
        if (fontCSS == 'Ubuntu')
            fontCSS = "'Ubuntu', sans-serif";
        if (fontCSS == 'Slackey')
            fontCSS = "'Slackey', cursive";
        document.getElementById("testsettings").style.fontFamily = fontCSS;
    }
    function fontsize(event){
        event.preventDefault();
        font = event.target.value;
        if (font == 'Piccolo')
            font = "small";
        if (font == 'Normale')
            font = "medium";
        if (font == 'Grande')
            font = "x-large";
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
        if (wspc == 'Nessuna')
            wspc = "0px";
        document.getElementById("testsettings").style.wordSpacing = wspc;
    }
    function lspacing(event){
        event.preventDefault();
        lspc = event.target.value;
        if (lspc == 'Nessuna')
            lspc = "0px";
        document.getElementById("testsettings").style.letterSpacing = lspc;
    }
// BOTTONE SALVA
    function saveAll(event){
        event.preventDefault();
        if (text!=null && back!=null && font!=null && fontCSS!=null && intlinea!= null && wspc!=null && lspc!=null){
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