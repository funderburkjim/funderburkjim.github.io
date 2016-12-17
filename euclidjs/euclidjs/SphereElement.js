euclid.SphereElement = function(slate,Oval,Parm1,Parm2)  {
/* Three constructors, one is empty
  Oval,Parm1 and Parm2 are PointElements
  I
*/
 euclid.Element.call(this,slate); // Similar to super()
 this.dimension = 2;
 this.Center = undefined;
 this.A = undefined;
 this.B = undefined;
 if (arguments.length == 1) {//nothing else to do
 }else if (arguments.length == 4) {
  this.Center = Oval;
  this.A = Parm1;
  this.B = Parm2;
 }else if (arguments.length == 3) {
  this.Center = Oval;
  this.A = Oval;
  this.B = Parm1;

 }
 this.elementClassName = "SphereElement";
 this.parentClassName = "Element";
 //console.log("euclid.SphereElement constructor:",this.Center,this.A,this.B,this.P);
};
// SphereElement extends Element
euclid.SphereElement.prototype = Object.create(euclid.Element.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.SphereElement,
      writable: true
    }
  });
euclid.SphereElement.prototype.toString = function () {
 return "[" + this.name + ": Center=" + this.Center + " A=" + this.A + " B=" + this.B + "]";
};

euclid.SphereElement.prototype.drawName = function (d) {
 // d is a Dimension
 if ((this.nameColor!=null) && (this.name!=null)) { //  && this.defined()) {
 // consult also drawString in Element.js
 var slate = this.slate;
 var p = slate.p; // Processingjs
 p.textSize(slate.slateFontsize);
 p.textFont(slate.slateFont);
 p.fill(this.nameColor);
 var name = this.name;
 var w = p.textWidth(name);
 var h = p.textAscent() + p.textDescent();
 var Center = this.Center;
 p.text(name,Center.x - (w/2), Center.y - (h/2) + p.textAscent());
 }
};
euclid.SphereElement.prototype.defined = function () {
 return true;
 // return Center.defined() && A.defined() && B.defined();
};
euclid.SphereElement.prototype.drawEdge = function () {
 var ok = ((this.edgeColor != null) && (this.defined()));
 if (! ok) {return;}
 var r = this.radius();
 var d = Math.round(2*r); // diameter
 // unpack instance variables for more readable formulas
 var A = this.A; var B = this.B; var P = this.P; var Center = this.Center;
 var p = this.slate.p; // Processingjs
 /* java aws drawOval, fillOval are done with p5js ellipse
   The aws x,y is upper-left of bounding rectangle
   This requirese ellipsemode(CORNER)
 */
 p.ellipseMode(p.CORNER); 
 var ix,iy;
 ix = Math.round(Center.x);
 iy = Math.round(Center.y);
 p.noFill();
 p.stroke(this.edgeColor);
 p.ellipse(ix - r,iy-r,d,d);
};

euclid.SphereElement.prototype.drawFace = function () {
 //console.log('SphereELement.drawFace',this);
 var ok = ((this.faceColor != null) && (this.defined()));
 if (! ok) {return;}
 var r = this.radius();
 var d = Math.round(2*r); // diameter
 // unpack instance variables for more readable formulas
 var A = this.A; var B = this.B; var P = this.P; var Center = this.Center;
 var p = this.slate.p; // Processingjs
 /* java aws drawOval, fillOval are done with p5js ellipse
   The aws x,y is upper-left of bounding rectangle
   This requirese ellipsemode(CORNER)
 */
 p.ellipseMode(p.CORNER); 
 var ix,iy;
 ix = Math.round(Center.x);
 iy = Math.round(Center.y);
 p.fill(this.faceColor);
 //p.stroke(this.edgeColor);
 p.ellipse(ix - r,iy-r,d,d);
};
euclid.SphereElement.prototype.radius = function () {
 return this.A.distance(this.B);
};
euclid.SphereElement.prototype.radius2 = function () {
 return this.A.distance2(this.B);
};

/*
euclid.SphereElement.prototype. = function () {
};
*/