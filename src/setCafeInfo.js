/* global kakao */
import { dbService } from './Firebase';
const places = new kakao.maps.services.Places();
const geocoder = new kakao.maps.services.Geocoder();

const setCafeInfo = async () => {
  await dbService.collection('CafeInformation').onSnapshot((snapshot) => {
    snapshot.docs.map((doc) => {
      if (!doc.data().lat || !doc.data().lng || !doc.data().addressname) {
        let keyword = doc.data().cafeName;
        let address = doc.data().cafeAddress;
        places.keywordSearch(keyword, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            if (result.length > 1) {
              let cafeAddr = address.split(' ');
              for (let i = 0; i < cafeAddr.length; i++) {
                if (result.length === 1) {
                  break;
                }
                result = result.filter((cafe) => {
                  return cafe.road_address_name.includes(cafeAddr[i]);
                });
              }
            }
            let lat = result[0].y;
            let lng = result[0].x;

            geocoder.coord2Address(
              result[0].x,
              result[0].y,
              async (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                  let address = result[0].address;
                  let cafe = doc.data();

                  await dbService
                    .doc(`CafeInformation/${cafe.cafeName}`)
                    .update({
                      addressname: address.address_name,
                      region_1depth: address.region_1depth_name,
                      region_2depth: address.region_2depth_name,
                      region_3depth: address.region_3depth_name,
                      lat,
                      lng,
                    });
                }
              }
            );
          }
        });
      }
    });
  });
};

export default setCafeInfo;
