self.port.on("loadExternalJS", function(url) {
  var mz_scriptURL=url+"/mz/tmp/testjp.js"
  console.log("URL du script appelé : " + mz_scriptURL);
  self.port.emit("externalJSLoaded", $.getScript(mz_scriptURL));
  console.log("Fin du script appelé");
});




                      