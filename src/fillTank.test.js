"use strict";

describe("fillTank", () => {
  const { fillTank } = require("./fillTank");

  it(`If the 'amount' is not given, then full tank is ordered`, () => {
    const customer = createCustomer(3000, 8);

    fillTank(customer, 5);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`If the 'amount' is greater than the tank can accommodate,
     pour only what will fit.`, () => {
    const customer = createCustomer(3000, 8, 40);

    fillTank(customer, 5, 3000);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(`should always fill tank in only what the client can pay.`, () => {
    const customer = createCustomer(3000, 8, 40);

    fillTank(customer, 2, 2);

    expect(customer.vehicle.fuelRemains).toBe(10);
  });

  it(`should round the poured amount 
    by discarding number to the tenth part`, () => {
    const customer = createCustomer(3000, 8, 40);

    fillTank(customer, 5.44, 5.44);

    expect(customer.vehicle.fuelRemains).toBe(13.4);
  });

  it(`If the poured amount is less than 2 liters, 
    do not pour at all.`, () => {
    const customer = createCustomer(3000, 8, 40);

    fillTank(customer, 5.44, 1);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it(`Round the price of the purchased fuel the 
    to the nearest hundredth part.`, () => {
    const customer = createCustomer(3000, 8, 40);

    fillTank(customer, 5.4455, 2);

    expect(customer.money).toBe(2989.11);
  });
});

function createCustomer(money = 3000, fuelRemains = 8, maxTankCapacity = 40) {
  return {
    money,
    vehicle: {
      maxTankCapacity,
      fuelRemains,
    },
  };
}
