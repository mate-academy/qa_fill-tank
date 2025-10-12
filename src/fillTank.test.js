'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should return undefined if nothing poured', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    };
    const fuelPrice = 2.5;
    const amount = 1;

    const result = fillTank(customer, fuelPrice, amount);
      expect(result).toBeUndefined();
  });


  it('should not change customer and return undefined if nothing poured', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    };
    const fuelPrice = 2.5;
    const amount = 1;

    const result = fillTank(customer, fuelPrice, amount);

    expect(result).toBeUndefined();

    expect(customer).toEqual({
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    });
  });

  // Якщо amount не передано, значить замовлено повний бак
  it('should fill full tank when amount is not provided', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    const fuelPrice = 50;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(3000 - 1600);
  });

  // Якщо amount більше ніж вміщає бак, залий тільки те, що поміститься.
  it('should fill only free space in tank when amount is more than free space', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 30,
        fuelRemains: 10,
      },
    };

    const fuelPrice = 20;
    const amount = 25;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBe(500 - 400);
  });

  // Якщо amount більше ніж клієнт може оплатити, 
  // залий тільки те, що він може оплатити.
  it('should fill only what customer can afford'
    + 'when amount is more than customer can afford', () => {
    const customer = {
      money: 90,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    };

    const fuelPrice = 15;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(26);
    expect(customer.money).toBe(0);
  });

  // Якщо amount більше ніж вміщає бак і більше ніж клієнт може оплатити, 
  // залий тільки те, що поміститься і те, що він може оплатити.
  it('should fill only what customer can afford and what fits in tank'
    + 'when amount is more than free space and more than customer can afford', () => {
    const customer = {
      money: 200,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 30,
      },
    };

    const fuelPrice = 25;
    const amount = 20;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(38);
    expect(customer.money).toBe(0);
  });

  // Якщо amount не ціле число, працюй з ним як з дробовим
  it('should handle fractional amount correctly', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    };

    const fuelPrice = 10;
    const amount = 7.8;

    fillTank(customer, fuelPrice, amount);
    expect(customer.vehicle.fuelRemains).toBe(27.8);
    expect(customer.money).toBe(22);
  });

  // Округлюй обсяг залитого палива вниз до десятих.
  it('should round down fuel to the nearest tenth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    };

    const fuelPrice = 3;
    const amount = 9.87;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(29.8);
    expect(customer.money).toBe(100 - 29.4);
  });

  // Якщо вийшло < 2 літрів, взагалі не заправляй клієнта
  it('should not fill tank if the amount to be filled is less than 2 liters', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    };

    const fuelPrice = 6;
    const amount = 1.5;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(20);
    expect(customer.money).toBe(10);
  });

  // Вартість заправленого пального округли до сотих (до найближчого значення).
  it('should round price to the nearest hundredth', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 20,
      },
    };

    const fuelPrice = 7.777;
    const amount = 10;

    fillTank(customer, fuelPrice, amount);

    expect(customer.vehicle.fuelRemains).toBe(30);
    expect(customer.money).toBeCloseTo(22.23, 2);
  });

});
