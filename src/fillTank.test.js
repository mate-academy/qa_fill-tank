'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should full tank if 'amount' is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 50);

    expect(customer.money).toBe(1400);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should fill to maximum if 'amount' exceeds capacity`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 50, 10);

    expect(customer.money).toBe(2750);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should fill in only what the client can pay`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 50, 25);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(30);
  });

  it(`should round fuel volume down to one decimal place`, () => {
    const customer = {
      money: 784,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 38.47);

    expect(customer.vehicle.fuelRemains).toBe(25.3);
  });

  it(`should do not pour amounts below 2 liters`, () => {
    const customer = {
      money: 80,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 50);

    expect(customer.money).toBe(80);
    expect(customer.vehicle.fuelRemains).toBe(5);
  });

  it(`should round the purchased fuel price to the nearest hundredth`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 23.99, 7.5);

    expect(customer.money).toBe(1820.07);
    expect(customer.vehicle.fuelRemains).toBe(12.5);
  });

  it('should not return anything', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    const result = fillTank(customer, 23.99, 7.5);

    expect(result).toBeUndefined();
  });
});
