"use client";
import Loader from "../Loader";
import { useGetAllActiveDealsQuery } from "@/app/store/slices/api/deals/dealSlice";
import DealCard from "./DealCard";
import { Deal } from "@/types";

const ProductsDeals = () => {
  const { data: activeDeals, isLoading } = useGetAllActiveDealsQuery({});
  if (isLoading) {
    return (
      <div className="p-10">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 pt-10 px-4 md:px-6 xl:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Deals of The Day</h1>
      </div>
      {activeDeals?.result?.items?.length === 0 ? (
        <div className="p-10">
          <p className="text-center text-gray-500">No deals found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-3 pt-10">
          {activeDeals?.result?.items?.map((deal: Deal) => (
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
      )}
    </div>
  );
};

export default ProductsDeals;
