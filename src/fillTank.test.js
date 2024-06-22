'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank function', () => {
  it('should not exceed the maximum tank capacity'
    + 'if amount is not given', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - (40 - 8) * fuelPrice);
  });

  it('should fill only as much as the customer'
    + 'can afford if money is a limiting factor', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    const affordableFuel = Math.floor((500 / 50) * 10) / 10;

    expect(customer.vehicle.fuelRemains).toBe(
      8 + affordableFuel);
    expect(customer.money).toBe(0);
  });

  it('should not fill if the calculated fuel to be filled'
    + 'is less than 2 liters', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    };
    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(39);
    expect(customer.money).toBe(100);
  });

  it('should pour only what will fit if the amount'
    + 'is greater than the tank can accommodate', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };
    const fuelPrice = 50;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    const freeSpace = 40 - 35;
    const roundedFreeSpace = Math.floor(freeSpace * 10) / 10;

    expect(customer.vehicle.fuelRemains).toBe(35 + roundedFreeSpace);
    expect(customer.money).toBe(5000 - roundedFreeSpace * fuelPrice);
  });

  it('should round the poured amount'
    + 'by discarding number to the tenth part', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };
    const fuelPrice = 10;
    const amount = 6.789;

    fillTank(customer, fuelPrice, amount);

    const freeSpace = 50 - 45;
    const roundedAmount = Math.floor(Math.min(amount, freeSpace) * 10) / 10;

    expect(customer.vehicle.fuelRemains).toBe(45 + roundedAmount);
    expect(customer.money).toBe(1000 - roundedAmount * fuelPrice);
  });

  it('should not pour if the poured amount is less than 2 liters', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 49,
      },
    };
    const fuelPrice = 50;
    const amount = 5;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(49);
    expect(customer.money).toBe(100);
  });

  it('should round the price of the purchased'
    + 'fuel to the nearest hundredth part', () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 45,
      },
    };
    const fuelPrice = 10.555;
    const amount = 5;

    fillTank(customer, fuelPrice, amount);

    const freeSpace = 50 - 45;
    const roundedAmount = Math.floor(Math.min(amount, freeSpace) * 10) / 10;
    const totalPrice = Math.round(roundedAmount * fuelPrice * 100) / 100;

    expect(customer.vehicle.fuelRemains).toBe(45 + roundedAmount);
    expect(customer.money).toBe(300 - totalPrice);
  });
});
