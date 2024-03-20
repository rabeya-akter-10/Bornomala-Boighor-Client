import React from "react";
import { Link } from "react-router-dom";

const Bookcard = ({ book }) => {
    const { bookName, image, sold, writerName, price, discounts, _id } = book;
    const discountPrice = price - price * (discounts / 100);
    const roundPrice = Math.ceil(discountPrice);

    return (
        <div className="relative w-fit">
            <Link
                to={`/books/${_id}`}
                className="flex flex-col justify-center items-center h-72 w-48 border border-b-green-600 border-r-green-600  hover:shadow-xl shadow-sm rounded-sm p-2"
            >
                <img
                    className="w-[120px] h-44 mb-2"
                    src={image}
                    alt={bookName}
                />
                <h1 className="text-sm font-bold">{bookName}</h1>
                <p className="text-xs">{writerName}</p>
                <div className="flex gap-2 text-xs font-medium">
                    {discounts > 0 && (
                        <p className="line-through text-red-500">TK.{price}</p>
                    )}
                    <p className="text-green-500">TK.{roundPrice}</p>
                </div>
                {sold > 0 && (
                    <p className="text-xs font-medium text-warning absolute left-4 bottom-4">
                        Sold: {sold}
                    </p>
                )}

                {discounts > 0 && (
                    <div className="absolute z-10 bg-green-600 w-12 h-10 rounded-ss-badge flex items-center justify-center -bottom-0 -right-0 text-white font-semibold text-xs ">
                        <p className="leading-none">
                            <span className="m-0 leading-none">
                                {discounts}%
                            </span>
                            <br />
                            <span className=" leading-none">Off</span>
                        </p>
                    </div>
                )}
            </Link>
        </div>
    );
};

export default Bookcard;
