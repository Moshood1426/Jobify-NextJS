import Image from "next/image";
import logo from "../../public/assets/images/logo.svg";

const Logo: React.FC<{ logoStyle?: string }> = ({ logoStyle }) => {
  return (
    <Image src={logo} alt="jobify" className={logoStyle ? logoStyle : "logo"} />
  );
};

export default Logo;
