import Button from "../../components/Button";

const Hero = () => {
  return (
    <div className="parent min-h-[300px] lg:h-screen relative w-full flex items-center justify-end p-4">
      <div className="child bg-[#fff3e3] max-w-[60%] lg:max-w-[45%] lg:absolute lg:mr-[77px] lg:bottom-10 lg:right-0 pl-[20px] pr-[20px] pt-[30px] pb-[20px] text-left rounded-xl">
        <p className="font-poppins font-semibold text-graydarkest text-sm md:text-base">New Arrival</p>
        <h1 className="text-[#B88E2F] font-bold text-2xl md:text-[52px] leading-tight">
          Discover Our
          <br />New Collection
        </h1>
        <p className="font-poppins font-medium text-sm md:text-lg text-graydarkest mt-4">
          Explore our latest designs, crafted for modern living. Discover comfort and style for your home.
        </p>
        <Button label="BUY NOW" variant="hero"/>
      </div>
    </div>
  );
};

export default Hero;
