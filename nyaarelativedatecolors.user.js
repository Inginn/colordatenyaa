// ==UserScript==
// @name         Nyyadatecolor
// @namespace    http://nyaa.si/
// @version      0.1
// @description  colors relative dates on nyaa.si for better spoting new content
// @author       Inginn
// @match        https://nyaa.si/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nyaa.si
// @grant        none
// ==/UserScript==

var today = new Date();
var yesterday = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var bb = String(today.getDate()-1).padStart(2, '0');

today = yyyy+"-"+mm+'-'+dd;
yesterday = yyyy+"-"+mm+'-'+bb;
//document.write(today);


//document.body.innerHTML= document.body.innerHTML.replace(today, function(m){
//    return '<span style="background-color:lightgreen">'+m+'</span>'
//});

function highlightWord(word,color) {
    var n
    var xpath = "//text()[contains(., '" + word + "')]";
    var texts = document.evaluate(xpath, document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (n = 0; n < texts.snapshotLength; n++) {
        var textNode = texts.snapshotItem(n);
        var p = textNode.parentNode;
        var a = [];
        var frag = document.createDocumentFragment();
        textNode.nodeValue.split(word).forEach(function(text, i) {
            var node;
            if (i) {
                node = document.createElement('span');
                node.style.backgroundColor = color;
                node.appendChild(document.createTextNode(word));
                frag.appendChild(node);
            }
            if (text.length) {
                frag.appendChild(document.createTextNode(text));
            }
            return a;
        });
        p.replaceChild(frag, textNode);
    }
}
highlightWord(today,'lightgreen');
highlightWord(yesterday,'yellow');
