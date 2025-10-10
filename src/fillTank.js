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
 * @param {number} [amount]
 */
function fillTank(customer, fuelPrice, amount = Infinity) {
  const { vehicle } = customer;
  const freeSpace = vehicle.maxTankCapacity - vehicle.fuelRemains;

  // Do nothing if the tank is already full or overfilled (freeSpace <= 0)
  if (freeSpace <= 0) {
    return;
  }

  const canBuy = customer.money / fuelPrice;

  // Limit by: requested amount, free tank space, and affordability
  const rawAmount = Math.min(amount, freeSpace, canBuy);

  // Round down to 0.1L precision
  const roundedLiters = Math.floor(rawAmount * 10) / 10;

  // Skip if rounded < 2L
  if (roundedLiters < 2) {
    return;
  }

  // Compute cost rounded to 0.01
  const price = Math.round(roundedLiters * fuelPrice * 100) / 100;

  // Apply mutations
  vehicle.fuelRemains += roundedLiters;
  customer.money -= price;
}

module.exports = { fillTank };
