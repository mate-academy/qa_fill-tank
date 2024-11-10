'use strict';

/**
 * @typedef {Object} Vehicle
 * @property {number} maxTankCapacity
 * @property {number} fuelRemains
 *
 * @typedef {Object} Customer
 * @property {number} money
 * @property {Vehicle} vehicle
 *
 * @param {Customer} customer
 * @param {number} fuelPrice
 * @param {number} amount
 */
function fillTank(customer, fuelPrice, amount = Infinity) {
  const { vehicle } = customer;
  const freeSpace = vehicle.maxTankCapacity - vehicle.fuelRemains;
  const canBuy = customer.money / fuelPrice;
  const requiredAmount = Math.min(amount, freeSpace, canBuy);
  const roundedAmount = roundFuel(requiredAmount);

  if (amount <= 0) {
    return `Fuel amount must be greater than '0'`;
  }

  if (fuelPrice <= 0) {
    return `Fuel price must be greater than '0'`;
  }

  if (canBuy < 1) {
    return 'You are not have enough money';
  }

  if (customer.vehicle.maxTankCapacity <= 0) {
    return `Tank capacity must be greater than '0'`;
  }

  if (freeSpace === 0) {
    return 'Fuel tank is full';
  }

  if (freeSpace < 0) {
    return 'The fuel level sensor is broken';
  }

  if (roundedAmount < 2 || amount === 2) {
    return;
  }

  customer.vehicle.fuelRemains += roundedAmount;
  customer.money -= roundPrice(roundedAmount * fuelPrice);

  // If remainder is less than 1, must round to two decimal places
  if (customer.money < 1) {
    customer.money = Math.round(customer.money * 100) / 100;
  }
}

function roundFuel(fuel) {
  return Math.floor(fuel * 10) / 10;
}

function roundPrice(price) {
  return Math.round(price * 100) / 100;
}

module.exports = { fillTank };
