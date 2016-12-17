// euclidFinish.js
// Finally, start things
$( document ).ready(function() {
 console.log( "ready!" );
/* Sep 3, 2016. bookIII uses different form for applets.
 bookI/bookII were usually
  <div id="apX"><object ...>...</object></div>
 bookIII Propositions are like
  <div class="ldiagram"> <object ...>...</object></div>
 We are going to modify fapplet, and the Jquery selector that call fapplet
 to try to handle both scenarios.
 var fapplet = function(index) {
  var div = $(this);
  console.log("div = ",div);
  var divid = div.attr("id");
  console.log("divid=",divid);
  new euclid.Applet(div,divid);
 };
 $("div[id^='ap']").each(fapplet);
 */
 var fapplet = function(index) {
  var parent = $(this).parent();
  console.log("parent = ",parent);
  var parentid = parent.attr("id");
  if (!parentid) {
   var j = (index+1);
   parentid = "ap" + j;
   parent.attr("id",parentid);
  }
  console.log("parentid=",parentid);
  new euclid.Applet(parent,parentid);
 };
 $("object").each(fapplet);
});
