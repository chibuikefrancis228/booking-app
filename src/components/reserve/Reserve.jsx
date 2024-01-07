import React, { useEffect, useState ,useContext} from "react";
import "./reserve.css";
import cancel from "../../image/icons8_cancel.ico"
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const Reserve = ({setOpen, hotelId}) => {
  const  [bdatas, setbdata] = useState([])
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);


  useEffect(()=>{
    fetch(`http://localhost:4000/hotels/room/${hotelId}`)
    .then(res => res.json())
    .then(data => {
      setbdata(data)
      console.log(data)
  }
  )
  
  },[])

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/Room/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className='reserve'>
      <div className="rContainer">
      <img src={cancel} alt="" className="close"  onClick={() => setOpen(false)} />

      <span>Select your rooms:</span>
      {(typeof bdatas ==='undefined') ?(
      <p>Loading please wait</p>
    ) : (
      <>
        {
          bdatas.map((item)=>(
      <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            
            </div>
          ))}
            </>
          )}
      </div>
    </div>
  )
}

export default Reserve
