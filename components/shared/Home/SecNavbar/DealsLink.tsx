import Image from "next/image";
import Link from "next/link";

const DealsLink = () => {
  return (
    <div className="flex items-center ">
      <Link href="/deals" className="flex items-center">
        <Image src="/images/icon-hot.svg" alt="logo" width={20} height={20} />
        <h1 className="  text-green-500 m-2 rounded-md font-semibold">Deals</h1>
      </Link>
    </div>
  );
};

export default DealsLink;
