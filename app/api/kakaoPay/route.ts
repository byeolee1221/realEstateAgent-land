import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { item_name, amount } = body;
    // console.log(item_name, amount);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!item_name || !amount) {
      return new NextResponse("상품명과 금액을 확인해주세요.", { status: 404 });
    }

    // kakaoPay 1회차 결제 POST 요청(단건결제)
    try {
      const response = await axios.post(
        "https://open-api.kakaopay.com/online/v1/payment/ready",
        {
          cid: "TCSEQUENCE",
          partner_order_id: "subscription_order_id_1",
          partner_user_id: "subscription_user_id_1",
          item_name,
          quantity: "1",
          total_amount: amount,
          vat_amount: "1000",
          tax_free_amount: "0",
          approval_url: "https://real-estate-agent-land.vercel.app/subscription/success",
          fail_url: "https://real-estate-agent-land.vercel.app/subscription/fail",
          cancel_url: "https://real-estate-agent-land.vercel.app/subscription/cancel",

        },
        {
          headers: {
            Authorization: `SECRET_KEY ${process.env.KAKAO_PAY_SECRET_KEY_DEV}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      
      if (response.status === 200) {
        const addSubscription = await addDoc(collection(db, "subscription"), {
          userName: session.user?.name,
          userEmail: session.user?.email,
          userImage: session.user?.image,
          tid: response.data.tid,
          item_name,
          amount
        });
        // 반환되는 자료는 하드코딩하는 것이 아님
        return NextResponse.json({
          tid: response.data.tid,
          next_redirect_pc_url: response.data.next_redirect_pc_url
        }, { status: 200 });
      }
    } catch (error) {
      console.error("kakaoPay POST 내 api post 요청에서 오류 발생", error);
      return new NextResponse(
        "결제가 실패했습니다. 잠시 후 다시 시도해주세요.",
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("kakaoPay POST API에서 오류 발생", error);
    return new NextResponse(
      "오류가 발생하여 결제되지 않았습니다. 잠시 후 다시 시도해주세요.",
      { status: 500 }
    );
  }
}
