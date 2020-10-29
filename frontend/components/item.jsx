import { connect } from 'react-redux';
import React from 'react';
import { login } from '../actions/session_actions';
import { openModal, closeModal} from '../actions/modal_actions';
import './item.css'
import {receiveErrors} from '../actions/session_actions'


const Item = (props) => {
  const {name, id, calories, qty, cust} = props


  return (
    <div class="card selected type-single"
      style="background-image: url(&quot;https://www.chipotle.com/content/dam/chipotle/global/menu/menu-items/cmg-1008-chips-%26-roasted-chili-corn-salsa/web-mobile/order.png&quot;);">

      <div class="item-details">
        <div class="item-name-container">
          <div class="item-name">Chips and Queso Blanco</div>
        </div>
        <div class="cost">
          <div class="item-cost">$8.25</div>
        </div>
      </div>

      <div class="spacer"></div>


      <div class="selection-container">
        <div class="quantity-button-container minus">
          <div class="blur"></div><img src="https://www.chipotle.com/content/dam/poc/order/images/icons/circle-minus.svg"
            class="quantity-button" />
        </div>
        <div class="selection-icon-button">
          <div class="quantity">1/2</div>
          <!-- <div class="check"></div> -->
        </div>
      
        <div class="quantity-button-container plus">
          <div class="blur"></div><img src="https://www.chipotle.com/content/dam/poc/order/images/icons/circle-plus.svg"
            class="quantity-button" />
        </div>
      </div>

      <div class="spacer"></div>

      <div class="card-footer">
        <div class="item-calories">170 cal</div>
      </div>


      <div class="card-overlay hover-overlay"></div>
    </div>
  )
};

export default Item;


const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'SIGN IN',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    openModal: modal => {
      dispatch(receiveErrors([]))
      dispatch(openModal(modal))
    },
    closeModal: ()=> dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);