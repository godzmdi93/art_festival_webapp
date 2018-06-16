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

//var firebaseui = require('firebaseui');
var provider = new firebase.auth.GoogleAuthProvider();
var provider = new firebase.auth.FacebookAuthProvider();
var provider = new firebase.auth.TwitterAuthProvider();
// or for ES6 imports.

// Contact Us
// Reference messages collection
var messagesRef = firebase.database().ref('messages');

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

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
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

// image upload
var selectedFile;

document.getElementById("upload").addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
	$(".upload-group").show();
	selectedFile = event.target.files[0];
};

function confirmUpload() {

    var metadata = {
        contentType: 'image',
        customMetadata: {
          'uploadedBy': 'someone',
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

	});
}
