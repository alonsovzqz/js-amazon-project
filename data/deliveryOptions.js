import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "b3e47d2f-674a-48e6-8c1b-32fd781a4b29",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "fc9127e8-21f4-4b59-9e1c-45a1d0935d2e",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "4d8571a2-35fe-4f3e-abb9-89df3c5b4e72",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let today = dayjs();

  while (remainingDays > 0) {
    today = today.add(1, 'day');

    if (!isWeekend(today)) {
      remainingDays--;
    }
  }
  const dateString = today.format("dddd, MMMM D");

  return dateString;
}
