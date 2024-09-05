const Hero = () => {
  return (
    <div className="h-screen relative">
      <div className="bg-[#fff3e3] absolute mr-[77px] top-36 left-1/2 pl-[39px] pr-[42px] pt-[62px] pb-[37px] text-left rounded-xl">
        <p className="font-poppins font-semibold text-graydarkest">New Arrival</p>
        <h1 className="text-[#B88E2F] font-bold text-[52px] leading-tight">
          Discover Our
           <br/>New Collection
        </h1>
        <p className="font-poppins font-medium text-lg text-graydarkest ">
        Explore our latest designs, crafted for modern living. Discover comfort and style for your home.
        </p>
        <button className="bg-[#B88E2F] text-white py-[25px] px-[72px] mt-14 font-bold">BUY NOW</button>
      </div>
    </div>
  );
};

export default Hero;
