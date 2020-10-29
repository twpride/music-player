import { connect } from 'react-redux';


import React from 'react';

import './intro.css'

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';




const MenuItemThumb = ({image,header}) => {
  let arrowstyle = {
    userSelect: 'none',
    cursor: 'pointer',

    fontFamily: 'Trade Gothic LT Bold',
    fontWeight: '700',
    color: '#b68207',
    textTransform: 'uppercase',
    fontSize: '1.4em',
    visibility: 'hidden',

    boxSizing: 'border-box',
    display: 'inline-block',
    position: 'relative',
    width: '20px',
    height: '20px',
    top: '-.05em',
    backgroundImage: 'url("https://www.chipotle.com/content/dam/poc/order/images/icons/arrow-gold.svg")'
  }

  return (
    <Link to="/order/build" className = "thumbnail-box">
      <img src={"/static/images/"+image} alt="" className="thumbnail" />
      <div className="thumbnail-header">
      
        <div className="display-name">{header} </div>
        <div className="order-cta">Order
          <div className="arrow-right"
            style={arrowstyle}>
          </div>
        </div>      
      
      </div>
    </Link>
  )
}

{/* <div class="content">
  <div class="thumbnail">
    <img src="https://www.chipotle.com/content/dam/chipotle/global-site-design/en/menu/meal-types/burrito/burrito.png">
  </div>
  <div class="text">
    <div class="display-name">Burrito </div>
    <div class="order-cta">Order<div class="arrow-right"
        style="background-image: url(&quot;https://www.chipotle.com/content/dam/poc/order/images/icons/arrow-gold.svg&quot;);">
      </div>
    </div>
  </div>
</div> */}



const Intro = ({menu}) => {
  let styles = {
    
    backgroundImage: 'url("/static/banner.jpg")',
    minHeight: '520px',
    overflowX: 'hidden',
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const items = menu.map(item => (
    <MenuItemThumb
      key={ item.id }
      image={ item.image }
      header={ item.header } />
  )
  );


  return (
    <div className="content">
      <div className="banner" style={styles}>
        <div id=""></div>
      </div>
      <br/>
      <br/>
      {/* <div id="history">
        <div className='toggle'>
          <div className="option"></div>
          <div className="option active"></div>
        </div>
        <div id='favorites'>
          <div className='order-card card'></div>
        </div>
        <div id='orders'>
          <div className='order-card card'></div>
        </div>
      </div> */}

      <div className="menu">
        {items}
      </div>

      <div className="footer">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident dicta minus reiciendis
        ducimus ipsum possimus tempore ea architecto fuga eveniet, sunt saepe rerum voluptas corporis ratione maiores
        voluptates officiis repellat?
      </div>
    </div>    
  )
};



const mapStateToProps = ({ entities }) => ({
  // currentUser: session.currentUser
  menu: entities.menu
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  openModal: modal => dispatch(openModal(modal)),
});

export default connect(
  mapStateToProps,
  null
)(Intro);
















