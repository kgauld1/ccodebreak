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


document.getElementById("prompt").innerHTML = problems[level.toString()]["prompt"];
document.getElementById("hint").innerHTML = "Hint: " + problems[level.toString()]["hint"][Math.floor(Math.random()*(problems[level.toString()]["hint"].length))];
document.getElementById("answer-input").placeholder = placeholderDash.repeat(problems[level.toString()]["answer"].length);

function checkAnswer(){
  if (document.getElementById("answer-input").value.toLowerCase() == problems[level.toString()]["answer"]){
    
    if (level < 1){
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

      var exit = document.createElement('button');
      exit.setAttribute("href", "/");
      var button = document.createElement('')
      exit.appendChild(button);
      exit.innerHTML = 'Exit';
      div.appendChild(exit);
    }
  }
}