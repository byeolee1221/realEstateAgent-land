import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Cog6ToothIcon, HomeIcon, PencilIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const SiteMenuDesktop = () => {
  const LinkArr = [
    { href: "/", icon: HomeIcon, title: "메인화면" },
    { href: "/consultingNote", icon: PencilSquareIcon, title: "상담노트" },
    { href: "/consultingMemo", icon: PencilIcon, title: "상담메모" },
    { href: "/setting", icon: Cog6ToothIcon, title: "설정" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-lg font-bold">메뉴</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>메뉴</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {LinkArr.map((item, i) => (
            <DropdownMenuItem key={i}>
              <Link href={item.href} className="flex">
                <item.icon className="w-6 h-6 mr-2" />
                {item.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SiteMenuDesktop;
