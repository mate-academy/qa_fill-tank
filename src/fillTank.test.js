'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('amount < 2 - do nothing', () => {
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

  it('(customer.money / price) < 2 - do nothing', () => {
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

  it('customer has not enough money', () => {
    const PRICE = 20;
    const AMOUNT = 10;

    const customerToTank = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const customerAfterTanking = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10.5,
      },
    };

    fillTank(customerToTank, PRICE, AMOUNT);

    expect(customerToTank).toEqual(customerAfterTanking);
  });

  it('Argument "amount" was not passed', () => {
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
        fuelRemains: 40,
      },
    };

    fillTank(customerToTank, PRICE);

    expect(customerToTank).toEqual(customerAfterTanking);
  });

  it('amount > (customer.maxTankCapacity - customer.fuelRemains)', () => {
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
        fuelRemains: 40,
      },
    };

    fillTank(customerToTank, PRICE, AMOUNT);

    expect(customerToTank).toEqual(customerAfterTanking);
  });
});
