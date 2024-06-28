import { db } from "@/app/firebase";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { pgToken } = body;
    // console.log(pgToken, tid);

    if (!pgToken) {
      return new NextResponse("결제승인에 필요한 값이 존재하지 않습니다.", { status: 404 });
    }

    const paymentSnapshot = query(
      collection(db, "subscription"),
      where("userEmail", "==", session?.user?.email)
    );
    const querySnapshot = await getDocs(paymentSnapshot);
    let docId: string = "";

    querySnapshot.forEach((doc) => {
      docId = doc.id;
    });

    const paymentDocRef = doc(db, "subscription", docId);
    const paymentDocSnap = await getDoc(paymentDocRef);
    let tid: string = "";

    if (paymentDocSnap.exists()) {
      // console.log(paymentDocSnap.data().tid);
      tid = paymentDocSnap.data().tid;
    }

    try {
      const response = await axios.post(
        "https://open-api.kakaopay.com/online/v1/payment/approve",
        {
          cid: "TCSEQUENCE",
          tid,
          partner_order_id: "subscription_order_id_1",
          partner_user_id: "subscription_user_id_1",
          pg_token: pgToken,
        },
        {
          headers: {
            Authorization: `SECRET_KEY ${process.env.KAKAO_PAY_SECRET_KEY_DEV}`,
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );

      if (response.status === 200) {
        const updateSubscription = await setDoc(
          doc(db, "subscription", docId),
          {
            sid: response.data.sid,
            approved_at: response.data.approved_at,
          },
          { merge: true }
        );

        return NextResponse.json(response.data.sid);
      }
    } catch (error) {
      console.error("approve POST API의 정기결제 요청에서 오류 발생", error);
      return new NextResponse("오류가 발생하여 결제가 취소되었습니다. 다시 시도해주세요.", {
        status: 500,
      });
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("approve POST API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 결제가 취소되었습니다. 다시 시도해주세요.", {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("로그인이 필요한 서비스입니다.", { status: 401 });
    }

    const paymentSnapshot = query(
      collection(db, "subscription"),
      where("userEmail", "==", session?.user?.email)
    );
    const querySnapshot = await getDocs(paymentSnapshot);
    let docId: string = "";

    querySnapshot.forEach((doc) => {
      docId = doc.id;
    });

    const paymentDocRef = doc(db, "subscription", docId);
    const paymentDocSnap = await getDoc(paymentDocRef);
    let tid: string = "";
    let sid: string = "";

    if (paymentDocSnap.exists()) {
      // console.log(paymentDocSnap.data().tid);
      tid = paymentDocSnap.data().tid;
      sid = paymentDocSnap.data().sid;
    }

    return NextResponse.json({tid, sid}, { status: 200 });
  } catch (error) {
    console.error("카카오페이 approve GET API에서 오류 발생", error);
    return new NextResponse("오류가 발생하여 결제승인 값을 불러오지 못했습니다.", { status: 500 });
  }
}