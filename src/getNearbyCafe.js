/* global kakao */
import { dbService } from './Firebase';
import getCurrentPosition from './getCurrentPosition';

function getDistance(lat1, lng1, lat2, lng2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  var r = 6371; //지구의 반지름(km)
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = r * c; // Distance in km
  return Math.round(d * 1000);
}

const getNearbyCafe = async () => {
  let geocoder = new kakao.maps.services.Geocoder();
  let position = await getCurrentPosition();

  return new Promise((resolve) => {
    geocoder.coord2Address(
      position.getLng(),
      position.getLat(),
      async (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let nearbyCafe;
          let address = result[0].address['address_name'];
          address = address.split(' ');
          let cafe = await dbService
            .collection('CafeInformation')
            .where('region_1depth', '==', address[0])
            .get();

          nearbyCafe = cafe.docs.filter((doc) => {
            let cafeInfo = doc.data();
            return (
              getDistance(
                position.getLat(),
                position.getLng(),
                cafeInfo.lat,
                cafeInfo.lng
              ) <= 3000
            );
          });
          nearbyCafe = nearbyCafe.map((doc) => doc.data());
          resolve(nearbyCafe);
        }
      }
    );
  });
};

export default getNearbyCafe;
