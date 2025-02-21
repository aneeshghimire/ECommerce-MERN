import PropTypes from "prop-types";

export function FeatureCard({icon: Icon, title,description } ) {
    return (
        <div className="flex bg-[#333333] text-white  py-8 px-10 ">
            <div className="flex justify-center mb-4 text-[#6a9739] ">
                <Icon className="w-8 h-8 mx-5 " />
            </div>
            <div>
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-gray-300 mt-2 text-xl">{description}</p>
            </div>
    </div>
    );
  }


  FeatureCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, 
  }