"use client"

import { useEffect, useRef, useState } from "react";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import type { MapController } from "@maptiler/geocoding-control/types";
import "@maptiler/geocoding-control/style.css";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

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
    console.log(map)
    map.on('dblclick', (e) => {
      // console.log(e)
      // let p = map.queryRenderedFeatures()
      // console.log(p)
      // console.log(controller)
      // console.log(controller.getCenterAndZoom())
      let cpz = controller.getCenterAndZoom();
    })
    let controller = createMapLibreGlMapController(map, maplibregl);
    // controller.setEventHandler(e => {
    //   console.log(e)
    // })

    setMapController(controller);
  }, []);

  return (
    <div>
      <GeocodingControl apiKey={apiKey} mapController={mapController} />

      <div
        ref={mapContainerRef}
        style={{ width: "800px", height: "600px", marginTop: "8px" }}
      />
    </div>
  );
}

// import dynamic from "next/dynamic";
// import { useMemo } from "react";

// export default async function Page() {
//     // https://andresprieto-25116.medium.com/how-to-use-react-leaflet-in-nextjs-with-typescript-surviving-it-21a3379d4d18
//     const Map = useMemo(() => dynamic(
//         () => import('@/components/Map'),
//         {
//             loading: () => <p>A map is loading</p>,
//             ssr: false
//         }
//     ), [])

//     return (
//         <>
//             <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
//                 <Map posix={[4.79029, -75.69003]} />
//             </div>
//         </>
//     )
// }
