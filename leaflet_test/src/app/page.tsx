"use client";

import { useEffect, useRef, useState } from "react";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import type { MapController } from "@maptiler/geocoding-control/types";
import "@maptiler/geocoding-control/style.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "./page.css";
import "./Banner.css";
import "./Book.css";
import { Button } from "@material-ui/core";
import { MaiHuMap, Marked } from "./map";
// import { Book } from "src/components/Book";

export default function Page() {
  const apiKey = "CCCHWfgPGpwfSG6DPf51";

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [mapController, setMapController] = useState<MapController>();

  let amb = [
      new Marked([86.24235484190564, 23.888574912944634]),
      new Marked([86.24399120296266, 23.74785749340184]),
      new Marked([86.48494536857703, 23.824223111414298]),
      new Marked([86.40967837220785, 23.71582737971943]),
  ];

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    const maihumap = new MaiHuMap(mapContainerRef.current);
    maihumap.add_ambulance(amb);

    setMapController(maihumap.controller);
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
