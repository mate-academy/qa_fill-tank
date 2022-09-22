'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('fill what customer wants', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 100;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(1000);
    expect(customer.vehicle.fuelRemains).toBe(28);
  });

  it('fill what customer can pay', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 100;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(0);
    expect(customer.vehicle.fuelRemains).toBe(18);
  });

  it('fill full tank if amount > maxTankCapacity', () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 100;
    const amount = 40;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(800);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('fill full tank if amount omitted', () => {
    const customer = {
      money: 4000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 100;

    fillTank(customer, fuelPrice);

    expect(customer.money).toBe(800);
    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('do not fill if amount <= 2', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 100;
    const amount = 5;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(100);
    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('amount rounded by discarding number to the 10th part', () => {
    const customer = {
      money: 569,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 100;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(9);
    expect(customer.vehicle.fuelRemains).toBe(13.6);
  });

  it('money paid rounded to the 100th part', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
    const fuelPrice = 99.889;
    const amount = 5;

    fillTank(customer, fuelPrice, amount);

    expect(customer.money).toBe(500.55);
    expect(customer.vehicle.fuelRemains).toBe(13);
  });
});
