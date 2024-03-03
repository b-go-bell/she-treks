import './../resources/styles/components/Map.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getTrails } from './../firebase'


mapboxgl.accessToken =
    'pk.eyJ1IjoiYmdiZWxsIiwiYSI6ImNsbmV5bHlmczAzM24yc28yNm11cHY5ZXMifQ.KDr3mA_-tvflkGlXfI2-fQ';

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lat, setLat] = useState(34.05);
    const [lng, setLng] = useState(-118.24);

    const [zoom, setZoom] = useState(8);

    const [trails, setTrails] = useState([]);

    const [trailCoordinates, setTrailCoordinates] = useState([]);

    useEffect(() => {
        if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        map.current.addControl(new mapboxgl.NavigationControl());

        console.log(map.current.getBounds());

        setTrails(getTrails(map.current.getBounds()));

        // pathCoordinates.forEach((coord, index) => {
        //     new mapboxgl.Marker()
        //       .setLngLat(coord)
        //       .addTo(map.current)
        //       .setPopup(new mapboxgl.Popup().setHTML(`<p>Marker ${index + 1}</p>`));
        //   });

        // Add a path line
//   map.current.on('load', () => {
//     map.current.addSource('path', {
//       type: 'geojson',
//       data: {
//         type: 'Feature',
//         properties: {},
//         geometry: {
//           type: 'LineString',
//           coordinates: pathCoordinates,
//         },
//       },
//     });

//     map.current.addLayer({
//       id: 'path',
//       type: 'line',
//       source: 'path',
//       layout: {
//         'line-join': 'round',
//         'line-cap': 'round',
//       },
//       paint: {
//         'line-color': 'blue',
//         'line-width': 3,
//       },
//     });
//   });
    });

  return (
    <div>
        <div ref={mapContainer} className="map-container"/>
    </div>
  );
}

export default Map;