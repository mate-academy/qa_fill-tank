'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('fill a full tank if the amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const expectedResult = {
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 10);

    expect(customer).toEqual(expectedResult);
  });

  it('fill a full tank if the amount is grater than tank capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const expectedResult = {
      money: 2776,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 7, 90);

    expect(customer).toEqual(expectedResult);
  });

  it('fill a full tank if the amount is grater than tank capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const expectedResult = {
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customer, 10, 50);

    expect(customer).toEqual(expectedResult);
  });

  it('fill in only what the client can pay', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const expectedResult = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 11,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer).toEqual(expectedResult);
  });

  it('fill in only what the client can pay', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const expectedResult = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 11,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer).toEqual(expectedResult);
  });

  it('round the poured amount if fuelRemain is a float number', () => {
    const customer = {
      money: 432,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const expectedResult = {
      money: 349,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 24.6,
      },
    };

    fillTank(customer, 5, 16.6);

    expect(customer).toEqual(expectedResult);
  });

  it('don\'t pour fuel if the amount is less than 2 liters', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const expectedResult = {
      money: 200,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 6, 1.8);

    expect(customer).toEqual(expectedResult);
  });

  it('don\'t pour fuel if the money is less than the price of 2 liters', () => {
    const customer = {
      money: 6,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const expectedResult = {
      money: 6,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 4, 10);

    expect(customer).toEqual(expectedResult);
  });

  it('don\'t pour fuel if free space is less than 2 litters', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    const expectedResult = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };

    fillTank(customer, 8, 10);

    expect(customer).toEqual(expectedResult);
  });

  it('round the price of the fuel to the nearest hundreadth part', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 21,
      },
    };

    const expectedResult = {
      money: 249.44,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 29,
      },
    };

    fillTank(customer, 6.32, 8);

    expect(customer).toEqual(expectedResult);
  });

  it('fill the amount of fuel if enough free space and enough money', () => {
    const customer = {
      money: 6422,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 21,
      },
    };

    const expectedResult = {
      money: 6052,
      vehicle: {
        maxTankCapacity: 80,
        fuelRemains: 71,
      },
    };

    fillTank(customer, 7.4, 50);

    expect(customer).toEqual(expectedResult);
  });
});
