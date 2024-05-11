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
    // controller.setEventHandler(e => {
    //   console.log(e)
    // })

    setMapController(controller);
  }, []);

  const labelStyle: React.CSSProperties = {
    marginLeft: "13px",
    fontSize: "18px",
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
                    <h3>
                      <input type="checkbox" id="Pickup"></input>
                      <label htmlFor="Pickup" style={labelStyle}>
                        Pickup
                      </label>
                    </h3>
                    <h3>
                      <input type="checkbox" id="Pickup"></input>
                      <label htmlFor="Pickup" style={labelStyle}>
                        Destination
                      </label>
                    </h3>
                    <h3>
                      <input type="checkbox" id="Pickup"></input>
                      <label htmlFor="Pickup" style={labelStyle}>
                        Type of Ambulance
                      </label>
                    </h3>
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
