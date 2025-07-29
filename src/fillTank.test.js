'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should fill full tank without 'amount'`, () => {
    const customer = {
      money: 3000, // залишок грошей на рахунку клієнта
      vehicle: {
        maxTankCapacity: 40, // Об'єм бака
        fuelRemains: 8, // Залишок палива у баку
      },
    }

    fillTank(customer, 10);

    const customerTank = customer.vehicle.fuelRemains;

    expect(customerTank).toBe(40);
  });

  it(`should count money without 'amount'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    }

    fillTank(customer, 10);

    const customerMoney = customer.money;

    expect(customerMoney).toBe(2680);
  });

  it(`should fill not full tank without 'money'`, () => {
    const customer = {
      money: 300,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    }

    fillTank(customer, 10);

    const customerTank = customer.vehicle.fuelRemains;

    expect(customerTank).toBe(38);
  });

  it(`should fill for max with high 'amount'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    }

    fillTank(customer, 10, 50);

    const customerTank = customer.vehicle.fuelRemains;

    expect(customerTank).toBe(40);
  });

  it(`should not fill fuel if 'amount' < 2`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 39,
      },
    }

    fillTank(customer, 10, 1);

    const customerTank = customer.vehicle.fuelRemains;

    expect(customerTank).toBe(39);
  });

  it(`should round the price`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 20,
      },
    }

    fillTank(customer, 10.26, 12);

    const customerMoney = customer.money;

    expect(customerMoney).toBe(2876.88);
  });
});
