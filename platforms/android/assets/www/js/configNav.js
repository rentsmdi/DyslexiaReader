    function onDeviceReady() {
        var filecss;
        var ref = null;
        var urlCSS;
        var conn = 'http://www.google.it';
        requestCSS('../css/config.css');
        set();
    };

    function set(){ 
            init();
            var but1 = document.getElementById("btn1");
            var but2 = document.getElementById("btn2");
            var btngo = document.getElementById("btngo");
            var btnavz = document.getElementById("btnavz");
            var btnhome = document.getElementById("btnhome");
            but1.addEventListener("click", setting1); 
            but2.addEventListener("click", setting2);
            btngo.addEventListener("click", open);
            btnavz.addEventListener("click", avanz);
            btnhome.addEventListener("click", init);
        }

    function requestCSS(css){
        var urlCSS = css;
        var req = new XMLHttpRequest();
        req.open("GET", urlCSS, false);
        req.send();
        filecss = req.responseText;
    }
    function init(){
//                    window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/settings.txt", setValue, fail);
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
            fileSystem.root.getFile("readme.txt", null, function(fileEntry){
                fileEntry.file(function(file) {
                    var reader = new FileReader();
                    reader.onloadend = function(e) {
                        conn = this.result;
                    }
                    reader.readAsText(file);
                });
            }, fail);
        }, fail);
    };

    function fail(e) {
        alert("FileSystem Error");
    }

    function setting1(){
        requestCSS('../css/config1.css');
    }

    function setting2(){
        requestCSS('../css/config2.css');
    }

    function avanz(){
        window.location="configAvanz.html";
    }

    function home(){
        window.location="index.html";     
    }

    function open(){
        ref = window.open(conn, '_blank','location=yes');
        ref.addEventListener('loadstop', function() {
            ref.insertCSS({code: filecss});
        }); 
    }