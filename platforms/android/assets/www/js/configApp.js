//    var num = 0;
//    var c = 0;
//    var color = null;
//    var f = 0;
//    var font = null;

    function onDeviceReady() {
        set();  
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
        read();
        var btnhome = document.getElementById("btnhome");
        btnhome.addEventListener("click", home);
        var imp = document.getElementById("submit");
        submit.addEventListener("click", write);
        var backcol = document.getElementById("backcol");
        backcol.addEventListener("click", setcolor);
        var fontApp = document.getElementById("font");
        fontApp.addEventListener("click", setfont);
    }
    function home(){
        window.location="index.html";
    }

    function write(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.onwriteend = function(evt) {
//                        num = writer.length;
                        read();
                    };
                    writer.write(document.getElementById("initpage").value);
                }, fail);
            }, fail);
        }, fail);
    }

    function read(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile("readme.txt", null, setValue, fail);
        }, fail);    
    }

    function setValue(fileEntry) {
        fileEntry.file(function(file) {
            var reader = new FileReader();
            reader.onloadend = function(e) {
                document.getElementById("initpage").value = this.result;
            }
            reader.readAsText(file);
        });
    } 

    function fail(e) {
        alert("Errore!");
    }
//    function setBack(){
//        c = 1;
//        color = 'azure'
//        document.body.style.backgroundColor = color;
//        setcolor();
//    }
//    function setFont(){
//        f = 1;
//        font = 'Arial, sans-serif'
//        document.body.style.fontFamily = font;
//        setfont();
//    }
    function setfont(){  
        document.body.style.fontFamily = 'Verdana, sans-serif'
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile("fontCSS.txt", {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.write('Verdana, sans-serif');
                }, fail);
            }, fail);
        }, fail);
    }
    function setcolor(){  
        document.body.style.backgroundColor = 'darksalmon';
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile("backCSS.txt", {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.write('darksalmon');
                }, fail);
            }, fail);
        }, fail);
    }