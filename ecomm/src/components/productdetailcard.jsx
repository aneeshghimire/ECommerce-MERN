import { CardContainer, CardBody, CardItem } from "./ui/3d-card"; // Adjust import as per your structure

export function ProductDetailsCard({ src }) {
  return (
    <CardContainer>
      <CardBody className="relative w-[40rem] sm:w-[45rem] xl:w-[40rem] h-[35rem] rounded-xl overflow-hidden shadow-lg">
        <CardItem translateZ="50">
          <img
            src={src}
            className="w-full h-full object-cover"
            alt="Product"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
