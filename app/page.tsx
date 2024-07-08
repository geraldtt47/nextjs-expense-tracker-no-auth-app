import Image from "next/image";
import Balance from "../components/balance";
import { BalanceProvider } from "../data/balance-context";
import Header from "../components/header";
import { ThemeModeToggle } from "../components/theme-mode-toggle";

export default function Home() {

  return (
    <BalanceProvider>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex flex-col justify-start">
            <h1 className="text-4xl font-bold">Expense Tracker</h1>
            <p className="text-lg">
              Track your expenses and manage your budget.
            </p>
          </div>
          <div className="flex">
            <ThemeModeToggle />
          </div>
        </div>
        <Balance />
      </main>
    </BalanceProvider>
  );
}
