euclid.Prism = function(slate,Base, Cval, Dval)  {
  // The base (A PolygoneElement) is given as well as a 
  // line segment CD for the sides to be
  // parallel to.
 euclid.PolyhedronElement.call(this,slate); // Similar to super()
 this.dimension = 2;
 this.C = Cval; this.D = Dval;
 this.n = 2+Base.n;
 this.P = new Array(this.n);
 var j,i;
 this.P[0] = Base;
 // create the top
 this.P[1] = new euclid.PolygonElement(slate,Base.n);
 for (j=0; j<Base.n; ++j) {
   this.P[1].V[j] = new euclid.PointElement(slate);
   this.P[1].V[j].to(Base.V[j]).plus(this.D).minus(this.C);
 }
 // create the sides
 for (i=2; i<this.n; ++i) {
   this.P[i] = new euclid.PolygonElement(slate,Base.V[i-2],Base.V[(i-1)%Base.n],
               this.P[1].V[(i-1)%Base.n],this.P[1].V[i-2]);
 }
 for(i=0;i<this.n;i++) {
  //console.log("Prism",this.name,'P[',i,']=',this.P[i],'V length=',this.P[i].V.length);
 }
 this.elementClassName = "Prism";
 this.parentClassName = "PolyhedronElement";
};
// Prism extends PolyhedronElement
euclid.Prism.prototype = Object.create(euclid.PolyhedronElement.prototype, 
  { constructor: {
    configurable: true, 
    enumerable: true,
    value: euclid.Prism,
      writable: true
    }
  });
euclid.Prism.prototype.translate = function (dx,dy) {
 //dx,dy are doubles
 // translate the top vertices
 var P=this.P;
 for (var i=0; i<P[1].n; ++i){
   P[1].V[i].translate(dx,dy);
 }
};
euclid.Prism.prototype.rotate= function (pivot,c,s) {
 // pivot is a PointElement; c,s are doubles
 // rotate the top vertices
 var P=this.P;
 for (var i=0; i<P[1].n; ++i){
   P[1].V[i].rotate(pivot,c,s);
 }
};
euclid.Prism.prototype.update= function () {
 // update the top vertices
 var P=this.P;
 var D = this.D;
 var C = this.C;
 for (var j=0; j<P[1].n; ++j){
   P[1].V[j].to(P[0].V[j]).plus(D).minus(C);
 }
};

/*
euclid.Prism.prototype. = function () {
};
*/