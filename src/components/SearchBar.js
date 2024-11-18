import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const App = () => {
  const [value, setValue] = useState({
    val: "",
    info: {},
  });
  const data = useSelector((state) => state.cart.Items);

  const handleInputChange = (e) => {
    setValue({ ...value, val: e.target.value });
  };
  console.log(value.val, value.info);

  return (
    <div className=" flex justify-center ">
      <div className="flex relative w-[70%]">
        <input
          type="text"
          placeholder="Type here"
          value={value.val}
          onChange={handleInputChange}
          className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Link to={`/productpage/${value.info.title}`} state={value.info}>
          <button className="btn btn-primary ml-4">Search</button>
        </Link>
        {value.val && (
          <div className="absolute top-full left-0 w-full bg-white border border-none   rounded-lg shadow-lg mt-1 z-10 max-h-48 overflow-y-auto">
            {data
              .filter(
                (item) =>
                  item.title
                    .toLowerCase()
                    .startsWith(value.val.toLowerCase()) &&
                  item.title.toLowerCase() !== value.val.toLowerCase()
              )
              .slice(0, 5)
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => setValue({ val: item.title, info: item })}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {item.title}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
