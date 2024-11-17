import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import formatToIDRCurrency from "../../utils/formatToIDRCurrency";
import { Link } from "react-router-dom";

export default function Card({ product }) {
  return (
    <Link
      to={`/products/${product.slug}` ?? ""}
      className='flex flex-col max-w-[370px] flex-wrap p-[5px] bg-[#B47B84] rounded-lg shadow-xl active:ring-5 hover:ring-[#543310] active:ring-[#543310] hover:ring-4 active:ring-2 active:ring-opacity-90'
    >
      <div className='flex flex-col max-w-[370px] flex-wrap p-[16px] bg-[#B47B84]'>
        <img
          src={product.imageUrl ?? ""}
          alt={product.name ?? "No name"}
          className='block max-h-[300px] mb-4 object-cover rounded-lg'
        />
        <div className='flex flex-col gap-2'>
          <h4 className='font-medium text-[20px] text-white'>{product.name ?? "No Name"}</h4>
          <span className='block font-medium text-[14px] text-[#eaeaea]'>
            {product.category ?? "Uncatagorized"}
          </span>
          <span className='block font-medium text-[20px] text-white'>
            {formatToIDRCurrency(product.price) ?? "Not for sale"}
          </span>
          <div>
            {product.stock <= 0 ? (
              <p className='text-xl font-semibold text-center text-red-600'>Out of Stock</p>
            ) : product.stock <= 25 && product.stock !== 0 ? (
              <>
                <p className='text-xl font-semibold text-center text-yellow-400'>Almost Sold Out</p>
                <Button
                  type='button'
                  className='inline-flex items-center justify-center gap-2 p-4 bg-[#543310] text-center hover:bg-[#B3A398] rounded-lg text-white active:bg-[#543310]'
                >
                  <FontAwesomeIcon icon={faCartShopping} className='mb-0' />
                  <span>Add to cart</span>
                </Button>
              </>
            ) : (
              <Button
                type='button'
                className='inline-flex items-center justify-center gap-2 p-4 bg-[#543310] text-center hover:bg-[#B3A398] rounded-lg text-white active:bg-[#543310]'
              >
                <FontAwesomeIcon icon={faCartShopping} className='mb-0' />
                <span>Add to cart</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  product: PropTypes.object,
};
