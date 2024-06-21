'use strict';

const getDefaultCustomer = () => ({
  money: 100,
  vehicle: {
    maxTankCapacity: 60,
    fuelRemains: 10,
  },
});

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should fill max tank capacity if amount is not provided', () => {
    const customer = getDefaultCustomer();
    const { vehicle } = customer;
    const fuelPrice = 1.5;

    fillTank(customer, fuelPrice);

    expect(vehicle.fuelRemains).toBe(vehicle.maxTankCapacity);
  });

  it('should reduce customer money by the price of the fuel', () => {
    const customer = getDefaultCustomer();
    const fuelPrice = 1.5;

    fillTank(customer, fuelPrice);

    expect(customer.money).toBe(25);
  });

  it('should fill the tank by the provided amount', () => {
    const customer = getDefaultCustomer();
    const { vehicle } = customer;
    const fuelPrice = 1.5;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(vehicle.fuelRemains).toBe(30);
  });

  it('should fill the max tank capacity if the provided amount is greater', () => {
    const customer = getDefaultCustomer();
    const { vehicle } = customer;
    const fuelPrice = 1.5;
    const amount = 100;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(25);
    expect(vehicle.fuelRemains).toBe(vehicle.maxTankCapacity);
  });

  it('should fill the tank by the amount that customer can buy', () => {
    const customer = getDefaultCustomer();
    const { vehicle } = customer;
    const fuelPrice = 1.5;

    customer.money = 15;
    fillTank(customer, fuelPrice);

    expect(customer.money).toBe(0);
    expect(vehicle.fuelRemains).toBe(20);
  });

  it('should round the poured amount by discarding number to the tenth part', () => {
    const customer = getDefaultCustomer();
    const amount = 12.345;
    const fuelPrice = 1.5;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(22.3);
  });

  it('should not pour less than 2 liters of amount', () => {
    const customer = getDefaultCustomer();
    const amount = 1.9;
    const fuelPrice = 1.5;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(100);
  });

  it('should not pout less than 2 liters of max tank capacity', () => {
    const customer = getDefaultCustomer();
    const { vehicle } = customer;
    const fuelPrice = 1.5;
    const maxCapacityMinusOne = vehicle.maxTankCapacity - 1;

    vehicle.fuelRemains = maxCapacityMinusOne;
    fillTank(customer, fuelPrice);

    expect(vehicle.fuelRemains).toBe(maxCapacityMinusOne);
    expect(customer.money).toBe(100);
  });

  it('should round the price to the nearest hundredth', () => {
    const customer = getDefaultCustomer();
    const initialMoney = customer.money;
    const amount = 12.3;
    const fuelPrice = 1.75;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(initialMoney - 21.53);
  });
});
