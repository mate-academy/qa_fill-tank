'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should set the correct 'money' and 'fuelRemains' after payment`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100, 3);

    const expectedResult = {
      money: 2700,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 11,
      },
    };

    expect(customer).toEqual(expectedResult);
  });

  it(`should default to full tank if 'amount' is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    const expectedResult = {
      money: 1400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    expect(customer).toEqual(expectedResult);
  });

  it(`should only set as much fuel as can fill the tank`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50, 100);

    const expectedResult = {
      money: 1400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    expect(customer).toEqual(expectedResult);
  });

  it(`should only set as much fuel as the client can pay for`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100);

    const expectedResult = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38,
      },
    };

    expect(customer).toEqual(expectedResult);
  });

  it(`should round the poured amount by discarding number to the tenth part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100, 2.123456);

    const expectedResult = {
      money: 2790,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10.1,
      },
    };

    expect(customer).toEqual(expectedResult);
  });

  it(`should not set anything if the poured amount is less than 2 liters`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100, 1.5);

    const expectedResult = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(customer).toEqual(expectedResult);
  });

  it(`should round the price of the purchased fuel the to the nearest hundredth part`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10.123, 5);

    const expectedResult = {
      money: 2949.39,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 13,
      },
    };

    expect(customer).toEqual(expectedResult);
  });
});
