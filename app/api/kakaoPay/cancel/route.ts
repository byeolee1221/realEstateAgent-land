import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { deleteDoc, doc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { tid } = body;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!tid) {
      return new NextResponse("결제취소에 필요한 값을 다시 확인해주세요.", { status: 404 });
    }

    try {
      const response = await axios.post("https://open-api.kakaopay.com/online/v1/payment/cancel", {
        cid: "TC0ONETIME",
        tid
      }, {
        headers: {
          Authorization: `SECRET_KEY ${process.env.KAKAO_PAY_SECRET_KEY_DEV}`,
          "Content-Type": "application/json",
        }
      });

      if (response.status === 200) {
        console.log("취소 완료")
        // const deletePayInfo = deleteDoc(doc(db, "subscription"))
      }
    } catch (error) {
      console.error("kakaoPay cancel 결제취소 POST API에서 오류 발생", error);
      return new NextResponse("오류가 발생하여 결제취소되지 않았습니다. 잠시 후 다시 시도해주세요.", { status: 500 });
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("kakaoPay cancel POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 결제취소되지 않았습니다. 잠시 후 다시 시도해주세요.", { status: 500 });
  }
}