export function addBuildingLayer(map) {
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
    ).id;

    map.addLayer(
        {
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 10,
            'paint': {
                'fill-extrusion-color': '#d9d9d9',
                'fill-extrusion-height': [
                    'interpolate', ['linear'], ['zoom'],
                    10, 0,               
                    10.5, ['get', 'height']  
                ],
                
                'fill-extrusion-base': [
                    'interpolate', ['linear'], ['zoom'],
                    10, 0,
                    10.5, ['get', 'min_height']
                ],
                
                'fill-extrusion-opacity': 0 
            }
        },
        labelLayerId 
    );
}