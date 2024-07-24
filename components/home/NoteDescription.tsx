import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const NoteDescription = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="border border-blue-500 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-2 text-center transition-colors">
          더 알아보기
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg h-3/5 overflow-auto">
        <DialogHeader className="text-start border-b pb-2">
          <DialogTitle>상담노트 설명</DialogTitle>
          <DialogDescription>상담노트에서 제공하는 기능은 다음과 같습니다.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="font-bold text-lg text-blue-500">상담한 고객정보 및 상담내용 업로드</h2>
            <ul className="list-disc text-sm pl-4 flex flex-col space-y-2">
              <li>
                상담과정에서 중개사님이 필수적으로 아셔야 할 고객의 요청사항 및 정보들을 입력할 수
                있는 메뉴들로 구성했습니다.
              </li>
              <li>
                메뉴에 없는 추가적인 요청사항, 여러 매물을 임장하기를 원하시는 경우 등을 위해
                자유롭게 입력하실 수 있는 공간도 마련했습니다.
              </li>
              <li>
                1회의 상담을 하나의 노트에 저장함으로써 다른 매물과 섞여서 고객에게 전달이
                잘못되거나 상담과정이 지체되는 걱정을 덜어드립니다.
              </li>
              <li>
                같은 상담건을 업데이트할 때에는 언제든지 수정을 거쳐 노트를 관리하실 수 있습니다.
              </li>
              <li>
                업로드하신 정보는 중개사님 외에는 확인할 수가 없습니다. 관리자도 알 수 없어요!
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="font-bold text-lg text-blue-500">
              최초상담 이후 추가되는 상담내역 저장 가능
            </h2>
            <ul className="list-disc text-sm pl-4 flex flex-col space-y-2">
              <li>
                최초상담 이후에도 언제든지 노트를 수정하실 수 있고, 원하신다면 새로운 노트를 만들어
                사용하실 수 있습니다.
              </li>
              <li>
                똑같은 상담건을 기존 노트에서 관리할 때, 상황에 따라 중개사님이 직접 입력하실 수
                있도록 상담일을 포함한 모든 정보를 자동으로 업데이트되지 않도록 했습니다.
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="font-bold text-lg text-blue-500">
              상담내역 중개대상물의 지도정보 확인 가능
            </h2>
            <ul className="list-disc text-sm pl-4 flex flex-col space-y-2">
              <li>
                주소나 장소를 입력하여 매물이나 장소의 위치를 알기 쉽도록 카카오맵을 적용하여 지정한
                위치를 저장하여 접속했을 때 찾아보기 쉽도록 만들었습니다.
              </li>
              <li>
                기존 노트를 수정하실 때도 상담과 관련된 장소를 수정입력하여 지도위치를 업데이트할 수
                있도록 만들었습니다.
              </li>
            </ul>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition-colors"
              >
                닫기
              </button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDescription;
