import React, { useRef, useEffect } from "react";
import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    new window.localStorage.Map({
      target: mapRef.current.id,
      layers: [
        new window.localStorage.layer.Tile({
          source: new window.localStorage.source.OSM(),
        }),
      ],
      view: new window.localStorage.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
