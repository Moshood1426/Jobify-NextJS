import Image from "next/image";
import logo from "../../public/assets/images/logo.svg";

const Logo = () => {
  return <Image src={logo} alt="jobify" className="logo" />;
};

export default Logo;
