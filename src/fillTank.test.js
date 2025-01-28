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

  it('should fill full tank if no amount given', () => {
    fillTank(customer, 50);
    expect(customer.vehicle.fuelRemains).toEqual(40);
    expect(customer.money).toEqual(1400);
  });

  it('should fill only to max tank capacity', () => {
    fillTank(customer, 50, 50);
    expect(customer.vehicle.fuelRemains).toEqual(40);
    expect(customer.money).toEqual(1400);
  });

  it('should fill only what customer can afford', () => {
    customer.money = 1000;
    fillTank(customer, 50, 40);
    expect(customer.vehicle.fuelRemains).toEqual(28);
    expect(customer.money).toEqual(0);
  });

  it('should round amount to tenths', () => {
    fillTank(customer, 45, 7.76);
    expect(customer.vehicle.fuelRemains).toEqual(15.7);
    expect(customer.money).toEqual(2653.5);
  });

  it('should not fill if amount less than 2 liters', () => {
    fillTank(customer, 50, 1.9);
    expect(customer.vehicle.fuelRemains).toEqual(8);
    expect(customer.money).toEqual(3000);
  });

  it('should round price to nearest hundredth', () => {
    fillTank(customer, 47.895, 10);
    expect(customer.vehicle.fuelRemains).toEqual(18);
    expect(customer.money).toEqual(2521.05);
  });

  it('should fill full tank if customer has exact money', () => {
    customer.money = 1600;
    fillTank(customer, 50);
    expect(customer.vehicle.fuelRemains).toEqual(40);
    expect(customer.money).toEqual(0);
  });

  it('should does nothing if customer has no money', () => {
    customer.money = 0;
    fillTank(customer, 50, 10);
    expect(customer.vehicle.fuelRemains).toEqual(8);
    expect(customer.money).toEqual(0);
  });

  it('should does nothing if amount is 0', () => {
    fillTank(customer, 50, 0);
    expect(customer.vehicle.fuelRemains).toEqual(8);
    expect(customer.money).toEqual(3000);
  });
});
