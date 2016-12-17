  /*--------------------------------------------------------------------+
   this is the plane parallel to the plane P passing through the point A
  +--------------------------------------------------------------------*/

euclid.ParallelP = function(slate,Pval,Aval) {
 euclid.PlaneElement.call(this,slate,null,null,null); // Similar to super()
 this.dimension = 2;
 this.P = Pval;
 this.A = Aval;
 this.B = new euclid.PointElement(slate);
 this.C = new euclid.PointElement(slate);
 this.S = this.P.S;
 this.T = this.P.T;
 this.U = this.P.U;
 this.elementClassName = "ParallelP";
 this.parentClassName = "PlaneElement";
};
// ParallelP extends PlaneElement
euclid.ParallelP.prototype = Object.create(euclid.PlaneElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.ParallelP,
      writable: true
    }
  });
euclid.ParallelP.prototype.translate = function (dx,dy) {
 this.B.translate(dx,dy);  
 this.C.translate(dx,dy);
};
euclid.ParallelP.prototype.rotate = function (pivot, ac, as) {
 this.B.rotate(pivot,ac,as);  
 this.C.rotate(pivot,ac,as);

};

euclid.ParallelP.prototype.update = function () {
 var A = this.A; var B = this.B; var C = this.C;
 var P = this.P;
 B.to(P.B).minus(P.A).plus(A);
 C.to(P.C).minus(P.A).plus(A);
};