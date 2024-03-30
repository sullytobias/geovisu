import { Shape, ExtrudeGeometry, Vector2 } from "three";

export const createShape = (country) => {
    const geometries = [];

    const isMulti = country.geometry.type === "MultiPolygon";

    const polygons = isMulti
        ? country.geometry.coordinates
        : [country.geometry.coordinates];

    polygons.forEach((polygonGroup) => {
        polygonGroup.forEach((polygon) => {
            const shape = new Shape();

            if (
                polygon.length > 1 &&
                (polygon[0][0] !== polygon[polygon.length - 1][0] ||
                    polygon[0][1] !== polygon[polygon.length - 1][1])
            ) {
                polygon.push([polygon[0][0], polygon[0][1], 0]);
            }

            const exterior = polygon.map(([lon, lat]) => new Vector2(lon, lat));

            shape.moveTo(exterior[0].x, exterior[0].y);

            for (let i = 1; i < exterior.length; i++) {
                shape.lineTo(exterior[i].x, exterior[i].y);
            }

            const extrudeSettings = { depth: 1, bevelEnabled: false };
            const geometry = new ExtrudeGeometry(shape, extrudeSettings);

            geometries.push(geometry);
        });
    });

    return geometries;
};
