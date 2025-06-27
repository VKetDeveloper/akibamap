import { Html, Head,Main, NextScript } from "next/document";
import React from "react";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";
// Custom components
import Footer from "../components/footer";
import Header from "../components/header";
import { myfont } from '../components/fonts';
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
        <meta itemProp="image" content="https://www.vrugd.jp/akibamap/akiba_maps_og.png" />
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
        <meta property="og:image" content="https://www.vrugd.jp/akibamap/akiba_maps_og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VketReal有志スタッフおすすめ秋葉原名所マップ" />
        <meta name="twitter:description" content="VketReal有志スタッフがおすすめする秋葉原の名所マップです。" />
        <meta name="twitter:image" content="https://www.vrugd.jp/akibamap/akiba_maps_og.png" />
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+JP+N&display=swap" rel="stylesheet" />
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
        id="nprogress-style"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        /* NProgress styles */
        #nprogress { pointer-events: none; }
        #nprogress .bar {
          background: #29d;
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px #29d, 0 0 5px #29d;
          opacity: 1.0;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
          -ms-transform: rotate(3deg) translate(0px, -4px);
              transform: rotate(3deg) translate(0px, -4px);
        }
        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }
        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;
          border: solid 2px transparent;
          border-top-color: #29d;
          border-left-color: #29d;
          border-radius: 50%;
          -webkit-animation: nprogress-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite;
        }
        @-webkit-keyframes nprogress-spinner {
          0%   { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
        @keyframes nprogress-spinner {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
          `,
        }}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js"
        strategy="beforeInteractive"
      />
      <Script
        id="nprogress-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        if (typeof window !== "undefined") {
          window.NProgress && window.NProgress.configure({ showSpinner: true });
          window.addEventListener('DOMContentLoaded', function() {
            window.NProgress && window.NProgress.start();
          });
          window.addEventListener('load', function() {
            window.NProgress && window.NProgress.done();
          });
        }
          `,
        }}
      />
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
      <body className="antialiased" style={myfont.style}>
        <Header />
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
