import Link from "next/link";
import React from "react";
import {token} from '../config/config';
function products(props) {
  return (
    <div className="container mx-auto px-4">
      <section className="text-gray-600 body-font">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
          All Products {props.name}
        </h1>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {props.products.data.map((product) => {
              return (
                <Link href={`/product/${product.attributes.slug}`}>
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer" key={product.id}>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={product.attributes.image}
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      CATEGORY
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {product.attributes.product_name}
                    </h2>
                    <p className="mt-1">Rs. {product.attributes.price}</p>
                  </div>
                </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
export async function getServerSideProps(context) {
  let header = {
    Authorization: token };
  let data = await fetch("http://localhost:1337/api/products?populate=*", {
    headers: header,
  });
  let products = await data.json();
  return {
    props: { products },
  };
}
export default products;
