import { Html, Head, Main, NextScript } from "next/document";
import Footer from "../components/footer";
import Header from "../components/header";
export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="秋葉原のアニメ・マンガスポットを巡るマップアプリ" />
        <meta name="keywords" content="秋葉原, アニメ, マンガ, スポット, マップ" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="G-96S6L2NKMT" />
        <meta name="google-site-verification" content="ZjJhUGR4bWFTcWM5dGc5T3RQeGRBQT090" />
        <meta itemProp="name" content="秋葉原マップ" />
        <meta itemProp="description" content="秋葉原のアニメ・マンガスポットを巡るマップアプリ" />
        <meta itemProp="image" content="/akibamap/akiba_maps_og.png" />
        <meta name="author" content="Mika" />
        <meta name="application-name" content="秋葉原マップ" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta property="og:url" content="https://www.vrugd.jp/akibamap/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="秋葉原マップ" />
        <meta property="og:description" content="秋葉原のアニメ・マンガスポットを巡るマップアプリ" />
        <meta property="og:image" content="/akibamap/akiba_maps_og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="秋葉原マップ" />
        <meta name="twitter:description" content="秋葉原のアニメ・マンガスポットを巡るマップアプリ" />
        <meta name="twitter:image" content="/akibamap/akiba_maps_og.png" />
        <meta name="twitter:site" content="@vrugd_jp" />
        <meta name="twitter:creator" content="@vrugd_jp" />
        <meta name="twitter:domain" content="vrugd.jp" />
        <link rel="icon" href="/icon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon/0390bc4c-e8fa-4263-932d-15f9065cff41.png" />
      </Head>
      <body className="antialiased">
        <Header />
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
