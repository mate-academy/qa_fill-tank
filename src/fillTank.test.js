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

  it('should fill the tank when amount is omitted', () => {
    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2680);
  });

  it('should add the requested amount of fuel', () => {
    fillTank(customer, 10, 5);

    expect(customer.vehicle.fuelRemains).toBe(13);
    expect(customer.money).toBe(2950);
  });

  it('should not exceed the tank capacity', () => {
    fillTank(customer, 10, 100);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2680);
  });

  it('should only add fuel the customer can afford', () => {
    customer.money = 55;

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(13.5, 8);
    expect(customer.money).toBeCloseTo(0, 8);
  });

  it('should respect the budget when amount is omitted', () => {
    customer.money = 50;

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(13);
    expect(customer.money).toBe(0);
  });

  it('should round the requested amount down to one decimal', () => {
    fillTank(customer, 10, 5.79);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(13.7, 8);
    expect(customer.money).toBeCloseTo(2943, 8);
  });

  it('should round the affordable amount down to one decimal', () => {
    customer.money = 57.99;

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(13.7, 8);
    expect(customer.money).toBeCloseTo(0.99, 8);
  });

  it('should round available tank space down to one decimal', () => {
    customer.vehicle.fuelRemains = 37.25;

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(39.95, 8);
    expect(customer.money).toBeCloseTo(2973, 8);
  });

  it('should not fill when the requested amount is below two liters', () => {
    fillTank(customer, 10, 1.99);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should not fill when the customer cannot afford two liters', () => {
    customer.money = 19.99;

    fillTank(customer, 10, 5);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(19.99);
  });

  it('should not fill when less than two liters fit in the tank', () => {
    customer.vehicle.fuelRemains = 38.1;

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(38.1);
    expect(customer.money).toBe(3000);
  });

  it('should fill exactly two liters', () => {
    customer.money = 20;

    fillTank(customer, 10, 2);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  it('should not fill when zero liters are requested', () => {
    fillTank(customer, 10, 0);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should not fill an already full tank', () => {
    customer.vehicle.fuelRemains = 40;

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000);
  });

  it('should not fill when the customer has no money', () => {
    customer.money = 0;

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(0);
  });

  it('should round the fuel cost up to the nearest hundredth', () => {
    fillTank(customer, 1.23, 2.2);

    // 2.2 * 1.23 = 2.706, rounded cost: 2.71
    expect(customer.vehicle.fuelRemains).toBeCloseTo(10.2, 8);
    expect(customer.money).toBeCloseTo(2997.29, 8);
  });

  it('should round the fuel cost down to the nearest hundredth', () => {
    fillTank(customer, 1.23, 2.1);

    // 2.1 * 1.23 = 2.583, rounded cost: 2.58
    expect(customer.vehicle.fuelRemains).toBeCloseTo(10.1, 8);
    expect(customer.money).toBeCloseTo(2997.42, 8);
  });

  it('should preserve the tank capacity', () => {
    fillTank(customer, 10, 5);

    expect(customer.vehicle.maxTankCapacity).toBe(40);
  });

  it('should return undefined after refueling', () => {
    expect(fillTank(customer, 10, 5)).toBeUndefined();
  });

  it('should return undefined when no fuel is added', () => {
    expect(fillTank(customer, 10, 1)).toBeUndefined();
  });
});
