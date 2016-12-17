  /*--------------------------------------------------------------------+
   this is the plane perpendicular to the line AE at the point A
  +--------------------------------------------------------------------*/

euclid.PerpendicularPL = function(slate,Aval,Eval) {
 euclid.PlaneElement.call(this,slate,null,null,null); // Similar to super()
 this.A = Aval;
 this.E = Eval;
 this.B = new euclid.PointElement(slate);
 this.C = new euclid.PointElement(slate);
 this.elementClassName = "PerpendicularPL";
 this.parentClassName = "PlaneElement";
};
// PerpendicularPL extends PlaneElement
euclid.PerpendicularPL.prototype = Object.create(euclid.PlaneElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.PerpendicularPL,
      writable: true
    }
  });
euclid.PerpendicularPL.prototype.translate = function (dx,dy) {
 this.B.translate(dx,dy);  
 this.C.translate(dx,dy);
};
euclid.PerpendicularPL.prototype.rotate = function (pivot, ac, as) {
 this.B.rotate(pivot,ac,as);  
 this.C.rotate(pivot,ac,as);
 // Java super.update();
 // ref: http://stackoverflow.com/questions/11854958/how-to-call-a-parent-method-from-child-class-in-javascript
 // ParentClass.prototype.myMethod();
 euclid.PlaneElement.prototype.update(); 
};

euclid.PerpendicularPL.prototype.update = function () {
 var A = this.A; var B = this.B; var C = this.C;
 var S = this.S; var T = this.T; 
 var E = this.E;
 var U = this.U; 
 /* In Java, difference is a static method of PointElement. 
 However in this javascript implementation, difference is a non-static
 method of PointElement, which returns a new PointElement.
 The variable U is already a PointElement,
  But we replace its value with the difference of E and A
 */ 
 U = U.difference(E,A);
 var len = U.length();
 U.times(1.0/len);
 var lxy = Math.sqrt(U.x*U.x + U.y*U.y);
 if (lxy >= 0.000001) {
   S.x = -U.y/lxy;
   S.y = U.x/lxy;
   S.z = 0.0;
   T.toCross(U,S);
 } else {
   S.x = 1.0; S.y = 0.0; S.z = 0.0;
   T.x = 0.0; T.y = 1.0; T.z = 0.0;
 }    
 B.to(S).times(len).plus(A);
 C.to(T).times(len).plus(A);

};