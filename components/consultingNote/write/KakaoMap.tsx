import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

const KakaoMap = () => {
  const [location, setLocation] = useState("");

  const onLocate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  // useEffect(() => {
  //   const kakaoMapScript = document.createElement("script");
  //   kakaoMapScript.async = true;
  //   kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false&libraries=services`;
  //   document.head.appendChild(kakaoMapScript);

  //   const onKakaoApi = () => {
  //     window.kakao.maps.load(() => {
  //       const infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
  //       const container = document.getElementById("map");
  //       const options = {
  //         center: new window.kakao.maps.LatLng(33.450701, 126.570667),
  //         level: 3,
  //         draggable: true,
  //       };

  //       const map = new window.kakao.maps.Map(container, options);
  //       const mapTypeControl = new window.kakao.maps.MapTypeControl();
  //       map.addControl(
  //         mapTypeControl,
  //         window.kakao.maps.ControlPosition.TOPRIGHT
  //       );

  //       const zoomControl = new window.kakao.maps.ZoomControl();
  //       map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

  //       function setDraggable(draggable: any) {
  //         map.setDraggable(draggable);
  //       }

  //       function displayMarker(place: any) {
  //         const marker = new window.kakao.maps.Marker({
  //           map: map,
  //           position: new window.kakao.maps.LatLng(place.y, place.x),
  //         });
  //         window.kakao.maps.event.addListener(marker, "click", function () {
  //           infoWindow.setContent(
  //             '<div style="padding:5px; font-size:12px;">' +
  //               place.place_name +
  //               "</div>"
  //           );
  //           infoWindow.open(map, marker);
  //         });
  //       }

  //       function placesSearchCB(data: any, status: any, pagination: any) {
  //         if (status === window.kakao.maps.services.Status.OK) {
  //           const bounds = new window.kakao.maps.LatLngBounds();

  //           for (let i = 0; i < data.length; i++) {
  //             displayMarker(data[i]);
  //             bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
  //           }
  //           map.setBounds(bounds);
  //         }
  //       }

  //       const ps = new window.kakao.maps.services.Places();

  //       function searchPlaces() {
  //         const psInput = document.getElementById('location');
  //       }
  //       searchPlaces();

  //       ps.keywordSearch(location, placesSearchCB);
  //     });
  //   };

  //   kakaoMapScript.addEventListener("load", onKakaoApi);
  // }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-xs border p-1 rounded-md shadow-sm">추가</button>
      </DialogTrigger>
      <DialogContent className="w-[95%] rounded-md">
        <DialogHeader className="text-start">
          <DialogTitle className="font-semibold">매물 위치정보 추가</DialogTitle>
          <DialogDescription>지도에서 위치를 검색하여 저장을 눌러주세요.</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col space-y-2">
          <div className="flex items-center justify-between border p-1 text-sm rounded-sm shadow-sm">
            <input type="text" placeholder="장소 또는 주소 검색" className="focus:outline-none w-[80%]" />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-sm">검색</button>
          </div>
          <div id="map" className="w-full h-72 border" />
          <DialogFooter>
            <div className="flex items-center space-x-2 justify-end text-sm">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">저장하기</button>
              <DialogClose asChild>
                <button className="border border-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md">취소</button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default KakaoMap;
