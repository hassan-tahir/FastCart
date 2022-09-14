import Link from "next/link";
import React from "react";

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
                      src={product.attributes.image_1.data && product.attributes.image_1.data.attributes.name}
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
    Authorization:
      "Bearer b730f65dc102cef4d448a275393cf999ec567fcf46bb45278b33c3bee723c3b5471d5646a8280720f0e402c127e2e5e6ae955215bb5146ec534ec7a13ecaa71a5a35802b39f228df029593fdf88d42ff7aa706a50bd66a17582f8ea826d95fbd2b1a37d5a1439106d13965669c91cb35c38e0227e4b920e8cac44b800ff1e596",
  };
  let data = await fetch("http://localhost:1337/api/products?populate=*", {
    headers: header,
  });
  let products = await data.json();
  return {
    props: { products },
  };
}
export default products;
