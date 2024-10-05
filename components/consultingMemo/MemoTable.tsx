import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import SignInBtn from "../SignInBtn";
import SubscribeAlert from "../consultingNote/SubscribeAlert";
import { getPaymentDate, getSubscriptionStatus } from "@/lib/subscriptionUtils";
import { formatDate } from "@/lib/utils";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "../ui/skeleton";

interface IMemoList {
  title: string;
  content: string;
  id: string;
  createdAt: number;
}

interface IProps {
  freeUse: number | undefined;
}

const MemoTable = (props: IProps) => {
  const { data: session } = useSession();

  const [nextPayment, setNextPayment] = useState<string | undefined>("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | undefined>("");
  const [endBenefit, setEndBenefit] = useState(false);
  const [memo, setMemo] = useState<IMemoList[]>([]);
  const [error, setError] = useState("");
  const [countZero, setCountZero] = useState(false);
  const [freeUseMsg, setFreeUseMsg] = useState("");
  const [isLoading, setLoading] = useState(false);

  const alertArr = [
    "무료체험은 계정당 5회에 한정됩니다.",
    `${freeUseMsg}`,
    "무료버전 메모는 계속 업데이트가 가능합니다.",
    "사용횟수가 차감되면 메모를 삭제해도 복구되지 않습니다.",
    "삭제는 각 메모의 세부페이지에서 가능합니다.",
    "메모는 본인외에는 확인할 수 없습니다.",
  ];

  // 구독해지 및 다음 결제일
  const subscriptionCancel = subscriptionStatus === "CANCEL_PAYMENT" && nextPayment !== "";

  // 다음 결제일과 현재 날짜가 같아지면 유료서비스 종료
  useEffect(() => {
    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);

    if (formattedCurrentDate === nextPayment) {
      setEndBenefit(true);
    } else {
      setEndBenefit(false);
    }
  }, [subscriptionCancel]);

  // 유틸리티 함수에서 다음 결제일, 구독상태 가져오기 (병렬처리로 수정)
  useEffect(() => {
    if (session) {
      const fetchSubscriptionData = async () => {
        try {
          const [nextPaymentDate, subscriptionStatus] = await Promise.all([
            getPaymentDate(),
            getSubscriptionStatus(),
          ]);

          setNextPayment(nextPaymentDate?.nextPaymentDate);
          setSubscriptionStatus(subscriptionStatus);
        } catch (error) {
          console.error("MemoTable fetchSubscriptionData에서 오류 발생", error);
        }
      };

      fetchSubscriptionData();
    }
  }, []);

  // 무료사용횟수
  useEffect(() => {
    if (props.freeUse === 0) {
      setCountZero(true);
    } else {
      setCountZero(false);
    }
  }, [props.freeUse]);

  // 메모 리스트 가져오기
  useEffect(() => {
    const getMemoList = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/consultingMemo/memoList");

        if (response.status === 200) {
          setMemo(response.data);
        }
      } catch (error) {
        console.error("consultingMemo memoTable GET에서 오류 발생", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        }
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      getMemoList();
    }
  }, []);

  // 무료사용횟수 메세지 추가
  useEffect(() => {
    if (!session) {
      setFreeUseMsg("로그인하시면 남은 횟수를 확인하실 수 있습니다.");
      return;
    }

    if (!props.freeUse) {
      setFreeUseMsg("무료사용횟수를 조회중입니다.");
      return;
    }

    if (props.freeUse > 0) {
      setFreeUseMsg(`현재 남은 무료횟수는 ${props.freeUse}회입니다.`);
    } else {
      setFreeUseMsg("현재 모든 무료사용횟수를 이용하셨습니다.");
    }
  }, [props.freeUse, session]);

  return (
    <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:space-x-4 lg:space-y-0">
      <div className="flex flex-col space-y-4 lg:w-full">
        <div className="border rounded-sm lg:flex lg:justify-center">
          {session ? (
            !isLoading ? (
              <Table>
                <TableHeader>
                  <TableRow className="text-sm tracking-tighter">
                    <TableHead>번호</TableHead>
                    <TableHead>제목</TableHead>
                    <TableHead className="text-right">업데이트일</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {memo.map((data, i) => (
                    <TableRow key={data.id}>
                      <TableCell>{i + 1}</TableCell>
                      <Link href={`/consultingMemo/${data.id}`} legacyBehavior={true}>
                        <TableCell className="tracking-tighter cursor-pointer">
                          {data.title}
                        </TableCell>
                      </Link>
                      <TableCell className="text-right">{data.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Skeleton className="w-full h-56 bg-slate-100" />
            )
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-sm p-2">
              <p>로그인이 필요한 서비스입니다.</p>
              <p>아래 버튼을 눌러 로그인해주세요.</p>
              <SignInBtn />
            </div>
          )}
          {session && error !== "" ? <h2 className="text-center p-2">{error}</h2> : null}
        </div>
        {session && (
          <div className="flex justify-end">
            {!countZero || subscriptionStatus === "SUCCESS_PAYMENT" || !endBenefit ? (
              <Link
                href="/consultingMemo/write"
                className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-white w-1/3 text-center"
              >
                메모 만들기
              </Link>
            ) : (
              <SubscribeAlert />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 bg-green-100 px-4 py-5 rounded-xl lg:w-[40%] lg:h-fit">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold">사용 전 확인해주세요!</h1>
        </div>
        {alertArr.map((item, i) => (
          <div key={i} className="flex items-center space-x-2 text-sm w-full lg:items-start xl:items-center">
            <CheckCircleIcon className="w-5 h-5 text-green-500 overflow-visible lg:h-7" />
            <span className="tracking-tighter lg:text-base lg:break-keep">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoTable;
