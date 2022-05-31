import logo from './logo.svg';
import './normalize.css';
import './App.css';

import React, {useState, useEffect} from 'react';

import Header from './header/header';
import Footer from './footer/footer';

import Landing from './landing/landing';
import BookingManagement from './bookingManagement/BookingManagement';
import BookingTickets from './bookingTickets/bookingTickets';
import EnterProfile from './enterProfile/enterProfile';
import PersonalArea from './personalArea/personalArea';
import Register from './register/register';
import SearchResults from './searchResults/searchResults';
import ChoosePlace from './choosePlace/choosePlace';
//
//{true ? (
//        <Landing />
//      ) : (
//        <ChoosePlace />
//      )}


function App() {
    
    const [activeItem, setActiveItem] = useState('landing');
    
    
    
     useEffect(() => {
        console.log(activeItem)
      });

      let mainBlock;

      switch(activeItem) {
        case 'landing':  
          mainBlock = <Landing/>;
          break;
      
          case 'bookingManagement':  
          mainBlock = <BookingManagement/>;
          break;

          case 'bookingTickets':  
          mainBlock = <BookingTickets/>;
          break;

          case 'enterProfile':  
          mainBlock = <EnterProfile/>;
          break;

          case 'personalArea':  
          mainBlock = <PersonalArea/>;
          break;

          case 'register':  
          mainBlock = <Register/>;
          break;
          
          case 'register':  
          mainBlock = <Register/>;
          break;

          case 'searchResults':  
          mainBlock = <SearchResults/>;
          break;

          case 'ChoosePlace':  
          mainBlock = <ChoosePlace/>;
          break;

          default:
          mainBlock = <Landing/>

      }

  return (
       <>
          
      
          <Header changeMain={setActiveItem}/>
            
           {mainBlock}
      
          <Footer changeMain={setActiveItem}/>
       </>
  );
}

export default App;
