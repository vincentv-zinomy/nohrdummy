import axiosAPIWithAuth from '@/lib/axiosAPIWithAuth';
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

import IconCheck from "@/assets/images/pricing/icon-check.svg";
import Link from 'next/link';
import Spinner from '@/components/common/Spinner';

function BillingSettings() {
    const { authState } = useAuth();
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

    const [isLoadingPlans, setIsLoadingPlans] = useState<boolean>(true);
    const [pricingPlans, setPricingPlans] = useState<{
        name: string;
        price: number;
        features: string[];
        button_text: string;
        price_id: string;
    }[]>([]);

    const getBuyURL = async (priceId: string) => {
        setIsSubmitting(true);
        try {
            const buy = await axiosAPIWithAuth.post('/users/buy-plan', { price_id: priceId });
            const buyData = await buy.data;
            toast.addToast('success', 'Redirecting to payment page');
            window.location.href = buyData;

        }
        catch (err: any) {
            console.log(err);
            let errorMsg = "Something went wrong.";

            // Check if err object has response data and it has a message property
            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }

            toast.addToast("error", errorMsg);


        }
        setIsSubmitting(false);
    }
    const getAvailablePlans = async () => {
        setIsLoadingPlans(true);
        try {
            const getPlans = await axiosAPIWithAuth.get('/users/get-available-plans');
            const plans = await getPlans.data;
            setPricingPlans(plans);
        }
        catch (err: any) {
            console.log(err);
            let errorMsg = "Something went wrong.";

            // Check if err object has response data and it has a message property
            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }

            toast.addToast("error", errorMsg);


        }
        setIsLoadingPlans(false);
    }
    const getBillingPortalLink = async () => {
        setIsSubmitting(true);
        try {
            const getLink = await axiosAPIWithAuth.get('/users/billing-portal');
            const link = await getLink.data;

            window.location.href = link;
            toast.addToast('success', 'Redirecting to billing portal.');
        }
        catch (err: any) {
            console.log(err);
            let errorMsg = "Something went wrong.";

            // Check if err object has response data and it has a message property
            if (err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }

            toast.addToast("error", errorMsg);


        }
        setIsSubmitting(false);
    }

    useEffect(() => {
        getAvailablePlans();
    }, []);
    return (
        <>
            <div className='mt-2'>
                <div>
                    <span>Your Plan: <b>{authState.current_org?.is_account_paid ? `Paid plan` : `Free trial`}</b></span>
                </div>

                <div className='mt-4'>
                    <button
                        className="mt-2 inline-flex justify-center 
              py-2 px-4 border border-transparent 
              shadow-sm text-sm font-medium 
              rounded-md text-white 
              bg-indigo-600 hover:bg-indigo-700 
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-700
              disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                            getBillingPortalLink()
                        }}
                        disabled={isSubmitting}
                    >
                        {
                            isSubmitting && <Spinner color='text-indigo-700' />
                        }
                        Manage Subscription
                    </button>
                </div>
                <div>

                    <section className="bg-white">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 font-outfit gap-5 px-10 sm:px-0 md:gap-8 mt-20">
                            <>
                                {
                                    isLoadingPlans ? <Spinner color='text-indigo-700' /> :
                                        pricingPlans.map((plan, index) => {
                                            return (
                                                <div className="border border-gray-200 rounded-[1.875rem] group hover:border-brand-indigo">
                                                    <h3 className="text-center font-bold text-brand-dark text-2xl py-4 md:py-5">
                                                        {plan.name}
                                                    </h3>

                                                    <div className="border-t border-brand-gray-200"></div>

                                                    <div className="px-5 md:px-9 py-3 md:py-5">
                                                        <h3 className="font-bold text-2xl md:text-35 text-brand-indigo">
                                                            ${plan.price}
                                                        </h3>
                                                        <p className="inline-block rounded-full border border-brand-blue text-sm px-3 py-2 mt-4">
                                                            PER MONTH
                                                        </p>
                                                    </div>

                                                    <div className="border-t border-gray-200"></div>

                                                    <div className="px-5 md:px-9 py-3 md:py-5">
                                                        {
                                                            plan.features.map((feature: string,) => {
                                                                return (
                                                                    <div className="flex items-start gap-2 shrink-0">
                                                                        <div className="w-5 h-5 rounded-full bg-indigo-500 flex justify-center items-center mt-2">
                                                                            <Image src={IconCheck} alt="check" />
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <p className="md:text-lg leading-5">
                                                                                {feature}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    <div className="px-3 md:px-6 pt-4 pb-5 sm:pb-8">
                                                        <button
                                                            onClick={() => {
                                                                getBuyURL(plan.price_id)
                                                            }}
                                                            className="cursor-pointer w-full flex justify-center items-center 
                                                                space-x-2.5 bg-indigo-700 font-semibold text-white 
                                                                rounded-full group-hover:bg-indigo-500 
                                                                group-hover:text-brand-indigo border 
                                                                border-brand-indigo transition duration-200 py-3
                                                                disabled:opacity-50 disabled:cursor-not-allowed"

                                                            disabled={isSubmitting}
                                                        >
                                                            {
                                                                isSubmitting && <Spinner color='text-indigo-700' />
                                                            }
                                                            <span>{plan.button_text}</span>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-brand-indigo group-hover:translate-x-2 transition duration-200"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                }
                            </>
                        </div>
                    </section>
                </div >
            </div >
        </>
    )

}

export default BillingSettings