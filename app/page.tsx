import { HomePage } from "@/components/home-page";
import { getFeaturedProducts } from "@/lib/models/product";

export default async function Page() {
  const products = await getFeaturedProducts();
  return <HomePage products={products} />;
}
