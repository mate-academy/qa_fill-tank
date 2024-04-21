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

    const result = fillTank(customer);

    expect(result).toBe(void 0);
  });

  it(`should pour full tank if amount isn't set`, () => {
    const fuelPrice = 50;
    const customerBeforeFillingTank = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const customerAfterFillingTank = {
      money: 1400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    fillTank(customerBeforeFillingTank, fuelPrice);

    expect(customerBeforeFillingTank).toEqual(customerAfterFillingTank);
  });

  it(`should pour full tank if amount set more as could be filled`, () => {
    const fuelPrice = 50;
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, fuelPrice, 50);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it(`should pour could be paid amount of fuel`, () => {
    const fuelPrice = 50;
    const customerBeforeFillingTank = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const customerAfterFillingTank = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customerBeforeFillingTank, fuelPrice, 50);

    expect(customerBeforeFillingTank).toEqual(customerAfterFillingTank);
  });

  it(`should pour rounded to the tenth amount of fuel`, () => {
    const fuelPrice = 50;
    const customerBeforeFillingTank = {
      money: 122,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const customerAfterFillingTank = {
      money: 2,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10.4,
      },
    };

    fillTank(customerBeforeFillingTank, fuelPrice, 2.4);

    expect(customerBeforeFillingTank).toEqual(customerAfterFillingTank);
  });

  it(`shouldn't pour if amount of fuel is less than 2 liters`, () => {
    const fuelPrice = 50;
    const customerBeforeFillingTank = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.2,
      },
    };

    const customerAfterFillingTank = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 38.2,
      },
    };

    fillTank(customerBeforeFillingTank, fuelPrice);

    expect(customerBeforeFillingTank).toEqual(customerAfterFillingTank);
  });

  it(`should round the price of the purchased fuel to hundredth`, () => {
    const fuelPrice = 50.33;
    const customerBeforeFillingTank = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customerBeforeFillingTank, fuelPrice, 11.1);

    expect(customerBeforeFillingTank.money).toBe(2441.34);
  });
});
