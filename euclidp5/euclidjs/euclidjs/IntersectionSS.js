euclid.IntersectionSS = function(slate,Sval,Tval) {
  /*--------------------------------------------------------------------+
  | This circle is the intersection of two spheres S and T. The center	|
  | of the circle is Center, which is A, lies in the plane AP, and	|
  | has radius AB.							|
  +--------------------------------------------------------------------*/

 euclid.CircleElement.call(this,slate); // Similar to super()
 // this.dimension = 2; //per CircleElement
 this.S = Sval;
 this.T = Tval;
 this.Center = new euclid.PointElement(slate);
 this.A = this.Center;
 this.B = new euclid.PointElement(slate);
 // AP is the ambient plane
 this.AP = new euclid.PerpendicularPL(slate,this.Center,this.T.Center);
 this.Center.AP = this.AP;
 
 this.elementClassName = "IntersectionSS";
 this.parentClassName = "CircleElement";

};
// IntersectionSS extends CircleElement
euclid.IntersectionSS.prototype = Object.create(euclid.CircleElement.prototype, 
  { constructor: {
      configurable: true, 
      enumerable: true,
      value: euclid.IntersectionSS,
      writable: true
    }
  });

euclid.IntersectionSS.prototype.update = function () {
 var T = this.T; 
 var S = this.S;
 var Center = this.Center;
 var B = this.B;
 var AP = this.AP;
 var d2 = T.Center.distance2(S.Center);
 var t2 = T.radius2(); 
 var factor = 0.5 + (t2-S.radius2())/(2.0*d2);
 Center.to(S.Center).minus(T.Center).times(factor).plus(T.Center);
 var radius = Math.sqrt(t2-Center.distance2(T.Center));
 B.to(Center);
 B.z += radius;
 AP.update();  // that updates the plane of the circle
};
euclid.IntersectionSS.prototype.translate = function (dx,dy) {
 var Center = this.Center;
 var B = this.B;
 var AP = this.AP;
 Center.translate(dx,dy);
 B.translate(dx,dy);
 AP.translate(dx,dy);
};
euclid.IntersectionSS.prototype.rotate = function (pivot,c,s) {
 /* Point pivot, numbers c,s */
 var Center = this.Center;
 var B = this.B;
 var AP = this.AP;
 Center.rotate(pivot,c,s);
 B.rotate(pivot,c,s);
 AP.rotate(pivot,c,s);
};

/*
euclid.IntersectionSS.prototype. = function () {
};
*/