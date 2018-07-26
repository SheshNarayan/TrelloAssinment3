import "../node_modules/bootstrap/dist/css/bootstrap.css";
if(document.title=='landing'){
var boardname = getQueryVariable("boardname");
document.getElementById('boardname').textContent=boardname;

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  console.log('Query Variable ' + variable + ' not found');
}
var popoverpoint = document.getElementById('popoeverid');
if (localStorage.getItem('status') === null) {
	var poplistelemt=document.createElement('li');
	poplistelemt.className= 'list-group-item listselclass';
	var span = document.createElement('span');
	span.appendChild(document.createTextNode(boardname));
	poplistelemt.appendChild(span);
	popoverpoint.appendChild(poplistelemt);
}else{
	var boardnames=localStorage.getItem('status').split('#');
	for(var i=0;i<boardnames.length;i++){
		var poplistelemt=document.createElement('li');
		poplistelemt.className= 'list-group-item listselclass';
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(boardnames[i]));
		poplistelemt.appendChild(span);
		popoverpoint.appendChild(poplistelemt);
	}
}
function displayBoards(event) {
			 var target = event.target || event.srcElement;
			 window.location.href = 'homepage.html?boardname='+encodeURIComponent(event.target.textContent || event.target.innerText);
	 }
var head=document.getElementById('boards');
head.setAttribute("data-trigger", "focus");

$(head).popover({
	html : true,
	content: function() {
		return $(".example-popover-content").html();
	},
	title: function() {
		return $(".example-popover-title").html();
	}
});

if (localStorage.getItem(boardname) === null) {
	console.log("Sorry, No board to display...!")
}else{
	document.getElementById('createListid').style.display='none';
	document.getElementById('boardsHolder').innerHTML=localStorage.getItem(boardname);
	$('.connected').sortable({
		connectWith: '.connected',
		stop: function(event, ui) {
     	localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
    	}
	});


jQuery.fn.swap = function(b){
    b = jQuery(b)[0];
    var a = this[0];
    var t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};


$( ".divclass" ).draggable({
	revert: true,
	helper: "clone" });

$( ".divclass" ).droppable({
    accept: ".divclass",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {

        var draggable = ui.draggable, droppable = $(this),
            dragPos = draggable.position(), dropPos = droppable.position();

        draggable.css({
            left: dropPos.left+'px',
            top: dropPos.top+'px'
        });

        droppable.css({
            left: dragPos.left+'px',
            top: dragPos.top+'px'
        });
        draggable.swap(droppable);
        setTimeout(function() {
        localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
        }, 1000);
    }
});



 	var el=document.querySelectorAll("input[type=text]")

	for(var i=0; i < el.length; i++){
	    el[i].addEventListener('keyup', function (event) {
				event.preventDefault();
				if (event.keyCode === 13) {
					if(this.classList.contains('inputContainerClass')){
						if(this.value.trim() != "")
						{
							var sblng=getSiblings(this.parentNode);
							cardFunction(this,sblng[1],this.id,sblng[1].id);
							localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
						}
					}
				}
		  }, false);
	}
	$("button").click(function() {
    if(this.classList.contains('removeCardBtn')){
			document.getElementById("boardsHolder").removeChild(this.parentNode.parentNode);
			localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
		}
		if(this.classList.contains('closeCardBtn')){
			var sib= getSiblings(this);
			sib[0].value="";
			var sib1= getSiblings(this.parentNode);
			sib1[3].style.display = 'block';
			this.parentNode.style.display = 'none';
			localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
		}
		if(this.classList.contains('custombtnclass')){
			var sib1= getSiblings(this.parentNode);
			sib1[3].style.display = 'block';
			this.parentNode.style.display = 'none';
			localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
		}
		if(this.classList.contains('editlistBtn')){
			var item = this;
			var siblings = getSiblings(item);
			if(item.classList.contains("on")) {
				$(siblings[1]).hide();
				$(siblings[0]).show();
				$(siblings[0]).text($(siblings[1]).val());
				item.textContent = 'edit';
				item.classList.remove("on");
				item.classList.remove("btn-warning");
				item.classList.add("off");
				item.classList.add("btn-info");
			} else {
				$(siblings[0]).hide();
				$(siblings[1]).show();
				$(siblings[1]).val($(siblings[0]).text());
				$(siblings[1]).focus();
				item.textContent = 'save';
				item.classList.remove("off");
				item.classList.remove("btn-info");
				item.classList.add("on");
				item.classList.add("btn-warning");
			}
			localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
		}
		if(this.classList.contains('savecardBtn')){
				var cursiblings = getSiblings(this);
				console.log(cursiblings);
				var sblng=getSiblings(this.parentNode);
				console.log(sblng);
				if(cursiblings[0].value.trim() != "")
				{
					cardFunction(cursiblings[0],sblng[1],cursiblings[0].id,sblng[1].id);
					localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
				}
		}
	});
}
var boardsHolder = document.getElementById("boardsHolder");
var mainSection = document.getElementsByClassName('jumbotron');
var poplist=document.getElementsByClassName("example");
var createList = document.getElementById("createList");
var uniuqeId=0;
createList.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		listFunction();
		localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
	}
});
function listFunction() {
	if(createList.value.trim() != ""){
		createNewList(document.getElementById('createList').value);
		createList.value="";
		localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
	}
}
function showTip(ele){
	console.log(ele.textContent);
}
document.getElementById('showBtn').addEventListener("click", function(event) {
	event.preventDefault();
	var sibl=getSiblings(this);
	sibl[0].style.display = "block";
	this.style.display = 'none';
	this.parentNode.classList.remove('vertical-center-transparent');
	this.parentNode.classList.add('vertical-center');
	localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
});
document.getElementById('hideBtn').addEventListener("click", function(event) {
	event.preventDefault();
	var cursibl=getSiblings(this);
	cursibl[0].value="";
	var parentsibl=getSiblings(this.parentNode);
	parentsibl[0].style.display = "block";
	this.parentNode.style.display = 'none';
	this.parentNode.parentNode.classList.add('vertical-center-transparent');
	this.parentNode.parentNode.classList.remove('vertical-center');
	localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
});
function createNewList(text){
	uniuqeId++;
	var section = document.createElement("section");
	section.id = "list" + uniuqeId;
	section.name = "list" + uniuqeId;
	section.className = 'divclass row form-group';

	var headerDiv = document.createElement("div");
	headerDiv.id = "headerDiv" + uniuqeId;
	headerDiv.name = "headerDiv" + uniuqeId;
	headerDiv.className = 'col-sm-12 d-flex form-group';


	var h5 = document.createElement("h5");
	h5.textContent = text;
	h5.className = 'flex-grow-1';
	h5.style = 'text-align:left;color:white;';
	h5.setAttribute("contenteditable","true");

	var closeA = document.createElement("button");
	closeA.textContent = 'x';
	closeA.tabindex="0";
	closeA.className = "btn btn-light removeCardBtn";
	closeA.style= 'font-size: 1.25rem;';

	closeA.onclick = function() {
		document.getElementById("boardsHolder").removeChild(section);
		localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
	};
	headerDiv.appendChild(h5);
	headerDiv.appendChild(closeA);
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
	inputContainer.placeholder = 'Create card';
	inputContainer.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			if(inputContainer.value.trim() != "")
			{
				cardFunction(inputContainer,msgContainer,inputContainer.id,msgContainer.id);
				localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
			}
		}
	});
	var addCardBtn = document.createElement('button');
	addCardBtn.textContent = 'Save Card';
	addCardBtn.className = 'col-md-4 btn btn-primary savecardBtn';
	addCardBtn.onclick = function() {
		if(inputContainer.value.trim() != "")
		{
			cardFunction(inputContainer,msgContainer,inputContainer.id,msgContainer.id);
			localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
		}
	};
	var closeCardBtn = document.createElement('button');
	closeCardBtn.textContent = 'X';
	closeCardBtn.className = 'btn btn-link col-sm-2 closeCardBtn';
	closeCardBtn.onclick = function() {
		var sib= getSiblings(this);
		sib[0].value="";
		var sib1= getSiblings(this.parentNode);
		sib1[3].style.display = 'block';
		this.parentNode.style.display = 'none';
		localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
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
	addCardDefaultBtn.addEventListener("click", function(event) {
		var sib1= getSiblings(this.parentNode);
		sib1[3].style.display = 'block';
		this.parentNode.style.display = 'none';
		localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
	});
	divBtn.appendChild(addCardDefaultBtn);
	section.appendChild(headerDiv);
	msgContainer.removeChild(tempChild);
	section.appendChild(msgContainer);
	section.appendChild(br);
	section.appendChild(divBtn);
	section.appendChild(div);
	boardsHolder.appendChild(section);
	localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
}
function cardFunction(inputContainer,msgContainer,inputContainerid,msgContainerid) {
	createCard(inputContainer,msgContainer,inputContainerid,msgContainerid);
	inputContainer.value="";
	$('.connected').sortable({
		connectWith: '.connected',
		stop: function(event, ui) {
     	localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
    	}
	});
		jQuery.fn.swap = function(b){
    b = jQuery(b)[0];
    var a = this[0];
    var t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};


$( ".divclass" ).draggable({
	revert: true,
	helper: "clone" });

$( ".divclass" ).droppable({
    accept: ".divclass",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {

        var draggable = ui.draggable, droppable = $(this),
            dragPos = draggable.position(), dropPos = droppable.position();

        draggable.css({
            left: dropPos.left+'px',
            top: dropPos.top+'px'
        });

        droppable.css({
            left: dragPos.left+'px',
            top: dragPos.top+'px'
        });
        draggable.swap(droppable);
		setTimeout(function() {
        localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
        }, 1000);
    }
});
}
function createCard(card,list,cardid,listid) {
	var cardval = card.value;
	var entry = document.createElement('li');
	entry.className = 'row listItem';
	var span = document.createElement('span');
	span.className = 'display col-sm-9 form-control';
	span.appendChild(document.createTextNode(cardval));
	var inputC = document.createElement("input");
	inputC.type = "text";
	inputC.className = 'edit col-sm-9 form-control';
	inputC.style = 'display:none';

	var editBtn = document.createElement('button');
	editBtn.textContent = 'edit';
	editBtn.className = 'off col-sm-3 btn btn-info editlistBtn';
	editBtn.onclick = function() {
		var item = this;
		var siblings = getSiblings(item);
		if(item.classList.contains("on")) {
			$(siblings[1]).hide();
			$(siblings[0]).show();
			$(siblings[0]).text($(siblings[1]).val());
			item.textContent = 'edit';
			item.classList.remove("on");
			item.classList.remove("btn-warning");
			item.classList.add("off");
			item.classList.add("btn-info");
		} else {
			$(siblings[0]).hide();
			$(siblings[1]).show();
			$(siblings[1]).val($(siblings[0]).text());
			$(siblings[1]).focus();
			item.textContent = 'save';
			item.classList.remove("off");
			item.classList.remove("btn-info");
			item.classList.add("on");
			item.classList.add("btn-warning");
		}
		localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
	};

	entry.appendChild(span);
	entry.appendChild(inputC);
	entry.appendChild(editBtn);
	list.appendChild(entry);
	localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
}
var getSiblings = function (elem) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	var skipMe = elem;
	for ( ; sibling; sibling = sibling.nextSibling )
	if ( sibling.nodeType == 1 && sibling != elem )
	siblings.push( sibling );
	return siblings;
};
function elementChildren (element) {
	var childNodes = element.childNodes,
	children = [],
	i = childNodes.length;

	while (i--) {
		if (childNodes[i].nodeType == 1) {
			children.unshift(childNodes[i]);
		}
	}
	return children;
}
$('.connected').sortable({
		connectWith: '.connected',
		stop: function(event, ui) {
     	localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
    	}
	});
jQuery.fn.swap = function(b){
    b = jQuery(b)[0];
    var a = this[0];
    var t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};


$( ".divclass" ).draggable({ revert: true, helper: "clone" });

$( ".divclass" ).droppable({
    accept: ".divclass",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {

        var draggable = ui.draggable, droppable = $(this),
            dragPos = draggable.position(), dropPos = droppable.position();

        draggable.css({
            left: dropPos.left+'px',
            top: dropPos.top+'px'
        });

        droppable.css({
            left: dragPos.left+'px',
            top: dragPos.top+'px'
        });
        draggable.swap(droppable);
        setTimeout(function() {
        localStorage.setItem(boardname, document.getElementById("boardsHolder").innerHTML);
        }, 1000);
    }
});
}else if(document.title=='index'){
  var boardname=document.getElementById('boardname');
  var modalBtn=document.getElementById('saveModaBtnl');
    boardname.addEventListener("keydown", function(event) {
      if(this.value.trim()!=""){
        modalBtn.className='btn btn-primary';
      }
    });
    $('#myModal').on('hidden.bs.modal', function () {
      boardname.value="";
      modalBtn.className='btn btn-default';
    });
    boardname.addEventListener("keyup", function(event) {
      if(this.value.trim()==""){
        this.value="";
        modalBtn.className='btn btn-default';
      }
    });
    modalBtn.addEventListener("click", function(event) {
      event.preventDefault();
      var val=boardname.value;
      if(val.trim()!=""){
        boardname.value="";
        if (localStorage.getItem('status') === null) {
          localStorage.setItem('status',val);
        }else{
          if((localStorage.getItem('status').split('#')).indexOf(val) > -1){

          }else {
            localStorage.setItem('status',localStorage.getItem('status')+"#"+val);
          }
        }
        window.location.href = 'homepage.html?boardname='+encodeURIComponent(val);
      }
    });

    var popoverpoint = document.getElementById('popoeverid');
    if (localStorage.getItem('status') === null) {

    }else{
      var boardnames=localStorage.getItem('status').split('#');
      for(var i=0;i<boardnames.length;i++){
        var poplistelemt=document.createElement('li');
        poplistelemt.className= 'list-group-item listselclass';
        var span = document.createElement('span');
        span.appendChild(document.createTextNode(boardnames[i]));
        poplistelemt.appendChild(span);
        popoverpoint.appendChild(poplistelemt);
      }
    }
    function displayBoards(event) {
           var target = event.target || event.srcElement;
           window.location.href = 'homepage.html?boardname='+encodeURIComponent(event.target.textContent || event.target.innerText);
       }
    var head=document.getElementById('boards');
    head.setAttribute("data-trigger", "focus");

    $(head).popover({
      html : true,
      content: function() {
        return $(".example-popover-content").html();
      },
      title: function() {
        return $(".example-popover-title").html();
      }
    });
}else if(document.title=='boards'){
  var popoverpoint = document.getElementById('popoeverid');
  if (localStorage.getItem('status') === null) {

  }else{
    var cardsholder=document.getElementById('cardsholder');
    var boardnames=localStorage.getItem('status').split('#');
    for(var i=0;i<boardnames.length;i++){
      var poplistelemt=document.createElement('li');
      poplistelemt.className= 'list-group-item listselclass';
      var span = document.createElement('span');
      span.appendChild(document.createTextNode(boardnames[i]));
      poplistelemt.appendChild(span);
      popoverpoint.appendChild(poplistelemt);

      var divcard = document.createElement('div');
      divcard.className = 'card card-custom mx-2 mb-3';
      divcard.style="color:white;font-size:20px;"
      var anch = document.createElement('a');
      var img=document.createElement('img');
      img.className='card-img';
      if(isOdd(i+2)){
        img.src = './img/back3.gif';
      }else{
        img.src = './img/back4.jpg';
      }
      var span=document.createElement('span');
      span.appendChild(document.createTextNode(boardnames[i]));
      span.className='centered';
      anch.appendChild(img);
      anch.appendChild(span);
      divcard.appendChild(anch);
      divcard.onclick=function(){
        window.location.href = 'homepage.html?boardname='+encodeURIComponent(this.textContent || this.innerText);
      }
      cardsholder.appendChild(divcard);
    }
  }
  function isOdd(num) { return num % 2;}
  function displayBoards(event) {
         var target = event.target || event.srcElement;
         window.location.href = 'homepage.html?boardname='+encodeURIComponent(event.target.textContent || event.target.innerText);
     }
  var head=document.getElementById('boards');
  head.setAttribute("data-trigger", "focus");

  $(head).popover({
    html : true,
    content: function() {
      return $(".example-popover-content").html();
    },
    title: function() {
      return $(".example-popover-title").html();
    }
  });
}
