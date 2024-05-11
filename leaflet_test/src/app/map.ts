import maplibregl, { GeolocateControl, Marker, Popup } from "maplibre-gl";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";

const apiKey = "CCCHWfgPGpwfSG6DPf51";

class Marked {
    marker: Marker | null = null;
    is_selected: boolean = false;
    title: string;
    color: string;
    selected_color: string;
    pos: [number, number];

    constructor(
        pos: [number, number],
        title: string = '',
        color: string = '#0000ff',
        selected_color: string = '#00ffff',
    ) {
        this.pos = pos;
        this.title = title;
        this.color = color;
        this.selected_color = selected_color;
    }

    select(map: maplibregl.Map) {
        if (this.marker != null) {
            this.marker.remove();
        }
        this.is_selected = true;
        this.marker = new Marker({ color: this.selected_color, className: 'marker' });
        this.marker.setLngLat(this.pos).setDraggable(false)
        this.marker.addTo(map)
    }

    deselect(map: maplibregl.Map) {
        if (this.marker != null) {
            this.marker.remove();
        }
        this.is_selected = false;
        this.marker = new Marker({ color: this.color, className: 'marker' });
        this.marker.setLngLat(this.pos).setDraggable(false)
        this.marker.addTo(map)
    }
}

class MaiHuMap {
    active_ambulance: number | null = null;
    active_hospital: number | null = null;
    patient_marker: Marker | null = null;
    ambulance_markers: Array<Marked>;
    hospital_markers: Array<Marked>;
    map: maplibregl.Map;
    controller: any;

    constructor(container: HTMLDivElement) {
        this.ambulance_markers = [];
        this.hospital_markers = [];

        this.map = new maplibregl.Map({
            style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
            container: container,
        });

        this.map.on('dblclick', (e) => {
            if (this.patient_marker != null && this.patient_marker != null) {
                this.patient_marker.remove();
                this.patient_marker = null;
            }
            this.patient_marker = new Marker({ color: "#00ff00", className: 'marker' });
            // var popup = new Popup()
            //     .setText('Description')
            //     .addClassName('marker-popup')
            //     .addTo(this.map);
            // m.setPopup(popup);
            this.patient_marker.setLngLat([e.lngLat.lng, e.lngLat.lat])
                .setDraggable(true)
                .addTo(this.map);
            // m.getElement().addEventListener('click', (e) => {
            //     console.log("clicked")
            // });
        });

        let geolocate = new GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });

        this.map.addControl(geolocate);
        this.controller = createMapLibreGlMapController(this.map, maplibregl);
        // controller.setEventHandler(e => {
        //   console.log(e);
        // })
    }

    add_ambulance(marks: Array<Marked>) {
        this.ambulance_markers = [...this.ambulance_markers, ...marks];
        for (let m of marks) {
            m.deselect(this.map);
        }
    }

    add_hospital(marks: Array<Marked>) {
        this.hospital_markers = [...this.hospital_markers, ...marks];
        for (let m of marks) {
            m.deselect(this.map);
        }
    }
}

export { MaiHuMap };
