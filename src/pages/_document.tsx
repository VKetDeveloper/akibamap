import { Html, Head,Main, NextScript } from "next/document";
import React from "react";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";
// Custom components
import Footer from "../components/footer";
import Header from "../components/header";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="VketReal有志スタッフがおすすめする秋葉原の名所マップです。" />
        <meta name="keywords" content="秋葉原, アニメ, マンガ, スポット, マップ" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="G-96S6L2NKMT" />
        <meta name="google-site-verification" content="ZjJhUGR4bWFTcWM5dGc5T3RQeGRBQT090" />
        <meta itemProp="name" content="VketReal有志スタッフおすすめ秋葉原名所マップ" />
        <meta itemProp="description" content="VketReal有志スタッフがおすすめする秋葉原の名所マップです。" />
        <meta itemProp="image" content="/akibamap/akiba_maps_og.png" />
        <meta name="author" content="Mika" />
        <meta name="application-name" content="VketReal有志スタッフおすすめ秋葉原名所マップ" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta property="og:url" content="https://www.vrugd.jp/akibamap/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="VketReal有志スタッフおすすめ秋葉原名所マップ" />
        <meta property="og:description" content="VketReal有志スタッフがおすすめする秋葉原の名所マップです。" />
        <meta property="og:image" content="/akibamap/akiba_maps_og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VketReal有志スタッフおすすめ秋葉原名所マップ" />
        <meta name="twitter:description" content="VketReal有志スタッフがおすすめする秋葉原の名所マップです。" />
        <meta name="twitter:image" content="/akibamap/akiba_maps_og.png" />
        <meta name="twitter:site" content="@vrugd_jp" />
        <meta name="twitter:creator" content="@vrugd_jp" />
        <meta name="twitter:domain" content="vrugd.jp" />
        <link rel="icon" href="/icon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon/0390bc4c-e8fa-4263-932d-15f9065cff41.png" />
              <Script
          src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
          strategy="beforeInteractive"
          type="text/javascript"
        />
        <Script
          src="https://cdn.apple-mapkit.com/mk/5.1.0/mapkit.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-96S6L2NKMT"
          strategy="afterInteractive"
        />
        {/* <script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-96S6L2NKMT');
            `,
          }}
        /> */}
        <GoogleAnalytics gaId="G-96S6L2NKMT" />
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "7a7657b7acaa4222ae10d0b7cd98fcc3"}'
          strategy="afterInteractive"
          defer
        />

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "s0zvu6qe2v");
          `,
        }}
      ></script>
      
      <Script
        id="typekit-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(d) {
              var config = {
                kitId: 'jgp8ypl',
                scriptTimeout: 3000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
          `,
        }}
      />
    <Script
      src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"
      strategy="afterInteractive"
    />
<Script
  src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"
  strategy="afterInteractive"
/>

  <Script
    id="hs-script-loader"
    src="//js-na2.hs-scripts.com/243126134.js"
    strategy="afterInteractive"
    async
    defer
  />
  <Script
    src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js"
    strategy="afterInteractive"
  />
        <title>VketReal有志スタッフおすすめ秋葉原名所マップ</title>
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
