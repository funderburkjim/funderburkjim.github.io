  /*--------------------------------------------------------------------+
  | The plane is represented by three points on it.  It's displayed as  |
  | a parallelogram with three vertices A, B, and C,projected onto the  |
  | xy-plane. S is a unit vector in the direction AB, T is a           |
  | perpendicular unit in the plane, and U is perpendicular to both.  |          |                |
  +--------------------------------------------------------------------*/

euclid.PlaneElement = function(slate,A,B,C) {
 euclid.Element.call(this,slate); // Similar to super()
 this.A=A; this.B=B; this.C=C;
 this.S= new euclid.PointElement(slate); 
 this.T= new euclid.PointElement(slate); 
 this.U= new euclid.PointElement(slate);
 this.isScreen = false; // set true only for initial screen plane
 this.pivot=null; // pivot point for the plane, if any
 this.dimension = 2;
 this.elementClassName = "PlaneElement";
 this.parentClassName = "Element";
 //console.log('PlaneElement. A=',A.toString(),'B=',B.toString(),'C=',C.toString());
};
// PlaneElement extends Element
euclid.PlaneElement.prototype = Object.create(euclid.Element.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.PlaneElement,
      writable: true
    }
  });
euclid.PlaneElement.prototype.toString = function () {
    return "[Plane " + this.name + ": " + this.A.toString() + 
            " " + this.B.toString()  + " " + this.C.toString()  + "]";
};
euclid.PlaneElement.prototype.rotate = function () {
 update();
};
euclid.PlaneElement.prototype.update = function () {
 var A = this.A; var B = this.B; var C = this.C;
 var S = this.S; var T = this.T; var U = this.U;
    if (this.isScreen && (A.z!=0.0 || B.z!=0.0 || C.z!=0.0)) {
      this.isScreen = false;
    }
    //console.log("PlaneElement update chk0: A=",A.toString(),"B=",B.toString(),"C=",C.toString());
    // update the frame S,T,U
    S.to(B).minus(A);
    T.to(C).minus(A);
    S.times(1.0/S.length());
    //console.log("PlaneElement update chk1: S=",S.toString()," T=",T.toString());
    var st = euclid.PointElement.dot(T,S);
    //console.log("PlaneElement update chk2: st=",st);
    T.x -= st*S.x; 
    T.y -= st*S.y; 
    T.z -= st*S.z; 
    T.times(1.0/T.length());
    U.toCross(S,T);
 };
euclid.PlaneElement.prototype.defined = function () {
 return this.A.defined() && this.B.defined() && this.C.defined();
};
euclid.PlaneElement.prototype.drawName = function (d) {
 var A = this.A; var B = this.B; var C = this.C;
/*
 var slate = this.slate;
 var p = slate.p; // Processingjs
 p.textSize(slate.slateFontsize);
 p.textFont(slate.slateFont);
 p.fill(this.nameColor);
 var name = this.name;
*/

 if (this.nameColor!=null && this.name!=null && this.defined()) {
   var ix = Math.round((B.x+C.x)/2.0);
   var iy = Math.round((B.y+C.y)/2.0);
   this.drawString(ix,iy,d);
  }
};
euclid.PlaneElement.prototype.drawVertex = function () {
 var slate = this.slate;
 var D = new euclid.PointElement(slate); 
 var A = this.A; var B = this.B; var C = this.C;
 var vertexColor = this.vertexColor;
 if (vertexColor != null && this.defined()) {
   A.drawVertex(vertexColor);
   B.drawVertex(vertexColor);
   C.drawVertex(vertexColor);
   D.x = B.x + C.x - A.x;
   D.y = B.y + C.y - A.y;
   D.z = B.z + C.z - A.z;
   D.drawVertex(vertexColor);
  }
};
euclid.PlaneElement.prototype.drawEdge = function () {
 var slate = this.slate;
 var D = new euclid.PointElement(slate); 
 var A = this.A; var B = this.B; var C = this.C;
 var p = this.slate.p;
 var c = this.edgeColor;
 if (this.edgeColor!=null  && this.defined()) {
   D.x = B.x + C.x - A.x;
   D.y = B.y + C.y - A.y;
   D.z = B.z + C.z - A.z;
   p.stroke(c);
   p.line(A.x,A.y,B.x,B.y);
   p.line(B.x,B.y,D.x,D.y);
   p.line(D.x,D.y,C.x,C.y);
   p.line(C.x,C.y,A.x,A.y);
  }
};
euclid.PlaneElement.prototype.drawFace = function () {
 var slate = this.slate;
 this.D= new euclid.PointElement(slate); 
 var faceColor = this.faceColor;
 var A = this.A; var B = this.B; var C = this.C;
 var p = this.slate.p;
 if (faceColor!=null  && this.defined()) {
   p.fill(faceColor);
   var n = 4;
   var ix = new Array(n);
   var iy = new Array(n);
   ix[0] = Math.round(A.x);
   iy[0] = Math.round(A.y);
   ix[1] = Math.round(B.x);
   iy[1] = Math.round(B.y);
   ix[2] = Math.round(B.x + C.x - A.x);
   iy[2] = Math.round(B.y + C.y - A.y);
   ix[3] = Math.round(C.x);
   iy[3] = Math.round(C.y);
   // Java uses an awt graphics functions 'fillPolygon'.
   // p5js does this with a Shape.  ref http://cmuems.com/2015b/drawing-in-p5/
   //g.fillPolygon(ix,iy,4);
   var i;
   // Make array of pointElements
   var V = new Array(4); 
   for(i=0;i<n;i++) {
    V[i] = new euclid.PointElement(slate);
    V[i].x = ix[i];
    V[i].y = iy[i];
   }
   p.beginShape();
   for(i=0;i<n;i++) {
     p.vertex(V[i].x,V[i].y);
   }
   p.endShape(p.CLOSE);
}
};
