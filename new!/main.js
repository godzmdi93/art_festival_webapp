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
			'dogType': 'Lab',
			'uploadedBy': 'someone',
			'title': $("#imgTitle").val(),
			'caption': $("#imgDesc").val()
		},
	};
	var uploadTask = firebase.storage().ref().child('images/' + selectedFile.name).put(selectedFile, metadata);
	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
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
