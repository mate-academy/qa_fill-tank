'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`when amount <2 do not pour at all`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 1.9);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it(`pour customer when amount 2`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 2);

    expect(customer).toEqual({
      money: 2980,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    });
  });

  it(`pour full tank when amount not given`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10,);

    expect(customer).toEqual({
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`pour in amount if the tank can hold it`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 32);

    expect(customer).toEqual({
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`pour in amount when amount is greater`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 33);

    expect(customer).toEqual({
      money: 2680,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`do not fill if customer do not have enough
  money for at least 2 liters`, () => {
    // preparation
    const customer = {
      money: 18,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 3);

    expect(customer).toEqual({
      money: 18,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it(`fill in only what the client can pay`, () => {
    // preparation
    const customer = {
      money: 40,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 5);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12,
      },
    });
  });

  it(`Round the amount poured, to the tenth`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 10.547);

    expect(customer).toEqual({
      money: 2895,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18.5,
      },
    });
  });

  it(`Round the price to the hundredth`, () => {
    // preparation
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10.528, 10);

    expect(customer).toEqual({
      money: 2894.72,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 18,
      },
    });
  });
});
