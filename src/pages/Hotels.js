import  './hotel.css'
import Navbar from "../components/navbar/Navbar"
import Header from "../components/headers/Header"
import back from "../../src/image/icons8_sort_left.ico"
import cancel from "../../src/image/icons8_cancel.ico"
import {useEffect, useState,useContext } from "react";
import { SearchContext } from "../../src/context/SearchContext";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Reserve from "../../src/components/reserve/Reserve";



const Hotels = () => {
  const location = useLocation();
  console.log(location)
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const  [bdatas, setbdata] = useState([])

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
    fetch(`/hotels/fine/${id}`)
    .then(res => res.json())
    .then(data => {
      setbdata(data)
      console.log(data)
  }
  )
  
  })
  
  const { dates, options } = useContext(SearchContext);
  
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {(typeof bdatas ==='undefined') ?(
        <p>Loading please wait</p>
      ) : (
       <div className='hotelContainer'>
        { open &&<div className='slider'>
          <img src={cancel} alt="" className="close" onClick={()=>setOpen(false)} />
          <img src={back} alt="" className="arrow" onClick={()=>handleMove("l")} />

          <div className="sliderWrapper">
              <img src={bdatas.photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <img src={back} alt="" className="arrow" onClick={()=>handleMove("r")} />
        </div> }
        <div className='hotelWrapper'>
            <h1 className='hotelTitle'>{bdatas.name}</h1>
            <div className='hotelAddess'>
                <span>Elso st 24 new york</span>
            </div>
            <span className='hotelDistance'>
                 Excellent location - {bdatas.distance}cm from center
            </span>
            <div className="hotelImages">
            {bdatas.photos?.map((photo, i) =>( 
              <div className="hotelImgWrapper" >
                 <img onClick={()=>handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{bdatas.title}</h1>
              <p className="hotelDesc">
              {bdatas.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
            <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
              <b>${days * bdatas.cheappestprice * options.room}</b> ({days}{" "}
                  nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
       </div>)}
       {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Hotels
