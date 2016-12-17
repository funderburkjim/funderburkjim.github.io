euclid.MeanProportional = function(slate,S0val, S1val, T0val,T1val, U0val, U1val)  {
/* The constructor gives two endpoints for each of three lines, S,T,U.
 // Given lines S,T,U cut off from U a mean proportional U' so that
  // S:U'=U':T
*/
 euclid.PointElement.call(this,slate); // Similar to super()
 this.dimension = 0;
 this.S0 = S0val; this.S1 = S1val;
 this.T0 = T0val; this.T1 = T1val;
 this.U0 = U0val; this.U1 = U1val;
 if (this.U0.AP == this.U1.AP) {
  this.AP = this.U0.AP;
 }
 this.elementClassName = "MeanProportional";
 this.parentClassName = "PointElement";
};
// MeanProportional extends PointElement
euclid.MeanProportional.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.MeanProportional,
      writable: true
    }
  });
euclid.MeanProportional.prototype.update = function () {
 // Unpack instance variables for simplicity of formulas
 var S0,S1,T0,T1,U0,U1;
 S0 = this.S0; S1 = this.S1;
 T0 = this.T0; T1 = this.T1;
 U0 = this.U0; U1 = this.U1;
 var factor = Math.sqrt(S0.distance2(S1) * T0.distance2(T1)); 
 factor = Math.sqrt(factor / U0.distance2(U1));
 this.to(U1).minus(U0);
 this.times(factor).plus(U0);
};
