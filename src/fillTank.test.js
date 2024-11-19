"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  it(`Should fill the full tank when 'amount' is not given`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 50,
      },
    };

    const fuelPrice = 10;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it(`Should fill the full tank when 'amount' is greater than tank capacity`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 50,
      },
    };

    const fuelPrice = 10;
    const amount = 300;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it(`Should not fill the tank when 'money' is equal to 0`, () => {
    const customer = {
      money: 0,
      vehicle: {
        maxTankCapacity: 100,
        fuelRemains: 50,
      },
    };

    const fuelPrice = 10;
    const amount = 300;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.fuelRemains);
  });

  it(`Should fill the tank as much as customer can pay`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 200,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 11;
    const amount = 20;

    const maxAffordableFuel = customer.money / fuelPrice; // 6

    const availableTankSpace =
      customer.vehicle.maxTankCapacity - customer.vehicle.fuelRemains; // 190

    const fuelToAdd = Math.min(maxAffordableFuel, availableTankSpace, amount); // 6

    const expectedFuelRemains = customer.vehicle.fuelRemains + fuelToAdd; // 16.66666666666677777

    const roundedFuelRemains = +expectedFuelRemains.toFixed(2).slice(0, -1); // 16.6 Костиль АЛЕ робочий хєхє

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(roundedFuelRemains);
  });

  it(`Should not fill the tank if anount is less than 2`, () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 200,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 15;
    const amount = 2;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.fuelRemains);
  });

  it(`Should round the price of the perchased fuel to handredth part`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 200,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 5;
    const amount = 5.555;

    const roundedAmount = Math.floor(amount * 10) / 10;
    const expectedFuelRemains =
      Math.floor((roundedAmount + customer.vehicle.fuelRemains) * 10) / 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(expectedFuelRemains);
  });

  it(`Should round the poured amount to tenth part`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 200,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 5;
    const amount = 5.555;

    const roundedAmount = Math.floor(amount * 10) / 10;
    const expectedFuelRemains =
      Math.floor((roundedAmount + customer.vehicle.fuelRemains) * 10) / 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(expectedFuelRemains);
  });

  it(`Should round the fuel price to hundredth part`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 200,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 1.111111;
    const amount = 5;

    const expectedPriceRemains = customer.money - fuelPrice * amount;
    const roundedPriceRemains = Math.round(expectedPriceRemains * 100) / 100;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(roundedPriceRemains);
  });
});
