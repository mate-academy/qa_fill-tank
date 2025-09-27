'use strict';

/**
 * Fills a vehicle tank while updating customer balance.
 * Mutates the customer object in place, returns nothing.
 *
 * @param {Object} customer
 * @param {number} fuelPrice - price per 1 liter
 * @param {number} [requestedLiters] - optional liters requested
 * @returns {void}
 */
function fillTank(customer, fuelPrice, requestedLiters) {
  const { vehicle } = customer;
  const { maxTankCapacity, fuelRemains } = vehicle;

  // How much free space in the tank
  const tankSpace = maxTankCapacity - fuelRemains;

  // If no amount requested, assume full tank
  let litersToPour = requestedLiters ?? tankSpace;

  // Clamp to max tank space
  litersToPour = Math.min(litersToPour, tankSpace);

  // Clamp to what the customer can afford
  const maxAffordable = customer.money / fuelPrice;
  litersToPour = Math.min(litersToPour, maxAffordable);

  // Round liters down to nearest tenth
  litersToPour = Math.floor(litersToPour * 10) / 10;

  // Do not pour if less than 2 liters
  if (litersToPour < 2) {
    return;
  }

  // Calculate cost (rounded to 2 decimals)
  let cost = litersToPour * fuelPrice;
  cost = Math.round(cost * 100) / 100;

  // Mutate customer state
  vehicle.fuelRemains += litersToPour;
  customer.money -= cost;
}

module.exports = { fillTank };
