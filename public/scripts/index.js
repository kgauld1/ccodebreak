var socket = io();

var level = 1;
var placeholderDash = "-"

var problems = {
  "1": {"prompt": "urihg zmw ozhg",
      "hint": ["Reverse alphabet", "A = Z, B = Y, C = X", "Z = A, Y = B, X = C"],
      "answer": "first and last"},

  "2": {"prompt": "island gnat snow past hellow face freedom alibi nobody data leopard panic olfactory you nobody thought death shoo water nuisance",
      "hint": ["The answer starts with 'its'"],

      "answer": "its the final countdown"},
  "3": {"prompt": "ttimeeminutelsundialephhourglassoneclockkhoureysecondpaticktockd",
      "hint": ["Time is running out", "Tick tock tick...", "Remove time", "The answer starts with 'te'"],
      
      "answer": "telephone keypad"},
  "4": {"prompt": "5,3 6,3 6,3 5,2 2,2 2,1 2,3 5,2 9,1 2,1 7,3 3,1 7,4",
      "hint": ["1-800-PAINTER", "A = 2,1"],
      "answer": "look backwards"},

  "5": {"prompt": "sret tele ht rebmun",
      "hint": ["Reverse Uno card"],
      "answer": "number the letters"},

  "6": {"prompt": "19 8 9 6 20 20 8 3 1 12 16 8 1 2 5 20",
      "hint": ["A = 1, B = 2, C = 3"],
      "answer": "shift the alphabet"},
  
  "7": {"prompt": "cjcitco",
      "hint": ["C = A", "Shift by 3"],
      "answer": "anagram"},

  "8": {"prompt": "tilsp het balephat",
      "hint": ["Same letters, different word", "Same letters, different order", "The answer starts with 'sp'"],
      "answer": "split the alphabet"},

  "9": {"prompt": "erzeroregurrvefg",
      "hint": ["A = N, B = O..."],
      "answer": "remember the first"},

  "10": {"prompt": "xlmtizgfozgrlmh xkwv yivzpvi",
      "hint": ["First hint", "Reverse alphabet"],
      "answer": "congratulations code breaker"},
}



async function replaceBody(file){
	let resp = await fetch(file);
	let text = await resp.text();
	document.body.innerHTML = text;
}

function clean(str){
	str = str.trim().replace(/</g, '&lt').replace(/>/g, '&gt');
	return str;
}

function enterGame(){
	var name = document.getElementById('username');
	if(name.value && clean(name.value)){
		socket.emit('joinRandom', name.value);
	}
}

socket.on('waiting', () => {
	document.getElementById('waiting').style.display="inline-block";
});

socket.on('starting', async (names) => {
	console.log(names);
	await replaceBody('/game.html');

  document.getElementById("prompt").innerHTML = problems[level.toString()]["prompt"];
  document.getElementById("hint").innerHTML = "Hint: " + problems[level.toString()]["hint"][Math.floor(Math.random()*(problems[level.toString()]["hint"].length))];
  document.getElementById("answer-input").placeholder = placeholderDash.repeat(problems[level.toString()]["answer"].length);
});

function sendMessage(){
  socket.emit('chat', clean(document.getElementById("message-input").value));
}

function checkAnswer(){
  if (document.getElementById("answer-input").value.toLowerCase() == problems[level.toString()]["answer"]){
    
    if (level < 10){
      level++;
      document.getElementById("prompt").innerHTML = problems[level.toString()]["prompt"];
      document.getElementById("hint").innerHTML = "Hint: " + problems[level.toString()]["hint"][Math.floor(Math.random()*(problems[level.toString()]["hint"].length))];
      document.getElementById("answer-input").value = '';
      document.getElementById("answer-input").placeholder = placeholderDash.repeat(problems[level.toString()]["answer"].length);
    }
    else {
      var div = document.getElementById("game-screen"); 
        
      while(div.firstChild) { 
          div.removeChild(div.firstChild); 
      }

      var congrats = document.createElement('H1');
      congrats.appendChild(document.createTextNode("Congratulations!"));    
      congrats.setAttribute("style", "margin-top: 25%;");

      div.appendChild(congrats)
      div.appendChild(document.createTextNode("You solved the puzzles!"));
      div.appendChild(document.createElement("br"));
      var exit = document.createElement('a');
      exit.setAttribute("href", "/");
      exit.innerHTML = 'Exit';
      div.appendChild(exit);
    }
  }
}




socket.on('chat', ({name, text}) => {
	let html = `
		<p><b>${name}:</b> ${text}</p>
	`;
	let chat = document.getElementById('chat');
	chat.innerHTML += html;
	let msgs = document.getElementById('messages');
	msgs.scrollTop = msgs.scrollHeight - msgs.clientHeight;
})

socket.on('end', async ({won, name}) => {
	await replaceBody('/winlose.html');
	let h1 = document.getElementById('condition');
	let h2 = document.getElementById('chatbotName');
	if (won) h1.innerHTML = "You won!";
	else h1.innerHTML = "You lost.";
	h2.innerHTML = "The chatbot's name was " + name;
})
