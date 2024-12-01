'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should de declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`should fill to full for omitted 'amount'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const expectedCustomer = {
      money: 1000.96,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 40,
      },
    };

    const fuelPrice = 62.47;

    fillTank(customer, fuelPrice);

    expect(customer).toEqual(expectedCustomer);
  });

  it(`should fill to full if 'amount' > tank`, () => {
    const customer = {
      money: 2467.77,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 12,
      },
    };

    const expectedCustomer = {
      money: 318.2,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 55,
      },
    };

    const fuelPrice = 49.99;

    fillTank(customer, fuelPrice, 52);

    expect(customer).toEqual(expectedCustomer);
  });

  it(`fill only what 'money' covers`, () => {
    const customer = {
      money: 159.9,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 25.6,
      },
    };

    const expectedCustomer = {
      money: 2.92,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 30.7,
      },
    };

    const fuelPrice = 30.78;

    fillTank(customer, fuelPrice, 20);

    expect(customer).toEqual(expectedCustomer);
  });

  it(`rounding fuel to the tenth part`, () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 30,
      },
    };

    const expectedCustomer = {
      money: 299.55,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 41.2,
      },
    };

    const fuelPrice = 62.54;

    fillTank(customer, fuelPrice, 11.28);

    expect(customer).toEqual(expectedCustomer);
  });

  it(`ignoring if < 2 liters `, () => {
    /*
    Якщо вийшло < 2 літрів,
    взагалі не заправляй клієнта
    */
    const customer = {
      money: 80.91,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 41.4,
      },
    };

    const expectedCustomer = {
      money: 80.91,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 41.4,
      },
    };

    const fuelPrice = 62.54;

    fillTank(customer, fuelPrice, 9);

    expect(customer).toEqual(expectedCustomer);
  });

  it(`rounding money to the hundredth part up`, () => {
    /*
    Вартість заправленого пального
    округли до сотих
    (до найближчого значення).
    */
    const customer = {
      money: 1180.91,
      vehicle: {
        maxTankCapacity: 52,
        fuelRemains: 41.41,
      },
    };

    const expectedCustomer = {
      money: 686.84,
      vehicle: {
        maxTankCapacity: 52,
        fuelRemains: 49.31,
      },
    };

    const fuelPrice = 62.54;

    fillTank(customer, fuelPrice, 7.9);

    expect(customer).toEqual(expectedCustomer);
  });

  it(`rounding money to the hundredth part down`, () => {
    /*
Вартість заправленого пального
округли до сотих
(до найближчого значення).
*/
    const customer = {
      money: 5214.55,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 15.68,
      },
    };

    const expectedCustomer = {
      money: 4912.07,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 19.58,
      },
    };

    const fuelPrice = 77.56;

    fillTank(customer, fuelPrice, 3.9);

    expect(customer).toEqual(expectedCustomer);
  });

  it(`'customer' without 'money'`, () => {
    const customer = {
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 15.68,
      },
    };

    const fuelPrice = 77.51;

    expect(() => {
      fillTank(customer, fuelPrice, 3.99);
    }).toThrow();
  });

  it(`'customer' without 'maxTankCapacity'`, () => {
    const customer = {
      money: 5214.55,
      vehicle: {
        fuelRemains: 15.68,
      },
    };

    const fuelPrice = 77.51;

    expect(() => {
      fillTank(customer, fuelPrice, 3.99);
    }).toThrow();
  });

  it(`'customer' without 'fuelRemains'`, () => {
    const customer = {
      money: 5214.55,
      vehicle: {
        maxTankCapacity: 40,
      },
    };

    const fuelPrice = 77.51;

    expect(() => {
      fillTank(customer, fuelPrice, 3.99);
    }).toThrow();
  });

  it(`returns undefined`, () => {
    const customer = {
      money: 5214.55,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 15.68,
      },
    };

    expect(fillTank(customer, 55, 4)).toBeUndefined();
  });
});
