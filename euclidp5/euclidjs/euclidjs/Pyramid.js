euclid.Pyramid = function(slate,Base, Apex)  {
  // Base is PolygoneElement, Apex is PointElement
 euclid.PolyhedronElement.call(this,slate); // Similar to super()
 this.dimension = 2;
 this.n = 1+Base.n;
 this.P = new Array(this.n);
 var i;
 this.P[0] = Base;
 // create the sides
 for (i=1; i<this.n; ++i) {
   this.P[i] = new euclid.PolygonElement(slate,Apex,Base.V[i-1],Base.V[i%Base.n]);
 }
 this.elementClassName = "Pyramid";
 this.parentClassName = "PolyhedronElement";
};
// Pyramid extends PolyhedronElement
euclid.Pyramid.prototype = Object.create(euclid.PolyhedronElement.prototype, 
  { constructor: {
    configurable: true, 
    enumerable: true,
    value: euclid.Pyramid,
      writable: true
    }
  });

/*
euclid.Pyramid.prototype. = function () {
};
*/