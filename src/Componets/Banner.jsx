const Banner =() => {

  return (
    <div className='container mx-auto px-4 py-8 rounded'>
      <div className='h-56 md:h-72 w-full bg-slate-200 relative flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-3xl md:text-5xl font-bold mb-4'>Welcome to Elite eMart</h1>
          <p className='text-lg md:text-xl mb-6'>Discover the best deals on all electronic products.</p>
          <button className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300'>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
