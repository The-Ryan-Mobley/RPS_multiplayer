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
var has_playerone = false;
var has_playertwo = false;
var users = 0;
function rps(pone_choice,ptwo_choice){
  if(pone_choice === 'rock'){
    if(ptwo_choice === 'rock'){

    }
    else if(ptwo_choice === 'paper'){

    }
    else{

    }
  }
  if(pone_choice === 'peper'){
    if(ptwo_choice === 'rock'){

    }
    else if(ptwo_choice === 'paper'){

    }
    else{
      
    }
  }
  if(pone_choice === 'scissors'){
    if(ptwo_choice === 'rock'){

    }
    else if(ptwo_choice === 'paper'){

    }
    else{
      
    }
  }
}

database.ref().set({
  testing: testvar,
  pone: has_playerone,
  ptwo: has_playertwo,
  usernum: users

});
var connectionsRef = database.ref('/connections');
var connectedRef = database.ref('.info/connected');
// connectionsRef.once('value', function (snapshot) {
//   if (Object.keys(snapshot.val()).indexOf('1') === -1) {
//       player.number = '1';
//       opponent.number = '2';
//   } else if (Object.keys(snapshot.val()).indexOf('2') === -1) {
//       player.number = '2';
//       opponent.number = '1';
//   }
// ​
//   if (player.number !== '0') {
// ​
//       con = connectionsRef.child(player.number);
//       con.set(player);
// ​
//       con.onDisconnect().remove();
// ​
//   } else {
//       app.delete();
//   }
//   console.log("You are Player " + player.number)
//   console.log("You are Opponent " + opponent.number)
// });
// ​
// if (player.number = '1') {
//   $(".player-two-form").hide();
// } else if(opponent.number = '1'){
//   $(".player-one-form").hide();
// }
// else{}
var connectionsRef = database.ref('/connections');
var connectedRef = database.ref('.info/connected');
connectedRef.on('value', (snap) => {
  if (users < 2) {
    if (snap.val()) {
      let con = connectionsRef.push(true)
      con.onDisconnect().remove();
    }
    users++;
  }

});
connectionsRef.on('value', (snapshot) => {
  console.log(snapshot.numChildren());

})
database.ref().on('value', (snapshot) => {
  console.log(snapshot.val());

});
join_button.on('click', (event) => {

});
selection_point.on('click', (element)=>{

});