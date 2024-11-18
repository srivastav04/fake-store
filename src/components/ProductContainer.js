import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

export default function ProductContainer() {
  const data = useSelector((state) => state.cart.Items);
  console.log(data);
  return (
    <div className="grid place-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid lg:grid-cols-4 w-full ">
      {data.map((info, idx) => (
        <Card
          key={idx}
          id={info.id}
          image={info.image}
          description={info.description}
          title={info.title}
          price={info.price}
          category={info.category}
        />
      ))}
    </div>
  );
}
