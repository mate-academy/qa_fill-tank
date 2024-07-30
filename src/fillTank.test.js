'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should do nothing if the amount of fuel is less than 2', () => {
    const AMOUNT = 1.8;
    const PRICE = 15;

    const customerToTank = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const customerAfterTanking = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customerToTank, PRICE, AMOUNT);

    expect(customerToTank).toEqual(customerAfterTanking);
  });

  it('should do nothing if the amount of fuel to buy'
    + 'is less than 2 and customer cannot afford more', () => {
    const AMOUNT = 15;
    const PRICE = 22;

    const customerToTank = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const customerAfterTanking = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customerToTank, PRICE, AMOUNT);

    expect(customerToTank).toEqual(customerAfterTanking);
  });

  it('should calculate and fill the maximum amount'
    + 'of fuel customer can afford if they have insufficient funds', () => {
    const PRICE = 20;
    const AMOUNT = 10;

    const customerToTank = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const maxAffordableAmount = Math.floor(
      (customerToTank.money / PRICE) * 10
    ) / 10;
    const maxPossibleAmount = Math.min(
      40 - customerToTank.vehicle.fuelRemains,
      maxAffordableAmount
    );

    const customerAfterTanking = {
      money: customerToTank.money - (maxPossibleAmount * PRICE),
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: Math.round((customerToTank.vehicle.fuelRemains
          + maxPossibleAmount) * 10) / 10,
      },
    };

    fillTank(customerToTank, PRICE, AMOUNT);

    expect(customerToTank).toEqual(customerAfterTanking);
  });

  it('should default to filling the tank to full'
    + 'if no amount is specified', () => {
    const PRICE = 20;

    const customerToTank = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const customerAfterTanking = {
      money: 2360,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40.0, // округлено до десятих
      },
    };

    fillTank(customerToTank, PRICE);

    expect(customerToTank).toEqual(customerAfterTanking);
  });

  it('should fill the tank to full if the specified amount'
    + 'exceeds the required amount', () => {
    const PRICE = 20;
    const AMOUNT = 38;

    const customerToTank = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const customerAfterTanking = {
      money: 2360,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40.0, // округлено до десятих
      },
    };

    fillTank(customerToTank, PRICE, AMOUNT);

    expect(customerToTank).toEqual(customerAfterTanking);
  });
});
