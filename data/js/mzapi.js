// api contenant les fonctions
// 1) communes à plusieurs pages MZ
// 2) utilisables par les scripts externes

// fonction de test : modifie le cadre de connexion sur la page de login
  function modifyFieldByTagName(tagName, param){
          document.getElementsByTagName(tagName)[0].innerHTML += " " + param;
  }