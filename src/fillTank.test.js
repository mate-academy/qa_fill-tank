'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`shouldn't fill anything`, async() => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuel = fillTank(customer, 3, 18);

    expect(fuel).toBeUndefined();
  });

  it('should fill the full tank if the amount is not specified ', () => {
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

  it(`should fill the full tank 
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

  it(`should fill the liters in the tank
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

  it(`should round the poured amount
  by discarding number to the tenth part`, () => {
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

  it('should fill nothing if amount is less than two', () => {
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

  it('should fill the rounded amount for fuel in hundredths', () => {
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

  it(`should fill the tank according to the indicated liters and price
  if amount is 2`, () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 2);

    expect(customer).toEqual({
      money: 1480,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    });
  });
});
