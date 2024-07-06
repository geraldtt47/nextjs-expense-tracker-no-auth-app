import Image from "next/image";
import Balance from "../components/balance";
import { BalanceProvider } from "../data/balance-context";
import Header from "../components/header";

export default function Home() {

  return (
    <BalanceProvider>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-4xl font-bold">Expense Tracker</h1>
        <p className="text-lg">Track your expenses and manage your budget.</p>
        <Balance />
      </main>
    </BalanceProvider>
  );
}
