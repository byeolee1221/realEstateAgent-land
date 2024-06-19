import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tid, pgToken } = body;
    // console.log(pgToken, tid);

    if (!tid || !pgToken) {
      return new NextResponse("결제승인에 필요한 값이 존재하지 않습니다.", { status: 404 });
    }

    try {
      const response = await axios.post("https://open-api.kakaopay.com/online/v1/payment/approve", {
        cid: "TCSEQUENCE",
        tid,
        partner_order_id: "subscription_order_id_1",
        partner_user_id: "subscription_user_id_1",
        pg_token: pgToken,
      }, {
        headers: {
          Authorization: `SECRET_KEY ${process.env.KAKAO_PAY_SECRET_KEY_DEV}`,
          "Content-Type": "application/json;charset=UTF-8",
        }
      });

      if (response.status === 200) {
        return NextResponse.json({ sid: response.data.sid });
      }
    } catch (error) {
      console.error("approve POST API의 정기결제 요청에서 오류 발생", error);
      return new NextResponse("오류가 발생하여 결제가 취소되었습니다. 다시 시도해주세요.", { status: 500 });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("approve POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 결제가 취소되었습니다. 다시 시도해주세요.", {
      status: 500,
    });
  }
}
