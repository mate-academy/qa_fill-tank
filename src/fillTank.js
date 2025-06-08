'use strict';

/**
 * @param {Object} customer
 * @param {number} fuelPrice
 * @param {number} [amount]
 */
function fillTank(customer, fuelPrice, amount) {
  const { vehicle } = customer;
  const maxPourable = vehicle.maxTankCapacity - vehicle.fuelRemains;

  // Якщо кількість не вказано — залити до повного
  const requestedLiters = amount !== undefined ? amount : maxPourable;

  // Не лити більше, ніж вміститься
  let litersToPour = Math.min(requestedLiters, maxPourable);

  // Скільки клієнт реально може купити
  const affordableLiters = Math.floor((customer.money / fuelPrice) * 10) / 10;

  // Лити тільки те, що він може оплатити
  litersToPour = Math.min(litersToPour, affordableLiters);

  // Не лити, якщо < 2 літрів
  if (litersToPour < 2) {
    return;
  }

  // Вартість = округлення до 0.01
  const totalCost = Math.round(litersToPour * fuelPrice * 100) / 100;

  vehicle.fuelRemains += litersToPour;
  customer.money -= totalCost;
}

module.exports = fillTank;
