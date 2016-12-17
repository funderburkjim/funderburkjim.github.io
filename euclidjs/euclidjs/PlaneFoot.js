euclid.PlaneFoot = function(slate,Aval,APval) {
 // This point is the foot of perpendicular from point A to the ambient plane AP
 // 
 euclid.PointElement.call(this,slate); 
 this.dimension = 0;
 this.A = Aval;
 this.AP = APval;
}
//PlaneFoot extends PointElement
euclid.PlaneFoot.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.PlaneFoot,
      writable: true
    }
  });
euclid.PlaneFoot.prototype.update = function () {
 var A = this.A;
 var AP = this.AP;
 this.to(A).toPlane(AP);
};
/*
euclid.PlaneFoot.prototype. = function () {
};
*/
