import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import { use } from "react";

const Home = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panel, setpanel] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setvehiclePanel] = useState(false)
  const vehiclePanelRef = useRef(null)
  //const [panelOpen, setPanelOpen] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panel) {
      gsap.to(panelRef.current, {
        height: "70%",
        overflow: "hidden", // Ensures no overflow during animation
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        overflow: "hidden", // Hides overflow when the panel is collapsed
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panel]);

  // for vehicle panel to popup
  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }else{
      gsap.to(vehiclePanelRef.current, 
        {transform: 'translateY(100%)'

        })
    }
  }, [vehiclePanel])


  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-6 top-6"
        src="https://icon2.cleanpng.com/20181110/yiz/kisspng-logo-brand-product-design-font-1713924274344.webp"
      />
      <div className="h-screen w-screen">
        {/* image for maps */}
        <img
          className="h-full w-full object-cover"
          src="https://cdn.dribbble.com/users/914217/screenshots/4506553/media/66b3d16f627edc27b44c023e4ec40b28.gif"
        />
      </div>
      <div>
        <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
          <div className="h-[30%] bg-white  p-5">
            <h5
              ref={panelCloseRef}
              onClick={() => {
                setpanel(false);
              }}
              className="opacity-0 absolute right-6 top-6 text-2xl"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className="text-2xl font-semibold">Find trip</h4>
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <input
                onClick={() => {
                  setpanel(true);
                }}
                value={pickup}
                onChange={(e) => setpickup(e.target.value)}
                className="bg-[#eee] px-8 py-2 text-base rounded-large w-full mb-4 mt-6"
                type="text"
                placeholder="Add a pick-up location"
              />
              <input
                onClick={() => {
                  setpanel(true);
                }}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-[#eee] px-8 py-2 text-base rounded-large w-full"
                type="text"
                placeholder="Add a drop-off location"
              />
            </form>
          </div>
          <div ref={panelRef} className="bg-white h-screen">
            <LocationSearchPanel setpanel={setpanel} setvehiclePanel={setvehiclePanel} />
          </div>
        </div>
        
      </div>
      <div ref={vehiclePanelRef} className="w-full fixed z-10 bottom-0 bg-white p-3 translate-y-full">
        <h3 className="text-2xl mb-4 mt-4 font-semibold">Choose your Vehicle</h3>
        <div className="flex items-center justify-between px-3 py-2 mb-5 border-2 active:border-black rounded-lg">
          <img className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
            alt=""
          />
          <div>
            <h4 className="text-large">UberGo 4</h4>
            <h5>2 mins away</h5>
            <p className="text-xs text-gray-600">Affordable, compact rides</p>
          </div>
          <h2>$193.20</h2>
        </div>
        <div className="flex items-center justify-between px-3 py-2 mb-5 border-2 active:border-black rounded-lg">
          <img className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
            alt=""
          />
          <div>
            <h4 className="text-large">UberGo 4</h4>
            <h5>2 mins away</h5>
            <p className="text-xs text-gray-600">Affordable, compact rides</p>
          </div>
          <h2>$193.20</h2>
        </div>
        <div className="flex items-center justify-between px-3 py-2 mb-5 border-2 active:border-black rounded-lg">
          <img className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png"
            alt=""
          />
          <div>
            <h4 className="text-large">UberGo 4</h4>
            <h5>2 mins away</h5>
            <p className="text-xs text-gray-600">Affordable, compact rides</p>
          </div>
          <h2>$193.20</h2>
        </div>
        
        
      </div>
    </div>
  );
};

export default Home;
