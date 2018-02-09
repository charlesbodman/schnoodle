$(document).ready(function(e){
   const urls = generateRandomUrl();
   $('#randomUrl').val("https://urls/" + urls);
   $('#copy').on('click', (event)=>{
      $('#randomUrl').select();
      document.execCommand("copy");
      $("#copy").text("Copied to clipboard").show()hj;
   })
});

function generateRandomUrl() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}



