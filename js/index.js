import 'popper.js';
import 'jquery';
import 'jquery-ui';
import 'bootstrap';
const sortable = require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');

var boards = [];
var lists = [];
var cards = [];

var uniuqeId = 0;
var currBoardName;
var selectedBoardId;
var selectedListName;
var selectedLsitId;

var applicationStatus = 'applicationStatus';

window.onload = function() {
	boards = getObjFromLocaleStorage(applicationStatus);
	console.log(boards);
	if(boards)
		displayBoards(boards);
}

//var createBoard = document.getElementById('saveModaBtn');
document.getElementById('saveModaBtn').onclick = function () {
	// boards = getObjFromLocaleStorage(applicationStatus);
	createNewBoard(document.getElementById('boardname').value);
}

function createNewBoard(boardName) {
	if(boards === null){
		boards=[];
	}
	boards[boards.length] = {
		name: boardName,
		lists: []
	}
	
	persistObjInLocaleStorage(applicationStatus, boards);
	displayBoards(boards);
}

//window.displayBoards = function(event){
function displayBoards(boardData) {
	// event.preventDefault();
	$('#popoeverid').empty();
	var navBoardList = document.getElementById('popoeverid');
	$(".boardsLists").show();
	var boardlist;
	console.log(boardData.length);
	for (let index = 0; index < boardData.length; index++) {
		var bn = boardData[index].name;
		boardlist = document.createElement('li');
		boardlist.setAttribute('id', bn);
		boardlist.setAttribute('class', 'boardclass "nav-item');
		boardlist.setAttribute('board-id', '' + index);

		var boardlistlink = document.createElement('a');
		boardlistlink.setAttribute('class', 'nav-link');
		boardlistlink.setAttribute('href', '#');
		boardlistlink.innerText = bn;
		boardlistlink.addEventListener("click", createNewListOnBoard);
		boardlist.appendChild(boardlistlink);
		navBoardList.appendChild(boardlist);
	}
}

function createNewListOnBoard(event) {
	///alert("createNewListOnBoard....");
	$(".boardsLists").hide();
	$(".boardheading").show();
	$("#createListid").show();
	currBoardName = event.target.text;
	selectedBoardId = this.parentElement.getAttribute('board-id');
	console.log(currBoardName + " " + selectedBoardId);
	// var listsOnBoad = boards[selectedBoardId].lists;
	// if(listsOnBoad){
	// 	for(let i = 0; i< listsOnBoad.length; i++){
	// 		console.log(listsOnBoad[i]);
	// 		displayListOnSelectedBoard(listsOnBoad[i]);
	// 	}
	// }
	// console.log("currBoardName: "+currBoardName + ", selectedBoardId: " + selectedBoardId+", listsOnBoad: "+listsOnBoad[0].name);
	
	var newListName = "";
	document.getElementById('boardheadingid').innerText = currBoardName;
	var showBtn = document.getElementById('showBtn');
	var addListBtn = document.getElementById("addListBtn").addEventListener('click', listFunction);
}

var boardsHolder = document.getElementById("boardsHolder");
var mainSection = document.getElementsByClassName('jumbotron');
var createList = document.getElementById("createList");
createList.addEventListener("keyup", function (event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		listFunction();
		persistObjInLocaleStorage(applicationStatus, boards);
	}
});

document.getElementById('showBtn').addEventListener("click", function (event) {
	event.preventDefault();
	var sibl = getSiblings(this);
	console.log(sibl);
	sibl[0].style.display = "block";
	this.style.display = 'none';
	this.parentNode.classList.remove('vertical-center-transparent');
	this.parentNode.classList.add('vertical-center');
	persistObjInLocaleStorage(applicationStatus, boards);
});

document.getElementById('hideBtn').addEventListener("click", function (event) {
	event.preventDefault();
	var cursibl = getSiblings(this);
	cursibl[0].value = "";
	var parentsibl = getSiblings(this.parentNode);
	parentsibl[0].style.display = "block";
	this.parentNode.style.display = 'none';
	this.parentNode.parentNode.classList.add('vertical-center-transparent');
	this.parentNode.parentNode.classList.remove('vertical-center');
	persistObjInLocaleStorage(applicationStatus, boards);
});

var getSiblings = function (elem) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	var skipMe = elem;
	for (; sibling; sibling = sibling.nextSibling)
		if (sibling.nodeType == 1 && sibling != elem)
			siblings.push(sibling);
	return siblings;
};

export const listFunction = function () {
	//alert('clicked listFunction!!');
	console.log('clicked listFunction!!');
	if (createList.value.trim() != "") {
		createNewList(document.getElementById('createList').value);
		createList.value = "";
		persistObjInLocaleStorage(applicationStatus, boards);
	}
}

function createNewList(newListName) {
	console.log(currBoardName + " " + selectedBoardId);
	boards[selectedBoardId].lists[boards[selectedBoardId].lists.length] = {
		name: newListName,
		cards: []
	}
	uniuqeId++;
	var section = document.createElement("section");
	section.id = "list" + uniuqeId;
	section.name = "list" + uniuqeId;
	section.setAttribute('list-id', '' + selectedBoardId + lists.length);
	section.className = 'listdiv row form-group';

	var headerDiv = document.createElement("div");
	headerDiv.id = "headerDiv" + uniuqeId;
	headerDiv.name = "headerDiv" + uniuqeId;
	headerDiv.className = 'col-sm-12 d-flex form-group';

	var h5 = document.createElement("h5");
	h5.textContent = newListName;
	h5.className = 'flex-grow-1';
	h5.style = 'text-align:left;color:white;';
	h5.setAttribute("contenteditable", "true");

	var closeListButton = document.createElement("button");
	closeListButton.textContent = 'X';
	closeListButton.tabindex = "0";
	closeListButton.className = "btn btn-light removeCardBtn";
	closeListButton.style = 'font-size: 1.25rem;';

	closeListButton.onclick = function () {
		document.getElementById("boardsHolder").removeChild(section);
		persistObjInLocaleStorage(applicationStatus, boards);
	};

	headerDiv.appendChild(h5);
	headerDiv.appendChild(closeListButton);
	var msgContainer = document.createElement('ul');
	msgContainer.id = "listcontect" + uniuqeId;
	msgContainer.name = "listcontect" + uniuqeId;
	msgContainer.className = 'connected list col-sm-12';
	var tempChild = document.createElement('li');
	msgContainer.appendChild(tempChild);
	var br = document.createElement('br');

	var div = document.createElement("div");
	div.id = "div" + uniuqeId;
	div.name = "div" + uniuqeId;
	div.className = 'col-sm-12 form-group';

	var inputContainer = document.createElement("input");
	inputContainer.type = "text";
	inputContainer.name = "listinput" + uniuqeId;
	inputContainer.id = "listinput" + uniuqeId;
	inputContainer.className = 'col-md-12 form-control inputContainerClass';
	inputContainer.placeholder = 'Card Name?';
	inputContainer.addEventListener("keyup", function (event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			if (inputContainer.value.trim() != "") {
				cardFunction(inputContainer, msgContainer, inputContainer.id, msgContainer.id);
				persistObjInLocaleStorage(applicationStatus, boards);
			}
		}
	});
	var addCardBtn = document.createElement('button');
	addCardBtn.textContent = 'Save Card';
	addCardBtn.className = 'col-md-4 btn btn-primary savecardBtn';
	addCardBtn.onclick = function () {
		if (inputContainer.value.trim() != "") {
			cardFunction(inputContainer, msgContainer, inputContainer.id, msgContainer.id);
			persistObjInLocaleStorage(applicationStatus, boards);
		}
	};
	var closeCardBtn = document.createElement('button');
	closeCardBtn.textContent = 'Close';
	closeCardBtn.className = 'btn btn-primary col-sm-3';
	closeCardBtn.onclick = function () {
		var sib = getSiblings(this);
		sib[0].value = "";
		var sib1 = getSiblings(this.parentNode);
		sib1[3].style.display = 'block';
		this.parentNode.style.display = 'none';
		persistObjInLocaleStorage(applicationStatus, boards);
	};
	div.appendChild(inputContainer);
	div.appendChild(addCardBtn);
	div.appendChild(closeCardBtn);
	div.style = 'display:none';
	var divBtn = document.createElement("div");
	divBtn.id = "divBtn" + uniuqeId;
	divBtn.name = "divBtn" + uniuqeId;
	divBtn.className = 'col-sm-12 form-group';
	var addCardDefaultBtn = document.createElement('button');
	addCardDefaultBtn.textContent = "+Add Card"
	addCardDefaultBtn.className = 'col-sm-12 btn form-group custombtnclass';
	addCardDefaultBtn.addEventListener("click", function (event) {
		var sib1 = getSiblings(this.parentNode);
		sib1[3].style.display = 'block';
		this.parentNode.style.display = 'none';
		persistObjInLocaleStorage(applicationStatus, boards);
	});
	divBtn.appendChild(addCardDefaultBtn);
	section.appendChild(headerDiv);
	msgContainer.removeChild(tempChild);
	section.appendChild(msgContainer);
	section.appendChild(br);
	section.appendChild(divBtn);
	section.appendChild(div);
	boardsHolder.appendChild(section);
	persistObjInLocaleStorage(applicationStatus, boards);
}

function cardFunction(inputContainer, msgContainer, inputContainerid, msgContainerid) {
	createCard(inputContainer, msgContainer, inputContainerid, msgContainerid);
	inputContainer.value = "";
	$('.connected').sortable({
		connectWith: '.connected',
		stop: function (event, ui) {
			persistObjInLocaleStorage(applicationStatus, boards);
		}
	});

	// $(".listdiv").draggable({
	//     revert: true,
	//     helper: "clone"
	// });

	// $(".listdiv").droppable({
	//     accept: ".listdiv",
	//     activeClass: "ui-state-hover",
	//     hoverClass: "ui-state-active",
	//     drop: function (event, ui) {
	//         var draggable = ui.draggable, droppable = $(this),
	//             dragPos = draggable.position(), dropPos = droppable.position();

	//         draggable.css({
	//             left: dropPos.left + 'px',
	//             top: dropPos.top + 'px'
	//         });

	//         droppable.css({
	//             left: dragPos.left + 'px',
	//             top: dragPos.top + 'px'
	//         });
	//         draggable.swap(droppable);
	//         setTimeout(function () {
	//             localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
	//         }, 1000);
	//     }
	// });
}

function createCard(card, list, cardid, listid) {
	// alert("createCard CardId: "+cardid);
	// alert("createCard LsitID: "+listid);
	var cardval = card.value;
	var entry = document.createElement('li');
	entry.className = 'row listItem';
	var span = document.createElement('span');
	span.className = 'display col-sm-9 form-control';
	span.appendChild(document.createTextNode(cardval));
	var inputCard = document.createElement("input");
	inputCard.type = "text";
	inputCard.className = 'edit col-sm-9 form-control';
	inputCard.style = 'display:none';
	entry.appendChild(span);
	entry.appendChild(inputCard);
	list.appendChild(entry);

	const cardLength = boards[selectedBoardId].lists[(boards[selectedBoardId].lists.length) - 1].cards.length;
	boards[selectedBoardId].lists[(boards[selectedBoardId].lists.length) - 1].cards[cardLength] = {
		name: cardval
	}
	console.log(boards);
	persistObjInLocaleStorage(applicationStatus, boards);
}


function persistObjInLocaleStorage(key, _obj) {
	console.log(JSON.stringify(_obj));
	localStorage.setItem(key, JSON.stringify(_obj));
}
function persistValueInLocaleStorage(key, premitiveValue) {
	localStorage.setItem(key, premitiveValue);
}
function getObjFromLocaleStorage(_key) {
	return JSON.parse(localStorage.getItem(_key));
}
function getValueFromLocaleStorage(key) {
	return localStorage.getItem(key);
}

// ========================================================================

// function  displayListOnSelectedBoard(newListName){
// 	uniuqeId++;
// 	var section = document.createElement("section");
// 	section.id = "list" + uniuqeId;
// 	section.name = "list" + uniuqeId;
// 	section.setAttribute('list-id', '' + selectedBoardId + lists.length);
// 	section.className = 'listdiv row form-group';

// 	var headerDiv = document.createElement("div");
// 	headerDiv.id = "headerDiv" + uniuqeId;
// 	headerDiv.name = "headerDiv" + uniuqeId;
// 	headerDiv.className = 'col-sm-12 d-flex form-group';

// 	var h5 = document.createElement("h5");
// 	h5.textContent = newListName.name;
// 	h5.className = 'flex-grow-1';
// 	h5.style = 'text-align:left;color:white;';
// 	h5.setAttribute("contenteditable", "true");

// 	var closeListButton = document.createElement("button");
// 	closeListButton.textContent = 'X';
// 	closeListButton.tabindex = "0";
// 	closeListButton.className = "btn btn-light removeCardBtn";
// 	closeListButton.style = 'font-size: 1.25rem;';

// 	closeListButton.onclick = function () {
// 		document.getElementById("boardsHolder").removeChild(section);
// 		persistObjInLocaleStorage(applicationStatus, boards);
// 	};

// 	headerDiv.appendChild(h5);
// 	headerDiv.appendChild(closeListButton);
// 	var msgContainer = document.createElement('ul');
// 	msgContainer.id = "listcontect" + uniuqeId;
// 	msgContainer.name = "listcontect" + uniuqeId;
// 	msgContainer.className = 'connected list col-sm-12';
// 	var tempChild = document.createElement('li');
// 	msgContainer.appendChild(tempChild);
// 	var br = document.createElement('br');

// 	var div = document.createElement("div");
// 	div.id = "div" + uniuqeId;
// 	div.name = "div" + uniuqeId;
// 	div.className = 'col-sm-12 form-group';

// 	var inputContainer = document.createElement("input");
// 	inputContainer.type = "text";
// 	inputContainer.name = "listinput" + uniuqeId;
// 	inputContainer.id = "listinput" + uniuqeId;
// 	inputContainer.className = 'col-md-12 form-control inputContainerClass';
// 	inputContainer.placeholder = 'Card Name?';
// 	// inputContainer.addEventListener("keyup", function (event) {
// 	// 	event.preventDefault();
// 	// 	if (event.keyCode === 13) {
// 	// 		if (inputContainer.value.trim() != "") {
// 	// 			//cardFunction(inputContainer, msgContainer, inputContainer.id, msgContainer.id);
// 	// 			displayCardOnSelectedList(newListName);
// 	// 			persistObjInLocaleStorage(applicationStatus, boards);
// 	// 		}
// 	// 	}
// 	// });
// 	var addCardBtn = document.createElement('button');
// 	addCardBtn.textContent = 'Save Card';
// 	addCardBtn.className = 'col-md-4 btn btn-primary savecardBtn';
// 	// addCardBtn.onclick = function () {
// 	// 	if (inputContainer.value.trim() != "") {
// 	// 		//cardFunction(inputContainer, msgContainer, inputContainer.id, msgContainer.id);
// 	// 		displayCardOnSelectedList(newListName);
// 	// 		persistObjInLocaleStorage(applicationStatus, boards);
// 	// 	}
// 	// };
// 	var closeCardBtn = document.createElement('button');
// 	closeCardBtn.textContent = 'Close';
// 	closeCardBtn.className = 'btn btn-primary col-sm-3';
// 	closeCardBtn.onclick = function () {
// 		var sib = getSiblings(this);
// 		sib[0].value = "";
// 		var sib1 = getSiblings(this.parentNode);
// 		sib1[3].style.display = 'block';
// 		this.parentNode.style.display = 'none';
// 		persistObjInLocaleStorage(applicationStatus, boards);
// 	};
// 	div.appendChild(inputContainer);
// 	div.appendChild(addCardBtn);
// 	div.appendChild(closeCardBtn);
// 	div.style = 'display:none';
// 	var divBtn = document.createElement("div");
// 	divBtn.id = "divBtn" + uniuqeId;
// 	divBtn.name = "divBtn" + uniuqeId;
// 	divBtn.className = 'col-sm-12 form-group';
// 	var addCardDefaultBtn = document.createElement('button');
// 	addCardDefaultBtn.textContent = "+Add Card"
// 	addCardDefaultBtn.className = 'col-sm-12 btn form-group custombtnclass';
// 	addCardDefaultBtn.addEventListener("click", function (event) {
// 		var sib1 = getSiblings(this.parentNode);
// 		sib1[3].style.display = 'block';
// 		this.parentNode.style.display = 'none';
// 		persistObjInLocaleStorage(applicationStatus, boards);
// 	});
// 	divBtn.appendChild(addCardDefaultBtn);
// 	section.appendChild(headerDiv);
// 	msgContainer.removeChild(tempChild);
// 	section.appendChild(msgContainer);
// 	section.appendChild(br);
// 	section.appendChild(divBtn);
// 	section.appendChild(div);
// 	boardsHolder.appendChild(section);
// 	//cardFunction(inputContainer, msgContainer, inputContainer.id, msgContainer.id)
// 	displayCardOnSelectedList(newListName, uniuqeId);
// 	persistObjInLocaleStorage(applicationStatus, boards);
// }

// //// displayCardOnSelectedList
// function displayCardOnSelectedList(newListName, id){
// 	alert("displayCardOnSelectedList...")
// 	var cardList = newListName.cards;
// 	var list = document.getElementById('listcontect'+id);
// 	for(let i=0;i<cardList.length; i++){
// 		var cardval = cardList[i].name;
// 		var entry = document.createElement('li');
// 		entry.className = 'row listItem';
// 		var span = document.createElement('span');
// 		span.className = 'display col-sm-9 form-control';
// 		span.appendChild(document.createTextNode(cardval));
// 		var inputCard = document.createElement("input");
// 		inputCard.type = "text";
// 		inputCard.value=
// 		inputCard.className = 'edit col-sm-9 form-control';
// 		inputCard.style = 'display:none';
// 		entry.appendChild(span);
// 		entry.appendChild(inputCard);
// 		list.appendChild(entry);
// 	}
// 	// const cardLength = boards[selectedBoardId].lists[(boards[selectedBoardId].lists.length) - 1].cards.length;
// 	// boards[selectedBoardId].lists[(boards[selectedBoardId].lists.length) - 1].cards[cardLength] = {
// 	// 	name: cardval
// 	// }
// 	console.log(boards);
// 	persistObjInLocaleStorage(applicationStatus, boards);
// }