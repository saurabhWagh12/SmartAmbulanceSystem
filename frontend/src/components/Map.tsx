"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from 'leaflet';
import L from 'leaflet';
import React, { useEffect } from 'react';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    zoom?: number,
}

const defaults = {
    zoom: 19,
}

const Map = (Map: MapProps) => {
    const { zoom = defaults.zoom, posix } = Map
    const key = "CCCHWfgPGpwfSG6DPf51";

    useEffect(() => {
        // const map = L.map('map')//.setView([49.2, 16.6], 14);
        const map = document.getElementById("map");
      //   L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,{ //style URL
      //       tileSize: 512,
      //       zoomOffset: -1,
      //       minZoom: 1,
      //       attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
      //       crossOrigin: true
      // }).addTo(map);
    }, []);

    return (
        <MapContainer
            center={posix}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            id="map"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TileLayer
                attribution='lmao'
                url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=CCCHWfgPGpwfSG6DPf51"
            />
            <Marker position={posix} draggable={false}>
                <Popup>Hey ! I study here</Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map
