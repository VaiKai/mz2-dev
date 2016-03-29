//Debug
console.log("Page de Profil");

// "self" is a global object in content scripts
// Listen for a message, and replace the document's
// contents with the message payload.
self.port.on("replacePage", function(message) {
  document.body.innerHTML = "<h1>" + message + "</h1>";
});