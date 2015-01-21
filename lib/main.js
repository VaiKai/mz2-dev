// Import the page-mod API
var mz_pageMod = require("sdk/page-mod");
var mz_self = require("sdk/self"); 
var mz_data = require("sdk/self").data;
var mz_prefs = require('sdk/simple-prefs')
var mz_storage = require("sdk/simple-storage").storage;
var mz_tabs = require("sdk/tabs");

//construction de la liste des serveurs gérés par MZ
var mz_serverListeBrute = mz_prefs.prefs['serveursMH'].split(',');
var mz_serverListe=new Array();
// on gère àla fois le http et le https
for(var i=0;i<mz_serverListeBrute.length;i++){
  mz_serverListe.push("http://"+mz_serverListeBrute[i]+"/*");
  mz_serverListe.push("https://"+mz_serverListeBrute[i]+"/*");
}
console.log("Liste des serveurs gérés : " + mz_serverListe.toString());

// ajout de l'appel aux scripts sur les pages concernées
mz_pageMod.PageMod({
  include: mz_serverListe,
  contentScriptFile: [mz_data.url("libs/jquery-2.1.1.min.js"),mz_data.url("js/testjp.js")],
  onAttach: function(worker) {        
  // test du simple storage      
  // si l'objet n'existe pas, on le crée
  if(!mz_storage.compteur){
    console.log("compteur inconnu");
    mz_storage.compteur=new Array();
  }
  // pour chaque page, on ajoute un élément de type objet
  var pageEnCours = {url:mz_tabs.activeTab.url,nb:1}
  mz_storage.compteur.push(pageEnCours);
  
  console.log("compteur = " + JSON.stringify(mz_storage.compteur));
  
// on appelle MZ en http si la page courante est en http, et en https si la page courante est en https
    console.log("compteur : " + mz_storage.compteur.toString());
    var currentProtocol=mz_tabs.activeTab.url.split(':')[0];
    console.log("Protocole de la page en cours : " + currentProtocol);
    worker.port.emit("loadExternalJS",currentProtocol+"://"+mz_prefs.prefs['serveurMZ']);
    worker.port.on("externalJSLoaded", function(data){
      console.log("Fin de traitement");
    });
  }
});                                                                  