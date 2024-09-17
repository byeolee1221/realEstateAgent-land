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

const MemoDescription = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="border border-green-500 rounded-md text-green-500 hover:bg-green-500 hover:text-white px-3 py-2 text-center transition-colors">
          더 알아보기
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg overflow-auto">
        <DialogHeader className="text-start border-b pb-2">
          <DialogTitle>중개메모 설명</DialogTitle>
          <DialogDescription>중개메모에서 제공하는 기능은 다음과 같습니다.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="font-bold text-lg text-green-500">자유양식으로 메모업로드 가능</h2>
            <ul className="list-disc text-sm pl-4 flex flex-col space-y-2">
              <li>
                중개사님이 바쁜 업무환경에서 형식에 구애받지 않고 편하게 작성하실 수 있도록
                자유양식으로 구성했습니다.
              </li>
              <li>
                상담노트와 마찬가지로 작성하신 내용은 중개사님 외에는 확인할 수 없으니 안심하시고
                사용해주세요.
              </li>
              <li>
                추가적인 메모가 필요하시다면 기존 메모를 수정해서 사용하시거나 새로운 메모를
                추가하며 사용하실 수 있습니다.
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="font-bold text-lg text-green-500">메모에 지도정보 첨부 가능</h2>
            <ul className="list-disc text-sm pl-4 flex flex-col space-y-2">
              <li>
                임장하시면서 눈여겨보았던 매물의 위치를 지도에 표시해보세요. 나중에 확인하실 때 해당
                매물의 정보를 빠르게 상기할 수 있습니다.
              </li>
              <li>
                여러 주소나 장소를 메모해 놓고, 언제든 지도의 위치를 바꿔서 저장하실수도 있습니다.
              </li>
            </ul>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md transition-colors"
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

export default MemoDescription;
