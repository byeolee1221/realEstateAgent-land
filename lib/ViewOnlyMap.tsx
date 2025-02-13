"use client";

import { useKakaomap } from "@/hooks/useKakaomap";

export const ViewOnlyMap = ({ location }: { location: string | undefined }) => {
  useKakaomap({ location });

  return (
    <div className="flex flex-col space-y-3 text-sm">
      <h2 className="text-xs text-gray-500">상담 매물 위치정보</h2>
      <span className="border-b pb-1">{location}</span>
      <div id="map" className="w-full h-72 md:h-96 border" />
    </div>
  );
};
