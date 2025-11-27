import homeIcon from "../../public/images/icons/homeIcon.svg";
import makeIcon from "../../public/images/icons/makeIcon.svg";
import albumIcon from "../../public/images/icons/albumIcon.svg";
import userIcon from "../../public/images/icons/userIcon.svg";
import { BottomNavItem } from "./BottomNavItem";
import { useNavigate } from "react-router-dom";

interface BottomNavProps {
  isActive?: "Home" | "Make" | "Album" | "MyPage";
}

export function BottomNav({ isActive }: BottomNavProps) {
  const navigate = useNavigate();

  return (
    <nav className="fixed right-0 bottom-0 left-0 mx-auto flex max-w-md justify-around border-t border-gray-200 bg-white py-2">
      <BottomNavItem icon={homeIcon} label="Home" isActive={isActive === "Home"} onClick={() => navigate("/")} />
      <BottomNavItem icon={makeIcon} label="Make" isActive={isActive === "Make"} onClick={() => navigate("/create")} />
      <BottomNavItem icon={albumIcon} label="Album" isActive={isActive === "Album"} onClick={() => navigate("/album")} />
      <BottomNavItem icon={userIcon} label="MyPage" isActive={isActive === "MyPage"} onClick={() => navigate("/mypage")} />
    </nav>
  );
}
