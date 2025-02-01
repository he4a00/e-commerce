import Banners from "@/components/shared/Home/Banners";
import Categories from "@/components/shared/Home/Categories";
import DailyBestSells from "@/components/shared/Home/DailyBestSells";
import PopularProducts from "@/components/shared/Home/PopularProducts";
import ProductsDeals from "@/components/shared/Home/ProductsDeals";
export default function Home() {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <Banners />
      <PopularProducts />
      <DailyBestSells />
      <ProductsDeals />
      <Categories />
    </div>
  );
}
