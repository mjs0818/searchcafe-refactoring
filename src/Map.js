/* global kakao */
import React, { useEffect } from 'react';

const Map = ({ cafeInfo }) => {
  const { kakao } = window;

  useEffect(() => {
    if (cafeInfo) {
      let position = new kakao.maps.LatLng(cafeInfo.lat, cafeInfo.lng);
      let text = [cafeInfo.cafeName, cafeInfo.cafeAddress];

      const script = document.createElement('script');
      script.async = true;
      script.src =
        'https://dapi.kakao.com/v2/maps/sdk.js?appkey=cb6f43bf3d5e55eb570af11e4296c1c3';
      document.head.appendChild(script);
      script.onload = () => {
        kakao.maps.load(() => {
          let el = document.getElementById('staticMap');
          new kakao.maps.StaticMap(el, {
            center: position,
            level: 3,
            marker: {
              position,
              text,
            },
          });
        });
      };
    }
  }, [cafeInfo]);
  return <div id="staticMap"></div>;
};

export default Map;
