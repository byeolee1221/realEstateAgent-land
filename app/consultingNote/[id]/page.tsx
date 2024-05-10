"use client";

import NavBar from "@/components/navBar/NavBar";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface INote {
  customerName: string;
  customerNumber: string;
  purposeUse: string;
  kind: string;
  transactionType: string;
  date: string;
  content: string;
  location: string;
  createdAt: number;
}

const NoteDetail = () => {
  const pathname = usePathname();
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
  }, [note?.location]);

  useEffect(() => {
    const getNote = async () => {
      try {
        const response = await axios.get(`/api/consultingNote?url=${pathname}`);

        if (response.status === 200) {
          setNote(response.data);
        }
      } catch (error: any) {
        console.log("consultingNote noteDetail GET에서 오류 발생", error);
        return toast("오류 발생", {
          description: error.response.data,
        });
      }
    };

    getNote();
  }, []);

  const noteArr = [
    { title: "고객명", contents: note?.customerName },
    { title: "고객 연락처", contents: note?.customerNumber },
    { title: "사용 목적", contents: note?.purposeUse },
    { title: "중개대상물 종류", contents: note?.kind },
    { title: "거래유형", contents: note?.transactionType },
    { title: "상담일자", contents: note?.date },
    { title: "상담내용", contents: note?.content },
  ];

  return (
    <NavBar>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center bg-[url('/contract.jpg')] h-60 bg-center bg-cover">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">
            상담노트
          </h1>
          <p>My consulting note</p>
        </div>
        <div className="px-4 flex flex-col space-y-6">
          {noteArr.map((data, i) => (
            <div key={i} className="flex flex-col space-y-3 text-sm">
              <h2 className="text-xs text-gray-500">{data.title}</h2>
              <span className="border-b pb-1">{data.contents}</span>
            </div>
          ))}
          <div className="flex flex-col space-y-3 text-sm">
            <h2 className="text-xs text-gray-500">상담 매물 위치정보</h2>
            <span className="border-b pb-1">{note?.location}</span>
            <div id="map" className="w-full h-72 border" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors">
                수정
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors">
                삭제
              </button>
            </div>
            <button
              onClick={() => router.back()}
              className="border border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md transition-colors"
            >
              목록
            </button>
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default NoteDetail;
