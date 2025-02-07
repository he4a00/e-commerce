"use client";

import Loader from "@/components/shared/Loader";
import { Deal } from "@/types";
import { useGetAllActiveDealsQuery } from "@/app/store/slices/api/deals/dealSlice";
import DealCard from "@/components/shared/Home/DealCard";

const DealsProducts = () => {
  const { data: dealProducts, isLoading: isDealsLoading } =
    useGetAllActiveDealsQuery({});

  if (isDealsLoading) {
    return <Loader />;
  }

  const displayProducts = dealProducts?.result?.items;

  console.log(displayProducts);

  return (
    <div className="container mx-auto px-4 pt-10 w-full min-h-screen">
      {/* items number found and the sub category filter */}
      <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between">
        {/* Items Found */}
        <div>
          <h1>
            We Found{" "}
            <span className="font-semibold text-green-500">
              {displayProducts?.length || 0}
            </span>{" "}
            Deals For You!
          </h1>
        </div>
      </div>
      {/* Products grid and sidebar layout */}
      <div className="flex flex-col md:flex-row lg:flex-row gap-6 mt-8">
        {/* Main products grid */}

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayProducts?.map((deal: Deal) => (
            <DealCard
              key={deal.dealID}
              startDate={deal.startDate}
              endDate={deal.endDate}
              productID={deal.productID}
              productName={deal.productName}
              productPrice={deal.productPrice || 0}
              brandName={deal.brandName || ""}
              categoryName={deal.categoryName || ""}
              isActive={deal.isActive}
              productImageUrl={deal.productImageUrl || ""}
              discount={deal.discount}
              isInStock={deal.isInStock}
              avgRating={deal.avgRating}
              totalOrders={deal.totalOrders}
              totalReviews={deal.totalReviews}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsProducts;
