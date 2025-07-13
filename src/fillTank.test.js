'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it(`should full tank is ordered if amount is not given`, () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toEqual(40);
  });

  it(`should pour only what will fit if amount is
    greater than the tank can accommodate`, () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100, 50);

    expect(customer.vehicle.fuelRemains).toEqual(40);
  });

  it(`should fill in only what the client can pay`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100);

    expect(customer.vehicle.fuelRemains).toEqual(18);
  });

  it(`should fuelRemains is 8 if it can pour only 1 liter`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 100);

    expect(customer.vehicle.fuelRemains).toEqual(8);
  });

  it(`should round the poured amount by discarding number
    to the tenth part.`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 79);

    expect(customer.vehicle.fuelRemains).toEqual(20.6);
  });
});
