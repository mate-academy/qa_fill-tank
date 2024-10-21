'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');
  let customer;

  beforeEach(() => {
    customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 30,
      },
    };
  });

  it('should be a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should take two or more arguments ', () => {
    expect(fillTank.length).toBeGreaterThanOrEqual(2);
  });

  it('should throw an error if the first argument is not an object', () => {
    expect(() => fillTank(null, 50.35, 9.9)).toThrow();
    expect(() => fillTank(123, 50.35, 9.9)).toThrow();
    expect(() => fillTank('customer', 50.35, 9.9)).toThrow();
  });

  it('should throw an error if the second argument is not a number', () => {
    expect(() => fillTank({}, '50.35', 9.9)).toThrow();
    expect(() => fillTank({}, null, 9.9)).toThrow();
  });

  it('should throw an error if the third argument is not a number', () => {
    expect(() => fillTank({}, 50.35, '9.9')).toThrow();
    expect(() => fillTank({}, 50.35, null)).toThrow();
  });

  it(`should set 'fuelRemains' to '40' if amount is '10`, () => {
    const fuelPrice = 50;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should set 'money' to '0' if amount is '10' and 'price' is '50'`, () => {
    const fuelPrice = 50;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(0);
  });

  it(`should set 'fuelRemains' to '40' if amount not given`, () => {
    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should set 'fuelRemains' to '40' if 'amount'
    is greater than the tank can accommodate - '10'`, () => {
    const fuelPrice = 50;
    const amount = 15;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should set 'fuelRemains' to '35' if 'money / fuelPrice'
    is quel to '5'`, () => {
    const fuelPrice = 100;
    const amount = 150;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(35);
  });

  it(`should round 'fuelRemains' down to the nearest tenth`, () => {
    const fuelPrice = 50.3;
    const amount = 5.5;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(35.5, 1);
  });

  it(`should not change 'customer' if 'amount' less then '2' `, () => {
    const fuelPrice = 50.3;
    const amount = 1.9;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(500);
  });

  it(`should round the fuel cost to the nearest hundredth`, () => {
    const fuelPrice = 50.35;
    const amount = 9.9;

    fillTank(customer, fuelPrice, amount);
    expect(customer.money).toBeCloseTo(1.53, 2);
  });
});
