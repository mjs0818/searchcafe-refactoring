useEffect(() => {
  const script = document.createElement('script');
  script.async = true;
  script.src =
    'https://dapi.kakao.com/v2/maps/sdk.js?appkey=6430efee8c913adf2e3f7dc309b8cd6c&autoload=false&libraries=services,clusterer,drawing';
  document.head.appendChild(script);

  script.onload = () => {
    kakao.maps.load(() => {
      let tags = [
        '가까운',
        '주차 가능',
        '단체석',
        '배달 가능',
        '애완 동물 동반',
        '테이크 아웃 전문',
        '커피가 맛있는',
        '디저트가 맛있는',
        '편안한',
        '작업하기 좋은',
        '대화하기 좋은',
      ];
      var ps = new kakao.maps.services.Places();
      // 키워드로 장소를 검색합니다
      let one = [
        '구로역',
        '신도림역',
        '신길역',
        '노량진역',
        '용산역',
        '남영역',
        '서울역',
        '시청역',
        '을지로3가역',
        '을지로4가역',
        '충무로역',
        '이촌역',
      ];
      let two = [
        '대림역',
        '당산역',
        '여의도역',
        '신림역',
        '서울대입구역',
        '사당역',
        '교대역',
        '강남역',
        '잠실역',
        '건대입구역',
        '성수역',
        '한양대역',
        '왕십리역',
        '합정역',
        '홍대입구역',
        '신촌역',
        '이대역',
        '이현역',
      ];
      let three = ['고속터미널역', '옥수역', '동대입구역'];

      for (let val of one) {
        let keyword = val + ' 카페';
        searchPlaces(keyword);
      }
      for (let val of two) {
        let keyword = val + ' 카페';
        searchPlaces(keyword);
      }
      for (let val of three) {
        let keyword = val + ' 카페';
        searchPlaces(keyword);
      }

      function searchPlaces(keyword) {
        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB);
      }
      async function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          for (let result of data) {
            let toDatabase = {
              cafeAddress: result.road_address_name,
              cafeDetail: [],
              cafeName: result.place_name,
              cafePhone: result.phone,
              cafeTag: [],
              cafeStar: -1,
              cafeid: result.id,
            };
            for (let i = 0; i < 5; i++) {
              let newtag = tags[parseInt(Math.random() * tags.length)];
              if (toDatabase.cafeTag.indexOf(newtag) === -1) {
                toDatabase.cafeTag.push(newtag);
              }
            }

            if (toDatabase.cafeName.includes('스타벅스')) {
              toDatabase.cafeTag.push('스타벅스');
            }
            if (toDatabase.cafeName.includes('투썸플레이스')) {
              toDatabase.cafeTag.push('투썸플레이스');
            }
            if (toDatabase.cafeName.includes('탐앤탐스')) {
              toDatabase.cafeTag.push('탐앤탐스');
            }
            if (toDatabase.cafeName.includes('이디야')) {
              toDatabase.cafeTag.push('이디야');
            }
            if (toDatabase.cafeName.includes('할리스')) {
              toDatabase.cafeTag.push('할리스');
            }
            if (toDatabase.cafeName.includes('커피빈')) {
              toDatabase.cafeTag.push('커피빈');
            }
            if (toDatabase.cafeName.includes('폴바셋')) {
              toDatabase.cafeTag.push('폴바셋');
            }
            const res = await dbService
              .collection('TestInfo')
              .doc(result.place_name)
              .set(toDatabase);
          }
        } else {
        }
      }
    });
  };
}, []);
