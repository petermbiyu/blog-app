const Hero = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-20 text-xl">
        Welcome to{" "}
        <span className="font-bold">
          Mbiyu<span className="text-amber-600">Academics</span>
        </span>
      </h2>
      <p className="text-[1.1rem]">
        Get the latest and trending information about academic and educational
        content around the country.
      </p>
      <div className="w-full mt-10">
        <form action="" className="border border-gray-900 w-120 mx-auto flex">
          <input
            type="email"
            name="subscribe"
            placeholder="Enter your email..."
            className="flex-3 px-3 py-2 outline-none italic font-bold"
          />
          <label
            htmlFor="subscribe"
            className="flex-1 text-center my-auto py-2 font-semibold bg-amber-400"
          >
            Subscribe
          </label>
        </form>
      </div>
    </div>
  );
};

export default Hero;
