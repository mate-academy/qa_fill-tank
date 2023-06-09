'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it(`should fill the tank with the maximum amount when amount`
   + `is not specified`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 2;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2936);
  });

  it(`should fill the tank with the available amount if it cannot`
  + ` fit the specified amount `, () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 2;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);

    const expectedFuelRemains = 40;
    const expectedMoney = 4940;

    expect(customer.vehicle.fuelRemains).toBe(expectedFuelRemains);
    expect(customer.money).toBe(expectedMoney);
  });

  it(`should fill the tank to max<='maxTankCapacity'`, () => {
    const customer = {
      money: 5100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 0,
      },
    };

    const fuelPrice = 100;
    const amount = 50;

    fillTank(customer, fuelPrice, amount);

    const expectedFuelRemains = 50;
    const expectedMoney = 100;

    expect(customer.vehicle.fuelRemains).toBe(expectedFuelRemains);
    expect(customer.money).toBe(expectedMoney);
  });

  it(`should fill the tank rounding up the amount of gasoline`
  + ` filled to tenths. `, () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 0,
      },
    };

    const fuelPrice = 99;

    fillTank(customer, fuelPrice,);

    const expectedFuelRemains = 50.5;
    const expectedMoney = 0.5;

    expect(customer.vehicle.fuelRemains).toBe(expectedFuelRemains);
    expect(customer.money).toBe(expectedMoney);
  });

  it(`should don't fill the tank if the poured amount`
  + ` is less than 2 liters.`, () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 2,
      },
    };

    const fuelPrice = 100;
    const amount = 1;

    fillTank(customer, fuelPrice, amount);

    const expectedFuelRemains = 2;
    const expectedMoney = 5000;

    expect(customer.vehicle.fuelRemains).toBe(expectedFuelRemains);
    expect(customer.money).toBe(expectedMoney);
  });

  it(`should dshould approximate the price of the gasoline you fill`
  + ` up to a hundredth`, () => {
    const customer = {
      money: 2600,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 2,
      },
    };

    const fuelPrice = 99.99;

    const expectedMoney = 50.255;
    const amount = 25.5;
    const roundPrice = customer.money - expectedMoney;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(27.5);
    expect(roundPrice).toBe(2549.745);
  });
});
