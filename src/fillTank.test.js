'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

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

  it('full capacity when no amount is specified', () => {
    fillTank(customer, 45);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('customer money for full capacity when no amount is specified', () => {
    fillTank(customer, 45);

    expect(customer.money).toBe(1560);
  });

  it('should fill the tank with the specified amount', () => {
    fillTank(customer, 45, 20);

    expect(customer.vehicle.fuelRemains).toBe(28);
  });

  it('customer money for the tank with the specified amount', () => {
    fillTank(customer, 45, 20);

    expect(customer.money).toBe(2100);
  });

  it('Max amount when amount exceeds capacity', () => {
    fillTank(customer, 45, 60);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('Correct customer money for max amount exceeding capacity', () => {
    fillTank(customer, 45, 60);

    expect(customer.money).toBe(1560);
  });

  it('Should fill tank with max affordable amount exceeding budget', () => {
    customer.money = 900;
    fillTank(customer, 45, 40);

    expect(customer.vehicle.fuelRemains).toBe(28);
  });

  it('Money for tank with max affordable amount exceeding budget', () => {
    customer.money = 900;
    fillTank(customer, 45, 40);

    expect(customer.money).toBe(0);
  });

  it('should not fill the tank when the rounded amount is less than 2', () => {
    fillTank(customer, 45, 1);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('should not take a money when the rounded amount is less than 2', () => {
    fillTank(customer, 45, 1);

    expect(customer.money).toBe(3000);
  });

  it('should round the price of purchased fuel to two decimal places', () => {
    fillTank(customer, 45.525, 11);

    const roundedPrice = Math.round(11 * 45.525 * 100) / 100;

    expect(customer.money).toBeCloseTo(3000 - roundedPrice);
  });
});
