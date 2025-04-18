'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('Якщо amount не передано, значить замовлено повний бак ', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice);

    expect(customer.vehicle.fuelRemains).toBe(50);
    expect(customer.money).toBe(20);
  });

  it('Якщо amount більше ніж вміщає бак, залий тільки те, що поміститься ',
    () => {
      const customer = {
        money: 100,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 10,
        },
      };
      const fuelPrice = 2;

      fillTank(customer, fuelPrice, 100);

      expect(customer.vehicle.fuelRemains).toBe(50);
      expect(customer.money).toBe(20);
    });

  it('Завжди заливаємо тільки те, за що клієнт може заплатити', () => {
    const customer = {
      money: 4,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 10,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice, 100);

    expect(customer.vehicle.fuelRemains).toBe(12);
    expect(customer.money).toBe(0);
  });

  it('Округлюй обсяг залитого палива вниз до десятих ', () => {
    const customer = {
      money: 10,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 15.5,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice, 3.14159);

    expect(customer.vehicle.fuelRemains).toBe(18.6);
    expect(customer.money).toBe(3.8);
  });

  it('Якщо вийшло < 2 літрів, взагалі не заправляй клієнта ', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 49,
      },
    };
    const fuelPrice = 2;

    fillTank(customer, fuelPrice, 1);

    expect(customer.vehicle.fuelRemains).toBe(49);
    expect(customer.money).toBe(100);
  });

  it(
    `Вартість заправленого пального округли до сотих
  (до найближчого значення)`, //
    () => {
      const customer = {
        money: 100,
        vehicle: {
          maxTankCapacity: 50,
          fuelRemains: 40,
        },
      };
      const fuelPrice = 2.555;

      fillTank(customer, fuelPrice, 10);

      expect(customer.vehicle.fuelRemains).toBe(50);
      expect(customer.money).toBe(74.45);
    });
});

// 888
