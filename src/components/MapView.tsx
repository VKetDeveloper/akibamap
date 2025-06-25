'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NextNProgress from 'nextjs-progressbar';

type Spot = {
  id: number;
  name: string;
  type: string;
  lat: number;
  lng: number;
  description: string;
};

const spots: Spot[] = [
  { id: 1, name: '秋葉原ラジオ会館', type: 'ショッピング', lat: 35.6987, lng: 139.7713, description: 'アニメや電子部品など多彩な商品が揃うショッピングスポット。' },
  { id: 2, name: '神田明神', type: '観光地', lat: 35.6992, lng: 139.7671, description: '歴史ある神社で、アニメとのコラボイベントも開催されます。' },
  { id: 3, name: '居酒屋 和が家 秋葉原店', type: '飲食店', lat: 35.696106, lng: 139.77495, description: '安くて旨い日替わり100円メニューを多数ご用意しております。' }
];

const customIcon = new Icon({ iconUrl: 'pin.png', iconSize: [32, 32] });
const currentLocationIcon = new Icon({ iconUrl: 'pin.png', iconSize: [24, 24] });

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrentPos([pos.coords.latitude, pos.coords.longitude]);
      });
    }
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredSpots = spots.filter(
    (s) =>
      (filter === 'すべて' || s.type === filter) &&
      (s.name.includes(search) || s.description.includes(search))
  );

  const focusedSpot = spots.find((s) => s.id === focusedSpotId);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} />
      {/* Map */}
      <div className="w-full h-1/2 md:h-full md:w-2/3">
        <MapContainer
          center={[35.6987, 139.7713]}
          zoom={14}
          scrollWheelZoom
          zoomControl={false}
          className="w-full h-full"
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
              eventHandlers={{ click: () => setFocusedSpotId(spot.id) }}
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

      {/* Sidebar for Desktop */}
      <aside className="hidden md:block md:w-1/3 h-full p-4 overflow-y-auto bg-white border-l">
        {loading ? (
          <p className="text-center text-gray-500">読み込み中...</p>
        ) : (
          <SpotList
            filter={filter}
            search={search}
            setFilter={setFilter}
            setSearch={setSearch}
            spots={filteredSpots}
            onClickSpot={setFocusedSpotId}
          />
        )}
      </aside>

      {/* Mobile Modal Button */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-md"
        >
          スポット一覧を開く
        </button>
      </div>

      {/* Mobile Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end">
          <div className="w-full max-h-[70%] bg-white rounded-t-xl p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">スポット一覧</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-black text-sm"
              >
                ✕ 閉じる
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
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="検索..."
        className="w-full p-2 mb-3 border border-gray-300 rounded-md"
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      >
        <option value="すべて">すべて</option>
        <option value="ショッピング">ショッピング</option>
        <option value="観光地">観光地</option>
        <option value="飲食店">飲食店</option>
      </select>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {spots.map((spot) => (
          <motion.div
            key={spot.id}
            onClick={() => onClickSpot(spot.id)}
            className="cursor-pointer border p-4 rounded-md shadow-sm hover:shadow-md transition"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-xs text-gray-500">{spot.type}</div>
            <div className="text-base font-semibold">{spot.name}</div>
            <p className="text-sm text-gray-700">{spot.description}</p>
          </motion.div>
        ))}
        {spots.length === 0 && (
          <p className="text-center text-sm text-gray-500">該当するスポットはありません。</p>
        )}
      </motion.div>
    </div>
  );
}
