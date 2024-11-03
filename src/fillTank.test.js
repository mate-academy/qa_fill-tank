'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill tank fully with no amount', () => {
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

  it('should fill tank fully with amount bigger than tank capacity', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 21,
      },
    };

    fillTank(customer, 29, 110);

    expect(customer.money).toBe(709);
    expect(customer.vehicle.fuelRemains).toBe(100);
  });

  it('should correctly withdraw money and fill the tank', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 12,
      },
    };

    fillTank(customer, 30, 26);

    expect(customer.money).toBe(1220);
    expect(customer.vehicle.fuelRemains).toBe(38);
  });

  it('should fill only within the budget', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 100, 20);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(25);
  });

  it('should round remaining money to hundredth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 23.48459, 20);

    expect(customer.money).toBe(2530.31);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should round fuel to tenth part', () => {
    const customer = {
      money: 853,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 45);

    expect(customer.money).toBe(2.5);
    expect(customer.vehicle.fuelRemains).toBe(33.9);
  });

  it('should not pour fuel if amount is less than 2', () => {
    const customer = {
      money: 853,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 20, 1.5);

    expect(customer.money).toBe(853);
    expect(customer.vehicle.fuelRemains).toBe(15);
  });

  it('should throw an error if price is 0 or not a number', () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 15,
      },
    };

    expect(() => fillTank(customer, 0, 10)).toThrow();
    expect(() => fillTank(customer, NaN, 10)).toThrow();
    expect(() => fillTank(customer, undefined, 10)).toThrow();
    expect(() => fillTank(customer, null, 10)).toThrow();
    expect(() => fillTank(customer, false, 10)).toThrow();
    expect(() => fillTank(customer, '10', 10)).toThrow();
  });

  it(`should throw an error`
    + `if amount is string or falsy value except undefined`, () => {
    const customer = {
      money: 2000,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 15,
      },
    };

    expect(() => fillTank(customer, 20, null)).toThrow();
    expect(() => fillTank(customer, 20, NaN)).toThrow();
    expect(() => fillTank(customer, 20, false)).toThrow();
    expect(() => fillTank(customer, 20, '0')).toThrow();
  });

  it('should throw an error if customer is not an object', () => {
    expect(() => fillTank([], 10, 10)).toThrow();
    expect(() => fillTank(0, 10, 10)).toThrow();
    expect(() => fillTank(NaN, 10, 10)).toThrow();
    expect(() => fillTank(false, 10, 10)).toThrow();
    expect(() => fillTank(true, 10, 10)).toThrow();
    expect(() => fillTank('customer', 10, 10)).toThrow();
  });

  it('should throw an error,'
    + `if customer properties are unexisted or undefined`, () => {
    expect(() => fillTank({
      money: undefined,
      vehicle: {
        maxTankCapacity: 35,
        fuelRemains: 15,
      },
    }, 10, 10)).toThrow();

    expect(() => fillTank({
      money: 2000,
      vehicle: undefined,
    }, 10, 10)).toThrow();

    expect(() => fillTank({
      money: 2000,
      vehicle: {
        maxTankCapacity: null,
        fuelRemains: 15,
      },
    }, 10, 10)).toThrow();

    expect(() => fillTank({
      money: 2000,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: undefined,
      },
    }, 10, 10)).toThrow();
  });
});
