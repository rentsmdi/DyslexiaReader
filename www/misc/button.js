//var btn = document.createElement('BUTTON'); 
//var t = document.createTextNode('CLICK ME'); 
//btn.onclick = sayhi;
//btn.id = 'btn';
//btn.appendChild(t); 
//document.body.appendChild(btn);  
//
function sayhi(){
//    alert('hello!');
//    var el = document.querySelector("#boh");
//    el.style.backgroundColor = 'blue';
    var ref = window.open('lucky2.html', '_blank');
    ref.addEventListener('loadstop', function(event) {
        alert(event.url);;
    });
};

var code = '<button type="button" onclick=sayhi()>Click Me!!</button>'
document.body.innerHTML = document.body.innerHTML+code;