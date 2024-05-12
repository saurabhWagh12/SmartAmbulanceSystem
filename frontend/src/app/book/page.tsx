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
import axios from "axios";

async function get_ambulances() {
  try {
    const resp = await axios.get("http://localhost:8000/ambulances");
    return resp.data.data.map((e: any) => new Marked([e[0], e[1]], e[4]))
  } catch (error) {
    console.log(error);
  }
}

async function get_hospitals() {
  try {
    const resp = await axios.get("http://localhost:8000/hospitals");
    return resp.data.data.map((e: any) => new Marked([e.longi, e.lati], e.name))
  } catch (error) {
    console.log(error);
  }
}

export default function Page() {
  const apiKey = "CCCHWfgPGpwfSG6DPf51";

  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [mapController, setMapController] = useState<MapController>();

  let amb = get_ambulances();
  let hosp = get_hospitals();

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    const maihumap = new MaiHuMap(mapContainerRef.current);
    // maihumap.add_ambulance(amb);
    // maihumap.active_hospital(hosp);
    amb.then(e => maihumap.add_ambulance(e));
    hosp.then(e => maihumap.add_hospital(e));

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
