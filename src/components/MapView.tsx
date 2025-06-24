'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
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
  {
    id: 3,
    name: '居酒屋 和が家 秋葉原店',
    type: '飲食店',
    lat: 35.696106,
    lng: 139.77495,
    description: '安くて旨い日替わり100円メニューを多数ご用意しております。',
  }
];

const customIcon = new Icon({
  iconUrl: '/pin.png',
  iconSize: [32, 32],
});

const currentLocationIcon = new Icon({
  iconUrl: '/pin.png',
  iconSize: [24, 24],
});

function SpotFlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 17, { duration: 1.2 });
  }, [lat, lng, map]);
  return null;
}

export default function MapView() {
  const [filter, setFilter] = useState('すべて');
  const [search, setSearch] = useState('');
  const [focusedSpotId, setFocusedSpotId] = useState<number | null>(null);
  const [currentPos, setCurrentPos] = useState<LatLngExpression | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrentPos([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  const filteredSpots = spots.filter(
    (s) =>
      (filter === 'すべて' || s.type === filter) &&
      (s.name.includes(search) || s.description.includes(search))
  );

  const focusedSpot = spots.find((s) => s.id === focusedSpotId);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* 地図部分 */}
      <div className="w-full md:w-2/3 h-1/2 md:h-full">
        <MapContainer
          center={[35.6987, 139.7713]}
          zoom={14}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
          zoomControl={false} // デフォルトズームOFF
        >
          <ZoomControl position="bottomright" />

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

          {focusedSpot && <SpotFlyTo lat={focusedSpot.lat} lng={focusedSpot.lng} />}
        </MapContainer>
      </div>

      {/* サイド一覧（PC） */}
      <div className="hidden md:block w-1/3 h-full bg-white p-4 overflow-y-auto">
        <SpotList
          filter={filter}
          search={search}
          setFilter={setFilter}
          setSearch={setSearch}
          spots={filteredSpots}
          onClickSpot={(id) => setFocusedSpotId(id)}
        />
      </div>

      {/* モバイル用モーダル */}
      <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg"
        >
          スポット一覧を開く
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-[1000] flex items-end">
          <div className="bg-white w-full max-h-[70%] rounded-t-lg p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">スポット一覧</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-black"
              >
                閉じる ✕
              </button>
            </div>
            <SpotList
              filter={filter}
              search={search}
              setFilter={setFilter}
              setSearch={setSearch}
              spots={filteredSpots}
              onClickSpot={(id) => {
                setFocusedSpotId(id);
                setShowModal(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// SpotList コンポーネントを切り出し
function SpotList({
  filter,
  search,
  setFilter,
  setSearch,
  spots,
  onClickSpot,
}: {
  filter: string;
  search: string;
  setFilter: (val: string) => void;
  setSearch: (val: string) => void;
  spots: Spot[];
  onClickSpot: (id: number) => void;
}) {
  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="検索..."
        className="border p-2 w-full mb-2"
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 mb-4 w-full"
      >
        <option value="すべて">すべて</option>
        <option value="ショッピング">ショッピング</option>
        <option value="観光地">観光地</option>
        <option value="飲食店">飲食店</option>
      </select>

      <div className="space-y-3">
        {spots.map((spot) => (
          <div
            key={spot.id}
            className="border p-3 rounded-md shadow-sm hover:shadow-md cursor-pointer"
            onClick={() => onClickSpot(spot.id)}
          >
            <div className="text-sm text-gray-500">{spot.type}</div>
            <div className="font-bold">{spot.name}</div>
            <p className="text-sm">{spot.description}</p>
          </div>
        ))}
        {spots.length === 0 && (
          <p className="text-gray-500 text-sm">該当するスポットはありません。</p>
        )}
      </div>
    </>
  );
}
