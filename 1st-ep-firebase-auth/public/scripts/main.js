'use strict';

// login
function signInWithGoogle() {
  // login no firebase usando google como identity provider
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

// logout da aplicacao
function signOut() {
  // logout do firebase
  firebase.auth().signOut();
}

// dispara quando um usuario clica no botao de cadastrar
function signUpWithEmail() {
  var displayNameTextField = document.getElementById('signupwithemail_displayname');
  var emailTextField = document.getElementById('signupwithemail_email');
  var passwordTextField = document.getElementById('signupwithemail_password');

  alert(emailTextField.value);
  firebase.auth().createUserWithEmailAndPassword(emailTextField.value, passwordTextField.value)
  .then((userCredential) => {
    userCredential.user.updateProfile({
      displayName: displayNameTextField.value
  });

  window.alert('Conta criada com sucesso');

  firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    window.alert('Te enviamos um e-mail para verificação da sua conta');
  });

    console.log(userCredential);
    var user = userCredential.user;
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    window.alert(errorMessage);
  }).finally(() => {
    displayNameTextField.value = '';
    emailTextField.value = '';
    passwordTextField.value = '';
  });
}

// dispara quando um usuario clica no botao de login com email
function signInWithEmail() { 
  var emailTextField = document.getElementById('signinwithemail_email');
  var passwordTextField = document.getElementById('signinwithemail_password');
  
  firebase.auth().signInWithEmailAndPassword(emailTextField.value, passwordTextField.value)
  .then((userCredential) => {
    var user = userCredential.user;
    console.log(user);
    alert('Autenticado com sucesso!');
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('errorCode', errorCode);
    alert(errorMessage);
  }).finally(() => {
    emailTextField.value = '';
    passwordTextField.value = '';
  });
}

// funcao para configurar autenticador do firebase
function initFirebaseAuth() {
  // registrando funcao de callback para observar mudanca de estado da autenticacao
  firebase.auth().onAuthStateChanged(authStateObserver);
}

// recupera imagem do usuario autenticado
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// recupera nome do usuario autenticado 
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

// retorna verdadeiro caso o usuario esteja autenticado
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

function isUserVerified() {
  return firebase.auth().currentUser.emailVerified;
}

// Dispara quando o estado da autenticacao eh modificado (login/logout)
function authStateObserver(user) {
  if (user) { // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Define informacoes do usuario autenticado.
    userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Esconde o botao de login.
    signInButtonElement.setAttribute('hidden', 'true');

  } else { // Usuario deslogado
    // Esconde nome, foto e altera botao.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Mostra botao de login
    signInButtonElement.removeAttribute('hidden');
  }
}

// Fixa um tamanho para a foto do perfil do google.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

// Checa as importacoes do sdk do firebase
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('Erro no SDK do firebase');
  }
}

// Checa se o firebase foi importado corretamente
checkSetup();


function showUserData() {
  alert(`
  Nome: ${getUserName()}
  Foto: ${getProfilePicUrl()}
  Autenticado: ${isUserSignedIn()}
  Verificado: ${isUserVerified()}
  `)
  console.log(firebase.auth().currentUser);
}

var selectedElement = null;
var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
signOutButtonElement.addEventListener('click', signOut);
signInButtonElement.addEventListener('click', showUserData);

// Inicializa a autenticacao do firebase
initFirebaseAuth();