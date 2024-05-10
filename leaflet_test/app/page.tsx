import Script from "next/script";
import Head from "next/head";
import "../styles.css";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

const position = [51.505, -0.09];

export default function Page() {
  // return <div>
  //   <Head>
  //       <link href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" rel="stylesheet" />
  //   </Head>
  //   <Script
  //     type = "text/javascript"
  //     id="hs-script-loader"
  //     // async
  //     // defer
  //     src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
  //   />
  //   <div id="map"></div>
  //   <h1>Hello, Next.js!</h1>
  // </div>
  return (
  <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
);
}
