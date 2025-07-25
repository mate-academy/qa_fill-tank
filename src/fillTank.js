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
  const preciseMoneyCalculation = (function () {
    const priceInCents = roundPrice(fuelPrice) * 100;
    const amountInDecilitre = roundedAmount * 10;
    const toSubtractInCents = (priceInCents * amountInDecilitre) / 10;
    const moneyInCents = customer.money * 100;
    
    return (moneyInCents - toSubtractInCents) / 100;
  })();

    customer.money = preciseMoneyCalculation;

  if (roundedAmount < 2) {
    return;
  }

  customer.vehicle.fuelRemains += roundedAmount;
}

function roundFuel(fuel) {
  return Math.floor(fuel * 10) / 10;
}

function roundPrice(price) {
  return Math.round(price * 100) / 100;
}

module.exports = { fillTank };
