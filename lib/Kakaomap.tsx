"use client";

import { NoteSchema } from "@/app/consultingNote/write/constants";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const KakaoMap = () => {
  const [map, setMap] = useState<any>(null);

  const { register, watch } = useFormContext<z.infer<typeof NoteSchema>>();

  function displayMarker(place: any) {
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
  }

  useEffect(() => {
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
        setMap(createdMap);

        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        createdMap.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new window.kakao.maps.ZoomControl();
        createdMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        function setDraggable(draggable: any) {
          createdMap.setDraggable(draggable);
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const place = new window.kakao.maps.LatLng(lat, lon);
            displayMarker(place);
          });
        } else {
          const place = new window.kakao.maps.LatLng(33.450701, 126.570667);
          displayMarker(place);
        }
      });
    };

    kakaoMapScript.addEventListener("load", onKakaoApi);
  }, []);

  const onSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (map) {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(watch("location"), (result: any, status: any) => {
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
    } else {
      return toast("카카오맵 오류", {
        description: "지도가 초기화되지 않았습니다.",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor="locate" className="text-xs text-gray-500">
        상담 매물 위치정보
      </label>
      <div className="flex items-center justify-between border-b pb-0.5">
        <input
          {...register("location")}
          id="locate"
          type="text"
          placeholder="장소 또는 주소 검색"
          className="focus:outline-none focus:border-blue-500 bg-transparent w-[80%]"
        />
        <button onClick={onSearch} className="border p-1 shadow-sm rounded-sm">
          검색
        </button>
      </div>
      <div id="map" className="w-full h-72 md:h-96 border" />;
    </div>
  );
};

export default KakaoMap;
