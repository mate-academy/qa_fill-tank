'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');
  
  it(`function should be declared`, () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it(`function should fill the tank fully if the 'amount' wasn't provided`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10,);

    expect(customer)
      .toEqual({
        money: 2680,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it(`If the amount is greater than the tank can accommodate, 
  pour only what will fit.`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 40);

    expect(customer)
      .toEqual({
        money: 2680,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it(`function should pour not more fuel than client can buy`, () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 2);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      });
  });

  it(`function should round the poured amount by discarding number to the tenth part.`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 2.999);

    expect(customer)
      .toEqual({
        money: 2971,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 10.9,
        },
      });
  });

  it(`If the poured amount is less than 2 liters, do not pour at all.`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 1);

    expect(customer)
      .toEqual({
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      });
  });

  it(`function should round the price of the purchased fuel the to the nearest
   hundredth part.`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10.999, 3);

    expect(customer)
      .toEqual({
        money: 2967,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 11,
        },
      });
  });

  it(`function should update money and fuelRemains of the customer`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 2800,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 28,
        },
      });
  });
});
