'use strict';

describe(`'fillTank' function`, () => {
  const { fillTank } = require('./fillTank');

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

  it(`should be decorated`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`fuelPrice or amount = 'NaN' `, () => {
    expect(() => fillTank(customer, NaN, NaN)).toThrow(
      `fuelPrice shouldn't be NaN`
    );

    fillTank(customer, 50, NaN);

    expect(customer).toEqual({
      money: 1400,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`amount not announced  `, () => {
    fillTank(customer, 20);

    expect(customer).toEqual({
      money: 2360,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`amount > maxTankCapacity`, () => {
    fillTank(customer, 40);

    expect(customer).toEqual({
      money: 1720,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    });
  });

  it(`customer money < fuelPrice*amount `, () => {
    fillTank(customer, 500, 17);

    expect(customer).toEqual({
      money: 0,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 14,
      },
    });
  });

  it(`if amount < 2`, () => {
    fillTank(customer, 500, 1);

    expect(customer).toEqual({
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    });
  });

  it(`truncate amount to tenths`, () => {
    fillTank(customer, 50.25, 2.37);

    expect(customer).toEqual({
      money: 2884.43,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 10.3,
      },
    });
  });

  it(`round price to hundredths`, () => {
    fillTank(customer, 44.25, 3.37);

    expect(customer).toEqual({
      money: 2853.97,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 11.3,
      },
    });
  });
});
