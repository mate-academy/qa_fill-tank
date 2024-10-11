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
 * @param {number} [amount=Infinity]
 */
function fillTank(customer, fuelPrice, amount = Infinity) {
  const { vehicle } = customer;
  const freeSpace = vehicle.maxTankCapacity - vehicle.fuelRemains;
  const canBuy = customer.money / fuelPrice;
  const requiredAmount = Math.min(amount, freeSpace, canBuy);
  const roundedAmount = roundFuel(requiredAmount);

  if (roundedAmount < 2) {
    return;
  }

  vehicle.fuelRemains += roundedAmount;
  customer.money -= roundPrice(roundedAmount * fuelPrice);
}

/**
 * Rounds the fuel amount to the nearest tenth.
 * @param {number} fuel
 * @returns {number}
 */
function roundFuel(fuel) {
  return Math.floor(fuel * 10) / 10;
}

/**
 * Rounds the price to the nearest hundredth.
 * @param {number} price
 * @returns {number}
 */
function roundPrice(price) {
  return Math.round(price * 100) / 100;
}

module.exports = { fillTank };
