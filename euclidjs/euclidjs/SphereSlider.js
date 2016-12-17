euclid.SphereSlider = function(slate,Sval,xVal,yVal,zVal) {
 // Sval is a SphereElement
 // xVal,yVal,zVal are double
 euclid.PointElement.call(this,slate,xVal,yVal,zVal); 
 this.S = Sval;
 this.initx = xVal; this.inity = yVal; this.initz = zVal; // for reset
 this.elementClassName = "SphereSlider";
 this.parentClassName = "PointElement";
 this.dimension = 0;
 this.dragable = true;
 //this.newP = new euclid.PointElement(slate);
}
//SphereSlider extends PointElement
euclid.SphereSlider.prototype = Object.create(euclid.PointElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.SphereSlider,
      writable: true
    }
  });
euclid.SphereSlider.prototype.reset = function () {
 this.x = this.initx;
 this.y = this.inity;
 this.z = this.initz;
 var S = this.S;
 this.toSphere(S.Center,S.radius());
};
euclid.SphereSlider.prototype.update = function () {
 var S = this.S;
 this.toSphere(S.Center,S.radius());
};
euclid.SphereSlider.prototype.drag = function (tox,toy) {
 var S = this.S;
 var dist2 = (S.Center.x-tox)*(S.Center.x-tox) + (S.Center.y-toy)*(S.Center.y-toy);
 var r2 = S.radius2();
 if (dist2 <= r2) {
   this.x = tox; this.y = toy;
   if (this.z > S.Center.z){
     this.z = S.Center.z + Math.sqrt(r2 - dist2);
   }else{
     this.z = S.Center.z - Math.sqrt(r2 - dist2);
   }
 }
 else { // beyond shadow of sphere
   tox -= S.Center.x; toy -= S.Center.y;
   var factor = Math.sqrt((tox*tox + toy*toy)/r2);
   tox = tox/factor + S.Center.x;
   toy = toy/factor + S.Center.y;
   if ((tox-x)*(tox-x) + (toy-y)*(toy-y) < 0.5) {
    return false;
   }
   this.x = tox; this.y = toy; this.z = S.Center.z;
 }
 return true;
};
/*
euclid.SphereSlider.prototype. = function () {
};
*/
