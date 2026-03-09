const Mid = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 bg-white">
      {/* Left: Bike Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1609630875171-b1321377ee65?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW90b3JiaWtlfGVufDB8fDB8fHww"
          alt="Electric Bike"
          className="w-full max-w-lg object-contain rounded-lg"
        />
      </div>

      {/* Right: Text and Features */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-12 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
          EXPERIENCE THE <br />
          FREEDOM OF <span className="text-orange-500">HOURLY BIKE RENTALS</span>
        </h1>

        <p className="text-gray-600 text-lg">
          Effortless rides, affordable pricing, and home delivery — your journey starts here.
        </p>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition">
          Book a Ride
        </button>

        {/* Stats and Avatar Section */}
        <div className="flex items-center space-x-6 mt-6">
          <div className="text-left">
            <p className="text-xl font-bold text-gray-800">5K+</p>
            <p className="text-gray-500 text-sm">Users already riding</p>

            {/* Avatar group */}
            <div className="flex mt-1">
              <img
                className="w-6 h-6 rounded-full border-2 border-white -ml-1"
                src="https://i.pravatar.cc/100?img=1"
                alt="User 1"
              />
              <img
                className="w-6 h-6 rounded-full border-2 border-white -ml-1"
                src="https://i.pravatar.cc/100?img=2"
                alt="User 2"
              />
              <img
                className="w-6 h-6 rounded-full border-2 border-white -ml-1"
                src="https://i.pravatar.cc/100?img=3"
                alt="User 3"
              />
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800">High-Quality Materials</p>
            <p className="text-sm text-gray-500 max-w-xs">
              Premium build and advanced construction ensure long lifespan and a smoother ride.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mid;
