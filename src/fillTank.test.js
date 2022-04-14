'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should return the full tank if the amount is not specified ', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 30);

    expect(customer).toEqual({
      money: 2040,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should be returned a full tank 
  if the quantity is more than the tank can hold`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 8, 80);

    expect(customer).toEqual({
      money: 2744,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should return the liters in the tank
  for which there is enough money`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18,
      },
    });
  });

  it(`should return a rounded number if the request
  for the number of fuelRemains with a comma`, () => {
    const customer = {
      money: 832,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 5, 16, 6);

    expect(customer).toEqual({
      money: 752,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 24,
      },
    });
  });

  it('should return nothing if amount is less than two', () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer).toEqual({
      money: 1500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it('should return the rounded amount for fuel in hundredths', () => {
    const customer = {
      money: 392,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 7.7, 14);

    expect(customer).toEqual({
      money: 284.2,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 22,
      },
    });
  });
});
