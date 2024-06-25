import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { sid } = body;

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    if (!sid) {
      return new NextResponse("정기결제에 필요한 값을 다시 확인해주세요.", { status: 404 });
    }

    try {
      const response = await axios.post(
        "https://open-api.kakaopay.com/online/v1/payment/subscription",
        {
          cid: "TCSUBSCRIP",
          // sid
          partner_order_id: "subscription_order_id_1",
          partner_user_id: "subscription_user_id_1",
          item_name: "중개랜드 스탠다드구독 정기결제",
          quantity: 1,
          total_amount: 10000,
          vat_amount: 1000,
          tax_free_amount: 0,
        },
        {
          headers: {
            Authorization: `SECRET_KEY ${process.env.KAKAO_PAY_SECRET_KEY_DEV}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {

      }
    } catch (error) {
      console.error("kakaoPay regularPayment 정기결제 POST API에서 오류 발생", error);
      return new NextResponse("오류가 발생하여 결제되지 않았습니다. 관리자에게 문의해주세요.", { status: 500 });
    }
  } catch (error) {
    console.error("kakaoPay regularPayment POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 결제되지 않았습니다. 관리자에게 문의해주세요.", { status: 500 });
  }
}
