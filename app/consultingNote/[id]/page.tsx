"use client";

import NoteDelete from "@/components/consultingNote/NoteDelete";
import { getPost } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface INote {
  userEmail: string;
  customerName: string;
  customerNumber: string;
  purposeUse: string;
  kind: string;
  transactionType: string;
  date: string;
  content: string;
  location: string;
  createdAt: number;
  id: string;
}

const NoteDetail = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const postUrl = pathname.split("/consultingNote/");
  const postId = postUrl[1];
  const router = useRouter();
  const [note, setNote] = useState<INote>();
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
      ps.keywordSearch(note?.location, (result: any, status: any) => {
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
  }, [note?.location]);

  // 상담노트 불러오기
  useEffect(() => {
    getPost("상담노트", `/api/consultingNote?url=${pathname}`, setNote);
  }, []);

  const noteArr = [
    { id: 1, title: "고객명", contents: note?.customerName },
    { id: 2, title: "고객 연락처", contents: note?.customerNumber },
    { id: 3, title: "사용 목적", contents: note?.purposeUse },
    { id: 4, title: "중개대상물 종류", contents: note?.kind },
    { id: 5, title: "거래유형", contents: note?.transactionType },
    { id: 6, title: "상담일자", contents: note?.date },
    { id: 7, title: "상담내용", contents: note?.content },
  ];

  return (
    <div className="px-4 flex flex-col space-y-6">
      {noteArr.map((data) => (
        <div key={data.id} className="flex flex-col space-y-3 text-sm">
          <h2 className="text-xs text-gray-500">{data.title}</h2>
          <span className="border-b pb-1 whitespace-pre-wrap">
            {data.contents}
          </span>
        </div>
      ))}
      <div className="flex flex-col space-y-3 text-sm">
        <h2 className="text-xs text-gray-500">상담 매물 위치정보</h2>
        <span className="border-b pb-1">{note?.location}</span>
        <div id="map" className="w-full h-72 md:h-96 border" />
      </div>
      <div className="flex items-center justify-between space-x-2">
        {note?.userEmail === session?.user?.email ? (
          <div className="flex items-center space-x-2">
            <Link
              href={`/consultingNote/${postId}/edit`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors"
            >
              수정
            </Link>
            <NoteDelete postPath={pathname} />
          </div>
        ) : null}
        <button
          onClick={() => router.push("/consultingNote")}
          className="border border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md transition-colors"
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default NoteDetail;
