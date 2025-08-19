/* eslint-disable max-len */
'use strict';

describe('fillTank', () => {
  const {
    fillTank,
  } = require('./fillTank.js');

  it('should not return anything ', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    expect(fillTank(customer, 10, 5)).toBeUndefined();
  });

  it('should fuels full tank if amount is unknown', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(2680);
  });

  it('should not tank if amount is lower than two', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 1);
    expect(customer.money).toBe(3000);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('should round purchased fuel price to the nearest hundredth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10.111, 11);
    expect(customer.money).toBe(2888.78);
    expect(customer.vehicle.fuelRemains).toBe(19);
  });

  it('should round the poured amount by discarding number to the tenth part', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 10.17);
    expect(customer.money).toBe(2899);
    expect(customer.vehicle.fuelRemains).toBe(18.1);
  });

  it('should always fill in only what the client can pay', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 12);
    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(18);
  });

  it('should tank only what will fit if the amount is greater than tank can accomodate', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 35,
      },
    };

    fillTank(customer, 10, 10);
    expect(customer.money).toBe(950);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('should fuel as much as customer can afford when full tank is requested', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10);
    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(20);
  });

  it('should not tank when customer can afford for less than 2 litres', () => {
    const customer = {
      money: 15,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 10);
    expect(customer.money).toBe(15);
    expect(customer.vehicle.fuelRemains).toBe(10);
  });
});
