'use client';
import { useState } from 'react';
import Carousel, {
  Slider,
  SliderContainer,
  SliderDotButton,
} from '../components/core/carousel';
import { motion } from 'framer-motion';

function ProductCard({ name, category, price, image }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((prevState) => !prevState);
  };

  const OPTIONS = { loop: true };

  return (
    <div className="w-full max-w-[350px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
  <div className="relative">
    {/* Image Carousel */}
    <Carousel options={OPTIONS} isAutoPlay={true} className="h-72 relative">
      <SliderContainer className="gap-2 h-full">
        <Slider className="w-full h-full">
          <img
            src={image}
            alt={name}
            width={400}
            height={400}
            className="w-full h-full rounded-t-lg object-cover"
          />
        </Slider>
      </SliderContainer>
      <div className="flex justify-center py-2 absolute bottom-0 z-10 w-full">
        <SliderDotButton activeclass="bg-black" />
      </div>
    </Carousel>
  </div>

  {/* Category */}
  <div className="text-center py-2">
    <span className="text-sm text-gray-500 font-semibold uppercase tracking-wider">{category}</span>
  </div>

  {/* Product Info */}
  <div className="text-center px-4 pb-4">
    <h1 className="font-semibold text-xl text-gray-900">{name}</h1>
    <div className="flex justify-center mt-1 mb-2">
      <span className="text-gray-400">★★★★★</span>
    </div>
    <span className="font-bold text-lg text-gray-800">£{price.toFixed(2)}</span>
  </div>
</div>
      
  );
}

export default ProductCard;