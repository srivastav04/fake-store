import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADJUST_ITEM, REMOVE_ITEM } from "../features/cartActions";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const validDiscountCodes = {
    SAVE20: 20,
    SPECIAL50: 50,
    FLASH30: 30,
  };
  const calculateTotal = () => {
    let tot = 0;
    cartItems.forEach((element) => {
      tot = tot + element.price * element.quantity;
    });
    return tot;
  };

  const handleDiscountCode = () => {
    const discount = validDiscountCodes[discountCode];
    if (discount) {
      setAppliedDiscount(discount);
      setDiscountMessage(`Discount of ${discount}% applied successfully!`);
      setMessageType("success");
    } else {
      setAppliedDiscount(0);
      setDiscountMessage("Invalid discount code!");
      setMessageType("error");
    }

    setTimeout(() => {
      setDiscountMessage("");
      setMessageType("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {cartItems.length > 0 ? (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Shopping Cart
          </h1>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 space-y-6">
              {cartItems.map((item) => {
                if (item.quantity > 0) {
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg transition-transform duration-200 hover:scale-[1.02]"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 object-contain rounded-lg"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111";
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            dispatch(
                              ADJUST_ITEM({ title: item.title, quantity: 1 })
                            )
                          }
                          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          {" "}
                          <i class="fa-solid fa-plus"></i>
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(
                              ADJUST_ITEM({ title: item.title, quantity: -1 })
                            )
                          }
                          className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <i class="fa-solid fa-minus"></i>
                        </button>
                        <button
                          onClick={() => dispatch(REMOVE_ITEM(item.id))}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Remove item"
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                }
              })}

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) =>
                        setDiscountCode(e.target.value.toUpperCase())
                      }
                      placeholder="Enter discount code"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      aria-label="Discount code input"
                    />
                    {/* <FaTags className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                  </div>
                  <button
                    onClick={handleDiscountCode}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {discountMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      messageType === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    } transition-all duration-300`}
                    role="alert"
                    aria-live="polite"
                  >
                    {discountMessage}
                  </div>
                )}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(1)}</span>
                  </div>
                </div>

                <button
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  onClick={() => alert("Proceeding to checkout!")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-700">
              Your cart is empty
            </h1>
            <p className="text-gray-500 mt-2">
              Looks like you haven’t added anything to your cart yet.
            </p>
            <Link to="/products">
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
