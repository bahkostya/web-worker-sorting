import { MESSAGES } from './messages';
import Sorter from './sorter';

let sorter;

onmessage = function ({ data }) {
  switch (data.type) {
    case MESSAGES.START: {
      sorter = new Sorter(data.payload);
      sorter.start((payload) =>
        postMessage({
          type: MESSAGES.FINISH,
          payload,
        })
      );
      break;
    }

    case MESSAGES.ADD_NUMBER:
      sorter.addNumber(data.payload, (payload) =>
        postMessage({
          type: MESSAGES.NUMBER_ADDED,
          payload,
        })
      );
      break;

    default:
      break;
  }
};
