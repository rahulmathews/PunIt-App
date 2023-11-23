import Image from "next/image";

const Logo = ({ className, props }: any) => {
  return (
    <>
      <Image
        src={"/assets/logo-tv.svg"}
        alt={"Logo-tv"}
        height={60}
        width={100}
        className={className}
        {...props}
      />
    </>
  );
};

export default Logo;
