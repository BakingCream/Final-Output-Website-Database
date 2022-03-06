var firebaseConfig = {
    apiKey: "AIzaSyAYsiXvitN-mcjAtTbXCe045F-yAzHi22g",
    authDomain: "mcu-minigames.firebaseapp.com",
    projectId: "mcu-minigames",
    storageBucket: "mcu-minigames.appspot.com",
    messagingSenderId: "458111617103",
    appId: "1:458111617103:web:c48fdf2e37738edd1d423a",
    measurementId: "G-QJTDN3NFC5"
};

  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);
  var app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore(app);
        firebase.firestore().settings({
            cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
        });


   const submitPlayers = document.querySelector("#submitscore");
   const name = document.querySelector("#name");
   const leaderBoard = document.querySelector("#leaderBoard");
   const score = document.querySelector("#score");

function renderCafe(doc){
    let tr = document.createElement('tr');
    let name = document.createElement('span');
    let score = document.createElement('td');

    tr.setAttribute('data-id', doc.id);
    name.textContent = doc.data().names;
    score.textContent = doc.data().scores;

    tr.appendChild(name);
    tr.appendChild(score);

    leaderBoard.appendChild(tr);
}

// real-time listener
//snapshot an obj that represents your doc ..grab the data i t contains by calling data on it
db.collection('peoples').orderBy('scores', "desc").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
        changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);}
    })
})

// saving data
submitPlayers.addEventListener("click", function(){
    if( document.getElementById("name").value != ''){
    //e.preventDefault();
    db.collection('peoples').add({
        names: name.value,
        scores: parseInt(score.value)
        });
      }
    });

function display(){
          document.getElementById('results').style.display = "block";
          document.getElementById('table').style.display = "block";
}
