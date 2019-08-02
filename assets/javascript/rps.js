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


var playerone_clicked = false;
var playertwo_clicked = false;
var users = 0;
var con = undefined;

class user {
  constructor() {
    this.number = "";
    this.wins = 0;
    this.losses = 0;
    this.turns = 0;
    this.choice = "";
    this.clicked = false;
  }
}
var player = new user();
var opponent = new user();

const connectionsRef = database.ref('/connections');
const connectedRef = database.ref('.info/connected');
const chatRef = database.ref('/chat');
connectedRef.on('value', (snap) => {
  if (snap.val()) {
    let connected = connectionsRef.push(true);
    connected.onDisconnect().remove();
    chatRef.onDisconnect().remove();
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
    let statuslog = $('<p>');
    $('.chat').append(statuslog);
    statuslog.html('player joined');
    
    
  } else {
    app.delete();
  }
  console.log("You are Player " + player.number)
  console.log("You are Opponent " + opponent.number)
});

connectionsRef.on('value', function (snapshot) {
  if (con) {
    if (Object.keys(snapshot.val()).indexOf(opponent.number) !== -1) {
      opponent = snapshot.val()[opponent.number];
      player = snapshot.val()[player.number];
    }
    
    
    
  }
  
});

function round_calc() {
  connectionsRef.once('value',(snapshot)=>{
    if((snapshot.val()[player.number].clicked === true) && (snapshot.val()[opponent.number].clicked === true)){
      console.log('trigger');
      rps(snapshot.val()[player.number].choice,snapshot.val()[opponent.number].choice)
      $('#wins-p').html('WINS: '+ snapshot.val()[player.number].wins);
      $('#losses-p').html('LOSSES: '+ snapshot.val()[player.number].losses);
      $('#wins-o').html('WINS: '+ snapshot.val()[opponent.number].wins);
      $('#losses-o').html('LOSSES: '+ snapshot.val()[opponent.number].losses);
  
      

    }

  });
  
  
  

}
chatRef.on('child_added',(childsnap)=>{
  console.log(childsnap.val());
  let chattext = childsnap.val();
  
  let newchat = $('<p>');
  $('.chat').append(childsnap.val().chatline + '<br>');
  
  


});
function set_next_round(){
  console.log(player.wins);
  
  connectionsRef.child('1').update({"/choice": ""});
  connectionsRef.child('1').update({"/clicked": false});
  
  connectionsRef.child('2').update({"/choice": ""});
  connectionsRef.child('2').update({"/clicked": false});
  

}
  

function rps(pone_choice, ptwo_choice) {

  if (pone_choice === 'rock') {
    if (ptwo_choice === 'rock') {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('DRAW!');
      player.turns++;
      opponent.turns++;
      console.log(player.wins);
      connectionsRef.child('1').update({"/wins": player.wins});
      connectionsRef.child('2').update({"/losses": opponent.losses});
      connectionsRef.child('1').update({"/turns": player.turns});
      connectionsRef.child('2').update({"/turns": opponent.turns});

    } else if (ptwo_choice === 'paper') {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('Paper Covers Rock!');
      player.losses++;
      opponent.wins++;
      player.turns++;
      opponent.turns++;
      connectionsRef.child('2').update({"/wins": opponent.wins});
      connectionsRef.child('1').update({"/losses": player.losses})
      connectionsRef.child('1').update({"/turns": player.turns});
      connectionsRef.child('2').update({"/turns": opponent.turns});
      

    } else {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('Rock Beats Scissors!');
      player.wins++;
      opponent.losses++;
      player.turns++;
      opponent.turns++;
      console.log(player.wins);
      connectionsRef.child('1').update({"/wins": player.wins});
      connectionsRef.child('2').update({"/losses": opponent.losses});
      connectionsRef.child('1').update({"/turns": player.turns});
      connectionsRef.child('2').update({"/turns": opponent.turns});

    }
  }
  if (pone_choice === 'paper') {
    if (ptwo_choice === 'rock') {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('Paper Covers Rock!');
      player.wins++;
      opponent.losses++;
      player.turns++;
      opponent.turns++;
      console.log(player.wins);
      connectionsRef.child('1').update({"/wins": player.wins});
      connectionsRef.child('2').update({"/losses": opponent.losses});
      connectionsRef.child('1').update({"/turns": player.turns});
      connectionsRef.child('2').update({"/turns": opponent.turns});

    } else if (ptwo_choice === 'paper') {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('DRAW!');
      player.turns++;
      opponent.turns++;
      connectionsRef.child('1').update({"/turns": player.turns});
      connectionsRef.child('2').update({"/turns": opponent.turns});

    } else {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('Scissors Cuts Paper!');
      player.losses++;
      opponent.wins++;
      player.turns++;
      opponent.turns++;
      connectionsRef.child('2').update({"/wins": opponent.wins});
      connectionsRef.child('1').update({"/losses": player.losses});
      connectionsRef.child('1').update({"/turns": player.turns});
      connectionsRef.child('2').update({"/turns": opponent.turns});

    }
  }
  if (pone_choice === 'scissors') {
    if (ptwo_choice === 'rock') {
      let chat_line = $('<p>');
      
      chat_line.appendTo($('.chat'));
      chat_line.html('Rock Beats Scissors!');
      player.losses++;
      opponent.wins++;
      player.turns++;
      opponent.turns++;
      connectionsRef.child('2').update({"/wins": opponent.wins});
      connectionsRef.child('1').update({"/losses": player.losses});
      connectionsRef.child('1').update({"/turns": player.turns});
      connectionsRef.child('2').update({"/turns": opponent.turns});

    } else if (ptwo_choice === 'paper') {
      let chat_line = $('<p>');
      
      chat_line.appendTo($('.chat'));
      chat_line.html('Scissors Cuts Paper!');
      player.wins++;
      opponent.losses++;
      player.turns++;
      opponent.turns++;
      console.log(player.wins);
      connectionsRef.child('1').update({"/wins": player.wins});
      connectionsRef.child('2').update({"/losses": opponent.losses});
      connectionsRef.child('1').update({"/turns": player.turns});
      connectionsRef.child('2').update({"/turns": opponent.turns});

    } else {
      let chat_line = $('<p>');
      chat_line.appendTo($('.chat'));
      chat_line.html('DRAW!');
      player.turns++;
      opponent.turns++;
      connectionsRef.child('1').update({"/turns": player.turns});
      connectionsRef.child('2').update({"/turns": opponent.turns});

    }
  }
  set_next_round();
}





connectedRef.on('value',(snapshot)=>{
  

});
$('.player-one-form').on('click', '.selection-point', (event) => {
  let clicked = $('.selections').find(event.target);
  
  connectionsRef.once('value', ()=> {
    
    if(con.path.pieces_[1] === '1'){
      player.choice = clicked.data('name');
      connectionsRef.child('1').update({"/choice": player.choice});
      connectionsRef.child('1').update({"/clicked": true});
    }else{
      opponent.choice = clicked.data('name');
      connectionsRef.child('2').update({"/choice": opponent.choice});
      connectionsRef.child('2').update({"/clicked": true});
    }
    
    
    
  });
  round_calc();
  

});
$('#chat-button').on('click',()=>{
  
  
  chatRef.push({
    chatline: $('#chat-line').val(),

  });

});
