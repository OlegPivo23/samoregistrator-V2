import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export function useDriver() {
  function startEducation() {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#cabinet',
          popover: {
            title: 'Это Ваш личный кабинет',
            description: 'Тут вы можете посмотреть или изменить свои данные учетной записи',
            side: 'left',
            align: 'start',
          },
        },
        {
          element: '#questions',
          popover: {
            title: 'Это раздел списка всех опросников',
            description: 'Тут вы можете проходить опросы',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '#steps',
          popover: {
            title: 'Тут собраны все шаги на пути к успеху',
            description: 'Необходимо пройти все шаги',
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '#stepper',
          popover: {
            title: 'Все шаги',
            description: 'Тут находятся все шаги, которые необходимо пройти',
            side: 'left',
            align: 'start',
          },
        },
        {
          element: '.q-stepper__tab ',
          popover: {
            title: 'Шаг 1: Личная информация',
            description: 'Здесь вы можете заполнить ваши личные данные.',
            side: 'top',
            align: 'center',
          },
        },
        {
          element: '.q-stepper__tab:nth-child(2)',
          popover: {
            title: 'Второй шаг',
            description: 'Look at this page for all the configuration options you can pass.',
            side: 'right',
            align: 'start',
          },
        },
        {
          element: '.q-stepper__tab:nth-child(3)',
          popover: {
            title: 'Третий шаг',
            description: 'And that is all, go ahead and start adding tours to your applications.',
          },
        },
      ],
    });
    driverObj.drive();
  }

  return { startEducation };
}
