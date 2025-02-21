
import { FaTruck } from "react-icons/fa";
import { RiContactsBook3Fill } from "react-icons/ri";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaRecycle } from "react-icons/fa";
import { FeatureCard } from "../featurecard";




export default function FeatureSection() {

    const features = [
        {
          icon: FaTruck,
          title: "Free Shipping",
          description: "Above $5 Only",
        },
        {
          icon: RiContactsBook3Fill,
          title: "Certified Organic",
          description: "100% Guarantee",
        },
        {
          icon: FaMoneyCheckAlt,
          title: "Huge Savings",
          description: "At Lowest Price",
        },
        {
          icon: FaRecycle,
          title: "Easy Returns",
          description: "No Questions Asked",
        },
      ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-32 py-10 bg-black">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  )
}
