import { outputClearHistory } from '../output';


export default (args, db) => {
  if (args.history) {
    db.clearHistory();
    outputClearHistory();
  }
}
