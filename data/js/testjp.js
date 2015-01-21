self.port.on("loadExternalJS", function(url) {
  function myTest2(testVar){
    window.alert(testVar+'---');
  }

  var mz_scriptURL=url+"/mz/tmp/testjp.js"
  console.log("URL du script appelé : " + mz_scriptURL);
  $.getScript(mz_scriptURL, function(){
		setTimeout(function(){
			//test("tutu");
      //console.log(myTestVar);
		}, 1000);
	})
  
function modifyFieldByTagName(tagName){
        document.getElementsByTagName(tagName)[0].innerHTML += " chez Raistlin";
}

modifyFieldByTagName("legend");


  self.port.emit("externalJSLoaded",'toto');
  
  console.log("Fin du script appelé");
  
});




                      