'use strict';

const { fillTank } = require('./fillTank');

function makeCustomer(money, fuelRemains, maxTankCapacity) {
  return {
    money,
    vehicle: { maxTankCapacity, fuelRemains },
  };
}

describe('fillTank', () => {
  it('fills full tank when amount not given', () => {
    const customer = makeCustomer(3000, 8, 40);

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 32 * 10);
  });

  it('pours only what fits when amount exceeds free space', () => {
    const customer = makeCustomer(3000, 35, 40);

    fillTank(customer, 10, 20);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('pours only what customer can pay', () => {
    const customer = makeCustomer(50, 0, 40);

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(5);
    expect(customer.money).toBe(0);
  });

  it('does not pour when amount < 2 liters', () => {
    const customer = makeCustomer(3000, 39, 40);

    fillTank(customer, 10, 1);

    expect(customer.vehicle.fuelRemains).toBe(39);
    expect(customer.money).toBe(3000);
  });

  it('does not pour when customer can afford less than 2 liters', () => {
    const customer = makeCustomer(15, 0, 40);

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(0);
    expect(customer.money).toBe(15);
  });

  it('rounds fuel down to tenth', () => {
    const customer = makeCustomer(3000, 0, 40);

    fillTank(customer, 10, 5.99);

    expect(customer.vehicle.fuelRemains).toBe(5.9);
  });

  it('rounds price to nearest hundredth', () => {
    const customer = makeCustomer(3000, 0, 40);

    fillTank(customer, 1.005, 10);

    expect(customer.money).toBe(+(3000 - 10.05).toFixed(2));
  });

  it('does not exceed tank capacity', () => {
    const customer = makeCustomer(3000, 38, 40);

    fillTank(customer, 1, 10);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it('returns nothing', () => {
    const customer = makeCustomer(3000, 8, 40);

    expect(fillTank(customer, 10, 5)).toBeUndefined();
  });

  it('pours exact amount when within limits', () => {
    const customer = makeCustomer(3000, 0, 40);

    fillTank(customer, 10, 10);

    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(2900);
  });

  it('does not pour when tank is full', () => {
    const customer = makeCustomer(3000, 40, 40);

    fillTank(customer, 10, 5);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000);
  });
});
