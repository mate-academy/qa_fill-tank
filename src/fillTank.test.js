'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should fill 10 liters withdraw 400 money`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 40, 10);
    expect(customer.money).toBe(2600);
    expect(customer.vehicle.fuelRemains).toBe(18);
  });

  it(`should fill full tank if amount is not set`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 40);
    expect(customer.money).toBe(1800);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should fill full tank if amount is greater than tank capacity`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 40, 50);
    expect(customer.money).toBe(1800);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should fill amount that client can pay`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 40, 30);
    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(35);
  });

  it(`should fill rounded to the tenth part if 'amount' is 3.73`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 40, 3.73);
    expect(customer.money).toBe(852);
    expect(customer.vehicle.fuelRemains).toBe(13.7);
  });

  it(`should not fill tank if amount is less than 2`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 40, 1);
    expect(customer.money).toBe(1000);
    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it(`should not fill tank if amount is negative`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 40, -5);
    expect(customer.money).toBe(1000);
    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it(`should not fill tank if amount is zero`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 40, 0);
    expect(customer.money).toBe(1000);
    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it(`should fill 2 liters if 'amount' is 2`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 40, 2);
    expect(customer.money).toBe(920);
    expect(customer.vehicle.fuelRemains).toBe(12);
  });

  it(`should withdraw money rounded to the nearest hundredth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 40.231, 2.3);
    expect(customer.money).toBe(907.47);
    expect(customer.vehicle.fuelRemains).toBe(12.3);
  });

  it(`should not fill if 'money' is 0`, () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 40, 5);
    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(10);
  });
});
