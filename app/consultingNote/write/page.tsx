"use client";

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

  const [map, setMap] = useState<any>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isValid, isSubmitting, errors },
  } = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    mode: "all",
    defaultValues: {
      customerName: "",
      customerNumber: "",
      purposeUse: "",
      kind: "",
      transactionType: "",
      date: "",
      content: "",
      location: "",
    },
  });

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
        location: values.location,
      });

      if (response.status === 200) {
        reset();
        router.push(`/consultingNote/${response.data}`);
      }
    } catch (error) {
      console.error("consultingNote write POST에서 API 오류 발생", error);
      if (axios.isAxiosError(error)) {
        return toast("오류 발생", {
          description: error.response?.data,
        });
      }
    }
  };

  const onCancel = () => {
    router.back();
  };

  const inputArr = [
    {
      id: "customerName",
      type: "text",
      title: "고객명",
      register: { ...register("customerName") },
      error: errors.customerName,
    },
    {
      id: "customerNumber",
      type: "tel",
      title: "고객연락처",
      register: { ...register("customerNumber") },
      error: errors.customerNumber,
    },
    {
      id: "purposeUse",
      type: "text",
      title: "사용목적",
      register: { ...register("purposeUse") },
      error: errors.purposeUse,
    },
    {
      id: "kind",
      type: "text",
      title: "중개대상물 종류",
      placeholder: "예) 원룸 / 아파트 / 상가 등",
      register: { ...register("kind") },
      error: errors.kind,
    },
    {
      id: "transactionType",
      type: "text",
      title: "거래유형",
      placeholder: "예) 월세 / 전세 / 매매 등",
      register: { ...register("transactionType") },
      error: errors.transactionType,
    },
    {
      id: "date",
      type: "text",
      title: "상담일자",
      placeholder: "예) 2024-04-15",
      register: { ...register("date") },
      error: errors.date,
    },
  ];

  return (
    <div className="flex flex-col space-y-6 px-4">
      <div className="flex items-center space-x-2 bg-slate-100 w-1/2 p-2 rounded-md shadow-sm">
        <Image src="/write.png" alt="게시" width={30} height={30} />
        <h2 className="text-lg font-semibold">노트 작성하기</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3 text-sm">
        {inputArr.map((item) => (
          <div key={item.id} className="flex flex-col space-y-1">
            <label htmlFor={item.id} className="text-xs text-gray-500">
              {item.title}
            </label>
            <input
              {...item.register}
              id={item.id}
              type={item.type}
              placeholder={item.placeholder}
              autoComplete="off"
              className="border-b pb-1 focus:outline-none focus:border-blue-500 bg-transparent"
            />
            {item.error && <span className="error-text-start">{item.error.message}</span>}
          </div>
        ))}
        <div className="flex flex-col space-y-1">
          <label htmlFor="content" className="text-xs text-gray-500">
            상담내용
          </label>
          <textarea
            {...register("content")}
            id="content"
            rows={10}
            className="border p-1 focus:outline-none focus:border-blue-500 bg-transparent resize-none whitespace-pre-wrap"
          />
          {errors.content && <span className="error-text-start">{errors.content.message}</span>}
        </div>
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
        </div>
        <div id="map" className="w-full h-72 md:h-96 border" />
        <div className="flex items-center justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-2 rounded-md transition-colors"
            disabled={!isValid}
          >
            {isSubmitting ? "게시중" : "게시하기"}
          </button>
          <button
            onClick={onCancel}
            className="border border-blue-500 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md transition-colors"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
