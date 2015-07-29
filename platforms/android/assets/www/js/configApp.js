    function onDeviceReady() {
        set();  
    };
    function set(){
        read();
        var btnhome = document.getElementById("btnhome");
        btnhome.addEventListener("click", home);
        var imp = document.getElementById("submit");
        submit.addEventListener("click", write);
    }
    function home(){
        window.location="index.html";
    }

    function write(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, function(fileEntry){
                fileEntry.createWriter(function(writer){
                    writer.onwriteend = function(evt) {
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