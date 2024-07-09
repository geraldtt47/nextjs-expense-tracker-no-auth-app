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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { title } from "process";
import { useBalance } from "../data/balance-context";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const invalid_type_error = "Invalid type provided for this field.";
const required_error = "This field cannot be blank.";

// Transaction Form Schema
const transactionFormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    .min(2, { message: "Title must be at least 2 characters." }),
  transactionType: z
    .string({
      required_error: "Please select a transaction type.",
    })
    .min(2, { message: "Please select a transaction type." }),
  paymentMethod: z
    .string({
      required_error: "Please select a payment method.",
    })
    .min(2, { message: "Please select a payment method." }),
  amount: z
    .string({
      required_error: "Amount is required.",
    })
    .min(1, { message: "Amount is required." })
    .max(12, {
      message: "Invalid amount.",
    }),
});

// Transaction Menu Props
interface TransactionMenuProps {
  handleIncome: (amount: number) => void;
  handleExpense: (amount: number) => void;
}

// Transaction Type
type Transaction = {
  title: string;
  transactionType: string;
  paymentMethod: string;
  amount: string;
};

// TransactionMenu Component
export default function TransactionMenu({
  handleIncome,
  handleExpense,
}: TransactionMenuProps) {
  const [balance, setBalance] = useBalance();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Defining the form.
  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      title: "",
      transactionType: "",
      paymentMethod: "",
      amount: "",
    },
  });

  //onSubmit function
  const onSubmit = (values: z.infer<typeof transactionFormSchema>) => {
    //e.preventDefault();
    console.log(values); // Console log data from the form. Validated values from the form.

    const transactionData = {
      title: values.title,
      transactionType: values.transactionType,
      paymentMethod: values.paymentMethod,
      amount: values.amount,
    }; // Transaction Data object

    if (values.transactionType === "Income") {
      handleIncome(Number(values.amount));
      setBalance((prevBalance) => prevBalance);
    } else {
      handleExpense(Number(values.amount));
      setBalance((prevBalance) => prevBalance);
    }
    setTransactions((prevData) => [...prevData, transactionData]);
    form.reset(); // Reset the form
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex-col">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle>Add Transaction</CardTitle>
                    <CardDescription>
                      Simply log your transaction below.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Add the title of the transaction"
                                  {...field}
                                />
                              </FormControl>
                              {/* <FormDescription>
                                This is your transaction title.
                              </FormDescription> */}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={form.control}
                          name="transactionType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Transaction Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Transaction Type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent position="popper">
                                  <SelectItem value="Expense">
                                    Expense
                                  </SelectItem>
                                  <SelectItem value="Income">Income</SelectItem>
                                </SelectContent>
                              </Select>
                              {/* <FormDescription>
                                You can manage email addresses
                                <Link href="/examples/forms">
                                  email settings
                                </Link>
                                .
                              </FormDescription> */}
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={form.control}
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Method</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Payment Method" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent position="popper">
                                  <SelectItem value="Paypal">Paypal</SelectItem>
                                  <SelectItem value="Stripe">Stripe</SelectItem>
                                  <SelectItem value="Credit Card">
                                    Credit Card
                                  </SelectItem>
                                  <SelectItem value="Bank Transfer">
                                    Bank Transfer
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter the transaction amount"
                                  {...field}
                                  type="number"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="submit" className="w-full">
                      Add Transaction +
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </div>
          <div className="flex-auto">
            <Card className="w-[650px]">
              <CardHeader>
                <CardTitle>Account Transactions</CardTitle>
                <CardDescription>Your recent transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>
                    A financial log of your recent transactions.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Title</TableHead>
                      <TableHead>Transaction Type</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction: Transaction) => (
                      <TableRow key={transaction.title}>
                        <TableCell className="font-medium">
                          {transaction.title}
                        </TableCell>
                        <TableCell>
                          {transaction.transactionType === "Income" ? (
                            <Badge variant="success" key={transaction.title}>
                              {transaction.transactionType}
                            </Badge>
                          ) : transaction.transactionType === "Expense" ? (
                            <Badge
                              variant="destructive"
                              key={transaction.title}
                            >
                              {transaction.transactionType}
                            </Badge>
                          ) : null}
                        </TableCell>
                        <TableCell>{transaction.paymentMethod}</TableCell>
                        <TableCell className="text-right">
                          {transaction.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Bank Account Balance</TableCell>
                      <TableCell className="text-right font-bold">
                        ${balance}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
