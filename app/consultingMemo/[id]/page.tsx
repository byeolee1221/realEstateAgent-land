"use client";

import MemoDelete from "@/components/consultingMemo/MemoDelete";
import { getPost } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export interface IMemo {
  userEmail: string;
  title: string;
  content: string;
  location: string;
  id: string;
}

const MemoDetail = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const memoUrl = pathname.split("/consultingMemo/");
  const memoId = memoUrl[1];

  const [memo, setMemo] = useState<IMemo>();
  const [map, setMap] = useState<any>(null);

  function displayMarker(place: any) {
    const infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
    window.kakao.maps.event.addListener(marker, "click", function () {
      infoWindow.setContent(
        '<div style="padding:5px; font-size:12px;">' +
          place.place_name +
          "</div>"
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
        createdMap.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT
        );

        const zoomControl = new window.kakao.maps.ZoomControl();
        createdMap.addControl(
          zoomControl,
          window.kakao.maps.ControlPosition.RIGHT
        );

        function setDraggable(draggable: any) {
          createdMap.setDraggable(draggable);
        }
      });
    };

    kakaoMapScript.addEventListener("load", onKakaoApi);
  }, []);

  useEffect(() => {
    if (map) {
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(memo?.location, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const firstResult = result[0];
          const moveLatLng = new window.kakao.maps.LatLng(
            firstResult.y,
            firstResult.x
          );
          map.setCenter(moveLatLng);
          displayMarker(firstResult);
        }
      });
    }
  }, [memo?.location]);

  // 중개메모 불러오기
  useEffect(() => {
    getPost("중개메모", `/api/consultingMemo?url=${pathname}`, setMemo);
  }, []);

  const memoArr = [
    { title: "제목", content: memo?.title },
    { title: "내용", content: memo?.content },
  ];

  return (
    <div className="px-4 flex flex-col space-y-6">
      {memoArr.map((data, i) => (
        <div key={`${memo?.id} - ${i}`} className="flex flex-col space-y-3 text-sm">
          <h2 className="text-xs text-gray-500">{data.title}</h2>
          <span className="border-b pb-1 whitespace-pre-wrap">
            {data.content}
          </span>
        </div>
      ))}
      <div className="flex flex-col space-y-3 text-sm">
        <h2 className="text-xs text-gray-500">참고 위치정보</h2>
        <span className="border-b pb-1">{memo?.location}</span>
        <div id="map" className="w-full h-72 border" />
      </div>
      <div className="flex items-center justify-between space-x-2">
        {memo?.userEmail === session?.user?.email ? (
          <div className="flex items-center space-x-2">
            <Link
              href={`/consultingMemo/${memoId}/edit`}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors"
            >
              수정
            </Link>
            <MemoDelete memoPath={pathname} />
          </div>
        ) : null}
        <button
          onClick={() => router.push("/consultingMemo")}
          className="border border-green-500 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md transition-colors"
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default MemoDetail;
