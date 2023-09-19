import UserImg from "../../Assets/Images/gagan.jpg";
import HamburgerIcon from "../Icons/HamburgerIcon";

const Header = () => {
  return (
    <div className="bg-slate-600 flex justify-between items-center p-4">
      <div className="flex items-center">
        <HamburgerIcon />
        <div className="font-semibold text-2xl ml-3">User Form</div>
      </div>
      <div className="flex justify-between items-center">
        <img
          className="ml-4 w-8 h-8 rounded-full"
          src={UserImg}
          alt="User-Image"
        />
      </div>
    </div>
  );
};

export default Header;
