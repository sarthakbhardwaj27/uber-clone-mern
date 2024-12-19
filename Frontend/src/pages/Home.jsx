import React, {useRef, useState} from "react";
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {

  const [pickup, setpickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panel, setpanel] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null);


  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function(){
    if(panel){
      gsap.to(panelRef.current, {
        height: '70%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    }else{
      gsap.to(panelRef.current, {
        height: '0%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panel])

  return (
    <div className="h-screen w-screen relative">
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
          <h5 ref={panelCloseRef} onClick={()=>{
            setpanel(false);
          }} className="opacity-0 absolute right-6 top-6 text-2xl">
          <i className="ri-arrow-down-wide-line"></i>
          </h5>
            <h4 className="text-2xl font-semibold">Find trip</h4>
            <form onSubmit={(e)=>{
              submitHandler(e);
            }}>
              <input
              onClick={()=>{
                setpanel(true);
              }}
              value={pickup}
              onChange={(e)=>setpickup(e.target.value)}
                className="bg-[#eee] px-8 py-2 text-base rounded-large w-full mb-4 mt-6"
                type="text"
                placeholder="Add a pick-up location"
              />
              <input
              onClick={()=>{
                setpanel(true);
              }}
              value={destination}
              onChange={(e)=>setDestination(e.target.value)}
                className="bg-[#eee] px-8 py-2 text-base rounded-large w-full"
                type="text"
                placeholder="Add a drop-off location"
              />
            </form>
          </div>
          <div ref={panelRef} className="bg-red-500 h-0">
            <LocationSearchPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
