/* eslint-disable max-len */
'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  // write tests here
  it('should fill full tank when amount is not provided', () => {
    const customer = {
      money: 1000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 10 },
    };

    fillTank(customer, 10); // fuelPrice=10, amount=20

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(700);
  });

  it('should fill tank with provided amount of fuel', () => {
    const customer = {
      money: 1000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 10 },
    };

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(800);
  });

  it('should not fill tank if customer has not enough money', () => {
    const customer = {
      money: 50,
      vehicle: { maxTankCapacity: 40, fuelRemains: 10 },
    };

    fillTank(customer, 10, 20);
    expect(customer.vehicle.fuelRemains).toBe(15); // 10 + 5
    expect(customer.money).toBe(0);
  });

  it('should not fill tank if amount exceeds max tank capacity', () => {
    const customer = {
      money: 1000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 10 },
    };

    fillTank(customer, 10, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(700);
  });

  it('should fill tank with rounded amount of fuel', () => {
    const customer = {
      money: 1000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 10 },
    };

    fillTank(customer, 10, 15.67);

    expect(customer.vehicle.fuelRemains).toBe(25.6);
    expect(customer.money).toBe(844);
  });

  it('should fill tank with rounded amount of fuel when amount is not provided', () => {
    const customer = {
      money: 1000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 10 },
    };

    fillTank(customer);

    expect(customer.vehicle.fuelRemains).toBe(NaN);
    expect(customer.money).toBe(NaN);
  });

  it('should not fill tank if amount is less than 2 liters', () => {
    const customer = {
      money: 1000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 10 },
    };

    fillTank(customer, 10, 1.5);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(1000);
  });

  it('should round total price to 2 decimal places', () => {
    const customer = {
      money: 1000,
      vehicle: { maxTankCapacity: 40, fuelRemains: 10 },
    };

    fillTank(customer, 10.555);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(683.35);
  });
});
