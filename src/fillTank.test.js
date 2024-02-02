'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should return nothing`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer)).toBeUndefined();
  });

  it('should fill full tank if amount is not provided', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40);

    const { vehicle } = customer;

    const isTankFull = vehicle.fuelRemains === vehicle.maxTankCapacity;

    expect(isTankFull).toBe(true);
    expect(vehicle.fuelRemains).toBe(40);
  });

  it('should fill not more than maxTankCapacity'
  + 'if the amount is greater than tank can accommodate', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30, 50);

    const { vehicle } = customer;

    const isTankFull = vehicle.fuelRemains === vehicle.maxTankCapacity;

    expect(isTankFull).toBe(true);
  });

  it('should ALWAYS fill in only what the client can pay', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100);

    expect(customer.money >= 0).toBe(true);
  });

  it('should round the poured fuel amount'
  + ' by discarding number to the tenth part', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 99.5, 50);

    const isFuelRemainsRounded = Number.isInteger(customer.vehicle.fuelRemains);

    expect(isFuelRemainsRounded).toBe(true);
  });

  it('should not pour the fuel,'
  + ' if the poured amount is less than 2 liters', () => {
    const customer = {
      money: 50000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.01,
      },
    };

    const { vehicle } = customer;
    const { maxTankCapacity, fuelRemains } = vehicle;

    const isFuelTankAlmostFilled = (maxTankCapacity - fuelRemains) < 2;
    const prevFuelRemains = fuelRemains;

    fillTank(customer, 99.5, 1);

    const result = isFuelTankAlmostFilled
      && customer.vehicle.fuelRemains === prevFuelRemains;

    expect(result).toBe(true);
  });

  it('should round the price of the purchased fuel'
  + ' to the nearest hundredth part', () => {
    const customer = {
      money: 50000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.01,
      },
    };

    fillTank(customer, 99.54646747474747, 1);

    const isMoneyLeftRoundedNumber = Number.isInteger(customer.money);

    expect(isMoneyLeftRoundedNumber).toBe(true);
  });
});
