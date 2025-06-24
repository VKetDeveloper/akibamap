import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="秋葉原のアニメ・マンガスポットを巡るマップアプリ" />
      <meta name="keywords" content="秋葉原, アニメ, マンガ, スポット, マップ" />
      <meta name="author" content="Mika" />
      <link rel="icon" href="/icon/favicon.ico" />
      <link rel="apple-touch-icon" href="/icon/0390bc4c-e8fa-4263-932d-15f9065cff41.png" />
      <title>秋葉原マップ</title>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
