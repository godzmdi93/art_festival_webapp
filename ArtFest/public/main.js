// Initialize Firebase
var config = {
  apiKey: "AIzaSyA9VpnncQtXeiASQ_kuIHSWvv0c2dEteKk",
  authDomain: "contactform-1be84.firebaseapp.com",
  databaseURL: "https://contactform-1be84.firebaseio.com",
  projectId: "contactform-1be84",
  storageBucket: "contactform-1be84.appspot.com",
  messagingSenderId: "861580409827"
};
firebase.initializeApp(config);

// this is to get the library to login with google facebook and twitter.
var provider = new firebase.auth.GoogleAuthProvider();
var provider = new firebase.auth.FacebookAuthProvider();
var provider = new firebase.auth.TwitterAuthProvider();
// or for ES6 imports.


// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}


//********************************  Check if the User is logined and hide the button and uploading picutre *****************
//Ask Junwoo Seo

//getting id from the index.html

//login button
var signI = document.getElementById("login_button");

//sign out button
var signO = document.getElementById("signout_button");
//img_up button
var img_up = document.getElementById("upload_everything");

//check if the user is signed in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(signI);

    //hide the sign in button
    signI.style.visibility = 'hidden';
    console.log(user);


  } else {

    //hide the signout button and image upload section if user is not logined
    signO.style.visibility = 'hidden';
    img_up.style.visibility = 'hidden';
        console.log(user);

  }
});
//******************************************************************




//****************reloading page and send it to popup html page which is img upload page***************************
function img_direct(){

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      window.location.href="/popup.html";
  } else {
      window.location.href="/login.html";
  }
});

};


function story_direct(){


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      window.location.href="/message.html";
  } else {
      window.location.href="/login.html";
  }
});  
};
//******************************************************************













//********************************  login out when user press the sign out button *****************
//Ask Junwoo Seo
function signout(){
  firebase.auth().signOut().then(function() {
      console.log("sign out success")
      location.reload();

}).catch(function(error) {
  // An error happened.
});
};
//********************************  login out when user press the sign out button *****************














//********************************  contact us  *****************
//ask HJ


// Contact Us
// Reference messages collection
var messagesRef = firebase.database().ref('messages');
// Listen for form submit
var el = document.getElementById('contactForm');
if(el){
  el.addEventListener('submit', submitForm);
}

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, email, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Save message to firebase
function saveMessage(name, email, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email:email,
    message:message
  });
}


//********************************  contact us  *****************


// reloading all the pages

function reload(){
  location.reload();
}












//********************************  artist diplay   ***************************
// ask HJ


// story download - display on website
var fn_list = [];
var ln_list = [];
var bn_list = [];
var booth_list = [];
var type_list = [];
var website_list = [];
var i;
var artist_get = firebase.database().ref('Artist');
artist_get.on('value',function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
      fn_list.push(childSnapshot.child("First_Name").val());
      ln_list.push(childSnapshot.child("Last_Name").val());
      bn_list.push(childSnapshot.child("Business_Name").val());
      booth_list.push(childSnapshot.child("Booth").val());
      type_list.push(childSnapshot.child("Medium_Category").val());
      website_list.push(childSnapshot.child("Website").val());
    });
    var container3 = document.getElementById("test3");
for( i=0; i < 3; i++){
  container3.insertAdjacentHTML
  ('beforeend', '<div class="col span-1-of-3"><blockquote> Hey, my name is '+ fn_list[i] +' ' + ln_list[i] + ' and my business name is ' + bn_list[i] + '. My interest area of art is ' + type_list[i] + ' and I will have tons of beautiful art pieces for you guys to buy and enjoy. Come visit my booth ' + booth_list[i] + ' on Allen Street! <cite><img src ="resources/img/memofest.png">' + website_list[i] + '</cite> </blockquote></div>');
  console.log(i);
};
})

//********************************  artist diplay   ***************************













































//********************************  img diplay   ***************************
// ask Junwoo or HJ


// image download - display on website
var list = [];
var i;
var img_get = firebase.database().ref('img_url');
img_get.on('value',function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
      list.push(childSnapshot.child("urls").val());
    });
    var container = document.getElementById("test1");
    var len = list.length-1;
    var lenM = len - 8;
for( i=len; i>lenM ; i--){
  container.insertAdjacentHTML('beforeend', '<li> <figure class ="arts-photo"> <img src="'+list[i]+'"> </figure> </li>');
  console.log(i);
};
})
//********************************  img diplay   ***************************
































//********************************  img upload  *****************
//ask HJ or Junwoo
var selectedFile;

document.getElementById("upload").addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
	$(".upload-group").show();
	selectedFile = event.target.files[0];
};

function confirmUpload() {

    var user = firebase.auth().currentUser.email;
    var metadata = {
        contentType: 'image',
        customMetadata: {
          'uploadedBy': user,
          'title': $("#imgTitle").val(),
          'caption': $("#imgDesc").val()
        },
      };
      var uploadTask = firebase.storage().ref().child('images/' + selectedFile.name).put(selectedFile, metadata);

      // image download
      var downloadTask = firebase.storage().ref().child('images/' + selectedFile.name);

      downloadTask.getDownloadURL().then(function(url) {
        console.log(url);

        var urlRef = firebase.database().ref('img_url').push();
        urlRef.set({
          urls : url,
          name : selectedFile.name
        });
      })

      // end of download

	uploadTask.on('state_changed', function(snapshot){
  		// Observe state change events such as progress, pause, and resume
  		// See below for more detail
	}, function(error) {
  		// Handle unsuccessful uploads
	}, function() {
  		// Handle successful uploads on complete
  		// For instance, get the download URL: https://firebasestorage.googleapis.com/...
  		$(".upload-group")[0].before("Success!");
  		$(".upload-group").hide();
                  location.reload();


	});
}


//********************************  img upload  *****************
//ask HJ or Junwoo
