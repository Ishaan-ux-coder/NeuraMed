import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ShoppingCart, Heart, Star, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

const products = [
  {
    name: "Stress Relief Kit",
    price: "$29.99",
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1623984109622-f9c970ba32fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlc3MlMjByZWxpZWYlMjB0b3lzfGVufDF8fHx8MTc2MTg0OTgzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Sensory toys and fidget tools to reduce anxiety",
    badge: "Popular",
  },
  {
    name: "Premium Yoga Mat",
    price: "$49.99",
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1746796751590-a8c0f15d4900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0JTIwZXhlcmNpc2V8ZW58MXx8fHwxNzYxODE3MTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Eco-friendly, non-slip mat for mindful movement",
    badge: "Eco",
  },
  {
    name: "Self-Help Book Collection",
    price: "$39.99",
    rating: 4.7,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmJTIwaGVscCUyMGJvb2tzfGVufDF8fHx8MTc2MTg0OTgzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Curated guides for personal growth and healing",
    badge: "New",
  },
  {
    name: "Meditation Cushion",
    price: "$34.99",
    rating: 4.6,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1687436874174-977fdd9e2cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjE3ODcxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Comfortable support for meditation practice",
  },
  {
    name: "Aromatherapy Set",
    price: "$44.99",
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1687436874174-977fdd9e2cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjE3ODcxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Essential oils and diffuser for relaxation",
    badge: "Premium",
  },
  {
    name: "Journal & Planner",
    price: "$24.99",
    rating: 4.8,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmJTIwaGVscCUyMGJvb2tzfGVufDF8fHx8MTc2MTg0OTgzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Beautiful guided journal for daily reflection",
  },
];

export function Shop() {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (index: number) => {
    setLikedProducts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="shop" className="py-32 px-6 bg-gradient-to-b from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-semibold mb-4"
          >
            🛍️ Wellness Marketplace
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Stress-Free Shop
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Handpicked wellness products to support your journey to peace and balance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-purple-100">
                <div className="relative overflow-hidden aspect-square">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Badge */}
                  {product.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                      className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full"
                    >
                      {product.badge}
                    </motion.div>
                  )}

                  {/* Like Button */}
                  <motion.button
                    onClick={() => toggleLike(index)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        likedProducts.includes(index)
                          ? "fill-red-500 text-red-500"
                          : "text-pink-500"
                      }`}
                    />
                  </motion.button>
                </div>
                
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">
                      {product.rating} {product.reviews && `(${product.reviews})`}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {product.price}
                    </span>
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full border-purple-300 hover:bg-purple-50"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full"
                        >
                          Buy Now
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-purple-300 hover:bg-purple-50 px-10 py-7 text-lg"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
