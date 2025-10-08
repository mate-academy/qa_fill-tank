'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

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

  it('should fill full tank when amount is not provided', () => {
    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('should not pour if tank is already full when amount is omitted', () => {
    customer.vehicle.fuelRemains = 40;

    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000);
  });

  it('should not exceed max tank capacity when amount is too large', () => {
    const fuelPrice = 10;

    fillTank(customer, fuelPrice, 100);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2680);
  });

  it('should fill only what customer can pay for', () => {
    customer.money = 100;

    const fuelPrice = 50;

    fillTank(customer, fuelPrice, 10);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('should not pour if rounded amount is less than 2 liters', () => {
    customer.money = 50;

    const fuelPrice = 50;

    fillTank(customer, fuelPrice, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(50);
  });

  it('should pour exactly when rounded amount equals 2.0 liters', () => {
    customer.money = 120;

    const fuelPrice = 60;

    fillTank(customer, fuelPrice, 10);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('should not pour for amount = 0 or negative', () => {
    fillTank(customer, 50, 0);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);

    fillTank(customer, 50, -5);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should round poured amount down to one decimal', () => {
    const fuelPrice = 20;

    fillTank(customer, fuelPrice, 3.789);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(11.7, 2);
    expect(customer.money).toBeCloseTo(2926, 2);
  });

  it('should round total fuel cost to two decimals', () => {
    const fuelPrice = 33.3333;

    fillTank(customer, fuelPrice, 3);

    expect(customer.money).toBeCloseTo(2900, 2);
  });

  it('should round correctly at half-way case for price', () => {
    customer.vehicle.fuelRemains = 8;
    customer.money = 121;

    const fuelPrice = 60;

    fillTank(customer, fuelPrice, 10);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBeCloseTo(1, 2);
  });

  it(`should handle order where affordability 
    gives < 2 L after rounding`, () => {
    customer.money = 39;

    const fuelPrice = 20;

    fillTank(customer, fuelPrice, 5);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(39);
  });

  it(`should handle order where affordability 
    gives > 2 L after rounding`, () => {
    customer.money = 41;

    const fuelPrice = 20;

    fillTank(customer, fuelPrice, 5);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBeCloseTo(1, 2);
  });

  it('should do nothing if customer already has full tank', () => {
    customer.vehicle.fuelRemains = 40;

    const fuelPrice = 10;

    fillTank(customer, fuelPrice, 5);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000);
  });

  it('should handle situation when fuel price is very high', () => {
    const fuelPrice = 2000;

    fillTank(customer, fuelPrice, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });
});
