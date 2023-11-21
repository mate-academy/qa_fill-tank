'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should correct changes in the object '
  + 'if all parameters are set correctly', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 20;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 2600,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 28,
      },
    });
  });

  it(`should for the hollow tank to fill, if the 'amount' is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 20;

    fillTank(customer, fuelPrice);

    expect(customer).toEqual({
      money: 2360,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`should for the hollow tank to fill, `
  + `if the 'amount' is more free space`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 20;
    const amount = 40;

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 2360,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`amount of fuel cannot exceed the possibility of it's purchase`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 200;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 23,
      },
    });
  });

  it('should round the poured amount by '
  + 'discarding number to the tenth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 100;
    const amount = 3.1234;

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 2690,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 11.1,
      },
    });
  });

  it('should do not refill with volume less than 2', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 100;
    const amount = 1.5;

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it('should the cost is rounded according '
  + 'to the rules of rounding to hundredths', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 13.8;
    const amount = 11.7;

    fillTank(customer, fuelPrice, amount);

    expect(customer).toEqual({
      money: 2838.54,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 19.7,
      },
    });
  });
});
