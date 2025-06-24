'use client';
// pages/index.tsx
import dynamic from 'next/dynamic';

// LeafletはSSRでは動かせないため、SSRオフで読み込む
const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
});

export default function Home() {
  return <MapView />;
}
