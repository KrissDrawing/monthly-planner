import * as actions from '../Actions/actions';

const initialStore = {
  payments: [
    {
      name: 'Netflix',
      date: ['5', '4', '2020'],
      price: 10,
      type: 'automatic',
      isPaid: false,
      category: 'other',
      id: 1,
    },
    {
      name: 'Sofa',
      date: ['5', '4', '2020'],
      price: '',
      type: 'manual',
      isPaid: false,
      category: 'other',
      id: 2,
    },
    {
      name: 'Amazon Prime',
      date: ['5', '14', '2020'],
      price: 5,
      type: 'automatic',
      isPaid: true,
      category: 'entertainment',
      id: 3,
    },
    {
      name: 'Hulu',
      date: ['5', '18', '2020'],
      price: '',
      type: 'manual',
      isPaid: false,
      category: 'other',
      id: 4,
    },
    {
      name: 'Medicaments',
      date: ['5', '5', '2020'],
      price: '',
      type: 'manual',
      isPaid: false,
      category: 'health',
      id: 5,
    },
    {
      name: 'Car Loan',
      date: ['5', '25', '2020'],
      price: 500,
      type: 'automatic',
      isPaid: false,
      category: 'loans',
      id: 6,
    },
    {
      name: 'Groceries',
      date: ['5', '31', '2020'],
      price: '',
      type: 'manual',
      isPaid: false,
      category: 'other',
      id: 7,
    },
    {
      name: 'Doctor appointment',
      date: ['5', '6', '2020'],
      price: '',
      type: 'manual',
      isPaid: false,
      category: 'health',
      id: 8,
    },
    {
      name: 'HBO GO',
      date: ['6', '21', '2020'],
      price: 10,
      type: 'automatic',
      isPaid: false,
      category: 'health',
      id: 9,
    },
    {
      name: 'Hulu',
      date: ['4', '18', '2020'],
      price: 243,
      type: 'manual',
      isPaid: false,
      category: 'other',
      id: 4,
    },
    {
      name: 'Medicaments',
      date: ['3', '5', '2020'],
      price: 123,
      type: 'manual',
      isPaid: false,
      category: 'health',
      id: 5,
    },
    {
      name: 'Car Loan',
      date: ['2', '25', '2020'],
      price: 500,
      type: 'automatic',
      isPaid: false,
      category: 'loans',
      id: 6,
    },
    {
      name: 'Groceries',
      date: ['1', '31', '2020'],
      price: 342,
      type: 'manual',
      isPaid: false,
      category: 'other',
      id: 7,
    },
    {
      name: 'Doctor appointment',
      date: ['6', '6', '2020'],
      price: '',
      type: 'manual',
      isPaid: false,
      category: 'health',
      id: 8,
    },
    {
      name: 'HBO GO',
      date: ['3', '21', '2020'],
      price: 10,
      type: 'automatic',
      isPaid: false,
      category: 'health',
      id: 9,
    },
  ],
  total: 0,
  limit: 200,
  currentDate: [5, 5, 2020],
};

export const reducer = (state = initialStore, action) => {
  if (action.type === actions.SET_STATE) {
    return { ...action.payload.store, currentDate: state.currentDate };
  }

  if (action.type === actions.ADD_PAYMENT) {
    return { ...state, payments: [...state.payments, action.payload.newItem] };
  }
  if (action.type === actions.DELETE_PAYMENT) {
    return {
      ...state,
      payments: state.payments.filter((item) => item.id !== action.payload.id),
    };
  }
  if (action.type === actions.UPDATE_TOTAL) {
    return {
      ...state,
      total: state.payments.reduce((sum, item) => {
        return +action.payload.month === +item.date[0]
          ? (sum += +item.price)
          : (sum += 0);
      }, 0),
    };
  }

  if (action.type === actions.MARK_AS_PAID) {
    return {
      ...state,
      payments: state.payments.map((item) =>
        item.id === action.payload.id
          ? { ...item, price: action.payload.price, isPaid: true }
          : item,
      ),
    };
  }

  if (action.type === actions.AUTO_PAY) {
    return {
      ...state,
      payments: state.payments.map((item) =>
        +item.date[2] <= +action.payload.date[2] &&
        +item.date[1] <= +action.payload.date[1] &&
        +item.date[0] <= +action.payload.date[0] &&
        item.type === 'automatic'
          ? { ...item, isPaid: true }
          : item,
      ),
    };
  }

  if (action.type === actions.SET_CURRENT_DATE) {
    return {
      ...state,
      currentDate: action.payload.currentDate,
    };
  }

  if (action.type === actions.SET_LIMIT) {
    return {
      ...state,
      limit: action.payload.limit,
    };
  }
  return state;
};
