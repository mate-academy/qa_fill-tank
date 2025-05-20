'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('if amount not passed', () => {
    const customer = {
      money: 64, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    const expectedResult = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 2);
    expect(customer).toEqual(expectedResult);
  });

  it('if `amount` > `maxTankCapacity`', () => {
    const customer = {
      money: 300, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    const expectedResult = {
      money: 236,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 2, 60);
    expect(customer).toEqual(expectedResult);
  });

  it('fill in only what the client can pay', () => {
    const customer = {
      money: 50, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 5, // Remaining fuel in the tank
      },
    };

    const expectedResult = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 2, 40);
    expect(customer).toEqual(expectedResult);
  });

  it('"amount" is rounded down to tenths of a liter.', () => {
    const customer = {
      money: 300, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    const expectedResult = {
      money: 278.4,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18.8,
      },
    };

    fillTank(customer, 2, 10.89);
    expect(customer).toEqual(expectedResult);
  });

  it('if `amount` < 2 liters', () => {
    const customer = {
      money: 300, // customer account balance
      vehicle: {
        maxTankCapacity: 40, // fuel tank volume
        fuelRemains: 8, // Remaining fuel in the tank
      },
    };

    const expectedResult = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 2, 1.8);
    expect(customer).toEqual(expectedResult);
  });

  it('should round price to the nearest hundredth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    const expectedResult = {
      money: 66.67,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 3.333, 10);
    expect(customer).toEqual(expectedResult);
  });
});
