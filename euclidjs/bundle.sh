# concatenate all the euclid project javascript files.
# Certain aspects of the order of concatenating are important
# skip elements.js, which is Clark's
echo "concatenating javascript files"
cd euclidjs
cat euclidStart.js Dimension.js StringBuffer.js StringTokenizer.js\
    Element.js  \
      SectorElement.js Arc.js\
      CircleElement.js \
        IntersectionSS.js\
      Circumcircle.js\
      SphereElement.js\
      PolyhedronElement.js\
        Prism.js Pyramid.js\
    PolygonElement.js RegularPolygon.js Application.js\
    PointElement.js FixedPoint.js Midpoint.js Intersection.js \
      CircleSlider.js Layoff.js AngleDivider.js Proportion.js\
      Foot.js Similar.js MeanProportional.js\
      PlaneSlider.js LineSlider.js\
      SphereSlider.js PlaneFoot.js\
    PlaneElement.js \
      PerpendicularPL.js ParallelP.js\
    LineElement.js \
      Perpendicular.js Bichord.js Chord.js PlanePerpendicular.js\
    Slate.js  Geometry.js\
    LoadData.js euclid.js euclidFinish.js> ../euclidbundle.js
