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

  if (roundedAmount < 2) {
    return;
  }

  customer.vehicle.fuelRemains += roundedAmount;

  const rawTotal = roundedAmount * fuelPrice;
  const total = Math.round(rawTotal * 100) / 100;

  const moneyCents = Math.round(customer.money * 100);
  const totalCents = Math.round(total * 100);

  customer.money = (moneyCents - totalCents) / 100;
}

function roundFuel(fuel) {
  return Math.round(fuel * 10) / 10;
}

module.exports = { fillTank };
