import { IDoc, IOpinion } from "@/types/contact";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ShowContact from "./ShowContact";
import ShowOpinion from "./ShowOpinion";

interface IContactTabs {
  doc: IDoc[] | undefined;
  opinion: IOpinion[] | undefined;
}

const ContactTabs = ({ doc, opinion }: IContactTabs) => {
  return (
    <Tabs defaultValue="문의사항">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="문의사항">문의사항</TabsTrigger>
        <TabsTrigger value="개선의견">개선의견</TabsTrigger>
      </TabsList>
      <TabsContent value="문의사항" className="flex flex-col space-y-4">
        <h2 className="text-center">
          현재까지 총 <span className="font-bold">{doc?.length}</span>건의 문의사항이 접수되었습니다.
        </h2>
        {doc?.map((data) => (
          <div
            key={data.id}
            className="flex flex-col space-y-1 w-full bg-slate-100 rounded-md p-2 shadow-md"
          >
            <div className="flex space-x-2 items-center">
              {data.userImage ? (
                <img src={data.userImage} alt="프로필" className="w-10 h-10 rounded-full" />
              ) : (
                <Image
                  src={"/user.png"}
                  alt="프로필"
                  width={40}
                  height={40}
                  className="bg-slate-300 rounded-full p-1"
                />
              )}
              <div className="flex flex-col">
                <h2 className="text-sm font-semibold">{data.userName}</h2>
                <h2 className="text-xs">{data.userEmail}</h2>
              </div>
            </div>
            <div className="flex justify-between items-center w-full border-b border-slate-300 py-1">
              <h2 className="truncate">제목: {data.title}</h2>
              <ShowContact contactId={data.id} />
            </div>
          </div>
        ))}
      </TabsContent>
      <TabsContent value="개선의견" className="flex flex-col space-y-4">
        <h2 className="text-center">
          현재까지 총 <span className="font-bold">{opinion?.length}</span>건의 개선의견이
          접수되었습니다.
        </h2>
        {opinion?.map((data) => (
          <div
            key={data.id}
            className="flex flex-col space-y-1 w-full bg-slate-100 rounded-md p-2 shadow-md"
          >
            <div className="flex space-x-2 items-center">
              {data.userImage ? (
                <img src={data.userImage} alt="프로필" className="w-10 h-10 rounded-full" />
              ) : (
                <Image
                  src={"/user.png"}
                  alt="프로필"
                  width={40}
                  height={40}
                  className="bg-slate-300 rounded-full p-1"
                />
              )}
              <div className="flex flex-col">
                <h2 className="text-sm font-semibold">{data.userName}</h2>
                <h2 className="text-xs">{data.userEmail}</h2>
              </div>
            </div>
            <div className="flex justify-between items-center w-full border-b border-slate-300 py-1">
              <h2 className="truncate">제목: 구독해지 후 개선의견</h2>
              <ShowOpinion opinionId={data.id} />
            </div>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default ContactTabs;
