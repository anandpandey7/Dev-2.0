"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState, useTransition } from "react";
import { Center } from "@repo/ui/center";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [pending, startTransition] = useTransition();

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput
                            placeholder="Number"
                            label="Number"
                            onChange={setNumber}
                        />

                        <TextInput
                            placeholder="Amount"
                            label="Amount"
                            onChange={setAmount}
                        />

                        <div className="pt-4 flex justify-center">
                            <Button
                                onClick={() => {
                                    startTransition(async () => {
                                        const res = await p2pTransfer(
                                            number,
                                            Number(amount) * 100
                                        );

                                        alert(res.message); // simple feedback
                                    });
                                }}
                            >
                                {pending ? "Sending..." : "Send"}
                            </Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    );
}