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

var con = undefined; //used later to check connection

class user { //player object
  constructor() {
    this.number = "";
    this.wins = 0;
    this.losses = 0;
    this.choice = "";
    this.clicked = false;
  }
}
var player = new user(); //player 1
var opponent = new user(); //player 2

const connectionsRef = database.ref('/connections');
const connectedRef = database.ref('.info/connected');
const chatRef = database.ref('/chat');
connectedRef.on('value', (snap) => { //push connection and remove on idsconnect
  if (snap.val()) {
    let connected = connectionsRef.push(true);
    connected.onDisconnect().remove();
    chatRef.onDisconnect().remove();
  }

});
connectionsRef.once('value', function (snapshot) { //assign player 1 and 2 or 'opponent'
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
    let statuslog = $('<p>');
    $('.chat').append(statuslog);
    statuslog.html('player joined');

  } else {
    app.delete();
  }
});

connectionsRef.on('value', function (snapshot) {
  if (con) {
    if (Object.keys(snapshot.val()).indexOf(opponent.number) !== -1) {
      opponent = snapshot.val()[opponent.number];
      player = snapshot.val()[player.number];
    }
  }

});

function round_calc() { //rock paper scissors game logic after checking if both users have clicked an option
  connectionsRef.once('value', (snapshot) => {
    if ((Object.keys(snapshot.val()).indexOf('1') !== -1) && (Object.keys(snapshot.val()).indexOf('2') !== -1)) {
      if ((snapshot.val()[player.number].clicked === true) && (snapshot.val()[opponent.number].clicked === true)) {
        rps(snapshot.val()[player.number].choice, snapshot.val()[opponent.number].choice);

      }
    }

  });
}

chatRef.on('child_added', (childsnap) => { //appends chat
  let chattext = childsnap.val();

  let newchat = $('<p>');
  $('.chat').append(childsnap.val().chatline + '<br>');

});

function set_next_round() { //updates for next round
  connectionsRef.child('1').update({
    "/choice": ""
  });
  connectionsRef.child('1').update({
    "/clicked": false
  });

  connectionsRef.child('2').update({
    "/choice": ""
  });
  connectionsRef.child('2').update({
    "/clicked": false
  });
}

function rps(pone_choice, ptwo_choice) {

  if (pone_choice === 'rock') { //checks choices and updates win/loss
    if (ptwo_choice === 'rock') {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('DRAW!');

    } else if (ptwo_choice === 'paper') {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('Paper Covers Rock!');
      player.losses++;
      opponent.wins++;
      connectionsRef.child('2').update({
        "/wins": opponent.wins
      });
      connectionsRef.child('1').update({
        "/losses": player.losses
      })

    } else {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('Rock Beats Scissors!');
      player.wins++;
      opponent.losses++;
      connectionsRef.child('1').update({
        "/wins": player.wins
      });
      connectionsRef.child('2').update({
        "/losses": opponent.losses
      });

    }
  }
  if (pone_choice === 'paper') {
    if (ptwo_choice === 'rock') {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('Paper Covers Rock!');
      player.wins++;
      opponent.losses++;
      connectionsRef.child('1').update({
        "/wins": player.wins
      });
      connectionsRef.child('2').update({
        "/losses": opponent.losses
      });

    } else if (ptwo_choice === 'paper') {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('DRAW!');

    } else {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('Scissors Cuts Paper!');
      player.losses++;
      opponent.wins++;
      connectionsRef.child('2').update({
        "/wins": opponent.wins
      });
      connectionsRef.child('1').update({
        "/losses": player.losses
      });

    }
  }
  if (pone_choice === 'scissors') {
    if (ptwo_choice === 'rock') {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('Rock Beats Scissors!');
      player.losses++;
      opponent.wins++;
      connectionsRef.child('2').update({
        "/wins": opponent.wins
      });
      connectionsRef.child('1').update({
        "/losses": player.losses
      });

    } else if (ptwo_choice === 'paper') {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('Scissors Cuts Paper!');
      player.wins++;
      opponent.losses++;
      connectionsRef.child('1').update({
        "/wins": player.wins
      });
      connectionsRef.child('2').update({
        "/losses": opponent.losses
      });

    } else {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('DRAW!');

    }
  }
  set_next_round();
}

connectionsRef.on('value', (snapshot) => { //tracks win loss html elements
  if ((Object.keys(snapshot.val()).indexOf('1') !== -1) && (Object.keys(snapshot.val()).indexOf('2') !== -1)) {
    $('#wins-p').html('WINS: ' + snapshot.val()[player.number].wins);
    $('#losses-p').html('LOSSES: ' + snapshot.val()[opponent.number].wins);
    $('#wins-o').html('WINS: ' + snapshot.val()[opponent.number].wins);
    $('#losses-o').html('LOSSES: ' + snapshot.val()[player.number].wins);
  }
});
$('.player-one-form').on('click', '.pic-select', (event) => { //click event to get value
  let clicked = $('.selections').find(event.target);
  connectionsRef.once('value', () => {

    if (con.path.pieces_[1] === '1') {
      player.choice = clicked.data('name');
      connectionsRef.child('1').update({
        "/choice": player.choice
      });
      connectionsRef.child('1').update({
        "/clicked": true
      });
    } else {
      opponent.choice = clicked.data('name');
      connectionsRef.child('2').update({
        "/choice": opponent.choice
      });
      connectionsRef.child('2').update({
        "/clicked": true
      });
    }

  });
  round_calc();

});
$('#chat-button').on('click', () => {
  chatRef.push({
    chatline: $('#chat-line').val(),

  });
  $('#chat-button').val("");

});