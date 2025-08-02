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

  it('fills the tank fully when amount is not provided', () => {
    fillTank(customer, 50);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(
      customer.vehicle.maxTankCapacity,
      5,
    );

    const expectedLiters = customer.vehicle.maxTankCapacity - 8;
    const expectedCost = +(expectedLiters * 50).toFixed(2);

    expect(customer.money).toBeCloseTo(3000 - expectedCost, 2);
  });

  it('does not overfill tank if amount exceeds capacity', () => {
    fillTank(customer, 40, 50);

    expect(customer.vehicle.fuelRemains).toBeCloseTo(
      customer.vehicle.maxTankCapacity,
      5,
    );

    const expectedLiters = customer.vehicle.maxTankCapacity - 8;
    const expectedCost = +(expectedLiters * 40).toFixed(2);

    expect(customer.money).toBeCloseTo(3000 - expectedCost, 2);
  });

  it('does not pour more fuel than customer can pay for', () => {
    customer.money = 100;
    fillTank(customer, 25, 20);

    const affordableLiters = Math.floor((100 / 25) * 10) / 10;

    expect(customer.vehicle.fuelRemains).toBeCloseTo(
      8 + affordableLiters,
      5,
    );

    const expectedCost = +(affordableLiters * 25).toFixed(2);

    expect(customer.money).toBeCloseTo(100 - expectedCost, 2);
  });

  it('does not pour fuel if amount to pour is less than 2L', () => {
    customer.money = 10;
    fillTank(customer, 30, 10);

    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(10);
  });

  it('rounds down poured fuel to the nearest 0.1L', () => {
    customer.money = 260;
    fillTank(customer, 60, 10);

    const expectedLiters = Math.floor((260 / 60) * 10) / 10;

    expect(customer.vehicle.fuelRemains).toBeCloseTo(
      8 + expectedLiters,
      5,
    );
  });

  it('rounds total cost to 2 decimal places', () => {
    customer.money = 1000;

    // Zapamiętujemy stan paliwa przed wlanie
    const fuelRemainsBefore = customer.vehicle.fuelRemains;
    const maxPossible
      = customer.vehicle.maxTankCapacity - fuelRemainsBefore;
    const affordableLiters
      = Math.floor((1000 / 33.333) * 10) / 10;

    const requestedAmount = 20;
    const pouredLiters = Math.min(
      requestedAmount,
      maxPossible,
      affordableLiters,
    );

    fillTank(customer, 33.333, requestedAmount);

    const rawCost = pouredLiters * 33.333;
    const expectedCost = +rawCost.toFixed(2);

    expect(customer.money).toBeCloseTo(1000 - expectedCost, 2);
  });
});
