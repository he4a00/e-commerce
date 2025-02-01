import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const Banners = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-8 w-full pt-6 md:pt-8 xl:pt-10 px-4 md:px-6 xl:px-8">
      <div className="relative w-full min-h-[200px] md:min-h-[250px] xl:min-h-[300px]">
        <h1 className="absolute z-10 top-6 md:top-10 xl:top-12 p-4 text-lg md:text-xl xl:text-2xl font-semibold left-4 md:left-6">
          Everyday Fresh & <br /> Clean with Our <br /> Products
        </h1>
        <Image
          className="rounded-lg w-full h-full object-cover absolute inset-0"
          src="/images/banner-1.png"
          alt="Banner 1"
          width={500}
          height={500}
          priority
        />
        <Button className="absolute z-10 bottom-4 md:bottom-6 xl:bottom-8 left-4 md:left-6 bg-green-500 hover:bg-green-600 text-white text-sm md:text-base">
          Shop Now <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="relative w-full min-h-[200px] md:min-h-[250px] xl:min-h-[300px]">
        <h1 className="absolute z-10 top-6 md:top-10 xl:top-12 p-4 text-lg md:text-xl xl:text-2xl font-semibold left-4 md:left-6">
          Everyday Fresh & <br /> Clean with Our <br /> Products
        </h1>
        <Image
          className="rounded-lg w-full h-full object-cover absolute inset-0"
          src="/images/banner-2.png"
          alt="Banner 2"
          width={500}
          height={500}
        />
        <Button className="absolute z-10 bottom-4 md:bottom-6 xl:bottom-8 left-4 md:left-6 bg-green-500 hover:bg-green-600 text-white text-sm md:text-base">
          Shop Now <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="relative w-full min-h-[200px] md:min-h-[250px] xl:min-h-[300px]">
        <h1 className="absolute z-10 top-6 md:top-10 xl:top-12 p-4 text-lg md:text-xl xl:text-2xl font-semibold left-4 md:left-6">
          Everyday Fresh & <br /> Clean with Our <br /> Products
        </h1>
        <Image
          className="rounded-lg w-full h-full object-cover absolute inset-0"
          src="/images/banner-3.png"
          alt="Banner 3"
          width={500}
          height={500}
        />
        <Button className="absolute z-10 bottom-4 md:bottom-6 xl:bottom-8 left-4 md:left-6 bg-green-500 hover:bg-green-600 text-white text-sm md:text-base">
          Shop Now <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Banners;
