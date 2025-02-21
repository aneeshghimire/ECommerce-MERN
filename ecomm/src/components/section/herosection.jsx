import HeroImage from "../../assets/hero.png"
import Leaf from "../../assets/leaf.png"
import HeroBGImage from "../../assets/heroimage.png"
import ShopButton from "../shopbutton"
export default function HeroSection() {
  return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#f8f6f3] py-32 px-32" >
             
            {/* Hero Image */}
            <div className="flex justify-center md:w-1/2 px-7 py-5">
                <img src={HeroImage} width={750} height={750} alt='Hero Image' className="object-contain" />
            </div>
            
            {/* Hero Information */}
            <div className="relative md:w-1/2 md:text-left space-y-7 m-5 p-16" >
            
                <div className="flex justify-center md:justify-start">
                    <img src={Leaf} width={100} height={50} alt='Small Leaf' />
                </div>
                <h2 className="text-sm md:text-4xl text-gray-950 font-bold">Best Quality Products</h2>
                <h4 className="text-6xl font-bold font-sans text-wrap text-black">Join The Organic Movement</h4>
                <p className="text-black text-xl max-w-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae tempora quis adipisci nisi aut.</p>
                <ShopButton />
            </div>
        </div>
  )
}
