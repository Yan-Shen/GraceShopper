import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Navbar, Login, Signup, UserHome, FrontPage} from './components'
import {me, getProductsThunk, fetchItems, fetchOrders, postItem } from './store'
import ProductList from './components/product/ProductList';
import OrderHistoryDetails from './components/order/OrderHistoryDetails'
import OrderHistoryContainer from './components/order/OrderHistoryContainer'
import { authUserCart, unAuthUserCart } from './components/order/CartList'
import SingleProduct from './components/product/SingleProduct'
import Search from './components/product/Search'
import OrderCheckout from './components/order/OrderCheckout'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
    this.props.loadProducts()
  }

  // componentDidUpdate(){
  //   const allLocalItems = localStorage.getArr('item')
  //   // if(!nextProps.userId === this.props.userId) {
  //     const userId = this.props.userId;
  //     // if logged in, add all localItems to lineItem table for the current user and return the added item to uddate cartItems and delete localItems
  //     // this.props.getAllCartItems(this.props.userId)
  //     console.log('componentWillReceiveProps is called')
  //     console.log('this.props.isLoggedIn----------------', this.props.isLoggedIn)
  //     if(this.props.isLoggedIn) {
      //   allLocalItems.map(localItem => {
      //     console.log('localItem to add to backend---------', {...localItem, userId })
      //     this.props.postItem({...localItem, userId })})
      // }
    // }

  // }

  render () {
    const {isLoggedIn, items} = this.props

    return (
      <div>
        <Router history={history}>
          <div>
            <Navbar />
            <Switch>
              {/* Routes placed here are available to all visitors */}
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              {
                // isLoggedIn &&
                //   <Switch>
                //     {/* Routes placed here are only available after logging in */}
                //     <Route path="/" component={UserHome} />
                //   </Switch>
              }
              {/* Displays our Login component as a fallback */}
              <Route exact path="/shopall" component={ProductList} />
              <Route exact path="/category/:categoryId" component={ProductList} />
              <Route exact path="/products/:productId" component={SingleProduct} />
							<Route exact path="/orders-history/" component={OrderHistoryContainer} />
              <Route exact path="/authUserCart" component={authUserCart} />
              <Route exact path="/unAuthUserCart" component={unAuthUserCart} />
              <Route exact path="/orders/:orderId" component={OrderHistoryDetails} />
              <Route exact path="/orders-checkout" render={() => <OrderCheckout items={items} />} />
              <Route exact path="/products/:productId" component={SingleProduct} />
              <Route exact path="/search" component={Search} />
              <Route path="/" component={FrontPage} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    items: state.cartItems
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    loadProducts () {
      dispatch(getProductsThunk())
    },
    getAllCartItems(userId) {
      dispatch(fetchItems(userId))
    },
    postItem(item) {
      dispatch(postItem(item))
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
