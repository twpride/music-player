import { connect } from 'react-redux';
import React from 'react';
import './item.css'


const cards = {
  "1002":
  {
    "itemCategory": "side",
    "itemId": "cmg-1002.png",
    "itemName": "Chips",
    "unitPrice": 1.45,
    "calories": "540",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "1003":
  {
    "itemCategory": "side",
    "itemId": "cmg-1003.png",
    "itemName": "Chips & Guacamole",
    "unitPrice": 3.65,
    "calories": "770",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "1005":
  {
    "itemCategory": "side",
    "itemId": "cmg-1005.png",
    "itemName": "Chips & Fresh Tomato Salsa",
    "unitPrice": 2.0,
    "calories": "570",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "1006":
  {
    "itemCategory": "side",
    "itemId": "cmg-1006.png",
    "itemName": "Chips & Tomatillo-Green Chili Salsa",
    "unitPrice": 2.0,
    "calories": "560",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "1007":
  {
    "itemCategory": "side",
    "itemId": "cmg-1007.png",
    "itemName": "Chips & Tomatillo-Red Chili Salsa",
    "unitPrice": 2.0,
    "calories": "570",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "1008":
  {
    "itemCategory": "side",
    "itemId": "cmg-1008.png",
    "itemName": "Chips & Roasted Chili-Corn Salsa",
    "unitPrice": 2.0,
    "calories": "620",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "1015":
  {
    "itemCategory": "side",
    "itemId": "cmg-1015.png",
    "itemName": "Large Chips & Large Guacamole",
    "unitPrice": 5.95,
    "calories": "1270",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "1018":
  {
    "itemCategory": "drink",
    "itemId": "cmg-1018.png",
    "itemName": "32 fl oz Soda/Iced Tea",
    "unitPrice": 2.05,
    "calories": "0 - 250",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "1019":
  {
    "itemCategory": "drink",
    "itemId": "cmg-1019.png",
    "itemName": "22 fl oz Soda/Iced Tea",
    "unitPrice": 2.35,
    "calories": "0 - 300",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "1029":
  {
    "itemCategory": "topping",
    "itemId": "cmg-1029.png",
    "itemName": "Queso Blanco",
    "unitPrice": 1.3,
    "calories": "120",
    "customization": ["3"],
    "burrito": true,
    "sides & drinks": null
  },
  "1029-s":
  {
    "itemCategory": "side",
    "itemId": "cmg-1029.png",
    "itemName": "Queso Blanco",
    "unitPrice": 1.3,
    "calories": "120",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "1032":
  {
    "itemCategory": "side",
    "itemId": "cmg-1032.png",
    "itemName": "Chips & Queso Blanco",
    "unitPrice": 3.65,
    "calories": "780",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "1033":
  {
    "itemCategory": "side",
    "itemId": "cmg-1033.png",
    "itemName": "Large Chips & Large Queso Blanco",
    "unitPrice": 5.85,
    "calories": "1290",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "1402":
  {
    "itemCategory": "side",
    "itemId": "cmg-1402.png",
    "itemName": "Kid's Fruit",
    "unitPrice": 0.0,
    "calories": "35",
    "customization": null,
    "burrito": true,
    "sides & drinks": null
  },
  "2051":
  {
    "itemCategory": "drink",
    "itemId": "cmg-2051.png",
    "itemName": "Blackberry Izze",
    "unitPrice": 2.8,
    "calories": "170",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "2052":
  {
    "itemCategory": "drink",
    "itemId": "cmg-2052.png",
    "itemName": "Grapefruit Izze",
    "unitPrice": 2.8,
    "calories": "160",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "2054":
  {
    "itemCategory": "drink",
    "itemId": "cmg-2054.png",
    "itemName": "Clementine Izze",
    "unitPrice": 2.8,
    "calories": "160",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "2101":
  {
    "itemCategory": "drink",
    "itemId": "cmg-2101.png",
    "itemName": "Pressed Apple Juice",
    "unitPrice": 2.8,
    "calories": "240",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "2102":
  {
    "itemCategory": "drink",
    "itemId": "cmg-2102.png",
    "itemName": "Pineapple Orange Banana Juice",
    "unitPrice": 2.8,
    "calories": "280",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "2103":
  {
    "itemCategory": "drink",
    "itemId": "cmg-2103.png",
    "itemName": "Peach Orange Juice",
    "unitPrice": 2.8,
    "calories": "220",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "2104":
  {
    "itemCategory": "drink",
    "itemId": "cmg-2104.png",
    "itemName": "Pomegranate Cherry Juice",
    "unitPrice": 2.8,
    "calories": "240",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "2201":
  {
    "itemCategory": "drink",
    "itemId": "cmg-2201.png",
    "itemName": "Bottled Water",
    "unitPrice": 2.45,
    "calories": "0",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "2805":
  {
    "itemCategory": "drink",
    "itemId": "cmg-2805.png",
    "itemName": "San Pellegrino Sparkling",
    "unitPrice": 2.75,
    "calories": "0",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "2810":
  {
    "itemCategory": "drink",
    "itemId": "cmg-2810.png",
    "itemName": "Mexican Coca-Cola",
    "unitPrice": 3.0,
    "calories": "150",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "5001":
  {
    "itemCategory": "rice",
    "itemId": "cmg-5001.png",
    "itemName": "White Rice",
    "unitPrice": 0.0,
    "calories": "210",
    "customization": ["1", "2", "3", "4"],
    "burrito": true,
    "sides & drinks": null
  },
  "5002":
  {
    "itemCategory": "rice",
    "itemId": "cmg-5002.png",
    "itemName": "Brown Rice",
    "unitPrice": 0.0,
    "calories": "210",
    "customization": ["1", "2", "3", "4"],
    "burrito": true,
    "sides & drinks": null
  },
  "5051":
  {
    "itemCategory": "beans",
    "itemId": "cmg-5051.png",
    "itemName": "Black Beans",
    "unitPrice": 0.0,
    "calories": "130",
    "customization": ["1", "2", "3", "4"],
    "burrito": true,
    "sides & drinks": null
  },
  "5052":
  {
    "itemCategory": "beans",
    "itemId": "cmg-5052.png",
    "itemName": "Pinto Beans",
    "unitPrice": 0.0,
    "calories": "130",
    "customization": ["1", "2", "3", "4"],
    "burrito": true,
    "sides & drinks": null
  },
  "5101":
  {
    "itemCategory": "topping",
    "itemId": "cmg-5101.png",
    "itemName": "Fajita Veggies",
    "unitPrice": 0.0,
    "calories": "20",
    "customization": ["1", "2", "3"],
    "burrito": true,
    "sides & drinks": null
  },
  "5201":
  {
    "itemCategory": "topping",
    "itemId": "cmg-5201.png",
    "itemName": "Fresh Tomato Salsa",
    "unitPrice": 0.0,
    "calories": "25",
    "customization": ["1", "2", "3"],
    "burrito": true,
    "sides & drinks": null
  },
  "5202":
  {
    "itemCategory": "topping",
    "itemId": "cmg-5202.png",
    "itemName": "Roasted Chili-Corn Salsa",
    "unitPrice": 0.0,
    "calories": "80",
    "customization": ["1", "2", "3"],
    "burrito": true,
    "sides & drinks": null
  },
  "5203":
  {
    "itemCategory": "topping",
    "itemId": "cmg-5203.png",
    "itemName": "Tomatillo-Green Chili Salsa",
    "unitPrice": 0.0,
    "calories": "15",
    "customization": ["1", "2", "3"],
    "burrito": true,
    "sides & drinks": null
  },
  "5204":
  {
    "itemCategory": "topping",
    "itemId": "cmg-5204.png",
    "itemName": "Tomatillo-Red Chili Salsa",
    "unitPrice": 0.0,
    "calories": "30",
    "customization": ["1", "2", "3"],
    "burrito": true,
    "sides & drinks": null
  },
  "5251":
  {
    "itemCategory": "topping",
    "itemId": "cmg-5251.png",
    "itemName": "Sour Cream",
    "unitPrice": 0.0,
    "calories": "110",
    "customization": ["1", "2", "3"],
    "burrito": true,
    "sides & drinks": null
  },
  "5252":
  {
    "itemCategory": "topping",
    "itemId": "cmg-5252.png",
    "itemName": "Cheese",
    "unitPrice": 0.0,
    "calories": "110",
    "customization": ["1", "2", "3"],
    "burrito": true,
    "sides & drinks": null
  },
  "5301":
  {
    "itemCategory": "topping",
    "itemId": "cmg-5301.png",
    "itemName": "Guacamole",
    "unitPrice": 2.2,
    "calories": "230",
    "customization": ["3"],
    "burrito": true,
    "sides & drinks": null
  },
  "5301-s":
  {
    "itemCategory": "side",
    "itemId": "cmg-5301.png",
    "itemName": "Guacamole",
    "unitPrice": 2.2,
    "calories": "230",
    "customization": null,
    "burrito": true,
    "sides & drinks": true
  },
  "5351":
  {
    "itemCategory": "topping",
    "itemId": "cmg-5351.png",
    "itemName": "Romaine Lettuce",
    "unitPrice": 0.0,
    "calories": "5",
    "customization": ["1", "2"],
    "burrito": true,
    "sides & drinks": null
  },
  "5353":
  {
    "itemCategory": "topping",
    "itemId": "cmg-5353.png",
    "itemName": "Chipotle-Honey Vinaigrette",
    "unitPrice": 0.0,
    "calories": "220",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "5401":
  {
    "itemCategory": "tortilla",
    "itemId": "cmg-5401.png",
    "itemName": "Soft Flour Tortilla",
    "unitPrice": 0.0,
    "calories": "80",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "5501":
  {
    "itemCategory": "tortilla",
    "itemId": "cmg-5501.png",
    "itemName": "Tortilla on the Side",
    "unitPrice": 0.0,
    "calories": "320",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "5501-b":
  {
    "itemCategory": "tortilla",
    "itemId": "cmg-5501.png",
    "itemName": "Double Wrap with Tortilla",
    "unitPrice": 0.0,
    "calories": "320",
    "customization": null,
    "burrito": true,
    "sides & drinks": null
  },
  "5503":
  {
    "itemCategory": "tortilla",
    "itemId": "cmg-5503.png",
    "itemName": "Crispy Corn Tortilla",
    "unitPrice": 0.0,
    "calories": "70",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "5552":
  {
    "itemCategory": "drink",
    "itemId": "cmg-5552.png",
    "itemName": "Organic Apple Juice",
    "unitPrice": 0.0,
    "calories": "100",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "5553":
  {
    "itemCategory": "drink",
    "itemId": "cmg-5553.png",
    "itemName": "Organic Chocolate Milk",
    "unitPrice": 0.0,
    "calories": "130",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "5554":
  {
    "itemCategory": "drink",
    "itemId": "cmg-5554.png",
    "itemName": "Organic Milk",
    "unitPrice": 0.0,
    "calories": "90",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6601":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6601.png",
    "itemName": "Chicken",
    "unitPrice": 7.25,
    "calories": "180",
    "customization": ["4"],
    "burrito": true,
    "sides & drinks": null
  },
  "6601-t":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6601.png",
    "itemName": "Chicken",
    "unitPrice": 2.65,
    "calories": "180",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6601-q":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6601.png",
    "itemName": "Chicken",
    "unitPrice": 3.0,
    "calories": "25",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6601-k":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6601.png",
    "itemName": "Chicken",
    "unitPrice": 4.95,
    "calories": "90",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6602":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6602.png",
    "itemName": "Steak",
    "unitPrice": 8.25,
    "calories": "150",
    "customization": ["4"],
    "burrito": true,
    "sides & drinks": null
  },
  "6602-t":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6602.png",
    "itemName": "Steak",
    "unitPrice": 2.95,
    "calories": "150",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6602-q":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6602.png",
    "itemName": "Steak",
    "unitPrice": 4.5,
    "calories": "20",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6602-k":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6602.png",
    "itemName": "Steak",
    "unitPrice": 4.95,
    "calories": "70",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6603":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6603.png",
    "itemName": "Carnitas",
    "unitPrice": 7.75,
    "calories": "210",
    "customization": ["4"],
    "burrito": true,
    "sides & drinks": null
  },
  "6603-t":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6603.png",
    "itemName": "Carnitas",
    "unitPrice": 2.75,
    "calories": "210",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6603-q":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6603.png",
    "itemName": "Carnitas",
    "unitPrice": 4.5,
    "calories": "20",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6603-k":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6603.png",
    "itemName": "Carnitas",
    "unitPrice": 4.95,
    "calories": "80",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6604":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6604.png",
    "itemName": "Barbacoa",
    "unitPrice": 8.25,
    "calories": "170",
    "customization": ["4"],
    "burrito": true,
    "sides & drinks": null
  },
  "6604-t":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6604.png",
    "itemName": "Barbacoa",
    "unitPrice": 2.95,
    "calories": "170",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6604-q":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6604.png",
    "itemName": "Barbacoa",
    "unitPrice": 4.5,
    "calories": "20",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6604-k":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6604.png",
    "itemName": "Barbacoa",
    "unitPrice": 4.95,
    "calories": "110",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6605":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6605.png",
    "itemName": "Sofritas",
    "unitPrice": 7.25,
    "calories": "150",
    "customization": ["4"],
    "burrito": true,
    "sides & drinks": null
  },
  "6605-t":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6605.png",
    "itemName": "Sofritas",
    "unitPrice": 2.65,
    "calories": "150",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6605-q":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6605.png",
    "itemName": "Sofritas",
    "unitPrice": 4.5,
    "calories": "15",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6605-k":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6605.png",
    "itemName": "Sofritas",
    "unitPrice": 4.95,
    "calories": "70",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6606":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6606.png",
    "itemName": "Chorizo",
    "unitPrice": 7.75,
    "calories": "190",
    "customization": ["4"],
    "burrito": true,
    "sides & drinks": null
  },
  "6606-t":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6606.png",
    "itemName": "Chorizo",
    "unitPrice": 2.85,
    "calories": "190",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6606-q":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6606.png",
    "itemName": "Chorizo",
    "unitPrice": 4.5,
    "calories": "20",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6606-k":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6606.png",
    "itemName": "Chorizo",
    "unitPrice": 4.95,
    "calories": "80",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6608":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6608.png",
    "itemName": "Carne Asada",
    "unitPrice": 8.25,
    "calories": "160",
    "customization": ["4"],
    "burrito": true,
    "sides & drinks": null
  },
  "6608-t":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6608.png",
    "itemName": "Carne Asada",
    "unitPrice": 2.95,
    "calories": "160",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6608-q":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6608.png",
    "itemName": "Carne Asada",
    "unitPrice": 4.5,
    "calories": "20",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "6608-k":
  {
    "itemCategory": "protein",
    "itemId": "cmg-6608.png",
    "itemName": "Carne Asada",
    "unitPrice": 4.95,
    "calories": "70",
    "customization": null,
    "burrito": null,
    "sides & drinks": null
  },
  "extra-m":
  {
    "itemCategory": "protein",
    "itemId": null,
    "itemName": null,
    "unitPrice": 3.0,
    "calories": null,
    "customization": null,
    "burrito": true,
    "sides & drinks": null
  }
}


const Card = ({ card }) => {

  let img = {
    backgroundImage: `url("/static/images/${card.itemId}")`,
  }

  return (
    <div className="card selected type-single"
      style={img}>

      <div className="item-details">
        <div className="item-name-container">
          <div className="item-name">{card.itemName}</div>
        </div>
        <div className="cost">
          <div className="item-cost">{card.unitPrice === 0 ? "" : `$${card.unitPrice.toFixed(2)}`}</div>
        </div>
      </div>

      <div className="spacer"></div>


      {/* <div className="selection-container">
        <div className="quantity-button-container minus">
          <div className="blur"></div><img src="https://www.chipotle.com/content/dam/poc/order/images/icons/circle-minus.svg"
            className="quantity-button" />
        </div>
        <div className="selection-icon-button">
          <div className="quantity">1/2</div>
          <div className="check"></div>
        </div>

        <div className="quantity-button-container plus">
          <div className="blur"></div><img src="https://www.chipotle.com/content/dam/poc/order/images/icons/circle-plus.svg"
            className="quantity-button" />
        </div>
      </div> */}

      <div className="spacer"></div>

      <div className="card-footer">
        <div className="item-calories">{card.calories} cal</div>
      </div>


      <div className="card-overlay hover-overlay"></div>
    </div>
  )
}



class Builder extends React.Component {
  constructor(props) {
    super(props);

  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }






  render() {


    return (
      <div className="content">
        <div className= "builder">
          {this.props.menu[0].categories.map(cat => (
              <div className = "category-container">
                <div className= "title">{cat.header}</div>
                <div className="subtitle">{cat.subheader}</div>
                <div className="cards-container">
                  {cat.choices.map(item => <Card card={cards[item]} key={item} />)}
                </div>              
              </div>
            ) 
            )}
        </div>
      </div>
    )
  }





  //   const a = { id:'7',
  //   header: "BURRITO",
  //   image: "burrito.png",
  //   subheader: "Your choice of freshly grilled meat or sofritas wrapped in a warm flour tortilla with rice, beans, or fajita veggies, and topped with guac, salsa, queso blanco, sour cream or cheese.",
  //   categories:[
  //     {
  //       header: "FILLING",
  //       subheader: "Choose up to two.",
  //       choices: ["6601","6602","6603","6604","6605","6606","6608","extra-m"]
  //     },
  //     {
  //       header: "RICE",
  //       subheader: null,
  //       choices: ["5001","5002"]
  //     },
  //     {
  //       header: "BEANS",
  //       subheader: null,
  //       choices: ["5051","5052"]
  //     },
  //     {
  //       header: "TOP THINGS OFF",
  //       subheader: null,
  //       choices: ["6601","6602","6603","6604","6605","6606","6608","extra-m"]
  //     },
  //     {
  //       header: "OPTIONS",
  //       subheader: null,
  //       choices: ["5501-b"]
  //     },            
  //     {
  //       header: "SIDES",
  //       subheader: null,
  //       choices: ["1029","5101","5201","5202","5203","5204","5251","5252","5301","5351","5353"]
  //     },
  //     {
  //       header: "DRINKS",
  //       subheader: null,
  //       choices: ["1018","1019","2051","2052","2054","2101","2102","2103","2104","2201","2805","2810","5552","5553","5554"]
  //     }
  //   ]
  // }












}



const mapStateToProps = ({ entities }) => ({
  menu: entities.menu
});

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Builder);


