import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  const addItem = () => {
    if (!description || !amount) return;
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    setItems([...items, { id, description, amount: parseFloat(amount), type }]);
    setDescription('');
    setAmount('');
  };

  const totalIncome = items.filter(i => i.type === 'income').reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = items.filter(i => i.type === 'expense').reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className={styles.container}>
      <h1>Calculadora de Gastos</h1>
      <div className={styles.inputGroup}>
        <input placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="number" placeholder="Cantidad" value={amount} onChange={e => setAmount(e.target.value)} />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="income">Ingreso</option>
          <option value="expense">Egreso</option>
        </select>
        <button onClick={addItem}>Añadir</button>
      </div>
      <ul className={styles.list}>
        <AnimatePresence>
          {items.map(item => (
            <motion.li
              key={item.id}
              className={styles[item.type]}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {item.description}: ${item.amount.toFixed(2)}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className={styles.summary}>
        <p>Total Ingresos: ${totalIncome.toFixed(2)}</p>
        <p>Total Egresos: ${totalExpense.toFixed(2)}</p>
        <p>Balance: ${(totalIncome - totalExpense).toFixed(2)}</p>
      </div>
    </div>
  );
}
