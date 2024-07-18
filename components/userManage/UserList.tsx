import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";
import { useRouter } from "next/navigation";
import UserProfile from "./UserProfile";

interface IUser {
  id: string;
  email: string;
  name: string;
  image: string;
}

const UserList = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser[]>();
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("/api/userManage");

        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        // 비로그인유저, 관리자 아닌 유저 접속시 메인페이지로 이동
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401 || error.response?.status === 403) {
            router.push("/");
          }
          console.error("userList GET에서 오류 발생", error);
          setError(error.response?.data);
        }
      }
    };
    
    getUser();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="text-sm tracking-tighter">
              <TableHead>번호</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead className="text-right">이름</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user?.map((data, i) => (
              <TableRow key={data.id} className="cursor-pointer">
                <TableCell>{i + 1}</TableCell>
                <UserProfile email={data.email} id={data.id} image={data.image} name={data.name} />
                <TableCell className="text-right">{data.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {error !== "" ? <h2 className="text-center p-2">{error}</h2> : null}
      </div>
    </div>
  );
};

export default UserList;
