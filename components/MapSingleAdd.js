import { useState, useRef, useCallback } from "react";
import MapGL from "react-map-gl";
import { NavigationControl, Marker } from "react-map-gl";
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidmlzaGFsZGhha2FsOTkiLCJhIjoiY2tocjN2bWh6MDZpZzJybGg0NXJtcm8waCJ9.TBbd_lsF-2Z9s_lqm754zg";

export default function MapSingleAdd(props) {
  const mapRef = useRef();
  const navControlStyle = {
    left: 10,
    top: 10,
  };

  const [viewport, setViewport] = useState({
    latitude: parseFloat(props.latitudeval) || 27.666997,
    longitude: parseFloat(props.longitudeval) || 85.290863,
    zoom: 13,
  });

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  return (
    <div style={{ height: "50vh" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        scrollZoom={false}
        dragRotate={false}
        dragPan={false}
        captureScroll={true}
      >
        <NavigationControl
          style={navControlStyle}
          captureScroll={true}
          capturePointerMove={true}
        />
        <Marker
          latitude={parseFloat(props.latitudeval) || 27.666997}
          longitude={parseFloat(props.longitudeval) || 85.290863}
          offsetLeft={-20}
          offsetTop={-45}
        >
          <div className="pin2 shadow-lg bg-white">{props.latitudeval}</div>
          {/* <Image
          src="/icons/map-marker.svg"
          alt="home icon"
          className="img-fluid"
          width="40"
          height="40"
          layout="fixed"
        /> */}
        </Marker>
      </MapGL>
    </div>
  );
}
