import DashboardImg from "../assets/image/img10.png";
const Dashboard = () => {
  return (
    <div>
      <section className="text-gray-600 ml-40 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                src={DashboardImg}
                alt="Dashboard"
                className="object-cover object-center h-full w-full"
              />
              {/*  */}
            </div>
            <div className="flex flex-col items-center sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  AVION
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                    AVION PRODUCT
                  </h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p className="text-base">
                    Website Intern tomonidan ishlab chiqildi bazi funksiyalar
                    sekinroq ishlashish mumkin !!!
                    <span className="font-black my-5 text-xl text-red-700">
                      {" "}
                      N32 Gruh Legenda
                    </span>
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                  eum facilis tenetur quas aspernatur voluptates est natus
                  tempora ducimus! Sint a at id veniam iure tempore ad ipsum
                  harum repudiandae!
                </p>
                <a className="text-indigo-500 inline-flex items-center">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
