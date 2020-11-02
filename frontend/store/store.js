import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../components/root_reducexxr';

const menuItems = [
  { id:'7',
    header: "BURRITO",
    image: "burrito.png",
    subheader: "Your choice of freshly grilled meat or sofritas wrapped in a warm flour tortilla with rice, beans, or fajita veggies, and topped with guac, salsa, queso blanco, sour cream or cheese.",
    categories:[
      {
        header: "FILLING",
        subheader: "Choose up to two.",
        choices: ["6601","6602","6603","6604","6605","6606","6608","extra-m"]
      },
      {
        header: "RICE",
        subheader: null,
        choices: ["5001","5002"]
      },
      {
        header: "BEANS",
        subheader: null,
        choices: ["5051","5052"]
      },
      {
        header: "TOP THINGS OFF",
        subheader: null,
        choices: ["1029","5101","5201","5202","5203","5204","5251","5252","5301","5351","5353"]
      },
      {
        header: "OPTIONS",
        subheader: null,
        choices: ["5501-b"]
      },            
      {
        header: "SIDES",
        subheader: null,
        choices: ["1005","1006","1007","1008","1015","1029","1032","1033","5301"]
      },
      {
        header: "DRINKS",
        subheader: null,
        choices: ["1018","1019","2051","2052","2054","2101","2102","2103","2104","2201","2805","2810","5552","5553","5554"]
      }
    ]
  },
  { 
    id:"45",
    header: "BURRITO BOWL",
    subheader: "Everything else you need to round out your meal.",
    image: "bowl.jpg",
    categories:[
      {
        header: "SIDES",
        subheader: null,
        choices: ["1029","5101","5201","5202","5203","5204","5251","5252","5301","5351","5353"]
      },
      {
        header: "DRINKS",
        subheader: null,
        choices: ["1018","1019","2051","2052","2054","2101","2102","2103","2104","2201","2805","2810","5552","5553","5554"]
      }
    ]
  },
  { id:'5',
    header: "SALAD",
    subheader: "Everything else you need to round out your meal.",
    image: "salad.jpg",
    categories:[
      {
        header: "SIDES",
        subheader: null,
        choices: ["1029","5101","5201","5202","5203","5204","5251","5252","5301","5351","5353"]
      },
      {
        header: "DRINKS",
        subheader: null,
        choices: ["1018","1019","2051","2052","2054","2101","2102","2103","2104","2201","2805","2810","5552","5553","5554"]
      }
    ]
  },
  { id: '14',
    header: "TACOS",
    subheader: "Everything else you need to round out your meal.",
    image: "tacos.jpg",
    categories:[
      {
        header: "SIDES",
        subheader: null,
        choices: ["1029","5101","5201","5202","5203","5204","5251","5252","5301","5351","5353"]
      },
      {
        header: "DRINKS",
        subheader: null,
        choices: ["1018","1019","2051","2052","2054","2101","2102","2103","2104","2201","2805","2810","5552","5553","5554"]
      }
    ]
  },
  { id:"34",
    header: "SIDES & DRINKS",
    subheader: "Everything else you need to round out your meal.",
    image: "chips-quac.jpg",
    categories:[
      {
        header: "SIDES",
        subheader: null,
        choices: ["1029","5101","5201","5202","5203","5204","5251","5252","5301","5351","5353"]
      },
      {
        header: "DRINKS",
        subheader: null,
        choices: ["1018","1019","2051","2052","2054","2101","2102","2103","2104","2201","2805","2810","5552","5553","5554"]
      }
    ]
  },
  { id:"34",
    header: "KID'S MEAL",
    subheader: "Everything else you need to round out your meal.",
    image: "kidsmeal.jpg",
    categories:[
      {
        header: "SIDES",
        subheader: null,
        choices: ["1029","5101","5201","5202","5203","5204","5251","5252","5301","5351","5353"]
      },
      {
        header: "DRINKS",
        subheader: null,
        choices: ["1018","1019","2051","2052","2054","2101","2102","2103","2104","2201","2805","2810","5552","5553","5554"]
      }
    ]
  },  
]




const configureStore = (preloadedState = {entities: {menu:menuItems}}) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  )
);

export default configureStore;
