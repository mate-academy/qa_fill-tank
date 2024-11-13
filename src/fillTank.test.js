'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should ', () => {

  });

  // write tests here
  describe('fillTank', () => {
    it('should be a function', () => {
      expect(typeof fillTank).toBe('function');
    });
  });

  it('should work properly', () => {
    const customer = {
      money: 60,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice, Infinity);
    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(0);
  });

  it('should fill tank if amount is not present', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 0,
      },
    };
    const fuelPrice = 20;

    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(30);
  });

  it('should fill tank with amount value', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 1;

    fillTank(customer, fuelPrice, 10);
    expect(customer.vehicle.fuelRemains).toBe(20);
  });

  it('should not fill more than customer can pay', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 500,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 5;

    fillTank(customer, fuelPrice, Infinity);
    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(0);
  });

  it('should discarde number of fuelRemains to 0,0', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 6;

    fillTank(customer, fuelPrice, Infinity);
    expect(customer.vehicle.fuelRemains).toBe(26, 6);
  });

  it('should not fill tank if amount < 2', () => {
    const customer = {
      money: 120,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 30,
      },
    };
    const fuelPrice = 6;

    fillTank(customer, fuelPrice, 1.5);
    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(120);
  });

  it('should not fill tank if customer cant buy 2 of fuel', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 5.19;

    fillTank(customer, fuelPrice, Infinity);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(10);
  });

  it('should not fill tank if cant pour at least 2', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 98.1,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice, Infinity);
    expect(customer.vehicle.fuelRemains).toBe(98.1);
    expect(customer.money).toBe(100);
  });

  it('should round customer.money to 0,00', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };
    const fuelPrice = 5.245;

    fillTank(customer, fuelPrice, Infinity);
    expect(customer.money).toBe(23.77);
  });
});
