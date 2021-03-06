import { combineReducers } from 'redux'
import Config from "../Config"

const defaultState = {
  config: new Config(),
  reserveTableData: {},
  roomStockData: null,
  timetableNodes: [],
  timetablePeriods: [],
  roomStockPlans: [],
  shopInfo: null,
  errorInfo: null,
  message: null,
}

function config(state = defaultState.config, action) {
  switch (action.type) {
    case "SET_CONFIG":
      return action.data;
    default:
      return state;
  }
}

function reserveTableData(state = defaultState.reserveTableData, action) {
  switch (action.type) {
    case "SET_RESERVE_TABLE_DATA":
      return action.data;
    default:
      return state;
  }
}

function roomStockData(state = defaultState.roomStockData, action) {
  switch (action.type) {
    case "SET_ROOM_STOCK_DATA":
      return action.data;
    default:
      return state;
  }
}

function shopInfo(state = defaultState.reserveTableData, action) {
  switch (action.type) {
    case "SET_SHOP_INFO":
      return action.data;
    default:
      return state;
  }
}


function timetableNodes(state = defaultState.timetableNodes, action) {
  switch (action.type) {
    case "SET_TIMETABLE_NODES":
      return action.data;
    default:
      return state;
  }
}

function timetablePeriods(state = defaultState.timetablePeriods, action) {
  switch (action.type) {
    case "SET_TIMETABLE_PERIODS":
      return action.data;
    default:
      return state;
  }
}

function roomStockPlans(state = defaultState.roomStockPlans, action) {
  switch (action.type) {
    case "SET_ROOM_STOCK_PLANS":
      return action.data;
    default:
      return state;
  }
}

function errorInfo(state = defaultState.errorInfo, action) {
  switch (action.type) {
    case "SET_ERROR_INFO":
      return action.data;
    default:
      return state;
  }
}

function message(state = defaultState.message, action) {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.data;
    default:
      return state;
  }
}

export default combineReducers({ config, reserveTableData, roomStockData, shopInfo, timetableNodes, timetablePeriods, errorInfo, roomStockPlans, message });
