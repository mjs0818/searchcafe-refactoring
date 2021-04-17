/* global kakao */
import React, { useEffect } from 'react';
import styled from 'styled-components';
const Map = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=cb6f43bf3d5e55eb570af11e4296c1c3&libraries=LIBRARY';
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let el = document.getElementById('map');
        let map = new kakao.maps.Map(el, {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7,
        });
      });
    };
  }, []);
  return <Maps id="map"></Maps>;
};

const Maps = styled.div`
  width: 400px;
  height: 400px;
`;
export default Map;
