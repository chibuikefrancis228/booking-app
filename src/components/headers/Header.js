import './header.css'
import { AuthContext } from '../../context/AuthContext';
import Airpline from "../../image/icons8_airplane_mode_on.ico"
import bed from "../../image/icons8_occupied_bed.ico"
import Tax from "../../image/icons8_taxi.ico"
import {useContext, useState} from 'react'
import {DateRange} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import { SearchContext } from "../../context/SearchContext";
import {  useNavigate } from "react-router-dom";




const Header = ({type}) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };



  const { dispatch } = useContext(SearchContext);

  

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  const { user } = useContext(AuthContext);
 
  return (

    
    <div className='header'>
      <div className='wrapper'>
      <div className='icon-item' ><img src={Airpline} alt='j'/>
      <p>airpline</p>
      </div>
      <div className='icon-item' ><img src={bed} alt=''/> 
      <p>stays</p>
      </div>
      <div className='icon-item' ><img src={Tax} alt=''/>
      <p>taxi</p>
      </div>
      </div>
      {type !== 'list' &&
       <><div className='title'>
      <h1>A Life of Discounts? it's Genius.</h1>
      <p>Get reworded for your travel-unlock instance savings 10% or more with a free francis.com account</p>
      </div>
      
       {!user && <button></button>}
      <div className='calender'>
        <div className='ca-wrapper'>
        <input type='text' placeholder='where are you going' className='tx' onChange={(e) => setDestination(e.target.value)}></input>
        </div>

        <div className='ca-wrapper'>
        <span onClick={()=>setOpenDate(!openDate)} className='date'>{`${format(dates[0].startDate, "dd/mm/yyyy")} to ${format(dates[0].startDate, "dd/mm/yyyy")}`}</span><br></br>
       {openDate   && <DateRange editableDateInputs={true}
         onChange={(item) => setDates([item.selection])}
          moveRangeOnFirstSelection={false}
           ranges={dates} className='dat'/>}
        </div>

        <div className='ca-wrapper'>
          <span onClick={()=> setOpenOptions(!openOptions)}>{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
            {openOptions && <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                       <div className='optionCounter'> 
                        <button disabled={options.adult <= 1} className='optionCounterButton' onClick={() => handleOption("adult", "d")}>-</button>
                        <span className='optionCounterNumber'>{options.adult}</span>
                        <button className='optionCounterButton' onClick={() => handleOption("adult", "i")}>+</button>
                        </div>
                     </div>

                     <div className="optionItem">
                      <span className="optionText">children</span>
                       <div className='optionCounter'>
                        <button disabled={options.children <= 0} className='optionCounterButton' onClick={() => handleOption("children", "d")}>-</button>
                        <span className='optionCounterNumber'>{options.children}</span>
                        <button className='optionCounterButton' onClick={() => handleOption("children", "i")}>+</button>
                        </div>
                     </div>

                     <div className="optionItem">
                      <span className="optionText">room</span>
                       <div className='optionCounter'>
                        <button disabled={options.room <= 1} className='optionCounterButton' onClick={() => handleOption("room", "d")}>-</button>
                        <span className='optionCounterNumber'>{options.room}</span>
                        <button className='optionCounterButton' onClick={() => handleOption("room", "i")}>+</button>
                        </div>
                     </div>
            </div>
}
        </div>  
  

        
        <div className='ca-wrapper'>
        <button onClick={handleSearch}>Search</button>
        </div> 
      </div></> }
  
    </div>
    
  );
};

export default Header
