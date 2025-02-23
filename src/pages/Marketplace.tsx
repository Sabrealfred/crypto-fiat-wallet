
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MarketplacePage() {
  const items = [
    {
      id: 1,
      name: "Digital Art Collection #1",
      creator: "CryptoArtist",
      price: 0.5,
      currency: "ETH",
      image: "https://picsum.photos/300/300?random=1",
      likes: 234
    },
    {
      id: 2,
      name: "Rare NFT Token",
      creator: "NFTMaster",
      price: 1.2,
      currency: "ETH",
      image: "https://picsum.photos/300/300?random=2",
      likes: 567
    },
    {
      id: 3,
      name: "Virtual Land Plot",
      creator: "MetaBuilder",
      price: 2.8,
      currency: "ETH",
      image: "https://picsum.photos/300/300?random=3",
      likes: 189
    },
    {
      id: 4,
      name: "Crypto Collectible",
      creator: "TokenMaker",
      price: 0.8,
      currency: "ETH",
      image: "https://picsum.photos/300/300?random=4",
      likes: 432
    }
  ];

  const categories = [
    "All Items",
    "Art",
    "Collectibles",
    "Virtual Worlds",
    "Trading Cards",
    "Music"
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2">NFT Marketplace</h1>
          <p className="text-muted-foreground">Discover, collect, and trade unique digital assets</p>
        </div>
        <Button>
          <ArrowUpRight className="h-4 w-4 mr-2" />
          Connect Wallet
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input 
              className="pl-10" 
              placeholder="Search items..." 
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">by {item.creator}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="font-semibold">{item.price} {item.currency}</p>
                </div>
                <Button size="sm">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
