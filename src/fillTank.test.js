'use strict';

describe('fillTank', () => {
  const { fillTank, roundPrice } = require('./fillTank');

  it('should fill the tank completely when amount is not provided', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - roundPrice((40 - 8) * 50));
  });

  it('should fill the tank with the specified amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 50;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(3000 - roundPrice(10 * 50));
  });

  it('should fill the tank only up to the maximum capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };
    const fuelPrice = 50;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - roundPrice((40 - 35) * 50));
  });

  // eslint-disable-next-line max-len
  it('should fill the tank only with the amount the customer can afford', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 50;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('should round the poured amount to the tenth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 50;
    const amount = 10.55;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(18.5);
    expect(customer.money).toBe(3000 - roundPrice(10.5 * 50));
  });

  it('should not pour fuel if the rounded amount is less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };
    const fuelPrice = 50;
    const amount = 1;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(39);
    expect(customer.money).toBe(3000);
  });

  it('should round the price to the nearest hundredth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 50.123;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(3000 - roundPrice(10 * 50.123));
  });
});
