"use client"

import NavBar from "@/components/navBar/NavBar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema } from "./constants";
import axios from "axios";
import { toast } from "sonner";

const Write = () => {
  const router = useRouter();

  const [location, setLocation] = useState("");
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
          })
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
  
      ps.keywordSearch(location, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const firstResult = result[0];
          const moveLatLng = new window.kakao.maps.LatLng(firstResult.y, firstResult.x);
          map.setCenter(moveLatLng);
          displayMarker(firstResult);
        } else {
          alert("검색 결과가 없습니다.");
        }
      })
    } else {
      console.error("지도가 초기화되지 않았습니다.");
    }
  }

  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      customerName: "",
      customerNumber: "",
      purposeUse: "",
      kind: "",
      transactionType: "",
      date: "",
      content: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof NoteSchema>) => {
    try {
      const response = await axios.post("/api/consultingNote", {
        customerName: values.customerName,
        customerNumber: values.customerNumber,
        purposeUse: values.purposeUse,
        kind: values.kind,
        transactionType: values.transactionType,
        date: values.date,
        content: values.content,
        location
      });

      if (response.status === 200) {
        form.reset();
        router.push(`/consultingNote/${response.data}`);
      }
    } catch (error: any) {
      console.log("consultingNote write POST에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data
      })
    }
  }

  const onCancel = () => {
    router.back();
  }

  return (
    <NavBar>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center bg-[url('/contract.jpg')] h-60 bg-center bg-cover">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">
            상담노트 작성
          </h1>
          <p>My consulting note</p> 
        </div>
        <div className="flex flex-col space-y-6 px-4">
          <div className="flex items-center space-x-2 bg-slate-100 w-1/2 p-2 rounded-md shadow-sm">
            <Image src="/write.png" alt="게시" width={30} height={30} />
            <h2 className="text-lg font-semibold">노트 작성하기</h2>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-3 text-sm">
            <div className="flex flex-col space-y-1">
              <label htmlFor="customerName" className="text-xs text-gray-500">고객명</label>
              <input {...form.register("customerName")} id="customerName" type="text" className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="customerNumber" className="text-xs text-gray-500">고객연락처</label>
              <input {...form.register("customerNumber")} id="customerNumber" type="tel" className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="purposeUse" className="text-xs text-gray-500">사용목적</label>
              <input {...form.register("purposeUse")} id="purposeUse" type="text" className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="kind" className="text-xs text-gray-500">중개대상물 종류</label>
              <input {...form.register("kind")} id="kind" type="text" placeholder="예) 원룸 / 아파트 / 상가 등" className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="transactionType" className="text-xs text-gray-500">거래유형</label>
              <input {...form.register("transactionType")} id="transactionType" type="text" placeholder="예) 월세 / 전세 / 매매 등" className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="date" className="text-xs text-gray-500">상담일자</label>
              <input {...form.register("date")} id="date" type="text" placeholder="예) 2024-04-15" className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="content" className="text-xs text-gray-500">상담내용</label>
              <textarea {...form.register("content")} id="content" rows={10} className="border p-1 focus:outline-none focus:border-blue-500 bg-transparent resize-none" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="locate" className="text-xs text-gray-500">상담 매물 위치정보</label>    
              <div className="flex items-center justify-between border-b pb-0.5">
                <input id="locate" type="text" onChange={(e) => setLocation(e.target.value)} placeholder="장소 또는 주소 검색" className="focus:outline-none focus:border-blue-500 bg-transparent w-[80%]" />
                <button onClick={onSearch} className="border p-1 shadow-sm rounded-sm">검색</button>
              </div>
              <div id="map" className="w-full h-72 border" />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors">
                {isLoading ? "게시중" : "게시하기"}
              </button>
              <button onClick={onCancel} className="border border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md transition-colors">취소</button>
            </div>
          </form>
        </div>
      </div>
    </NavBar>
  );
};

export default Write;
