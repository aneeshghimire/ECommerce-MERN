import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Link } from "react-router-dom";

export function ThreeDCardDemo({src}) {
  return (
    <CardContainer >
      <CardBody className="relative w-[30rem] sm:w-[40rem] xl:w-[30rem]  h-auto rounded-xl overflow-hidden shadow-lg">
        <CardItem translateZ="50">
          <img
            src={src}
            className=""
            alt="Vegetables"
          />
        </CardItem>
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-center p-6">
          <CardItem
            translateZ="50"
            className="text-white text-4xl font-bold"
          >
            Deal Of The Day <br /> 15% Off On All Vegetables!
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-white text-lg mt-2"
          >
            Explore our website for shopping more.
          </CardItem>
          <CardItem translateZ="100" className="mt-4">
            <Link
              to="/everything"
              className="px-6 py-3 bg-green-600 text-white text-sm font-bold rounded-lg flex items-center"
            >
              SHOP NOW →
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
