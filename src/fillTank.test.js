'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be a function', () => {
    expect(typeof fillTank).toBe('function');
  });

  it('should fill tank when no amount given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 2);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2940);
  });

  it('If the amount is greater, pour only what will fit', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 2, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2940);
  });

  it('ALWAYS fill in only what the client can pay.', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 2, 30);

    expect(customer.vehicle.fuelRemains).toBe(25);
    expect(customer.money).toBe(0);
  });

  it('Round the poured amount by discarding number to the tenth part.', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 2, 10.55);

    expect(customer.vehicle.fuelRemains).toBe(20.5);
  });

  it('If the poured amount is less than 2 liters, do not pour at all.', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 2, 1.9);

    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it('Round the price the nearest hundredth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 1.33, 10.9);

    expect(customer.vehicle.fuelRemains).toBe(20.9);
  });
});
