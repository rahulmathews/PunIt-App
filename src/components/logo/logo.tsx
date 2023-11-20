import Image from "next/image";

const Logo = () => {
  return (
    <>
      <Image
        src={"/assets/logo-tv.svg"}
        alt={"Logo-tv"}
        height={60}
        width={100}
      />
    </>
  );
};

export default Logo;
