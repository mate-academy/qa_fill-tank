'use strict';

const customer = {
  money: 3000, // customer account balance
  vehicle: {
    maxTankCapacity: 40, // fuel tank volume
    fuelRemains: 8, // Remaining fuel in the tank
  },
};

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should take a money from customer if arguments is valid', () => {
    const testCustomer = JSON.parse(JSON.stringify(customer));

    fillTank(testCustomer, 10, 10);

    expect(testCustomer.money).toBe(2900);
  });

  it('should order full tank if amount is not given', () => {
    const testCustomer = JSON.parse(JSON.stringify(customer));

    fillTank(testCustomer, 10);

    expect(testCustomer.vehicle.fuelRemains).toBe(40);
  });

  it('should order full tank if amount is greater', () => {
    const testCustomer = JSON.parse(JSON.stringify(customer));

    fillTank(testCustomer, 10, 100);

    expect(testCustomer.vehicle.fuelRemains).toBe(40);
  });

  it('shoul order only amount that clien can to pay', () => {
    const testCustomer = JSON.parse(JSON.stringify(customer));

    fillTank(testCustomer, 1000, 10);

    expect(testCustomer.vehicle.fuelRemains).toBe(11);
  });

  it('should round ordered sum', () => {
    const testCustomer = JSON.parse(JSON.stringify(customer));

    fillTank(testCustomer, 10, 5, 10, 5);

    expect(testCustomer.vehicle).toEqual({
      maxTankCapacity: 40,
      fuelRemains: 13,
    });
  });

  it('should not order customer if sum of order < 2L', () => {
    const testCustomer = JSON.parse(JSON.stringify(customer));

    fillTank(testCustomer, 10, 1);

    expect(testCustomer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  // write tests here
});
