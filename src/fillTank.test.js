'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be declared', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it(`'amount' > free space in the tank`, () => {
    const fuelPrice = 3;
    const amount = 20;
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };

    fillTank(customer, fuelPrice, amount);

    const result = {
      money: 85,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 10,
      },
    };

    expect(customer).toEqual(result);
  });

  it(`'amount' is not declare`, () => {
    const fuelPrice = 5;
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 2,
      },
    };

    fillTank(customer, fuelPrice);

    const result = {
      money: 60,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 10,
      },
    };

    expect(customer).toEqual(result);
  });

  it(`'money' < price of 'amount'`, () => {
    const fuelPrice = 20;
    const amount = 5;
    const customer = {
      money: 80,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };

    fillTank(customer, fuelPrice, amount);

    const result = {
      money: 0,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 9,
      },
    };

    expect(customer).toEqual(result);
  });

  // it(`'amount' is decimal`, () => {
  //   const fuelPrice = 3;
  //   const amount = 7.75;
  //   const customer = {
  //     money: 100,
  //     vehicle: {
  //       maxTankCapacity: 10,
  //       fuelRemains: 2,
  //     },
  //   };

  //   fillTank(customer, fuelPrice, amount);

  //   const result = {
  //     money: 76.75,
  //     vehicle: {
  //       maxTankCapacity: 10,
  //       fuelRemains: 9.75,
  //     },
  //   };

  //   expect(customer).toEqual(result);
  // });

  it(`should round the poured amount of fuel to the tenth part`, () => {
    const fuelPrice = 2;
    const amountA = 4.55;
    const customerA = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };

    const customerB = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10.867,
        fuelRemains: 5,
      },
    };

    fillTank(customerA, fuelPrice, amountA);
    fillTank(customerB, fuelPrice);

    const resultA = {
      money: 91,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 9.5,
      },
    };

    const resultB = {
      money: 88.4,
      vehicle: {
        maxTankCapacity: 10.867,
        fuelRemains: 10.8,
      },
    };

    expect(customerA).toEqual(resultA);
    expect(customerB).toEqual(resultB);
  });

  it(`'fuelPrice' is decimal`, () => {
    const fuelPrice = 3.21;
    const amount = 12;
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 5,
      },
    };

    fillTank(customer, fuelPrice, amount);

    const result = {
      money: 61.48,
      vehicle: {
        maxTankCapacity: 20,
        fuelRemains: 17,
      },
    };

    expect(customer).toEqual(result);
  });

  it(`should round prise of purchased to the nearest hundredth part`, () => {
    const fuelPrice = 3.37;
    const amount = 4.5;
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };

    fillTank(customer, fuelPrice, amount);

    const result = {
      money: 84.83,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 9.5,
      },
    };

    expect(customer).toEqual(result);
  });

  it(`should not sell, if poured amount of fuel < 2`, () => {
    const fuelPrice = 3;
    const customerA = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 9,
      },
    };

    const amountB = 1.5;
    const customerB = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };

    const amountC = 5;
    const customerC = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 9,
      },
    };

    fillTank(customerA, fuelPrice);
    fillTank(customerB, fuelPrice, amountB);
    fillTank(customerA, fuelPrice, amountC);

    const resultA = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 9,
      },
    };

    const resultB = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 5,
      },
    };

    const resultC = {
      money: 100,
      vehicle: {
        maxTankCapacity: 10,
        fuelRemains: 9,
      },
    };

    expect(customerA).toEqual(resultA);
    expect(customerB).toEqual(resultB);
    expect(customerC).toEqual(resultC);
  });

  it(`should send and fill, if data is correct`, () => {
    const fuelPrice = 28;
    const amountA = 75;
    const customerA = {
      money: 2500,
      vehicle: {
        maxTankCapacity: 220,
        fuelRemains: 25,
      },
    };

    fillTank(customerA, fuelPrice, amountA);

    const resultA = {
      money: 400,
      vehicle: {
        maxTankCapacity: 220,
        fuelRemains: 100,
      },
    };

    expect(customerA).toEqual(resultA);
  });
});
