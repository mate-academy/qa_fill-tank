'use strict';

describe('fillTank function', () => {
  const { fillTank } = require('./fillTank');

  it('should pour specified amount of gas', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 5);

    expect(customer.vehicle.fuelRemains).toBe(15);
  });

  it('should pour full tank when amount not specified', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(20);
  });

  it('should deduct money from customer', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    const fuelAmount = 10;
    const fuelPrice = 15;
    const totalGasPrice = fuelAmount * fuelPrice;
    const customersMoneyLeft = customer.money - totalGasPrice;

    fillTank(customer, fuelPrice, fuelAmount);

    expect(customer.money).toBe(customersMoneyLeft);
  });

  it('should pour only to full tank'
    + ` when 'amount' > 'maxTankCapacity'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(20);
  });

  it('should charge only up to full tank'
    + ` when 'amount' > 'maxTankCapacity'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 20);

    expect(customer.money).toBe(2900);
  });

  it('should fill in only what customer can pay', () => {
    const customer = {
      money: 40,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 10);

    expect(customer.vehicle.fuelRemains).toBe(12);
  });

  it('should not charge more than customer has', () => {
    const customer = {
      money: 40,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 10);

    expect(customer.money).toBe(0);
  });

  it('should fill rounded fuel amount', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 5.15);

    expect(customer.vehicle.fuelRemains).toBe(15.1);
  });

  it('should charge proper amount for rounded fuel', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    const fuelAmountOrdered = 5.15;
    const fuelPrice = 20;
    const totalCost = Math.floor(fuelAmountOrdered * 10) / 10 * fuelPrice;
    const balanceAfterFill = customer.money - totalCost;

    fillTank(customer, fuelPrice, fuelAmountOrdered);

    expect(customer.money).toBe(balanceAfterFill);
  });

  it('should not pour less than 2 liters', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 1);

    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it('should not charge when no fuel poured', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 1);

    expect(customer.money).toBe(3000);
  });

  it('should round the price of fuel to the hundredth part.', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 10,
      },
    };

    const fuelAmountOrdered = 5.17;
    const roundedFuelAmount = Math.floor(fuelAmountOrdered * 10) / 10;
    const fuelPrice = 20.977;
    const totalCost = roundedFuelAmount * fuelPrice;
    const totalRoundedCost = Math.round(totalCost * 100) / 100;
    const balanceAfterFill = 3000 - totalRoundedCost;

    fillTank(customer, fuelPrice, fuelAmountOrdered);

    expect(customer.money).toBe(balanceAfterFill);
  });
});
