'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('If the amount is not given, then full tank is ordered ', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10);

    expect(customer)
      .toEqual({
        money: 100,
        vehicle: {
          maxTankCapacity: 100,
          fuelRemains: 100,
        },
      });
  });

  it('If the amount > tank capacity, pour only what will fit', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 100);

    expect(customer)
      .toEqual({
        money: 100,
        vehicle: {
          maxTankCapacity: 100,
          fuelRemains: 100,
        },
      });
  });

  it('should fill in only what the client can pay', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 100);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 100,
          fuelRemains: 20,
        },
      });
  });

  it('If the poured amount is less than 2 liters, do not pour at all', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer)
      .toEqual({
        money: 100,
        vehicle: {
          maxTankCapacity: 100,
          fuelRemains: 10,
        },
      });
  });

  it('Round the poured amount by discarding number to the tenth part', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 1.1, 5.5);

    expect(customer)
      .toEqual({
        money: 93.95,
        vehicle: {
          maxTankCapacity: 100,
          fuelRemains: 15.5,
        },
      });
  });

  it('Round the price of the purchased fuel the to the hundredth part', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 1.15, 5.45);

    expect(customer)
      .toEqual({
        money: 93.79,
        vehicle: {
          maxTankCapacity: 100,
          fuelRemains: 15.4,
        },
      });
  });
});

// write tests here
