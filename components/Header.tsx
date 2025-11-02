import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Shopify</h1>
      </div>
      <div className="flex items-center">
        <Link to="/shop" className="text-slate-600 hover:text-slate-900">
          Shop
        </Link>
      </div>
    </nav>
  );
};

export default Nav;