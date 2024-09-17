import Merit from "@/components/home/Merit";
import ServiceDescription from "@/components/home/ServiceDescription";
import NavBar from "@/components/navBar/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const Home = () => {
  return (
    <NavBar>
      <div className="flex flex-col space-y-6 lg:mb-10">
        <div className="flex flex-col space-y-4 bg-[url('/home_contract.webp')] bg-center bg-cover pt-20 pb-10 lg:pt-8 lg:pb-8 lg:rounded-md">
          <div className="flex flex-col space-y-2 px-4 lg:px-8 lg:py-4">
            <h1 className="text-4xl font-semibold lg:text-white lg:text-6xl">
              <span className="text-[#2ec4b6]">효율적인 </span>
              중개업무
            </h1>
            <p className="text-3xl font-semibold lg:text-white lg:text-4xl">중개랜드에선 가능합니다.</p>
          </div>
          <Tabs defaultValue="상담노트" className="w-[95%] m-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="상담노트">상담노트</TabsTrigger>
              <TabsTrigger value="중개메모">중개메모</TabsTrigger>
            </TabsList>
            <TabsContent value="상담노트">
              <div className="flex flex-col rounded-md bg-[#2ec4b6] px-4 py-7 space-y-3">
                <div className="flex items-center space-x-1">
                  <Image src="/memo.png" alt="메모" width={30} height={30} />
                  <h2 className="text-lg font-semibold">상담노트</h2>
                </div>
                <div className="flex flex-col">
                  <p>
                    지금도 엑셀이나 종이에 직접 상담내역을 적으시나요? 이젠
                    상담노트 서비스를 통해 상담내역을 편하게 관리하세요.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="중개메모">
              <div className="flex flex-col rounded-md bg-[#2ec4b6] px-4 py-7 space-y-3">
                <div className="flex items-center space-x-1">
                  <Image src="/memo2.png" alt="중개메모" width={30} height={30} />
                  <h2 className="text-lg font-semibold">중개메모</h2>
                </div>
                <div className="flex flex-col">
                  <p>
                    메모를 적어놓고 잊거나 어디에 적었는지 몰라 헤맸던 적 없으신가요?
                    이제 업무 중 생긴 수많은 메모들을 한 곳에서 편하게 관리하세요.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <Merit />
        <ServiceDescription />
      </div>
    </NavBar>
  );
};

export default Home;
