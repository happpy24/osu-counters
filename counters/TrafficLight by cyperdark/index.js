const HOST = window.location.host;
const socket = new ReconnectingWebSocket(`ws://${HOST}/ws`);
let mapid = document.getElementById('mapid');

let bg = document.getElementById("bg");
let pp = document.getElementById("pp");
let hun = document.getElementById("green");
let fifty = document.getElementById("purple");
let miss = document.getElementById("red");


socket.onopen = () => {
	console.log("Successfully Connected");
};

socket.onclose = event => {
	console.log("Socket Closed Connection: ", event);
	socket.send("Client Closed!")
};

socket.onerror = error => {
	console.log("Socket Error: ", error);
};
let tempState;
let tempImg;
socket.onmessage = event => {
	let data = JSON.parse(event.data);
	if (tempState !== data.menu.bm.path.full) {
		tempState = data.menu.bm.path.full
		bg.setAttribute('src', `http://${HOST}/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}`)
		mapid.innerHTML = data.menu.bm.id;
	}
	if (data.gameplay.pp.current != '') {
		let ppData = data.gameplay.pp.current;
		pp.innerHTML = Math.round(ppData) + "pp"
	} else {
		pp.innerHTML = 0 + "pp"
	}
	if (data.gameplay.hits[100] > 0) {
		hun.innerHTML = data.gameplay.hits[100];
	} else {
		hun.innerHTML = 0
	}
	if (data.gameplay.hits[50] > 0) {
		fifty.innerHTML = data.gameplay.hits[50];
	} else {
		fifty.innerHTML = 0
	}
	if (data.gameplay.hits[0] > 0) {
		miss.innerHTML = data.gameplay.hits[0];
	} else {
		miss.innerHTML = 0
	}
}