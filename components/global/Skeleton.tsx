const Skeleton = () => {
  const loopItems = Array(4).fill(0);

  return (
    <div className="animate-pulse w-4/5 md:w-1/2 mx-auto">
      <h1 className="text-center text-xl mb-8">Explore Diary</h1>
      {loopItems.map((_, index) => (
        <div key={index}>
          <div className="flex flex-1 gap-2 px-5 pb-5 pt-3">
            <div className="rounded-full bg-gray-800 w-11 h-11" />
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex gap-2 items-center rounded-full bg-gray-800 w-32 h-5"></div>
                <div className="flex gap-2 items-center rounded-full bg-gray-800 w-24 h-5"></div>
              </div>
              <div className="flex gap-2 items-center rounded-full bg-gray-800 w-50 md:w-96 h-5"></div>
              <div className="flex gap-2 items-center rounded-full bg-gray-800 w-50 md:w-96 h-5"></div>
              <div className="flex gap-2 items-center rounded-full bg-gray-800 w-50 md:w-96 h-5"></div>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
