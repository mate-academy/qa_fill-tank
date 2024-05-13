'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should refill tank if amount is not given or'
  + 'amount is greater than tank can accomodate', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    const expectedResult = {
      money: 600,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 10);
    expect(customer).toEqual(expectedResult);
  });

  it('should not refill if money not enough', () => {
    const customer = {
      money: 99,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    const expectedResult = {
      money: 99,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    fillTank(customer, 100);
    expect(customer).toEqual(expectedResult);
  });

  it('should only be filled with a sufficient amount', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 0,
      },
    };

    const expectedResult = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10);
    expect(customer).toEqual(expectedResult);
  });

  it('should not poured if amount is less than 2 liters', () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    const expectedResult = {
      money: 15,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 10);
    expect(customer).toEqual(expectedResult);
  });

  it('should round the poured amount by discarding number to the tenth part'
  + 'and price of the purchased fuel the to the nearest hundredth part', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 25.3,
      },
    };

    const expectedResult = {
      money: 71.65,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 40.3,
      },
    };

    fillTank(customer, 1.89, 15);

    expect(customer).toEqual(expectedResult);
  });
});
