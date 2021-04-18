/* global kakao */
import React, { useEffect } from 'react';

const Map = ({ cafeInfo }) => {
  useEffect(() => {
    if (cafeInfo) {
      const places = new kakao.maps.services.Places();
      const callback = (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let position, text;
          if (result.length > 1) {
            let filtered = [],
              cafeAddr = cafeInfo.cafeAddress.split(' ');

            for (let i = 0; i < cafeAddr.length; i++) {
              if (filtered.length === 1) {
                break;
              }
              filtered = result.filter((cafe) => {
                return cafe.road_address_name.includes(cafeAddr[i]);
              });
            }
            position = new kakao.maps.LatLng(filtered[0].y, filtered[0].x);
            text = [filtered[0].place_name, filtered[0].road_address_name];
          } else {
            position = new kakao.maps.LatLng(result[0].y, result[0].x);
            text = [result[0].place_name, result[0].road_address_name];
          }
          const script = document.createElement('script');
          script.async = true;
          script.src =
            'https://dapi.kakao.com/v2/maps/sdk.js?appkey=cb6f43bf3d5e55eb570af11e4296c1c3&libraries=LIBRARY';
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
      };
      places.keywordSearch(cafeInfo.cafeName, callback);
    }
  }, [cafeInfo]);
  return <div id="staticMap"></div>;
};

export default Map;
