import maplibregl, { GeolocateControl, Marker, Popup } from "maplibre-gl";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import axios from 'axios';

function get_dist2(c1: [Number, Number], c2: [Number, Number]) {
    let request = new XMLHttpRequest();

    request.open('POST', "https://api.openrouteservice.org/v2/directions/driving-car/geojson");

    request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', '5b3ce3597851110001cf624839b02bf98643452bbd0919c7eb6094be');

    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
        }
    };

    const body = { coordinates: [c1.reverse(), c2.reverse()] };
    const jsonbody = JSON.stringify(body);
    console.log(jsonbody);

    request.send(jsonbody);
}

async function get_dist(c1: [Number, Number], c2: [Number, Number]) {
    const url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";
    const body = { coordinates: [c1.reverse(), c2.reverse()] };
    const headers = {
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        'Content-Type': 'application/json',
        'Authorization': '5b3ce3597851110001cf624839b02bf98643452bbd0919c7eb6094be',
    };

    let resp = await axios.post(url, body, { headers: headers });
    console.log(resp);
    return resp;
}

function get_dist3(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

const apiKey = "CCCHWfgPGpwfSG6DPf51";

class Marked {
    marker: Marker | null = null;
    is_selected: boolean = false;
    title: string;
    color: string;
    selected_color: string;
    pos: [number, number];
    data: any = null;

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

    setData(data: any) {
        this.data = data;
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

    setPickup: any;
    setDest: any;
    setAmbulance: any;

    constructor(container: HTMLDivElement, pickup: any, destination: any, ambulance: any) {
        this.ambulance_markers = [];
        this.hospital_markers = [];
        this.setPickup = pickup;
        this.setDest = destination;
        this.setAmbulance = ambulance;

        this.map = new maplibregl.Map({
            style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
            container: container,
        });

        this.map.on('dblclick', (e) => {
            if (this.patient_marker != null && this.patient_marker != null) {
                this.patient_marker.remove();
                this.patient_marker = null;
            }
            this.setPickup(true);
            console.log(e.lngLat)
            this.patient_marker = new Marker({ color: "#aa4444", className: 'marker' });
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
        for (let i = 0; i < marks.length; i++) {
            let m = marks[i];
            m.color = '#449944';
            m.selected_color = '#00ff00';
            m.deselect(this.map);
            m.marker?.getElement()
                .addEventListener('click', (e) => {
                    if (this.active_ambulance != null) {
                        this.ambulance_markers[this.active_ambulance].deselect(this.map);
                    }
                    m.select(this.map);
                    this.active_ambulance = i;
                    this.setAmbulance(true);
                });
        }
    }

    add_hospital(marks: Array<Marked>) {
        this.hospital_markers = [...this.hospital_markers, ...marks];
        for (let i = 0; i < marks.length; i++) {
            let m = marks[i];
            m.color = '#444490';
            m.selected_color = '#0000ff';
            m.deselect(this.map);
            m.marker?.getElement()
                .addEventListener('click', (e) => {
                    if (this.active_hospital != null) {
                        this.hospital_markers[this.active_hospital].deselect(this.map);
                    }
                    m.select(this.map);
                    this.active_hospital = i;
                    this.setDest(true);
                });
        }
    }

    get_cost() {
        if (this.active_ambulance === null || this.active_hospital === null || this.patient_marker === null) {
            throw Error('helo');
        }
        const p1 = this.ambulance_markers[this.active_ambulance].marker?.getLngLat();
        const p2 = this.hospital_markers[this.active_hospital].marker?.getLngLat();
        const p3 = this.patient_marker.getLngLat();

        if (typeof p1 === 'undefined' || typeof p2 === 'undefined') {
            throw Error('helo');
        }

        // const d1 = get_dist2([p1.lng, p1.lat], [p2.lng, p2.lat]);
        const d1 = get_dist3(p1.lat, p1.lng, p3.lat, p3.lng);
        const d2 = get_dist3(p3.lat, p3.lng, p2.lat, p2.lng);
        const dist = d1 + d2;
        const rate = this.ambulance_markers[this.active_ambulance].data;
        return dist * rate;
    }
}

export { MaiHuMap, Marked };
