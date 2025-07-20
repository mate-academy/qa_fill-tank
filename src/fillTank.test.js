'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');
  const FUEL_PRICE = 5;

  it('should be a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('Should not tank if quantity to tank is less than 2', () => {
    const vehicle = {
      maxTankCapacity: 50,
      fuelRemains: 48.000001,
    };

    const customer = {
      money: 1000,
      vehicle,
    };

    const fuelRemainsBeforeTanking = vehicle.fuelRemains;

    fillTank(customer, FUEL_PRICE, 10);

    expect(vehicle.fuelRemains).toBe(fuelRemainsBeforeTanking);
  });

  it('Should tank to maximum if the amount arg is not provided', () => {
    const vehicle = {
      maxTankCapacity: 50,
      fuelRemains: 10,
    };

    const customer = {
      money: 1000,
      vehicle,
    };

    fillTank(customer, FUEL_PRICE);

    expect(vehicle.fuelRemains).toBe(vehicle.maxTankCapacity);
  });

  it('Should tank only what will', () => {
    const vehicle = {
      maxTankCapacity: 100,
      fuelRemains: 80,
    };

    const customer = {
      money: 1000,
      vehicle,
    };

    fillTank(customer, FUEL_PRICE, 42000);

    expect(vehicle.fuelRemains).toBe(vehicle.maxTankCapacity);
  });

  it('Should tank only the quantity that customer can pay', () => {
    const vehicle = {
      maxTankCapacity: 10000000,
      fuelRemains: 0,
    };

    const customer = {
      money: 100,
      vehicle,
    };

    const expectedQuantityToTank = customer.money / FUEL_PRICE;

    fillTank(customer, FUEL_PRICE, 100000);
    expect(vehicle.fuelRemains).toBe(expectedQuantityToTank);
  });
});
