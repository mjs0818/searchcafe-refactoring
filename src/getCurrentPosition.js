/* global kakao */
const getCurrentPosition = () => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      let coords = new kakao.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(coords);
    });
  });
};

export default getCurrentPosition;
