//initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5fyqB6aBN7cPHhByuHSmpY6ERh8cXwh4",
  authDomain: "rockpaperscissors-d74be.firebaseapp.com",
  databaseURL: "https://rockpaperscissors-d74be.firebaseio.com",
  projectId: "rockpaperscissors-d74be",
  storageBucket: "",
  messagingSenderId: "20615850318",
  appId: "1:20615850318:web:211a38faf6c6d1dd"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
//jquery elements
const selection_point = $('.selection-point');
const play_button = $('#play');
const join_button = $('#join');

var testvar = "hello world";
var playerone_clicked = false;
var playertwo_clicked = false;
var users = 0;

class user {
  constructor() {
    this.number = 0;
    this.name = "";
    this.wins = 0;
    this.losses = 0;
    this.turns = 0;
    this.choice = "";
  }
}
var player = new user();
var opponent = new user();

function round_calc(){
  if (playerone_clicked && playertwo_clicked) {
    rps(player.choice,opponent.choice);
  }
}
function rps(pone_choice, ptwo_choice) {
  
    if (pone_choice === 'rock') {
      if (ptwo_choice === 'rock') {
        let chat_line = $('<p>');
        chat_line.html('DRAW!');
        chat_line.appendTo($('.chat'));
        player.turns++;
        opponent.turns++;

      } else if (ptwo_choice === 'paper') {
        let chat_line = $('<p>');
        chat_line.html('Paper Covers Rock!');
        chat_line.appendTo($('.chat'));
        player.losses++;
        opponent.wins++;
        player.turns++;
        opponent.turns++;

      } else {
        let chat_line = $('<p>');
        chat_line.html('Rock Beats Scissors!');
        chat_line.appendTo($('.chat'));
        player.wins++;
        opponent.losses++;
        player.turns++;
        opponent.turns++;

      }
    }
    if (pone_choice === 'paper') {
      if (ptwo_choice === 'rock') {
        let chat_line = $('<p>');
        chat_line.html('Paper Covers Rock!');
        chat_line.appendTo($('.chat'));
        player.wins++;
        opponent.losses++;
        player.turns++;
        opponent.turns++;

      } else if (ptwo_choice === 'paper') {
        let chat_line = $('<p>');
        chat_line.html('DRAW!');
        chat_line.appendTo($('.chat'));
        player.turns++;
        opponent.turns++;

      } else {
        let chat_line = $('<p>');
        chat_line.html('Scissors Cuts Paper!');
        chat_line.appendTo($('.chat'));
        player.losses++;
        opponent.wins++;
        player.turns++;
        opponent.turns++;

      }
    }
    if (pone_choice === 'scissors') {
      if (ptwo_choice === 'rock') {
        let chat_line = $('<p>');
        chat_line.html('Rock Beats Scissors!');
        chat_line.appendTo($('.chat'));
        player.losses++;
        opponent.wins++;
        player.turns++;
        opponent.turns++;

      } else if (ptwo_choice === 'paper') {

      } else {

      }
    }
  }



var connectionsRef = database.ref('/connections');
var connectedRef = database.ref('.info/connected');
connectedRef.on('value', (snap) => {
  if (snap.val()) {
    let con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }

});
connectionsRef.once('value', function (snapshot) {
  if (Object.keys(snapshot.val()).indexOf('1') === -1) {
    player.number = '1';
    opponent.number = '2';
  } else if (Object.keys(snapshot.val()).indexOf('2') === -1) {
    player.number = '2';
    opponent.number = '1';
  }
  if (player.number !== '0') {
    con = connectionsRef.child(player.number);
    con.set(player);
    con.onDisconnect().remove();
  } else {
    app.delete();
  }
  console.log("You are Player " + player.number)
  console.log("You are Opponent " + opponent.number)
});
if (player.number = '1') {
  $(".player-two-form").hide();
} else if (opponent.number = '1') {
  $(".player-one-form").hide();
}

database.ref().on('value', (snapshot) => {
  console.log(snapshot.val());

});

$('.player-one-form').on('click', '.selection-point', (event) => {
  let clicked = $('.selections').find(event.target);
  console.log(clicked.data('name'));
  player.choice = clicked.data('name');
  playerone_clicked = true;
  database.ref().set({
    playerChoice: player.choice,
    playerClicked: playerone_clicked,

  });
  round_calc();

});
$('.player-two-form').on('click', '.selection-point', (event) => {
  let clicked = $('.selections').find(event.target);
  console.log(clicked.data('name'));
  opponent.choice = clicked.data('name');
  playertwo_clicked = true;
  database.ref().set({
    opponentChoice: opponent.choice,
    opponentClicked: playertwo_clicked,

  });
  round_calc();

});