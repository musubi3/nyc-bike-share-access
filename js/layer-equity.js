export function addEquityLayer(map, data) {
    map.addSource('tracts', {
        type: 'geojson',
        data: data
    });

    map.addLayer({
        id: 'equity-fill',
        type: 'fill',
        source: 'tracts',
        paint: {
            'fill-color': [
                'interpolate', ['linear'], ['get', 'pct_car_free'],
                0, '#d9d9d9',     
                0.4, '#fee5d9',    
                0.6, '#fcae91',    
                0.8, '#de2d26'     
            ],
            
            'fill-outline-color': 'rgba(0,0,0,0.1)', 
            
            'fill-opacity': 0 
        }
    });

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'equity-popup'
    });

    map.on('mousemove', 'equity-fill', (e) => {
        const currentOpacity = map.getPaintProperty('equity-fill', 'fill-opacity');
        if (currentOpacity < 0.5) {
            popup.remove();
            return;
        }

        const stationFeatures = map.queryRenderedFeatures(e.point, { layers: ['stations-points'] });
        const stationOpacity = map.getPaintProperty('stations-points', 'circle-opacity') || 0;
        
        if (stationFeatures.length > 0 && stationOpacity > 0) {
            popup.remove(); 
            map.getCanvas().style.cursor = 'pointer'; 
            return;
        }

        if (!e.features || e.features.length === 0) return;
        
        map.getCanvas().style.cursor = 'default';

        const props = e.features[0].properties;
        const borough = props.boroname || 'NYC'; 
        const pct = props.pct_car_free;
        const totalHouseholds = props.total_households || 0; 
        
        const pctDisplay = (pct !== undefined && pct !== null) 
            ? (pct * 100).toFixed(1) + '%' 
            : 'N/A';

        popup.setLngLat(e.lngLat)
            .setHTML(`
                <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4;">
                    <strong>${borough}</strong><br>
                    <span style="color: #ccc">Car-Free:</span> <strong style="color: #ff6b6b">${pctDisplay}</strong><br>
                    <span style="color: #ccc">Households:</span> <strong>${totalHouseholds.toLocaleString()}</strong>
                </div>
            `)
            .addTo(map);
    });

    map.on('mouseleave', 'equity-fill', () => {
        popup.remove();
        map.getCanvas().style.cursor = '';
    });
}