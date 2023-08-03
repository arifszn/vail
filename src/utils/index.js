const {
  RED_COLOR_CODE,
  RESET_COLOR_CODE,
  GREEN_COLOR_CODE,
} = require('../constants/color-codes');

const displayErrorMessage = (message) => {
  console.log(`${RED_COLOR_CODE}${message}${RESET_COLOR_CODE}`);
};

const displaySuccessMessage = (message) => {
  console.log(`${GREEN_COLOR_CODE}${message}${RESET_COLOR_CODE}`);
};

module.exports = { displayErrorMessage, displaySuccessMessage };
