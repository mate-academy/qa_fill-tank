'use strict';

const { fillTank } = require('./fillTank');

describe('should be defined and return nothing', () => {
  it('should be declared', () => {
    expect(fillTank)
      .toBeInstanceOf(Function);
  });

  it('should return nothing', function() {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const result = fillTank(customer, 50, 100);

    expect(result)
      .toBeUndefined();
  });
});

describe('should correctly changing customer object', () => {
  it('should change customer object', function() {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 10);

    expect(customer.money)
      .toBe(2600);

    expect(customer.vehicle.fuelRemains)
      .toBe(18);
  });

  it(`should return a full tank if 'amount' is not passed`, function() {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 25);

    expect(customer.vehicle.fuelRemains)
      .toEqual(customer.vehicle.maxTankCapacity);
  });

  it(`should return a full tank`
    + `if 'amount' > ('maxTankCapacity' - 'fuelRemains')`, function() {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 20, 100);

    expect(customer.vehicle.fuelRemains)
      .toEqual(customer.vehicle.maxTankCapacity);

    expect(customer.money)
      .toBe(2400);
  });

  it('should fill in only what the client can pay', function() {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 50, 50);

    expect(customer.money)
      .toBe(0);

    expect(customer.vehicle.fuelRemains)
      .toBe(45);
  });

  it('should round the price of the purchased fuel'
    + 'the to the nearest hundredth part', function() {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 25.376, 9);

    expect(customer.money)
      .toBe(1271.62);
  });

  it('should round the poured amount'
    + 'by discarding number to the tenth part', function() {
    const customer = {
      money: 1500,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 25, 9.84);

    expect(customer.vehicle.fuelRemains)
      .toBe(24.8);
  });

  it(`shouldn't change a customer object if 'amount' < 2`, function() {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 20, 1);

    expect(customer.vehicle.fuelRemains)
      .toBe(8);
  });
});
