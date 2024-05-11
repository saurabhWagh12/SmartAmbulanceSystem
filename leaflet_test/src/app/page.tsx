import dynamic from "next/dynamic";
import { useMemo } from "react";

export default async function Page() {
    // https://andresprieto-25116.medium.com/how-to-use-react-leaflet-in-nextjs-with-typescript-surviving-it-21a3379d4d18
    const Map = useMemo(() => dynamic(
        () => import('@/components/Map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    return (
        <>
            <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
                <Map posix={[4.79029, -75.69003]} />
            </div>
        </>
    )
}
