var wsUri = "ws://" + document.location.host + document.location.pathname + "xadrez";
var websocket = new WebSocket(wsUri);
websocket.binaryType = "arraybuffer";
////
websocket.onerror = function (evt) {
    onError(evt);
};
websocket.onopen = function (evt) {
    onOpen(evt);
};
websocket.onmessage = function (evt) {
    onMessage(evt);
};
websocket.onclose = function (evt) {
    onClose(evt);
};
////
function onError(evt) {
    console.log("Erro: " + evt.data);
    writeToScreen("Erro: " + evt.data);
}
function onOpen(evt) {
    console.log("Conexao iniciada: " + evt.type);
    writeToScreen("Conexao iniciada: " + evt.type);
}
function onMessage(evt) {
    console.log("Mensagem do servidor: " + evt.data);
    writeToScreen("Mensagem do servidor: " + evt.data);
}
function onClose(evt) {
    console.log("Conexao encerrada: " + evt.data);
    writeToScreen("Conexao encerrada: " + evt.data);
}
////
function send() {
    var text = document.getElementById("mensagem").value;
    websocket.send(text);
    console.log("Mensagem de " + document.location.hostname + " : " + text);
    writeToScreen("Mensagem de " + document.location.hostname + " : " + text);
}
function writeToScreen(message) {
    var console = document.getElementById("console");
    console.innerHTML += "<br>" + message;
}
function init() {
    var botao = document.getElementById("enviar");
    botao.addEventListener("click", send);
//    alert(document.location.hostname);
}
onload = init;