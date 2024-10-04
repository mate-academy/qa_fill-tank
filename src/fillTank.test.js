'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  let customer;
  const fuelPrice = 50;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('when amount is not provided', () => {
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('when there is enough space and money', () => {
    fillTank(customer, fuelPrice, 20);
    expect(customer.vehicle.fuelRemains).toBe(28);
    expect(customer.money).toBe(2000);
  });

  it('when amount is too large', () => {
    fillTank(customer, fuelPrice, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it('should fill only what the customer can afford', () => {
    customer.money = 1000;
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(28);
    expect(customer.money).toBe(0);
  });

  it('should round the filled amount to the tenth', () => {
    fillTank(customer, fuelPrice, 10.66);
    expect(customer.vehicle.fuelRemains).toBe(18.6);
    expect(customer.money).toBe(2470);
  });

  it('should not fill if the amount is less than 2 liters', () => {
    fillTank(customer, fuelPrice, 1.9);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });

  it('should round the price to the nearest hundredth', () => {
    const oddPriceFuel = 50.33;

    fillTank(customer, oddPriceFuel, 10);
    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBe(2496.7);
  });

  it('should not fill if there is not enough money for 2 liters', () => {
    customer.money = 99;
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(99);
  });

  it('should fill the maximum possible amount when money is limited', () => {
    customer.money = 175;
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(11.5);
    expect(customer.money).toBe(0);
  });

  it('should not change anything if the tank is already full', () => {
    customer.vehicle.fuelRemains = 40;
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000);
  });
});
