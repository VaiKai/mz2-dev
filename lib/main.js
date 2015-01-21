// Import the page-mod API
var mz_pageMod = require("sdk/page-mod");
var mz_self = require("sdk/self"); 
var mz_data = require("sdk/self").data;
var mz_prefs = require('sdk/simple-prefs')
var mz_storage = require("sdk/simple-storage").storage;
var mz_tabs = require("sdk/tabs");




/*
 * fonctions pour rajouter gérer à la fois le http et le https
 */
function buildHttpUrl(url) {
return buildUrl('http', url);
}

function buildHttpsUrl(url) {
return buildUrl('https', url);
}

function buildUrl(scheme, url) {
return scheme + '://' + url + '/*';
}

/*
 * Récupération de liste depuis les options de l'addon Manager
 */
 //construction de la liste des serveurs gérés par MZ
var mz_serverListeBrute = mz_prefs.prefs['serveursMH'].split(',');

// Ajout du http:// et https:// au début, et du /* à la fin  
var mz_serverListe = mz_serverListeBrute.map(buildHttpUrl).concat(mz_serverListeBrute.map(buildHttpsUrl));


//debug
console.log("Liste des serveurs gérés : " + mz_serverListe.toString());
/* 
 *début des modifications
 */

// ajout de l'appel aux scripts sur les pages concernées
mz_pageMod.PageMod({
  include: mz_serverListe,
  contentScriptFile: [mz_data.url("js/branching.js")],
  
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
      console.log(data);
      console.log("Fin de traitement");
    });
  }
});                                                                  