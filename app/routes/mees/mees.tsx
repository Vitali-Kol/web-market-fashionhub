import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { sampleProducts } from "../../data/products";
import type { Product } from "../../context/CartContext";

// Your existing products
type Item = { id: string; title: string; price: string; src: string };

const items: Item[] = [
  { id: "1", title: "BALLOON FIT BAGGY-LÕIKEGA TEKSAPÜKSID", price: "36,99 EUR", src: "/icon/image-4.png" },
  { id: "2", title: "BOMBER JAKK", price: "50,99 EUR", src: "/icon/image-5.png" },
  { id: "3", title: "FLIISJAKK", price: "48,99 EUR", src: "/icon/image-6.png" },
  { id: "4", title: "SPORTLIK JAKK", price: "62,99 EUR", src: "/icon/image-7.png" },
];

// Get sample products for men's category
const menProducts = sampleProducts.filter(p => p.category === "mees");

function Heart({ active }: { active?: boolean }) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 relative top-[2px]">
        <path
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.93 0-3.64 1.126-4.312 2.733-.672-1.607-2.382-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 11.25 9 11.25s9-4.03 9-11.25z"
          className={`${active ? "fill-black" : "fill-none"} stroke-black`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  
  
  

  function Card({ item }: { item: Item }) {
    const [wish, setWish] = useState(false);
    return (
      <article className="group max-w-[260px] sm:max-w-[300px] mx-auto">
        <div className="relative aspect-[300/544] overflow-hidden bg-[#FAF5EB] p-2">
          <img src={item.src} alt={item.title} className="w-full h-full object-contain" />
          <button
            aria-label="Wishlist"
            onClick={() => setWish((v) => !v)}
            className="absolute right-2 bottom-4 rounded-full p-1 bg-white/80 hover:bg-white transition"
          >
            <Heart active={wish} />
          </button>
        </div>
        <div className="mt-2">
          <div className="text-[11px] uppercase tracking-wide line-clamp-2">{item.title}</div>
          <div className="mt-1 font-semibold">{item.price}</div>
        </div>
      </article>
    );
  }

  function ProductCard({ product }: { product: Product }) {
    const { addToFavorites, removeFromFavorites, isFavorite } = useCart();
    const [showAddToCart, setShowAddToCart] = useState(false);
    const isLiked = isFavorite(product.id);

    const handleHeartClick = () => {
      if (isLiked) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(product);
      }
    };

    return (
      <article className="group max-w-[260px] sm:max-w-[300px] mx-auto">
        <div className="relative aspect-[300/544] overflow-hidden bg-[#FAF5EB] p-2">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <button
            aria-label="Add to favorites"
            onClick={handleHeartClick}
            className="absolute right-2 bottom-4 rounded-full p-1 bg-white/80 hover:bg-white transition"
          >
            <Heart active={isLiked} />
          </button>
          <button
            onClick={() => setShowAddToCart(!showAddToCart)}
            className="absolute left-2 bottom-4 px-3 py-1 text-xs uppercase bg-black text-white rounded hover:bg-black/80 transition"
          >
            Add to Cart
          </button>
        </div>
        <div className="mt-2">
          <div className="text-[11px] uppercase tracking-wide line-clamp-2">{product.name}</div>
          <div className="mt-1 font-semibold">{product.price.toFixed(2)} EUR</div>
        </div>
      </article>
    );
  }

  

export default function Mees() {
  return (
    <main className="px-[clamp(12px,3vw,32px)] py-6 bg-[#FAF5EB]">
      <h1 className="font-serif text-[28px] tracking-[0.12em] mb-4">MEHED</h1>

      {/* Your existing products */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {items.map((it) => (
          <Card key={it.id} item={it} />
        ))}
      </section>

      {/* New sample products with cart functionality */}
      <h2 className="font-serif text-[24px] tracking-[0.12em] mb-4 mt-8">POPULAR ITEMS</h2>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {menProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <div className="mt-8">
        <button className="inline-flex items-center gap-3 border border-black px-5 py-2 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition">
          Näita rohkem
          <span className="inline-block translate-x-0 group-hover:translate-x-1 transition">→</span>
        </button>
      </div>
    </main>
  );
}
