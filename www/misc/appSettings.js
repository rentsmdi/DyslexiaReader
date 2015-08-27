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
        var str = this.result;
    //                            if (str.charAt(0)==1)
            document.getElementsByClassName("col-2")[0].style.backgroundColor = str;
    }
    reader.readAsText(file);
    });
}
function setFF(fileEntry) {
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
            var str = this.result;
//                            if (str.charAt(0)==1)
            document.body.style.fontFamily = str;
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