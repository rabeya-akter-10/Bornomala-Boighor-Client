import React from "react";

const Bookcard = ({ book }) => {
    const { bookName, image, sold, writerName, price, discounts } = book;
    const discountPrice = price - price * (discounts / 100);
    const roundPrice = Math.ceil(discountPrice);

    return (
        <div>
            <div className="flex flex-col justify-center items-center h-72 w-48 border ">
                <img className="w-[120px] h-44" src={image} alt={bookName} />
                <h1 className="text-sm font-bold">{bookName}</h1>
                <p className="text-xs">{writerName}</p>
                <div className="flex gap-2 text-xs font-medium">
                    <p className="line-through text-red-500">TK.{price}$</p>
                    <p className="text-green-500">TK.{roundPrice}</p>
                </div>
            </div>
        </div>
    );
};

export default Bookcard;
