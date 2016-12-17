euclid.PolyhedronElement = function(slate,Oval,Parm1,Parm2)  {
/* Empty constructor.  This is an array of PolygonElement
*/
 euclid.Element.call(this,slate); // Similar to super()
 //this.dimension = 2;
 this.n = 0; // number of polygons
 this.P = new Array(); // array of polygons

 this.elementClassName = "PolyhedronElement";
 this.parentClassName = "Element";
};
// PolyhedronElement extends Element
euclid.PolyhedronElement.prototype = Object.create(euclid.Element.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.PolyhedronElement,
      writable: true
    }
  });
euclid.PolyhedronElement.prototype.toString = function () {
 return "[" + this.name + ": n=" + this.n + "]";
};
euclid.PolyhedronElement.prototype.defined = function () {
 var i;
 var n=this.n;
 var P = this.P;
 for (i=0; i<n; ++i) {
   //console.log("PolyhedronElement ",this.name,i,P[i]);
   if (P[i] === undefined) {
    console.log("PolyhedronElement ",this.name,this.i,"is undefined");
    return false;
   }
   if (!(P[i].defined())) {
    return false;
   }
 }
 return true;
};
euclid.PolyhedronElement.prototype.drawName = function (d) {
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
 var x=0, y=0;
 var ct = 0;
 var i,j;
 var P = this.P;
 for (j=0; j<this.n; ++j) {
   for (i=0; i<P[j].n; ++i) {
    x += P[j].V[i].x; 
    y += P[j].V[i].y;
    ++ct;
  }
 }
 x /= ct; y /= ct;
 p.text(name,x - (w/2), y - (h/2) + p.textAscent());
 }
};
euclid.PolyhedronElement.prototype.drawVertex = function () {
 var ok = ((this.vertexColor != null) && (this.defined()));
 if (! ok) {return;}
 var i,j;
 var P = this.P;
 var n = this.n;
 for (j=0; j<n; ++j) {
  for (i=0; i<P[j].n; ++i) {
   P[n].V[i].drawVertex(this.vertexColor);
  }
 }
};

euclid.PolyhedronElement.prototype.drawEdge = function () {
 var ok = ((this.edgeColor != null) && (this.defined()));
 if (! ok) {return;}
 // unpack instance variables for more readable formulas
 var P = this.P;
 var n = this.n;
 var p = this.slate.p; // Processingjs
 var c = this.edgeColor;
 var p1,p2;
 var i,j;
 for (j=0; j<n; ++j) {
  for (i=0; i<P[j].n; ++i) {
   // Java draws the line from p1 to p2 using LineElement.drawEdge
   // However, since we need the slate (in particular, slate.p) to draw this in processingJS
   // we need to do this here, 
   p1 = P[j].V[i];
   p2 = P[j].V[(i+1)%P[j].n];
   p.stroke(c);
   p.line(p1.x,p1.y,p2.x,p2.y);
  }
 }
 
};

euclid.PolyhedronElement.prototype.drawFace = function () {
 var ok = ((this.faceColor != null) && (this.defined()));
 if (! ok) {return;}
 var P = this.P;
 var n = this.n;
 var p = this.slate.p; // Processingjs
 var i,j;
 for (j=0; j<n; ++j) {
  for (i=0; i<P[j].n; ++i) { 
   // Why the i-loop, since inner content constant with i?
   P[j].drawFace(this.faceColor);
  }
 }
};

/*
euclid.PolyhedronElement.prototype. = function () {
};
*/