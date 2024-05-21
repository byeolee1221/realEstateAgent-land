"use client"

import NavBar from "@/components/navBar/NavBar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IMemo } from "../page";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MemoEditSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";

const MemoEdit = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [location, setLocation] = useState("");
  const [map, setMap] = useState<any>(null);
  const [memo, setMemo] = useState<IMemo>();

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

  useEffect(() => {
    const getMemo = async () => {
      try {
        const response = await axios.get(
          `/api/consultingMemo/memoEdit?url=${pathname}`
        );

        if (response.status === 200) {
          setMemo(response.data);
        }
      } catch (error: any) {
        console.log("consultingNote noteEdit GET에서 오류 발생", error);
        return toast("오류 발생", {
          description: error.response.data,
        });
      }
    };

    getMemo();
  }, []);

  const onSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (map) {
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(location, (result: any, status: any) => {
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

  const form = useForm<z.infer<typeof MemoEditSchema>>({
    resolver: zodResolver(MemoEditSchema),
    defaultValues: {
      title: memo?.title,
      content: memo?.content,
      location: memo?.location
    }
  });

  useEffect(() => {
    form.reset({
      title: memo?.title,
      content: memo?.content,
      location: memo?.location
    })
  }, [memo, form.reset]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof MemoEditSchema>) => {
    try {
      const response = await axios.post(`/api/consultingMemo/memoEdit?url=${pathname}`, {
        currentUser: session?.user?.email,
        title: values.title,
        content: values.content,
        location
      });

      if (response.status === 200) {
        form.reset();
        router.push(`/consultingMemo/${response.data}`);
      }
    } catch (error: any) {
      console.log("consultingMemo memoEdit POST에서 오류 발생", error);
      return toast("오류 발생", {
        description: error.response.data,
      });
    }
  }

  const onCancel = () => {
    router.back();
  };

  return (
    <NavBar>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center justify-center bg-[url('/consultingMemo.jpg')] h-60 bg-center bg-cover">
          <h1 className="text-2xl font-semibold tracking-wider pb-1 border-b border-gray-800">
            중개메모 수정
          </h1>
          <p>My Consulting Memo</p>
        </div>
        <div className="flex flex-col space-y-6 px-4">
          <div className="flex items-center space-x-2 bg-slate-100 w-1/2 p-2 rounded-md shadow-sm">
            <Image src="/write.png" alt="게시" width={30} height={30} />
            <h2 className="text-lg font-semibold">메모 수정하기</h2>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-3 text-sm">
            <div className="flex flex-col space-y-1">
              <label htmlFor="title" className="text-xs text-gray-500">
                제목
              </label>
              <input
                {...form.register("title")}
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
                  onChange={(e) => setLocation(e.target.value)}
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
                {isLoading ? "수정중" : "수정하기"}
              </button>
              <button
                type="button"
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

export default MemoEdit;
