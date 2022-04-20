'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`shouldn't return anything`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const toReturn = fillTank(customer, 1, 5);

    expect(toReturn).toBeUndefined();
  });

  it(`should fill the full tank, if 'amount' is not given`, () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 25,
        fuelRemains: 6,
      },
    };

    const customer2 = {
      money: 1272,
      vehicle: {
        maxTankCapacity: 25,
        fuelRemains: 25,
      },
    };

    fillTank(customer, 12);

    expect(customer).toEqual(customer2);
  });

  it(`should pour only what the tank can fit, if 'amount' `
  + `is greater than the maxTankCapasity`, () => {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 25,
        fuelRemains: 10,
      },
    };

    const customer2 = {
      money: 1305,
      vehicle: {
        maxTankCapacity: 25,
        fuelRemains: 25,
      },
    };

    fillTank(customer, 13, 30);

    expect(customer).toEqual(customer2);
  });

  it('should fill only what the client can pay', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 7,
      },
    };

    const customer2 = {
      money: 0,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 17,
      },
    };

    fillTank(customer, 10, 38);

    expect(customer).toEqual(customer2);
  });

  it(`should round the poured amount by discarding number `
  + `to the tenth part`, () => {
    const customer = {
      money: 700,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 3,
      },
    };

    const customer2 = {
      money: 514,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 18.5,
      },
    };

    fillTank(customer, 12, 15.57);

    expect(customer).toEqual(customer2);
  });

  it(`should not pour the fuel at all, if the poured amount `
  + `is less than 2 liters`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    const customer2 = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer).toEqual(customer2);
  });

  it(`should not pour the fuel at all, if the fuel tank `
  + `can accommodate less than 2 liters`, () => {
    const customer = {
      money: 1700,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 29,
      },
    };

    const customer2 = {
      money: 1700,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 29,
      },
    };

    fillTank(customer, 11, 5);

    expect(customer).toEqual(customer2);
  });

  it(`should not pour the fuel at all, if the customer `
  + `can purchase less than 2 liters`, () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 2,
      },
    };

    const customer2 = {
      money: 15,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 2,
      },
    };

    fillTank(customer, 11, 5);

    expect(customer).toEqual(customer2);
  });

  it(`should round the price of the purchased fuel the to the nearest hundredth part`, () => {
    const customer = {
      money: 750,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 3,
      },
    };

    const customer2 = {
      money: 582.69,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 18,
      },
    };

    fillTank(customer, 11.154, 15);

    expect(customer).toEqual(customer2);
  });
});
