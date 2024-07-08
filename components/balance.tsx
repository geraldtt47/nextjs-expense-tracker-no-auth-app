"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useBalance } from "../data/balance-context";
import TransactionMenu from "./transaction-menu";

export default function Balance() {
  const [balance, setBalance] = useBalance();
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const handleIncome = (amount: number) => {
    setIncome(income + amount);
    setBalance(balance + amount);
  };

  const handleExpenses = (amount: number) => {
    setExpenses(expenses + amount);
    setBalance(balance - amount);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex-1">
          <Card className="w-[350] text-center bg-primary text-white">
            <CardHeader>
              <CardDescription className="font-extrabold text-white">
                BANK ACCOUNT BALANCE
              </CardDescription>
              <CardTitle className="font-extrabold">${balance}</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className="flex-1">
          <Card className="w-[350px] bg-green-500 text-center text-white">
            <CardHeader>
              <CardTitle>${income}</CardTitle>
              <CardDescription className="text-white">Income</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="flex-1">
          <Card className="w-[350px] bg-red-500 text-center text-white">
            <CardHeader>
              <CardTitle>${expenses}</CardTitle>
              <CardDescription className="text-white">Expenses</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
      <TransactionMenu
        handleIncome={handleIncome}
        handleExpense={handleExpenses}
      />
    </div>
  );
}
