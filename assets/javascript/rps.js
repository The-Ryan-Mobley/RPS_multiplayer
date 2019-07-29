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
const rock=$('#rock');
const papaer =$('#paper');
const scissors =$('#scissors');
const play_button =$('#play');

var testvar ="hello world";

database.ref().set({
  testing: testvar,

});
var connectionsRef = database.ref('/connections');
var connectedRef = database.ref('.info/connected');
connectedRef.on('value', (snap)=>{
  if(snap.val()){
    let con = connectionsRef.push(true)
    con.onDisconnect().remove();
  }

});
connectionsRef.on('value',(snapshot)=>{
  console.log(snapshot.numChildren());

})