"use client";

import { useEffect, useRef, useState } from "react";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import type { MapController } from "@maptiler/geocoding-control/types";
import "@maptiler/geocoding-control/style.css";
import maplibregl, { GeolocateControl, Marker, Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./page.css";
import "./Banner.css";
import "./Book.css";
import { Button } from "@material-ui/core";
import React from "react";
// import { Book } from "src/components/Book";

export default function Page() {
  const apiKey = "CCCHWfgPGpwfSG6DPf51";

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [mapController, setMapController] = useState<MapController>();

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
      container: mapContainerRef.current,
    });
    console.log(map);
    map.on("dblclick", (e) => {
      let m = new Marker({ color: "#ff0000" });
      var popup = new Popup()
        .setText("Description")
        .addClassName("marker-popup")
        .addTo(map);
      m.setPopup(popup);
      m.setLngLat([e.lngLat.lng, e.lngLat.lat]).setDraggable(true).addTo(map);
      m.addClassName("marker");
      m.getElement().addEventListener("click", (e) => {
        console.log("clicked");
      });
    });
    let geolocate = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    map.addControl(geolocate);
    let controller = createMapLibreGlMapController(map, maplibregl);

    setMapController(controller);
  }, []);

  const labelStyle: React.CSSProperties = {
    marginLeft: "13px",
    fontSize: "18px",
  };

  const ChangePickup = () => {
    const [pickupMode, setPickupMode] = useState(true); // State for Pickup
    return (
      <>
        <button onClick={() => setPickupMode(!pickupMode)}>1st Button</button>
        {pickupMode ? (
          <h3>
            <input type="checkbox" id="Pickup"></input>
            <label htmlFor="Pickup">Pickup</label>
          </h3>
        ) : (
          <h3>
            <input type="checkbox" id="Pickup" checked></input>
            <label htmlFor="Pickup">Pickup</label>
          </h3>
        )}
      </>
    );
  };

  const ChangeDestination = () => {
    const [destinationMode, setDestinationMode] = useState(true); // State for Destination
    return (
      <>
        <button onClick={() => setDestinationMode(!destinationMode)}>
          2nd Button
        </button>
        {destinationMode ? (
          <h3>
            <input type="checkbox" id="Destination"></input>
            <label htmlFor="Destination">Destination</label>
          </h3>
        ) : (
          <h3>
            <input type="checkbox" id="Destination" checked></input>
            <label htmlFor="Destination">Destination</label>
          </h3>
        )}
      </>
    );
  };

  const ChangeAmbulance = () => {
    const [ambulanceMode, setAmbulanceMode] = useState(true); // State for Ambulance
    return (
      <>
        <button onClick={() => setAmbulanceMode(!ambulanceMode)}>
          3rd Button
        </button>
        {ambulanceMode ? (
          <h3>
            <input type="checkbox" id="Ambulance-Type"></input>
            <label htmlFor="Ambulance-Type">Type of Ambulance</label>
          </h3>
        ) : (
          <h3>
            <input type="checkbox" id="Ambulance-Type" checked></input>
            <label htmlFor="Ambulance-Type">Type of Ambulance</label>
          </h3>
        )}
      </>
    );
  };

  return (
    <div>
      <div className="book">
        <h1>Hey you can book ur ambulance here</h1>
        <div className="booking_div">
          <h4>Book Ambulance with Ease Now !!</h4>
          <div className="booking">
            <div>
              <div className="banner_main_dev">
                <div className="booking_fields">
                  <div className="book_it">
                    <ChangePickup />
                    <ChangeDestination />
                    <ChangeAmbulance />
                  </div>
                  <div className="container">
                    <div className="pickup">
                      {" "}
                      <GeocodingControl
                        apiKey={apiKey}
                        mapController={mapController}
                      />
                      <div
                        ref={mapContainerRef}
                        style={{
                          width: "1000px",
                          height: "300px",
                          marginTop: "8px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner">
          <div className="banner_info">
            <Button>Book An Ambulance</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
