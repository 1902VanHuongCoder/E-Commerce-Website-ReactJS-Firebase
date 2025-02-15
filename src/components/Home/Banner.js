import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import banner from "../../assets/showcase.png";
const Banner = ({ data }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleType = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (search) => {
    if (search !== "" && search.toLowerCase() === "shirt") {
      const resultFiltered = data.filter(
        (product) => product.productType === "shirt"
      );
      navigate("/searchresult", {
        state: {
          products: resultFiltered,
          queryContent: search,
        },
      });
    } else if (search !== "" && search.toLowerCase() === "pant") {
      const resultFiltered = data.filter(
        (product) => product.productType === "pant"
      );
      navigate("/searchresult", {
        state: {
          products: resultFiltered,
          queryContent: search,
        },
      });
    } else if (search !== "" && search.toLowerCase() === "hat") {
      const resultFiltered = data.filter(
        (product) => product.productType === "hats"
      );
      navigate("/searchresult", {
        state: {
          products: resultFiltered,
          queryContent: search,
        },
      });
    } else if (search !== "") {
      const resultFiltered = data.filter((product) =>
        product.productName.toLowerCase().includes(search)
      );
      navigate("/searchresult", {
        state: {
          products: resultFiltered,
          queryContent: search,
        },
      });
    } else {
      console.log("Last condition runnn");
    }
  };
  return (
    // <div className="flex relative w-full bg-gradient-to-r from-violet-200 to-pink-200 h-[400px]">
    //   <div className="lg:w-1/2 w-full flex flex-col gap-y-4 justify-center items-center h-full lg:items-start lg:pl-[20px] xl:pl-[60px] 2xl:pl-[80px]">
    //     <h1 className="sm:text-6xl text-2xl font-semibold drop-shadow-xl text-[#ee4d2d]">
    //       The Clothes <br className="lg:block hidden" />
    //       World
    //     </h1>
    //     <p className="sm:text-xl text-sm font-semibold drop-shadow-xl text-[#ee4d2d]">
    //       You can find anything here
    //     </p>
    //     <form className="relative w-fit" onSubmit={() => handleSearch(search)}>
    //       <button
    //         type="submit"
    //         onClick={() => handleSearch(search)}
    //         className="absolute right-[10px] top-[5px] bg-[#e4e4e5] p-2 rounded-full"
    //       >
    //         <BsSearch />
    //       </button>
    //       <input
    //         id="search"
    //         className="outline-none rounded-lg h-10 w-[280px] border-[rgba(0,0,0,.2)]"
    //         type="text"
    //         autoComplete="on"
    //         placeholder="Product name..."
    //         onChange={handleType}
    //       />
    //     </form>
    //   </div>
    //   <div className="w-1/2 h-full relative lg:block hidden">
    //     <div className="w-[300px] h-[70px] bg-white rounded-lg shadow-lg absolute -left-[110px] top-[50px] flex">
    //       <img
    //         src={shoes1}
    //         alt="shoes1"
    //         width={100}
    //         className="rotate-[335deg] absolute left-[7%] "
    //       />
    //       <img
    //         src={shoes2}
    //         alt="shoes2"
    //         width={100}
    //         className="rotate-[335deg] absolute left-[36%]"
    //       />
    //       <img
    //         src={shoes3}
    //         alt="shoes3"
    //         width={100}
    //         className="rotate-[335deg] absolute left-[70%]"
    //       />
    //     </div>
    //     <div className="w-[300px] h-[70px] bg-white rounded-lg shadow-lg absolute -left-[150px] top-[160px] flex">
    //       <img
    //         src={hat1}
    //         alt="shoes1"
    //         width={100}
    //         className=" absolute left-[0%] top-[-10px]"
    //       />
    //       <img
    //         src={hat2}
    //         alt="shoes2"
    //         width={100}
    //         className=" absolute left-[36%] top-[-10px]"
    //       />
    //       <img
    //         src={hat3}
    //         alt="shoes3"
    //         width={100}
    //         className=" absolute left-[70%] top-[-10px]"
    //       />
    //     </div>
    //     <div className="w-[300px] h-[70px] bg-white rounded-lg shadow-lg absolute -left-[110px] top-[270px] flex">
    //       <img
    //         src={shirt1}
    //         alt="shoes1"
    //         width={100}
    //         className=" absolute left-[0%] top-[-10px]"
    //       />
    //       <img
    //         src={shirt2}
    //         alt="shoes2"
    //         width={100}
    //         className="  absolute left-[36%] top-[-10px]"
    //       />
    //       <img
    //         src={shirt3}
    //         alt="shoes3"
    //         width={100}
    //         className="  absolute left-[70%] top-[-10px]"
    //       />
    //     </div>
    //     <div className="absolute w-[550px] right-0 bottom-0">
    //       <img src={woman} alt="woman" className="w-fit h-fit" />
    //     </div>
    //   </div>
    // </div>
    <div className="w-full h-fit">
      <img src={banner} alt="banner" className="w-full h-auto" />
    </div>
  );
};

export default Banner;
