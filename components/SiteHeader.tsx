import { Link } from "react-router-dom";

const SiteHeader = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Shopify</h1>
      </div>
      <div className="flex items-center">
        <Link to="/shop" className="text-gray-700 hover:text-blue-600">
          Shop
        </Link>
      </div>
    </header>
  );
};

export default SiteHeader;