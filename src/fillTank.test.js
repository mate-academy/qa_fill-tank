'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('should fill full tank if amount is not specified', () => {
    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 32 * 10);
  });

  it('should pour only what fits if amount exceeds free space', () => {
    fillTank(customer, 10, 50);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 32 * 10);
  });

  it('should pour only the requested amount if it fits into the tank', () => {
    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(28);
    expect(customer.money).toBe(3000 - 20 * 10);
  });

  it('should pour only what the customer can afford', () => {
    customer.money = 100;

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(0);
  });

  it('should round down the poured amount to the tenths', () => {
    customer.money = 195;

    fillTank(customer, 10);

    // canBuy = 19.5 -> rounded down to 19.5, tenths already
    expect(customer.vehicle.fuelRemains).toBe(8 + 19.5);
    expect(customer.money).toBe(195 - 19.5 * 10);
  });

  it('should round down fractional liters not multiple of 0.1', () => {
    customer.money = 193.33;

    fillTank(customer, 10);

    // canBuy = 19.333 -> rounded down to 19.3
    expect(customer.vehicle.fuelRemains).toBe(8 + 19.3);
    expect(customer.money).toBeCloseTo(193.33 - 19.3 * 10, 10);
  });

  it('should not pour fuel if the poured amount is less than 2 liters', () => {
    customer.money = 15;

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(15);
  });

  it('should not pour fuel if the poured amount is 1.9 liters', () => {
    customer.money = 19.9;

    fillTank(customer, 10, 20);

    // canBuy = 1.99 -> rounded down to 1.9, less than 2 liters
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(19.9);
  });

  it('should pour fuel when the poured amount is exactly 2 liters', () => {
    customer.money = 20;

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('should not pour fuel if the tank is already full', () => {
    customer.vehicle.fuelRemains = 40;

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000);
  });

  it('should round the price to the nearest hundredth', () => {
    customer.money = 3000;

    fillTank(customer, 3.333, 10);

    // roundedAmount = 10, price = 10 * 3.333 = 33.33 -> already rounded
    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBeCloseTo(3000 - 33.33, 2);
  });

  it('should round the price up to the nearest hundredth when needed', () => {
    customer.money = 3000;

    fillTank(customer, 3.333333, 10);

    // price = 10 * 3.333333 = 33.33333 -> rounds to 33.33
    expect(customer.money).toBeCloseTo(3000 - 33.33, 2);
  });

  it('should return undefined', () => {
    const result = fillTank(customer, 10, 20);

    expect(result).toBeUndefined();
  });
});
