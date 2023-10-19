"use strict";

const { fillTank } = require('./fillTank');

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  it('should fill the tank completely', () => {
    const customer = {
      money: 60, 
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };
    const fuelPrice = 2;
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(0);
  });

  it('should partially fill the tank', () => {
    const customer = {
      money: 50, 
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };
    const fuelPrice = 2;
    fillTank(customer, fuelPrice, 25);
    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(0);
  });

  it('should not pour less than 2 liters', () => {
    const customer = {
      money: 50,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };
    const fuelPrice = 5;
    fillTank(customer, fuelPrice, 5);
    expect(customer.vehicle.fuelRemains).toBe(5);
    expect(customer.money).toBe(50);
  });

  it('should pour only what the customer can pay', () => {
    const customer = {
      money: 30, 
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 5,
      },
    };
    const fuelPrice = 3;
    fillTank(customer, fuelPrice);
    expect(customer.vehicle.fuelRemains).toBe(15); 
    expect(customer.money).toBe(0);
  });
});
