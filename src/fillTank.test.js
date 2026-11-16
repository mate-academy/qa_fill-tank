'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  let customer;
  const fuelPrice = 60;
  let neededOil;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    neededOil = customer.vehicle.maxTankCapacity - customer.vehicle.fuelRemains;
  });

  it('should ', () => {});

  it('should fill the tank when amount is not provided', () => {
    fillTank(customer, fuelPrice);

    expect(customer.money).toBe(3000 - fuelPrice * neededOil);
    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it('amount more then needed', () => {
    const amount = 100;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(3000 - fuelPrice * neededOil);
    expect(customer.vehicle.fuelRemains).toBe(customer.vehicle.maxTankCapacity);
  });

  it('money less that client needed', () => {
    const client = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const amount = 20;
    const startedFuelRemains = client.vehicle.fuelRemains;

    fillTank(client, fuelPrice, amount);

    expect(client.money).toBe(100);

    expect(client.vehicle.fuelRemains).toBe(startedFuelRemains);
  });

  it('have money on 2 litres', () => {
    const amount = 20;
    const client = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const startedMoney = client.money;
    const availableLitres = (client.money / fuelPrice) * 10;
    const neededAvailableLitres = Math.floor(availableLitres) / 10;
    const startedFuelRemains = client.vehicle.fuelRemains;

    fillTank(client, fuelPrice, amount);

    expect(client.money).toBe(startedMoney - neededAvailableLitres * fuelPrice);

    expect(client.vehicle.fuelRemains).toBe(
      startedFuelRemains + neededAvailableLitres,
    );
  });

  it('round the poured amount and round the price', () => {
    const client = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 2,
      },
    };

    const price = 60.12;
    const amount = 2.39;
    const startedMoney = client.money;
    const startedFuelRemains = client.vehicle.fuelRemains;

    fillTank(client, price, amount);

    const acceptedAmount = Math.floor(amount * 10) / 10;

    expect(client.vehicle.fuelRemains).toBe(
      startedFuelRemains + acceptedAmount,
    );

    expect(client.money).toBe(
      startedMoney - Math.round(price * acceptedAmount * 100) / 100,
    );
  });
});
