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


//********************************  story  *****************
//ask HJ


// Story
// Reference stories collection
var storyRef = firebase.database().ref('story');
// Listen for form submit
var el = document.getElementById('storyForm');
if(el){
  el.addEventListener('submit', submitForm);
}

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var tag = getInputVal('tag');
  var story = getInputVal('story');

  // Save message
  saveStory(tag, story);

  send_email_email();

  confirmation();

  // Clear form
  document.getElementById('storyForm').reset();
}

// Save message to firebase
function saveStory(tag, story){
  var newStoryRef = storyRef.push();
  newStoryRef.set({
    tag: tag,
    story:story
  });
}

function confirmation(){
  alert("Your story has been sent!");
  location.reload();
}


//********************************  story  *****************






















//********************************  story diplay   ***************************
// ask HJ


// story download - display on website
var list_story = [];
var i;
var story_get = firebase.database().ref('story');
story_get.on('value',function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
      list_story.push(childSnapshot.child("story").val());
    });
    var container2 = document.getElementById("test2");
    console.log(container2);
for( i=0; i < list_story.length; i++){
  container2.insertAdjacentHTML('beforeend', '<div class = "col span-1-of-3"><blockquote>' + list_story[i] + '</blockquote></div>');
};
});

//********************************  story diplay   ***************************



//********************************  send email  *****************
// ask junwoo

function send_email_email(){
    var mylife = firebase.auth().currentUser.email;
var email = require(['https://cdn.emailjs.com/dist/email.min.js']);
var tem = document.getElementById("promotion");

var template_params = {
   "to_email": mylife,
 }

var service_id = "default_service";
var template_id = "hello";
emailjs.send(service_id,template_id,template_params);

}
