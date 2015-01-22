self.port.on("loadExternalJS", function(url) {


  // récupération de l'url complete du script chargé
  // cette url dépendra bien évidemment de l'url de la page en cours
  // pour l'instant, c'est en dur
  var mz_scriptURL=url+"/mz/tmp/externalScript.js"
  console.log("URL du script appelé : " + mz_scriptURL);
  
  // chargement du script externe
  function loadExternalScript(scriptURL){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", scriptURL);
    xmlhttp.onreadystatechange = function()
    {
        if ((xmlhttp.status == 200) && (xmlhttp.readyState == 4))
        {
            eval(xmlhttp.responseText);
            sendBackResult("externalJSLoaded",'done');
        }
    };
    xmlhttp.send();
  }
  
  loadExternalScript(mz_scriptURL);

  
  // fonction pour le retour au main.js
  function sendBackResult(event, data){
    self.port.emit(event, data); 
    console.log("Fin du script appelé");
  }  
  
});




                      