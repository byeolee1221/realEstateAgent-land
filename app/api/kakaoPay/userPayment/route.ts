import { authOptions } from "@/lib/auth";
import axios from "axios";
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
      return new NextResponse("결제승인 값이 없습니다. 다시 확인해주세요.", { status: 404 });
    }
    
    // 결제조회 api 호출 (정기결제시 최근 결제일 정보 없음)
    try {
      // console.log(tid);
      const response = await axios.post(
        "https://open-api.kakaopay.com/online/v1/payment/order",
        {
          cid: "TC0ONETIME",
          tid,
        },
        {
          headers: {
            Authorization: `SECRET_KEY ${process.env.KAKAO_PAY_SECRET_KEY_DEV}`,
            "Content-Type" : "application/json"
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const paymentObj = {
          status: data.status,
          itemName: data.item_name,
          canceledAt: data.canceled_at,
          amount: data.amount.total,
          cancelAmount: data.canceled_amount.total,
          approvedAt: data.approved_at,
          cancelVat: data.canceled_amount.vat,
          cancelAvailableAmount: data.cancel_available_amount.total,
          cancelAvailableVat: data.cancel_available_amount.vat,
          cardInfo: data.selected_card_info?.card_corp_name,
          payMethod: data.payment_method_type
        };
        // console.log(paymentObj);
        return NextResponse.json(paymentObj, { status: 200 });
      }
    } catch (error) {
      console.error("userPayment 내 결제조회 api 호출에서 오류 발생", error);
      return new NextResponse(
        "오류가 발생하여 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("userPayment POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.", { status: 500 });
  }
}
