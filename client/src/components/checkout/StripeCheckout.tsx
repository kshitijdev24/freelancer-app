'use client';

import React, { useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react';

interface StripeCheckoutProps {
    clientSecret: string;
    gigId: string;
    onSuccess: () => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ clientSecret, gigId, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/dashboard`,
            },
            redirect: 'if_required'
        });

        if (error) {
            setMessage(error.message || "An unexpected error occurred.");
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            // Confirm on backend
            const response = await fetch('http://localhost:3000/api/payments/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    paymentIntentId: paymentIntent.id,
                    gigId: gigId
                })
            });

            if (response.ok) {
                onSuccess();
            } else {
                setMessage("Payment succeeded but order confirmation failed. Contact support.");
            }
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <PaymentElement id="payment-element" />

            {message && (
                <div className="bg-red-500/10 text-red-500 p-6 rounded-2xl text-xs font-black border border-red-500/20 flex items-center gap-4 uppercase tracking-widest">
                    <span>⚠️</span> {message}
                </div>
            )}

            <button
                disabled={isLoading || !stripe || !elements}
                className="w-full bg-primary text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-6 group disabled:opacity-50"
            >
                <span className="relative z-10 flex items-center gap-4">
                    {isLoading ? "Processing..." : "Complete Transaction"}
                    {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />}
                </span>
            </button>

            <div className="flex flex-col items-center gap-4 pt-6 border-t border-border">
                <div className="flex gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <p className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.4em]">
                        Standardized AES-256 Encryption Active
                    </p>
                </div>
            </div>
        </form>
    );
};

export default StripeCheckout;
