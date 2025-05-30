'use strict';
// - If the `amount` is not given, then full tank is ordered.
// - If the `amount` is greater than the tank can accommodate, pour only what will fit.
// - ALWAYS fill in only what the client can pay.
// - Round the poured amount by discarding number to the tenth part.
// - If the poured amount is less than 2 liters, do not pour at all.
// - Round the price of the purchased fuel the to the nearest hundredth part.

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should order full tank if amount not given ', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill what can fit into the tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 100);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fill what client can pay', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 40);

    expect(customer.vehicle.fuelRemains).toBe(20);
  });

  it('should round amount', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 40.2231);

    expect(customer.vehicle.fuelRemains).toBe(50.2);
  });

  it('should not pour if amount < then 2L', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 1.5);
    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it('should round price', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 21.23, 45.23);

    expect(customer.money).toBe(1040.4);
  });
});
