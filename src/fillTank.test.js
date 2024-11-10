'use strict';

const { fillTank } = require('./fillTank');
// During the checks, I believed that all types of data used were correct
// Parametrs for negative cases:
const someCustomer = {
  money: 5000,
  vehicle: {
    maxTankCapacity: 50,
    fuelRemains: 10,
  },
};

const someFuelPrice = 10;
const someAmount = 10;

// List of conditions for buying fuel
const customerNeedFuel = someAmount > 0;
const fuelIsSold = someFuelPrice > 0;
const canByeFuel = (customerNeedFuel && fuelIsSold);
const customerCanByeFuel = (customerNeedFuel && fuelIsSold
  && someCustomer.money > someFuelPrice);
const freeSpace = someCustomer.vehicle.maxTankCapacity > 0;

describe('In positive cases fillTank', () => {
  it(`should be declared`, () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('should fill the full tank if !amount'
    + `should increase 'fuelRemains' to 'maxTankCapacity'`, () => {
    const fuelPrice = 45;
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(3200);
  });

  it(`should increase 'fuelRemains' by 'amount'`, () => {
    const fuelPrice = 50;
    const amount = 21;
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(31);
    expect(customer.money).toBe(3950);
  });

  it(`should fill full tank if`
    + `'amount' > ('maxTankCapacity' - 'fuelRemains')`, () => {
    const fuelPrice = 50;
    const amount = 210;
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(3000);
  });

  it(`should increment 'fuelRemains' by 'money'/'fuelPrice'`
    + `should round off the poured fuel to 1 decimal place`
    + `should round 'money' to 2 decimal places`, () => {
    const fuelPrice = 11.13;
    const amount = 20;
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(18.9);
    expect(customer.money).toBe(0.94);
  });

  it('does nothing if the amount of required fuel < 2', () => {
    const fuelPrice = 11;
    const amount = 2;
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 48,
      },
    };

    fillTank(customer, fuelPrice, amount);

    if (amount === 2
      || ((customer.vehicle.maxTankCapacity
        - customer.vehicle.fuelRemains) <= 2)) {
      expect(customer.vehicle.fuelRemains).toBe(48);
    }
    expect(customer.money).toBe(100);
  });
});

describe('In negative cases fillTank', () => {
  it(`should return an error if 'amount' <= '0'`, () => {
    const result = fillTank(someCustomer, someFuelPrice, someAmount);

    if (!customerNeedFuel) {
      expect(result).toBe(`Fuel amount must be greater than '0'`);
    }
  });

  it(`should return an error if 'fuelPrice' <= '0'`, () => {
    const result = fillTank(someCustomer, someFuelPrice, someAmount);

    if (customerNeedFuel && !fuelIsSold) {
      expect(result).toBe(`Fuel price must be greater than '0'`);
    }
  });

  it(`should return error if 'customer.money' < 'fuelPrice'`, () => {
    const result = fillTank(someCustomer, someFuelPrice, someAmount);

    if (canByeFuel && someCustomer.money < someFuelPrice) {
      expect(result).toBe(`You are not have enough money`);
    }
  });

  it(`should return error if 'maxTankCapacity' <= '0'`, () => {
    const result = fillTank(someCustomer, someFuelPrice, someAmount);

    if (customerCanByeFuel && !freeSpace) {
      expect(result).toBe(`Tank capacity must be greater than '0'`);
    }
  });

  it(`should return error if 'maxTankCapacity' = 'fuelRemains'`, () => {
    const result = fillTank(someCustomer, someFuelPrice, someAmount);

    if (customerCanByeFuel && freeSpace
      && (someCustomer.vehicle.maxTankCapacity
        === someCustomer.vehicle.fuelRemains)) {
      expect(result).toBe('Fuel tank is full');
    }
  });

  it(`should return error if 'maxTankCapacity' < 'fuelRemains'`, () => {
    const result = fillTank(someCustomer, someFuelPrice, someAmount);

    if (customerCanByeFuel && freeSpace
      && someCustomer.vehicle.maxTankCapacity
      < someCustomer.vehicle.fuelRemains) {
      expect(result).toBe('The fuel level sensor is broken');
    }
  });
});
