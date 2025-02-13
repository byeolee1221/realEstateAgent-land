import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UseKakaomapProps {
  location?: string;
  isEditable?: boolean;
}

export const useKakaomap = ({ location, isEditable = false }: UseKakaomapProps) => {
  const [map, setMap] = useState<any>(null);

  // 지도 초기화
  const initializeMap = useCallback(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = true;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);

    const onKakaoApi = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
          draggable: true,
        };

        const createdMap = new window.kakao.maps.Map(container, options);

        setTimeout(() => {
          createdMap.relayout();
        }, 100);

        setMap(createdMap);

        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        createdMap.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new window.kakao.maps.ZoomControl();
        createdMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        function setDraggable(draggable: any) {
          createdMap.setDraggable(draggable);
        }
      });
    };

    kakaoMapScript.addEventListener("load", onKakaoApi);

    return () => {
      kakaoMapScript.removeEventListener("load", onKakaoApi);
      document.head.removeChild(kakaoMapScript);
    };
  }, []);

  // 마커 표시
  const displayMarker = useCallback(
    (place: any) => {
      const infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      window.kakao.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(
          '<div style="padding:5px; font-size:12px;">' + place.place_name + "</div>"
        );
        infoWindow.open(map, marker);
      });
    },
    [map]
  );

  // 위치 검색
  const searchLocation = useCallback(
    (searchKeyword: string) => {
      if (!map) {
        return toast("카카오맵 오류", {
          description: "지도가 초기화되지 않았습니다.",
        });
      }

      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(searchKeyword, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const firstResult = result[0];
          const moveLatLng = new window.kakao.maps.LatLng(firstResult.y, firstResult.x);
          map.setCenter(moveLatLng);
          displayMarker(firstResult);
        } else {
          return toast("카카오맵 오류", {
            description: "검색 결과가 없습니다.",
          });
        }
      });
    },
    [map]
  );

  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    if (map && location) {
      searchLocation(location);
    }
  }, [location, map]);

  return {
    map,
    displayMarker,
    searchLocation,
  };
};
