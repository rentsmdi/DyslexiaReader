    var selValue;
    var sizeValue;
    var filecss = null;
    var back = null;
    var font = null;
    var text = null;
    var textValue = null;
    var intlinea = null;
    var test = 'fff.txt';

    function onDeviceReady() {
        set();  
        readBack()
        readFont();
        readSize();
        readURL();
        readCSS();

    };
    function set(){
        document.getElementById("submit").addEventListener("click", write);
        document.getElementById("palette").addEventListener("change", list);
        document.getElementById("testo").addEventListener("change", textapp);
        document.getElementById("fontsize").addEventListener("change", size);
        document.getElementById("palettenav").addEventListener("change", background, false);
        document.getElementById("fontsizenav").addEventListener("change", fontsize, false); 
        document.getElementById("fontfamilynav").addEventListener("change", ffamily, false); 
        document.getElementById("colornav").addEventListener("change", textcolor, false);
        document.getElementById("interlinea").addEventListener("change", inter, false);
        document.getElementById("save").addEventListener("touchend", navigation, false);
        document.addEventListener("backbutton", function(event){
            window.location="index.html";
        }, false);
    }

    function list(event){
        selValue = event.target.value;
        setcolor();
    }

    function textapp(event){
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
            fileSystem.root.getFile("connessione.txt", null, setURL, fail);
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
            fileSystem.root.getFile("connessione.txt", {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.onwriteend = function(evt) {
                        alert("Salvato!");
                        window.location = "impostazioni.html"; 
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
                    writer.onwriteend = function(evt) {
                        window.location = "impostazioni.html";    
                    }
                    writer.write(textValue);
    //                readFont();
                }, fail);
            }, fail);
        }, fail);
    }
    function setcolor(){  
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile("backCSS.txt", {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.onwriteend = function(evt) {
                        window.location = "impostazioni.html";    
                    }
                    writer.write(selValue);
    //                readBack();
                }, fail);
            }, fail);
        }, fail);
    }
    function setsize(){  
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile("fontsizeCSS.txt", {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.onwriteend = function(evt) {
                        window.location = "impostazioni.html";    
                    }
                    writer.write(sizeValue);
    //                readSize();
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
// FUNZIONI DI STILE
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
        textValue = event.target.value;
        if (textValue == 'Standard')
            textValue = 'Arial, Helvetica, sans-serif';
        if (textValue == 'Open Dyslexic')
            textValue = '"OpenDyslexic"';
        if (textValue == 'Chelsea Market')
            textValue = "'Chelsea Market', cursive";
        if (textValue == 'Open Sans')
            textValue = "'Open Sans', sans-serif";
        if (textValue == 'Exo')
            textValue = "'Exo', sans-serif";
        if (textValue == 'Ubuntu')
            textValue = "'Ubuntu', sans-serif";
        if (textValue == 'Slackey')
            textValue = "'Slackey', cursive";
        document.getElementById("testsettings").style.fontFamily = textValue;
    }
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
// NAVIGAZIONE
    function navigation(event){
        event.preventDefault();
        if (filecss==null){
            if (text==null || back==null || font==null || textValue==null)
                alert('Selezionare configurazione!');
            else if (text!=null && back!=null && font!=null && textValue!=null){
                filecss = "@import url(http://fonts.googleapis.com/css?family=Chelsea+Market);  @import url(https://fonts.googleapis.com/css?family=Slackey); @import url(https://fonts.googleapis.com/css?family=Open+Sans); @import url(https://fonts.googleapis.com/css?family=Exo); @import url(https://fonts.googleapis.com/css?family=Ubuntu); @import url(http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.ttf);  @font-face{font-family: 'OpenDyslexic'; !important; src: url('http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.eot'); src: url('http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.eot') format('embedded-opentype'), url('http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.woff') format('woff'), url('http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.ttf') format('truetype');}         @font-face {font-family: "+textValue+" !important; } html, body, div, p, h1, h2, h3, h4, h5, li, ul, ol, table, td, tr, a, list {color: "+text+" !important; text-transform: lowercase !important; text-decoration: none !important; font-family: "+textValue+" !important; } html, body, div, p, h1, h2, h3, h4, h5, li, ul, ol, br, table, td, tr, a, list, article, section {background-color: "+back+" !important; } h1, h2, h3, h4, h5 { font-family: "+textValue+" !important; } h1{ font-weight: bold !important; font-size: 24px !important; letter-spacing: 2px !important; word-spacing: 3px !important;} body {margin: 0px !important; padding: 0px !important;} div, p, article, section { font-family: "+textValue+" !important; border: 0px !important; font-size: "+font+"  !important; } p, li { line-height:"+intlinea+" !important; letter-spacing: 2px !important; word-spacing: 3px !important; text-align: left !important; } input, textarea, select{ font-family: "+textValue+" !important; background: white !important; border: 1px solid black !important; } form, fieldset {  background: none !important; }";
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
                fileSystem.root.getFile(test, {create: true, exclusive: false}, function(fileEntry){
                    fileEntry.createWriter(function(writer){
                        writer.onwriteend = function(evt) {
                            alert('Configurazione salvata!');
                        };
                        writer.write(filecss);
                    });
                });
            });
//            setCSS();     
            }
//                        else 
//                            alert('caso non specificato(?)');
        }                    
        else if(filecss!=null){
            if(text!=null && back!=null && font!=null && textValue!=null){
                filecss = "@import url(http://fonts.googleapis.com/css?family=Chelsea+Market);  @import url(https://fonts.googleapis.com/css?family=Slackey); @import url(https://fonts.googleapis.com/css?family=Open+Sans); @import url(https://fonts.googleapis.com/css?family=Exo); @import url(https://fonts.googleapis.com/css?family=Ubuntu); @import url(http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.ttf); @font-face{font-family: 'OpenDyslexic'; !important; src: url('http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.eot'); src: url('http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.eot') format('embedded-opentype'), url('http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.woff') format('woff'), url('http://canvasweb.altervista.org/fonts/opendyslexic-regular-webfont.ttf') format('truetype');}          @font-face {font-family: "+textValue+" !important; } html, body, div, p, h1, h2, h3, h4, h5, li, ul, ol, table, td, tr, a, list {color: "+text+" !important; text-transform: lowercase !important; text-decoration: none !important; font-family: "+textValue+" !important; } html, body, div, p, h1, h2, h3, h4, h5, li, ul, ol, br, table, td, tr, a, list, article, section {background-color: "+back+" !important; } h1, h2, h3, h4, h5 { font-family: "+textValue+" !important; } h1{ font-weight: bold !important; font-size: 24px !important; letter-spacing: 2px !important; word-spacing: 3px !important;} body {margin: 0px !important; padding: 0px !important;} div, p, article, section { font-family: "+textValue+" !important; border: 0px !important; font-size: "+font+"  !important; } p, li { line-height:"+intlinea+" !important;  letter-spacing: 2px !important; word-spacing: 3px !important; text-align: left !important; } input, textarea, select{ font-family: "+textValue+" !important; background: white !important; border: 1px solid black !important; } form, fieldset {  background: none !important; }";
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
                    fileSystem.root.getFile(test, {create: true, exclusive: false}, function(fileEntry){
                        fileEntry.createWriter(function(writer){
                            writer.onwriteend = function(evt) {
                                alert('Configurazione salvata!');
                            };
                            writer.write(filecss);
                        });
                    });
                });
//                setCSS(); 
            } 
            else {
//                            setCSS();
                alert("Impostare tutte le variabili!");
            }
        }
    }

    function readCSS(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile(test, null, function(fileEntry){
                fileEntry.file(function(file) {
                var reader = new FileReader();
                reader.onloadend = function(e) {
                    filecss = this.result;
                }
                reader.readAsText(file);
                });
            }, function(e){ 
                filecss = null;
            });
        });    
    }