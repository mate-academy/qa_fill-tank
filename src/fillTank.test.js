'use strict';

const { fillTank } = require('./fillTank.js');

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

  it('should fill the tank fully if no amount is given', () => {
    const fuelPrice = 50; // Price per liter

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('should pour only the amount that fits in the tank', () => {
    const fuelPrice = 50;
    const amount = 100;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('should pour only what the customer can afford', () => {
    const fuelPrice = 50;
    const amount = 100;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it(`should not pour if the fuel amount is 
    less than 2 liters after rounding`, () => {
    const fuelPrice = 50;
    const amount = 1.9;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should pour the correct amount of fuel (rounded to the tenth)', () => {
    const fuelPrice = 50;
    const amount = 15.55;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(23.5);
    expect(customer.money).toBe(2225);
  });

  it('should correctly round the price to the nearest hundredth', () => {
    const fuelPrice = 49.995;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2500.05);
  });

  it(`should not pour any fuel if the customer does not 
    have enough money for at least 2 liters`, () => {
    const fuelPrice = 2000;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });
});
