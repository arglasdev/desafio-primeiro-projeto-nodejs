import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value: number;
  type: "income" | "outcome";
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, type, value}: Request): Transaction {

    if(type === 'outcome' ){

      const {income, outcome, total} = this.transactionsRepository.getBalance();

      if(value > total){
        throw Error('The outcome value is not compatible with your balance.');
      }
    }

    return this.transactionsRepository.create({title, type, value});
  }
}

export default CreateTransactionService;
