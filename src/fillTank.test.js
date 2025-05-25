'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill the full tank', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);
    expect(customer.money).toBe(2680);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`amount > maxTankCapacity`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 1000);
    expect(customer.money).toBe(2680);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should not fill if 'money' = 0`, () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 10);
    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it(`should fill tank with 'amount'` + `that client can pay`, () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 50);
    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(11);
  });

  it(`should discarding amount to the tenth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 30.042);
    expect(customer.money).toBe(700);
    expect(customer.vehicle.fuelRemains).toBe(35);
  });

  it(`should not pour if amount < 2`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 1);
    expect(customer.money).toBe(1000);
    expect(customer.vehicle.fuelRemains).toBe(5);
  });

  it(`should pour if amount = 2`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 2);
    expect(customer.money).toBe(980);
    expect(customer.vehicle.fuelRemains).toBe(7);
  });

  it(`should round the price to the nearest hundredth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 30.942);
    expect(customer.money).toBe(691);
    expect(customer.vehicle.fuelRemains).toBe(35.9);
  });

  it(`should not fill if 'amount' = 0`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };

    fillTank(customer, 10, 0);
    expect(customer.money).toBe(1000);
    expect(customer.vehicle.fuelRemains).toBe(5);
  });
});
