import Image from "next/image";

const HotLineNumber = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Image src="/images/hotline.svg" alt="logo" width={50} height={50} />
      <div className="flex flex-col">
        <h1 className="text-green-500 font-semibold">+91 9876543210</h1>
        <p className="text-sm">24/7 Customer Service</p>
      </div>
    </div>
  );
};

export default HotLineNumber;
