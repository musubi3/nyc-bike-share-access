export function addSubwayLayer(map, data) {
    map.addSource('subway-lines', {
        type: 'geojson',
        data: data
    });

    map.addLayer({
        id: 'subway-lines-draw',
        type: 'line',
        source: 'subway-lines',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#555', 
            'line-width': 1.5,
            'line-opacity': 0 
        }
    });
}