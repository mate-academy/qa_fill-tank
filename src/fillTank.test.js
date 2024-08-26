'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should not return anything', () => {
    const result = fillTank(customer, 10, 20);

    expect(result).toBeUndefined();
  });

  it(`should change the original 'customer' and not create copy`, () => {
    const copy = JSON.parse(JSON.stringify(customer));

    fillTank(customer);

    expect(customer).not.toEqual(copy);
  });

  it(`should full tank if 'amount' is not given`, () => {
    fillTank(customer, 10);

    expect(customer)
      .toEqual({
        money: 2680,
        vehicle: {
          fuelRemains: 40,
          maxTankCapacity: 40,
        },
      });
  });

  it(`should full tank if 'amount' > 'tank capacity'`, () => {
    fillTank(customer, 10, 48);

    expect(customer)
      .toEqual({
        money: 2680,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 40,
        },
      });
  });

  it(`pour not more fuel than client can buy`, () => {
    customer.money = 300;
    customer.vehicle.fuelRemains = 2;

    fillTank(customer, 10, 43);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 32,
        },
      });
  });

  it(`pour not more fuel than client can buy,`
    + `when 'amount' is not given`, () => {
    customer.money = 300;
    customer.vehicle.fuelRemains = 2;

    fillTank(customer, 10);

    expect(customer)
      .toEqual({
        money: 0,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 32,
        },
      });
  });

  it(`decline transaction if client wants to pour less than 2 liters`, () => {
    fillTank(customer, 10, 1);

    expect(customer)
      .toEqual({
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      });
  });

  it(`decline transaction if client cannot afford more than 2 liters`, () => {
    customer.money = 10;

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 10,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      });
  });

  it(`decline transaction if the tank can accomodate < 2L of fuel`, () => {
    customer.vehicle.fuelRemains = 39;

    fillTank(customer, 10, 20);

    expect(customer)
      .toEqual({
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 39,
        },
      });
  });

  it(`round fuel amount down to tenth`, () => {
    fillTank(customer, 10, 5.56);

    expect(customer)
      .toEqual({
        money: 2945,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 13.5,
        },
      });
  });

  it(`round the price to nearest hundredth`, () => {
    fillTank(customer, 8.782, 20);

    expect(customer)
      .toEqual({
        money: 2824.36,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 28,
        },
      });
  });
});
