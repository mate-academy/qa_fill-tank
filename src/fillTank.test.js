'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('should fill the full tank when no amount is provided', () => {
    const fuelNeeded = customer.vehicle.maxTankCapacity
     - customer.vehicle.fuelRemains;
    const fuelPrice = 50;
    const affordableLiters = Math.floor(customer.money / fuelPrice * 10) / 10;
    const litersToPour = Math.min(fuelNeeded, affordableLiters);

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(8 + litersToPour);
    expect(customer.money).toBe(3000 - litersToPour * fuelPrice);
  });

  it('should only fill the remain tank capacity if requested amount exceeds it'
    , () => {
      const fuelNeeded = customer.vehicle.maxTankCapacity
    - customer.vehicle.fuelRemains;
      const fuelPrice = 50;
      const requestedLiters = 50;
      const affordableLiters = Math.floor(customer.money / fuelPrice * 10) / 10;
      const litersToPour = Math.min(fuelNeeded, requestedLiters,
        affordableLiters);

      fillTank(customer, fuelPrice, requestedLiters);

      expect(customer.vehicle.fuelRemains).toBe(8 + litersToPour);
      expect(customer.money).toBe(3000 - litersToPour * fuelPrice);
    });

  it('should only fill what the customer can afford', () => {
    customer.money = 1000;

    const fuelPrice = 50;
    const fuelNeeded = customer.vehicle.maxTankCapacity
    - customer.vehicle.fuelRemains;
    const affordableLiters = Math.floor(customer.money / fuelPrice * 10) / 10;
    const litersToPour = Math.min(fuelNeeded, affordableLiters);

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(8 + litersToPour);
    expect(customer.money).toBe(1000 - litersToPour * fuelPrice);
  });

  it('should correctly round the fuel cost to the nearest hundredth', () => {
    customer.money = 1501;

    const fuelPrice = 49.99;
    const fuelNeeded = customer.vehicle.maxTankCapacity
    - customer.vehicle.fuelRemains;
    const affordableLiters = Math.floor(customer.money / fuelPrice * 10) / 10;
    const litersToPour = Math.min(fuelNeeded, affordableLiters);
    const expectedCost = parseFloat((litersToPour * fuelPrice).toFixed(2));

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(8 + litersToPour);
    expect(customer.money).toBe(1501 - expectedCost);
  });
});
