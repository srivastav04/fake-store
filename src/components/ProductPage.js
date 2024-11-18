import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADD_ITEM } from "../features/cartActions";

export function ProductPage() {
  const location = useLocation();
  const item = location.state;

  const dispatch = useDispatch();
  console.log(item);
  if (!item) return <div>Product not found</div>;
  return (
    <div class="bg-gray-100 dark:bg-gray-800 py-8" id="top">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
          <div class="md:flex-1 px-4">
            <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                class="w-full h-full object-cotain"
                src={item.image}
                alt="Product Image"
              />
            </div>
            <div class="flex -mx-2 mb-4">
              <div class="w-1/2 px-2">
                <button
                  class="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={() =>
                    dispatch(
                      ADD_ITEM({
                        id: item.id,
                        image: item.image,
                        description: item.description,
                        title: item.title,
                        price: item.price,
                        category: item.category,
                        quantity: 1,
                      })
                    )
                  }
                >
                  Add to Cart
                </button>
              </div>
              <div class="w-1/2 px-2">
                <button class="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div class="md:flex-1 px-4">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {item.title}
            </h2>

            <div class="flex mb-4">
              <div class="mr-4">
                <span class="font-extrabold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span class="text-gray-600 dark:text-gray-300">
                  ${item.price}
                </span>
              </div>
              <div>
                <span class="font-bold text-gray-700 dark:text-gray-300">
                  Availability:
                </span>
                <span class="text-gray-600 dark:text-gray-300">In Stock</span>
              </div>
            </div>

            <div>
              <span class="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
