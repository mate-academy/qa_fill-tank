'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('The function should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it(`Shouldn't fill the tank if 'money' value is 0`, () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 33;
    const amount = 40;

    const result = {
      money: 0,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer)
      .toEqual(result);
  });

  it(`Should fill the whole tank if 'amount' isn't given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 43;

    const result = {
      money: 2570,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 20,
      },
    };

    fillTank(customer, fuelPrice);

    expect(customer)
      .toEqual(result);
  });

  it(`Should fill the tank only on the available amount of money`, () => {
    const customer = {
      money: 444,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 15,
      },
    };
    const fuelPrice = 39;
    const amount = 40;

    const result = {
      money: 3.3000000000000114,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 26.3,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer)
      .toEqual(result);
  });

  it(`Should fill whole tank if the 'amount' > 'maxTrankCapacity'`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 32,
      },
    };
    const fuelPrice = 33;
    const amount = 77;

    const result = {
      money: 1406,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 50,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer)
      .toEqual(result);
  });

  it(`Shouldn't fill the tank if 'amount' < 2`, () => {
    const customer = {
      money: 777,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 48,
      },
    };
    const fuelPrice = 37;
    const amount = 1.9;

    const result = {
      money: 777,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 48,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer)
      .toEqual(result);
  });

  it(`Shouldn't fill the tank
  if 'money' isn't enough for 2 liters`, () => {
    const customer = {
      money: 73,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 27,
      },
    };
    const fuelPrice = 37;
    const amount = 2;

    const result = {
      money: 73,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 27,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer)
      .toEqual(result);
  });

  it(`Should fill the tank
  if 'money' is enough for 2 liters`, () => {
    const customer = {
      money: 74,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 27,
      },
    };
    const fuelPrice = 37;
    const amount = 2;

    const result = {
      money: 0,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 29,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer)
      .toEqual(result);
  });
});
