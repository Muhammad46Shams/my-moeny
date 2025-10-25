// styles
import styles from './Home.module.css'

export default function TransactionList({ transactions }) {
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.doc.name}</p>
          <p className={styles.amount}>${transaction.doc.amount}</p>
        </li>
      ))}
    </ul>
  )
}