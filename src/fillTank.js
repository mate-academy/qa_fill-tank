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

  // ile faktycznie można nalać
  let litersToPour = Math.min(amount, freeSpace, canBuy);

  // zaokrąglanie w dół do 1 miejsca po przecinku
  litersToPour = Math.floor(litersToPour * 10) / 10;

  // minimalne nalanie 2 L
  if (litersToPour < 2) {
    return;
  }

  // nalewamy i aktualizujemy pieniądze
  vehicle.fuelRemains += litersToPour;
  const cost = Math.round(litersToPour * fuelPrice * 100) / 100;
  customer.money -= cost;
}

module.exports = { fillTank };
