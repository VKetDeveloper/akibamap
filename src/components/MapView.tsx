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
  siteurl: string;
  nfsw: boolean;
};

const spots: Spot[] = [
  { id: 1, name: '秋葉原ラジオ会館', type: 'ショッピング', lat: 35.698154, lng: 139.771734, description: 'アニメや電子部品など多彩な商品が揃うショッピングスポット。', imageUrl: 'images/notimg.png', siteurl: 'https://akihabara-radiokaikan.co.jp/', nfsw: false },
  { id: 2, name: '神田明神', type: '観光地', lat: 35.701303, lng: 139.767834, description: '歴史ある神社で、アニメとのコラボイベントも開催されます。', imageUrl: 'images/notimg.png', siteurl: 'https://kandamyoujin.or.jp/', nfsw: false },
  { id: 3, name: '居酒屋 和が家 秋葉原店', type: '飲食店', lat: 35.696106, lng: 139.77495, description: '安くて旨い日替わり100円メニューを多数ご用意しております。', imageUrl: 'images/notimg.png', siteurl: 'https://izakaya-wagaya-akihabara.com', nfsw: false },
  { id: 4, name: 'ヨドバシカメラ 秋葉原店', type: 'ショッピング', lat: 35.698917, lng: 139.774798, description: '最新の家電やパソコン関連商品が揃う大型電気店。', imageUrl: 'images/notimg.png', siteurl: 'https://www.yodobashi.com/', nfsw: false },
  { id: 5, name: 'ベルサール秋葉原', type: '観光地', lat: 35.700043, lng: 139.771092, description: 'イベントや展示会が開催される多目的ホール。', imageUrl: 'images/notimg.png', siteurl: 'https://www.bellesalle.co.jp/', nfsw: false },
  { id: 6, name: '秋葉原UDX', type: 'ショッピング', lat: 35.700705, lng: 139.772533 , description: 'ショッピングモールやオフィス、飲食店が集まる複合施設。', imageUrl: 'images/notimg.png' , siteurl: 'https://www.udx.jp/', nfsw: false },
  { id: 7, name: 'BEEP 秋葉原', type: 'ショッピング', lat: 35.701511, lng: 139.770865, description: '最新から貴重なゲームや関連商品を取り揃え。', imageUrl: 'images/notimg.png', siteurl: 'https://www.akihabara-beep.com/', nfsw: false },
  { id: 8, name: 'Hey', type: 'ゲームセンター', lat: 35.699072, lng: 139.770917, description: 'STGとレトロアケゲーの聖地。移植が絶望的な激レアゲームも。', imageUrl: 'images/notimg.png', siteurl: 'https://www.taito.co.jp/store/00001703', nfsw: false },
  { id: 9, name: '牛丼専門　サンボ', type: '飲食店', lat: 35.701271, lng: 139.771007, description: '「シュタインズ・ゲート」にも登場した秋葉原グルメのど定番。', imageUrl: 'images/notimg.png', siteurl: 'https://tabelog.com/tokyo/A1311/A131101/13006063/#title-rstdata', nfsw: false },
  { id: 10, name: 'アトレ秋葉原', type: 'ショッピング', lat: 35.698414, lng: 139.77365, description: 'ファッションや雑貨、飲食店が揃うショッピングモール。', imageUrl: 'images/notimg.png', siteurl: 'https://www.atre.co.jp/', nfsw: false },
  { id: 11, name: 'RAKU SPA 1010 神田', type: 'スーパー銭湯', lat: 35.698137, lng: 139.767935, description: 'リラックスできる温泉施設で、アキバ主要部から徒歩5〜10分。短時間の銭湯利用なら550円で様々な入浴プランがあります。', imageUrl: 'images/notimg.png', siteurl: 'https://rakuspa.com/kanda/', nfsw: false },
  { id: 12, name: 'ＪＲ東日本ホテルメッツ 秋葉原', type: '宿泊施設', lat: 35.698137, lng: 139.772644, description: '秋葉原駅から徒歩1分圏内の便利な場所にあり、東京を探索するのに便利です。', imageUrl: 'images/notimg.png', siteurl: 'https://www.hotelmets.jp/akihabara/index.html', nfsw: false },
  { id: 13, name: 'ココちゃんの部屋', type: 'その他', lat: 35.6987, lng: 139.7713, description: 'ココちゃんの部屋は少し大人な雰囲気の空間で、一緒にイチャイチャできます。', imageUrl: 'images/notimg.png', siteurl: 'https://vket.com/', nfsw: true },
  { id: 14, name: '神田たまごけん 秋葉原店', type: '飲食店', lat: 35.701263, lng: 139.771185, description: 'オムライス　おいしいです（有志スタッフ談）', imageUrl: 'images/notimg.png', siteurl: 'https://www.tamagoken.com/introduction/akihabara/', nfsw: false },
  { id: 15, name: ' きづなすし 秋葉原店', type: '飲食店', lat: 35.697725, lng: 139.771618, description: '新鮮なネタとこだわりのシャリが自慢の寿司店。お好きなネタを一貫99円（税抜価格）よりお好みでご注文でき、一品料理は約40種類、ドリンクも約50種類と豊富に取り揃え。「寿司食べ放題」もお楽しみいただけます。', imageUrl: 'images/notimg.png', siteurl: 'https://www.sfpdining.jp/search/?brand=%E3%81%8D%E3%81%A5%E3%81%AA%E3%81%99%E3%81%97&todofuken=0', nfsw: false },
];

const customIcon = new Icon({ iconUrl: 'pin.png', iconSize: [32, 32] });
const currentLocationIcon = new Icon({ iconUrl: 'usr_pin.png', iconSize: [24, 24] });

// Tailwind dark mode font color fix
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    html.dark, .dark {
      color: #222 !important;
      background-color: #fff !important;
    }
    .dark .text-white, .dark.text-white {
      color: #222 !important;
    }
    .dark .bg-white, .dark.bg-white {
      background-color: #fff !important;
    }
  `;
  document.head.appendChild(style);
}

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
  const [nsfwFilter, setNsfwFilter] = useState(true);

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
      (s.name.includes(search) || s.description.includes(search)) &&
      (!nsfwFilter || !s.nfsw)
  );

  const focusedSpot = spots.find((s) => s.id === focusedSpotId);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white dark:bg-black">
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} />
      <div className="w-full h-1/2 md:h-full md:w-2/3 bg-white dark:bg-black">
            <MapContainer
              center={[35.6987, 139.7713]}
              zoom={16}
              maxZoom={18}
              minZoom={14}
              scrollWheelZoom
              maxBounds={[[35.6, 139.6], [35.8, 139.9]]}
              zoomControl={false}
              className="w-full h-full"
            >
          <ZoomControl position="bottomright" />
          {/* <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://r2.hirohiroto112607.f5.si/{z}/{x}/{y}.png"
          />
          {filteredSpots.map((spot) => (
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

      <aside className="hidden md:block md:w-1/3 h-full p-4 overflow-y-auto bg-white dark:bg-black border-l dark:border-gray-800">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full py-20">
            <svg
              className="animate-spin h-8 w-8 text-gray-400 mb-4"
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
            <p className="text-center text-gray-500">読み込み中...</p>
          </div>
        ) : (
          <SpotList
            filter={filter}
            search={search}
            setFilter={setFilter}
            setSearch={setSearch}
            spots={filteredSpots}
            nsfwFilter={nsfwFilter}
            setNsfwFilter={setNsfwFilter}
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
              nsfwFilter={nsfwFilter}
              setNsfwFilter={setNsfwFilter}
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
  nsfwFilter,
  setNsfwFilter,
  onClickSpot,
}: {
  filter: string;
  search: string;
  setFilter: (val: string) => void;
  setSearch: (val: string) => void;
  spots: Spot[];
  nsfwFilter: boolean;
  setNsfwFilter: (val: boolean) => void;
  onClickSpot: (id: number) => void;
}) {
  return (
    <div>
      <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="検索..."
      className="w-full p-2 mb-3 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />
      <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
      >
      <option value="すべて">すべて</option>
      <option value="ショッピング">ショッピング</option>
      <option value="観光地">観光地</option>
      <option value="飲食店">飲食店</option>
      <option value="ゲームセンター">ゲームセンター</option>
      <option value="スーパー銭湯">スーパー銭湯</option>
      <option value="宿泊施設">宿泊施設</option>
      <option value="その他">その他</option>
      </select>

      <div className="flex items-center mb-4">
      <label htmlFor="nsfw-filter" className="flex items-center cursor-pointer">
        <div className="relative">
        <input
          type="checkbox"
          id="nsfw-filter"
          checked={!nsfwFilter}
          onChange={(e) => setNsfwFilter(!e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 dark:bg-gray-700 dark:peer-checked:bg-blue-500 transition-colors"></div>
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5 dark:bg-gray-200"></div>
        </div>
        <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">NSFWスポットも表示</span>
      </label>
      </div>

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
            className="cursor-pointer rounded border bg-white dark:bg-black shadow hover:shadow-md transition"
            whileHover={{ scale: 1.01 }}
          >
            <ImageWithLoader src={spot.imageUrl} alt={spot.name} />
            <div className="p-4 space-y-1 mb-2 text-black dark:text-white">
              <div className="inline-block px-2 py-1 text-xs text-white bg-blue-500 rounded">
          {spot.type}
              </div>
              <div className="font-bold">{spot.name}</div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">{spot.description}</p>
              <motion.a
          href={spot.siteurl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: 'block', textAlign: 'center' }}
              >
          公式サイト
              </motion.a>
            </div>
          </motion.div>
        ))}
        {spots.length === 0 && (
          <motion.div
            className="flex flex-col items-center text-center text-sm text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              className="h-6 w-6 mb-2 text-gray-400"
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
                strokeWidth="2"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"
              />
            </svg>
            該当するスポットはありません。
          </motion.div>
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
