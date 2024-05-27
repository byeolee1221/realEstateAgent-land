"use client";

import NavBar from "@/components/navBar/NavBar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MemoSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

const MemoWrite = () => {
  const router = useRouter();
  
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

  const form = useForm<z.infer<typeof MemoSchema>>({
    resolver: zodResolver(MemoSchema),
    defaultValues: {
      title: "",
      content: "",
      location: ""
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (map) {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(form.watch("location"), (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const firstResult = result[0];
          const moveLatLng = new window.kakao.maps.LatLng(
            firstResult.y,
            firstResult.x
          );
          map.setCenter(moveLatLng);
          displayMarker(firstResult);
        } else {
          alert("검색 결과가 없습니다.");
        }
      });
    } else {
      console.error("지도가 초기화되지 않았습니다.");
    }
  };

  const onSubmit = async (values: z.infer<typeof MemoSchema>) => {
    try {
      const response = await axios.post("/api/consultingMemo", {
        title: values.title,
        content: values.content,
        location: values.location,
      });

      if (response.status === 200) {
        form.reset();
        router.push(`/consultingMemo/${response.data}`);
      }
    } catch (error: any) {
      console.log("consultingMemo write POST에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <NavBar>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center bg-[url('/consultingMemo.jpg')] h-60 bg-center bg-cover">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">
            중개메모 작성
          </h1>
          <p>My consulting memo</p>
        </div>
        <div className="flex flex-col space-y-6 px-4">
          <div className="flex items-center space-x-2 bg-slate-100 w-1/2 p-2 rounded-md shadow-sm">
            <Image src="/write.png" alt="게시" width={30} height={30} />
            <h2 className="text-lg font-semibold">메모 작성하기</h2>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-3 text-sm"
          >
            <div className="flex flex-col space-y-1">
              <label htmlFor="title" className="text-xs text-gray-500">
                제목
              </label>
              <input
                {...form.register("title")}
                autoComplete="off"
                id="title"
                type="text"
                className="border-b pb-1 focus:outline-none focus:border-green-500 bg-transparent"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="content" className="text-xs text-gray-500">
                내용
              </label>
              <textarea
                {...form.register("content")}
                id="content"
                rows={10}
                className="border p-1 focus:outline-none focus:border-green-500 bg-transparent resize-none whitespace-pre-wrap"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="locate" className="text-xs text-gray-500">
                참고 위치정보
              </label>
              <div className="flex items-center justify-between border-b pb-0.5">
                <input
                  {...form.register("location")}
                  id="locate"
                  type="text"
                  placeholder="장소 또는 주소 검색"
                  className="focus:outline-none focus:border-green-500 bg-transparent w-[80%]"
                />
                <button
                  onClick={onSearch}
                  className="border p-1 shadow-sm rounded-sm"
                >
                  검색
                </button>
              </div>
              <div id="map" className="w-full h-72 border" />
            </div>
            <div className="flex items-center justify-end space-x-2">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors"
              >
                게시하기
              </button>
              <button
                onClick={onCancel}
                className="border border-green-500 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </NavBar>
  );
};

export default MemoWrite;
