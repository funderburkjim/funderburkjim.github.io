euclid.PlanePerpendicular = function(slate,Cval,Pval,Dval,Eval) {
  // Cval, Dval, Eval are PointElements
  // Pval is PlaneElement
  // draw perpendicular at C to the plane P.  A is the proj of C onto P, while
  // AB is perpendicular to P and equal to DE
  euclid.LineElement.call(this,slate,null,null);
  var dbg=false;
  this.dimension = 1; // duplicative of LineElement
  this.A = new euclid.PointElement(slate,null,null,null,Pval);
  this.B = new euclid.PointElement(slate,null,null,null,Pval);
  this.C = Cval;
  this.D = Dval;
  this.E = Eval;
  this.P = Pval;
  this.elementClassName = "PlanePerpendicular";
  this.parentClassName = "LineElement";
};
// PlanePerpendicular extends LineElement
euclid.PlanePerpendicular.prototype = Object.create(euclid.LineElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.PlanePerpendicular,
      writable: true
    }
});
euclid.PlanePerpendicular.prototype.translate = function(dx,dy) {
 // dx, dy are double
 this.A.translate(dx,dy);
 this.B.translate(dx,dy);
};
euclid.PlanePerpendicular.prototype.rotate = function(pivot,ac,as) {
 // pivot is PointElement
 // ac, as are double
 this.A.rotate(pivot,ac,as);
 this.B.rotate(pivot,ac,as);
};
euclid.PlanePerpendicular.prototype.update = function() {
 var A = this.A; var B = this.B; var C = this.C;
 var D = this.D; var E = this.E;
 var P = this.P;
 A.to(C).toPlane(P);
 B.toCross(P.S,P.T);
 B.times(D.distance(E)).plus(A);
};

