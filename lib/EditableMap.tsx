import { useKakaomap } from "@/hooks/useKakaomap";
import { useFormContext } from "react-hook-form";
import { cn } from "./utils";

interface EditableMapProps {
  type: "note" | "memo";
  location?: string;
}

export const EditableMap = ({ type, location }: EditableMapProps) => {
  const { register, watch } = useFormContext();
  const { searchLocation } = useKakaomap({
    location: location,
    isEditable: true,
  });

  const onSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    searchLocation(watch("location"));
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
          className={cn(
            "focus:outline-none  bg-transparent w-[80%]",
            type === "note" ? "focus:border-blue-500" : "focus:border-green-500"
          )}
        />
        <button onClick={onSearch} className="border p-1 shadow-sm rounded-sm">
          검색
        </button>
      </div>
      <div id="map" className="w-full h-72 md:h-96 border" />;
    </div>
  );
};
