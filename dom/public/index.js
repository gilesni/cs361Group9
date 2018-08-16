//Global variables and objects
var postControls;
var newPost;

var Post = function (){
	this.user = "";
	this.date = "";
	this.message = "";
	this.image = ""; 
	this.lnk = ""; 
	this.privSetting = "";
	this.isFake = false;
}

//Functions
//Event listeners
window.addEventListener("message", receiveMessage);
window.addEventListener("load", OnPageLoad);

function ELByID(id){
	return document.getElementById(id);
}

function OnPageLoad(){
	//Saving all dom reference for Create Post form
	postControls = new Post();
	postControls.user = ELByID("userInput");
	postControls.date = ELByID("dateInput");
	postControls.message = ELByID("msgInput");
	postControls.image = ELByID("imageInput");
	postControls.lnk = ELByID("linkInput");
	postControls.privSetting = ELByID("privInput");
	postControls.isFake = ELByID("fakeInput");

	//Adding click listener to submit button to start 
	//new Post DOM addition to page
	var submitBtn = ELByID("submitInput");
	submitBtn.addEventListener("click", AddPost);
}

function GetPostData(){
	var postData = new Post();
	postData.user = postControls.user.value;
	postData.date = postControls.date.value;
	postData.message = postControls.message.value;
	postData.image = postControls.image.value;
	postData.lnk = postControls.lnk.value;
	postData.privSetting = postControls.privSetting.value;
	postData.isFake = postControls.isFake.checked;
	return postData;
}

function AddPost(){
	//console.log("adding new post to page");
	var newData = GetPostData();
	var insertLocation = ELByID("createPost");
	//Creating post as a fragment, not part of page DOM yet
	newPost = CreatePost(newData);

	//TODO: Add function to send form data to server via Ajax

	//Opening warning popup
	if(newData.isFake){
		OpenFakeWarning("/warning.html", 400, 200);
		return;
	}
	//Finally adding newly built post to page at insertLocation
	insertAfter(newPost, insertLocation);
}

function CreatePost(post){
	var elements = new Array(9);	// array of 8 DOM elements for post to be added
	var fragment = document.createDocumentFragment();
	var container = document.createElement("div");	

	elements[0] = CreateInput("hidden", post.isFake.toString(), null);
	elements[0].name = "fakeStatus";
	elements[1] = CreateLink("#", post.user, OpenUserReport);
	elements[1].setAttribute("name", "username");
	elements[2]  = document.createElement("span");
	elements[2].textContent = post.date;
	elements[3] = CreateLink(post.lnk, "Link", null);
	elements[4]  = document.createElement("div");
	elements[4].textContent = "Image: " + post.image;
	elements[5] = document.createElement("p");
	elements[5].textContent = post.message;
	elements[6] = CreateInput("button", "Like", null);
	elements[7] = CreateInput("button", "Reply", null);
	elements[8] = CreateInput("button", "Report", OpenPostReport);	
	elements[9] = CreateInput("button", "Whitelist", TogglePost);

	//elements[9] = Create
	//Color post container based on fake status
	if(post.isFake){
		container.className = "FakePost";
	}
	else {
		container.className = "Post";
		elements[9].value = "Flag";		
	}
	//Adding elements to container , this doesn't add them to the page yet
	for(var i = 0; i < elements.length; i++){
		container.appendChild(elements[i]);
	}
	fragment.appendChild(container);
	return fragment;	
}

function CreateLink(link, text, listener){
	var linkElm  = document.createElement("a");
	var linkText = document.createTextNode(text);
	linkElm.appendChild(linkText);
	linkElm.href = link;
	if(listener != null){
		linkElm.addEventListener("click", listener);
	}
	return linkElm;
}
function CreateInput(type, inText, listener){
	var inputElm  = document.createElement("input");
	inputElm.setAttribute("type", type);
	inputElm.value = inText;
	if(listener != null){
		inputElm.addEventListener("click", listener);
	}
	return inputElm;
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function OpenFakeWarning(url, width, height){
	var child = OpenWindow(url, "_blank", window, width, height); 

 	//Poll for response from child window
    var interval = setInterval(function() {
	    if (child.closed){
	    	clearInterval(interval);	//Stop polling for reponse
	        return; 
	    }
	    //Ask for result from child window
	    else {
	    	child.postMessage({ message: "requestResult" }, "*");
	    }
    }, 500);
 }


function OpenPostReport(event){
	var elm = event.target;
	var parent = elm.parentNode;
	for(var i = 0; i < parent.children.length; i++){
			var currentElm = parent.children[i];
		if(currentElm.name == "fakeStatus"){
			var isFake = currentElm.value;
			if(isFake == "true")
			{
				OpenWindow("postReport.html", "Post Report", window, 450, 350);
			}
		}
	}
}

function OpenUserReport(event){
	var elm = event.target;

 	var parent = elm.parentNode;
 	var userName = "";
 	for(var i = 0; i < parent.children.length; i++){
			var currentElm = parent.children[i];
		if(currentElm.name == "username"){
			userName = currentElm.textContent;
			//console.log("post's username:" + userName);
		}
	}

	 sessionStorage.setItem("username", userName);	 
	 var child = OpenWindow("userReport.html", "_blank", window, 600, 450);
}

function OpenWindow(url, title, win, w, h){
	var y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
    var x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
    var options = 'toolbar=no, location=no, directories=no, status=no,';
        options +='menubar=no, scrollbars=no, resizable=no, copyhistory=no,';
        options +='width='+ w.toString() +', height='+ h.toString()+ ', ';
        options +='top=' + y.toString() + ', left=' + x.toString();
   var child = win.open(url, title, options);	//Opening new window
   return child;
}

function receiveMessage(event)
{
  // event.source is popup, event.data is data from popup
  //console.log("Received data from popup:");
  if (event.data.message == "deliverResult") {
        //console.log("Warning popup button: " + event.data.result);       
        event.source.close();
        if(event.data.result == "Post"){
        	//Creating the post
        	var insertLocation = ELByID("createPost");
        	insertAfter(newPost, insertLocation);
        }
    }
}

function TogglePost(event){
	var elm = event.target;
	var parent = elm.parentNode;
	for(var i = 0; i < parent.children.length; i++){
			var currentElm = parent.children[i];
		if(currentElm.type == "hidden"){
			var isFake = currentElm.value;
			if(isFake == "true"){
				currentElm.value = "false";
				parent.className = "Post";	
				elm.value = "Flag";
			}
			else{
				currentElm.value = "true";
				parent.className = "FakePost";	
				elm.value = "Whitelist";
			}
			break;
		}
	}
}



