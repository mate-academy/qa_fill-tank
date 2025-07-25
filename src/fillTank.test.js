'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it("function shouldn't return any value", () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };

    expect(fillTank(customer, 10, 4))
      .toBe(undefined);
  });

  it(`should order full tank if `
      + `'amount' argument is not included`, () => {
    const value = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };

    fillTank(value, 10);

    expect(value)
      .toHaveProperty('vehicle.fuelRemains', 10);
  });

  it(`should order full tank if argument `
      + `'amount' > free space in the tank `, () => {
    const value = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };

    fillTank(value, 10, 6);

    expect(value)
      .toHaveProperty('vehicle.fuelRemains', 10);
  });

  it(`should fill only part of the tank if `
      + `('money' / 'fuelPrice') < free space in the tank `, () => {
    const value = {
      money: 40,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };

    fillTank(value, 10);

    expect(value)
      .toHaveProperty('vehicle.fuelRemains', 9);
  });

  it(`should round down 'amount' to the tenth part`, () => {
    const value = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };

    fillTank(value, 10, 3.48);

    expect(value)
      .toHaveProperty('vehicle.fuelRemains', 8.4);
  });

  it(`shouldn't fill the tank if `
      + `'amount' < 2`, () => {
    const value = {
      money: 400,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };

    fillTank(value, 10, 1);

    expect(value)
      .toHaveProperty('vehicle.fuelRemains', 5);
  });

  it(`should round price to the nearest hundredth part`, () => {
    const value = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };
    const value2 = JSON.parse(JSON.stringify(value));

    fillTank(value, 10.564, 3);
    fillTank(value2, 10.565, 3);

    expect(value)
      .toHaveProperty('money', 968.32);

    expect(value2)
      .toHaveProperty('money', 968.29);
  });

  it(`should work with 'money' with decimal part`, () => {
    const value = {
      money: 86.56,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };
    const value2 = JSON.parse(JSON.stringify(value));

    fillTank(value, 1, 3);
    fillTank(value2, 2, 3);

    expect(value)
      .toHaveProperty('money', 83.56);

    expect(value2)
      .toHaveProperty('money', 80.56);
  });
});
