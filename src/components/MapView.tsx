// components/MapView.tsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

type Spot = {
  id: number;
  name: string;
  type: string;
  lat: number;
  lng: number;
  description: string;
};

const spots: Spot[] = [
  {
    id: 1,
    name: '秋葉原ラジオ会館',
    type: 'ショッピング',
    lat: 35.6987,
    lng: 139.7713,
    description: 'アニメや電子部品など多彩な商品が揃うショッピングスポット。',
  },
  {
    id: 2,
    name: '神田明神',
    type: '観光地',
    lat: 35.6992,
    lng: 139.7671,
    description: '歴史ある神社で、アニメとのコラボイベントも開催されます。',
  },
];

const customIcon = new Icon({
  iconUrl: '/pin.svg',
  iconSize: [32, 32],
});

const currentLocationIcon = new Icon({
  iconUrl: '/current-location.svg',
  iconSize: [24, 24],
});

function SpotFlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 17, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}

export default function MapView() {
  const [filter, setFilter] = useState('すべて');
  const [focusedSpotId, setFocusedSpotId] = useState<number | null>(null);
  const [currentPos, setCurrentPos] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrentPos([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  const focusedSpot = spots.find((s) => s.id === focusedSpotId);

  return (
    <div className="flex h-screen w-full">
      <div className="w-2/3">
        <MapContainer
          center={[35.6987, 139.7713]}
          zoom={14}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {spots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.lng]}
              icon={customIcon}
              eventHandlers={{
                click: () => setFocusedSpotId(spot.id),
              }}
            >
              <Popup>{spot.name}</Popup>
            </Marker>
          ))}

          {currentPos && (
            <Marker position={currentPos} icon={currentLocationIcon}>
              <Popup>現在地</Popup>
            </Marker>
          )}

          {focusedSpot && (
            <SpotFlyTo lat={focusedSpot.lat} lng={focusedSpot.lng} />
          )}
        </MapContainer>
      </div>

      <div className="w-1/3 bg-white p-4 overflow-y-auto">
        <h2 className="text-lg font-bold">スポット</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 my-2 w-full"
        >
          <option value="すべて">すべて</option>
          <option value="ショッピング">ショッピング</option>
          <option value="観光地">観光地</option>
        </select>
        <div className="space-y-4">
          {spots
            .filter((s) => filter === 'すべて' || s.type === filter)
            .map((spot) => (
              <div
                key={spot.id}
                className="border p-3 rounded-md shadow-sm hover:shadow-md cursor-pointer"
                onClick={() => setFocusedSpotId(spot.id)}
              >
                <div className="text-sm text-gray-500">{spot.type}</div>
                <div className="font-bold">{spot.name}</div>
                <p className="text-sm">{spot.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
