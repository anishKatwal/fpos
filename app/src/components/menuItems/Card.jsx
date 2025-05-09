import { addToCart } from "../../redux/cart/cartSlice";
import { MdOutlineShoppingCart } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import pizza from "../../assets/images/pizza.png";

const MenuItemCard = ({
  id,
  category,
  description,
  imageUrls,
  name,
  price,
}) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  function addItemToCart() {
    if (!user) {
      toast.error("Please login to order items.", { autoClose: 1500 });

      return;
    }

    dispatch(
      addToCart({
        id,
        name,
        price,
        image: imageUrls[0],
      })
    );

    toast.success(`${name} added to cart successfully.`, {
      autoClose: 1500,
    });
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="relative rounded-t-lg h-50 w-full overflow-hidden">
        <img
          src={imageUrls[0] || pizza}
          alt={name}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full"
        />
      </div>
      <div className="p-5">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm">
          {category}
        </span>

        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {name}
        </h5>
        <div className="relative h-14 w-full overflow-hidden mb-2">
          <p className="absolute top-0 left-0 w-full text-left break-words">
            {description}
          </p>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white to-transparent h-8 pointer-events-none"></div>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl">Rs. {price}</h3>

          <button
            onClick={addItemToCart}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Order Now
            <MdOutlineShoppingCart className="ml-2" />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MenuItemCard;
