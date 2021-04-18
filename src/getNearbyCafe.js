/* global kakao */

import { dbService } from './Firebase';
import getCurrentPosition from './getCurrentPosition';

const getNearbyCafe = async () => {
  const { kakao } = window;
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
            // .where('region_2depth', '==', address[1])
            // .where('region_3depth', '==', address[2])
            .get();
          nearbyCafe = cafe.docs.map((doc) => doc.data());
          resolve(nearbyCafe);
        }
      }
    );
  });
};

export default getNearbyCafe;
