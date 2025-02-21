import CustomerReview from "../components/section/customerreview";
import FeatureSection from "../components/section/feature";
import HeroSection from "../components/section/herosection";
import ShopButton from "../components/shopbutton";

export default function Home() {
  return (
    <>
    <HeroSection/>
    <FeatureSection/>
         <>
            <div className="bg-stone-100 text-center py-8 ">
                <h3 className="text-3xl font-semibold">Try It For Free. No Registration Needed.</h3>
            </div>
            <div className="bg-black flex items-center justify-around relative py-12 ">
                <div className="text-white text-5xl font-semibold">
                    <h3 className="px-16">Get 25% Off On Your First Purchase!</h3>
                </div>
                <ShopButton />
            </div>

        </>
        <CustomerReview/>
       

    </>
  )
}
