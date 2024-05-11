import maplibregl, { GeolocateControl, Marker, Popup } from "maplibre-gl";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";

class MaiHuMap {
    active_marker: number | null = null;
    ambulance_markers: Array<Marker>;
    map: maplibregl.Map;
    controller: any;

    constructor(container: HTMLDivElement) {
        this.ambulance_markers = [];

        const apiKey = "CCCHWfgPGpwfSG6DPf51";
        this.map = new maplibregl.Map({
          style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
          container: container,
        });
        console.log(this.map)
        this.map.on('dblclick', (e) => {

          let m = new Marker({ color: "#ff0000"})
          var popup = new Popup()
          .setText('Description')
          .addClassName('marker-popup')
          .addTo(this.map);
          m.setPopup(popup)
          m
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .setDraggable(true)
            .addTo(this.map)
          m.addClassName('marker')
          m.getElement()
              .addEventListener('click', (e) => {
            console.log("clicked")
          })
        })
        let geolocate = new GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        });
        this.map.addControl(geolocate)
        this.controller = createMapLibreGlMapController(this.map, maplibregl);
        // controller.setEventHandler(e => {
        //   console.log(e)
        // })
    }
}

export { MaiHuMap };
