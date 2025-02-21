import { ThreeDCardDemo } from "../homecard";
import ReviewCard from "../reviewcard";
import Logo from "../../assets/logo.png"
import Leaf from "../../assets/leaf.png"
export default function CustomerReview() {
  return (
    <div className="mb-10">
        <div className=" flex flex-col items-center text-center py-10 m-6">

            <h2 className="text-5xl font-bold">Customer Reviews</h2>
            <div className=" mt-5">
                <img src={Leaf} className="h-20 w-28" alt="Leaf Icon" />
            </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3  px-4 items-center">
        {/* Left Review Card */}
            <ReviewCard
                text="I was initially hesitant to order online, but this experience completely changed my perspective! The products were fresh and the customer service was exceptional."
                author="Mila Kunis"
                image={Logo}
            />

            {/* Center Card (Fixed Height) */}
            <div className="flex justify-center">
                <ThreeDCardDemo src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/06/sydney-rae-668606-unsplash.jpg"/>
            </div>

            {/* Right Review Card */}
            <ReviewCard
                text="This was my first time shopping here, and I am beyond satisfied. The product quality exceeded my expectations, and the entire process was smooth."
                author="Mila Kunis"
                image={Logo}
            />
        </div>

    </div>
  )
}
