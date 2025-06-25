'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import NextNProgress from 'nextjs-progressbar';

type Spot = {
  id: number;
  name: string;
  type: string;
  lat: number;
  lng: number;
  description: string;
  imageUrl: string;
};

const spots: Spot[] = [
  { id: 1, name: '秋葉原ラジオ会館', type: 'ショッピング', lat: 35.698154, lng: 139.771734, description: 'アニメや電子部品など多彩な商品が揃うショッピングスポット。', imageUrl: '/images/notimg.png' },
  { id: 2, name: '神田明神', type: '観光地', lat: 35.701303, lng: 139.767834, description: '歴史ある神社で、アニメとのコラボイベントも開催されます。', imageUrl: '/images/notimg.png' },
  { id: 3, name: '居酒屋 和が家 秋葉原店', type: '飲食店', lat: 35.696106, lng: 139.77495, description: '安くて旨い日替わり100円メニューを多数ご用意しております。', imageUrl: '/images/notimg.png' },
  { id: 4, name: 'ヨドバシカメラ 秋葉原店', type: 'ショッピング', lat: 35.698917, lng: 139.774798, description: '最新の家電やパソコン関連商品が揃う大型電気店。', imageUrl: '/images/notimg.png' },
  { id: 5, name: 'ベルサール秋葉原', type: '観光地', lat: 35.700043, lng: 139.771092, description: 'イベントや展示会が開催される多目的ホール。', imageUrl: '/images/notimg.png' },
  { id: 6, name: '秋葉原UDX', type: 'ショッピング', lat: 35.700705, lng: 139.772533 , description: 'ショッピングモールやオフィス、飲食店が集まる複合施設。', imageUrl: '/images/notimg.png' },
  { id: 7, name: 'BEEP 秋葉原', type: 'ショッピング', lat: 35.701511, lng: 139.770865, description: '最新から貴重なゲームや関連商品を取り揃え。', imageUrl: '/images/notimg.png' },
  { id: 8, name: 'Hey', type: 'ゲームセンター', lat: 35.699072, lng: 139.770917, description: 'STGとレトロアケゲーの聖地。移植が絶望的な激レアゲームも。', imageUrl: '/images/notimg.png' },
  { id: 9, name: '牛丼専門　サンボ', type: '飲食店', lat: 35.701271, lng: 139.771007, description: '「シュタインズ・ゲート」にも登場した秋葉原グルメのど定番。', imageUrl: '/images/notimg.png' },
  { id: 10, name: 'アトレ秋葉原', type: 'ショッピング', lat: 35.698414, lng: 139.77365, description: 'ファッションや雑貨、飲食店が揃うショッピングモール。', imageUrl: '/images/notimg.png' },
  { id: 11, name: 'RAKU SPA 1010 神田', type: 'スーパー銭湯', lat: 35.698137, lng: 139.767935, description: 'リラックスできる温泉施設で、アキバ主要部から徒歩5〜10分。短時間の銭湯利用なら550円で様々な入浴プランがあります。', imageUrl: '/images/notimg.png' },
  { id: 12, name: 'ＪＲ東日本ホテルメッツ 秋葉原', type: '宿泊施設', lat: 35.698137, lng: 139.772644, description: '秋葉原駅から徒歩1分圏内の便利な場所にあり、東京を探索するのに便利です。', imageUrl: '/images/notimg.png' }
];

const customIcon = new Icon({ iconUrl: 'pin.png', iconSize: [32, 32] });
const currentLocationIcon = new Icon({ iconUrl: 'pin.png', iconSize: [24, 24] });

function SpotFlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 18, { duration: 1.2 });
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
      <div className="w-full h-1/2 md:h-full md:w-2/3">
        <MapContainer
          center={[35.6987, 139.7713]}
          zoom={16}
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

      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-md"
        >
          スポット一覧を開く
        </button>
      </div>

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
        <option value="ゲームセンター">ゲームセンター</option>
        <option value="スーパー銭湯">スーパー銭湯</option>
        <option value="宿泊施設">宿泊施設</option>
      </select>

      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {spots.map((spot) => (
          <motion.div
            key={spot.id}
            onClick={() => onClickSpot(spot.id)}
            className="cursor-pointer rounded-xl border border-gray-200 bg-white overflow-hidden shadow hover:shadow-md transition"
            whileHover={{ scale: 1.01 }}
          >
            <ImageWithLoader src={spot.imageUrl} alt={spot.name} />
            <div className="p-4 space-y-1">
              <div className="text-xs text-gray-500">{spot.type}</div>
              <div className="font-bold">{spot.name}</div>
              <p className="text-sm text-gray-600">{spot.description}</p>
            </div>
          </motion.div>
        ))}
        {spots.length === 0 && (
          <p className="text-center text-sm text-gray-500">該当するスポットはありません。</p>
        )}
      </motion.div>
    </div>
  );
}

function ImageWithLoader({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-[16/10] bg-gray-100">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-6 w-6 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}
