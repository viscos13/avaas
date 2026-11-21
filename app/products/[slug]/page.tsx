import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | AAVAAS",
    };
  }

  return {
    title: `${product.name} | AAVAAS Home & Living`,
    description: `${product.subtitle}. Crafted with Panipat craftsmanship by KT International.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection)
  );

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
