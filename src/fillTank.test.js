'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('if amount is not given, then full tank is ordered', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 100);

    expect(customer.vehicle.fuelRemains).toBe(38);
    expect(customer.money).toBe(0);
  });

  // eslint-disable-next-line max-len
  it('if amount is greater than the tank can accommodate, pour only what will fit', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 100, 50);

    expect(customer.vehicle.fuelRemains).toBe(38);
    expect(customer.money).toBe(0);
  });

  it('ALWAYS fill in only what the client can pay', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 100, 30);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(0);
  });

  it('Round the poured amount by discarding number to the tenth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 100, 20.5);

    expect(customer.vehicle.fuelRemains).toBe(28.5);
    expect(customer.money).toBe(950);
  });

  it('If the poured amount is less than 2 liters, do not pour at all', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 100, 1);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  // eslint-disable-next-line max-len
  it('Round the price of the purchased fuel the to the nearest hundredth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    fillTank(customer, 90.8687, 20);
    expect(customer.vehicle.fuelRemains).toBe(28);
    expect(customer.money).toBe(1182.63);
  });
});
