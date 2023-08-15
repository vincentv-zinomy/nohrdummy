import { Head } from 'next/document'
import Image from 'next/image'
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from 'react'
import { useToast } from "@/components/hooks/useToast";
import LeadfixLogo from '@/assets/images/ivf-booking/LeadfixLogo.png'
import NovaLogo from '@/assets/images/ivf-booking/nova_logo.png'
import IVF from '@/assets/images/ivf-booking/IVF_Specialist 1.png'
import briefcase from '@/assets/images/ivf-booking/doctor-bag1.svg'
import stethoscope from '@/assets/images/ivf-booking/stethoscope.svg'
import Calender from '@/assets/images/ivf-booking/Calender.svg'
import clock from '@/assets/images/ivf-booking/clock.svg'
import location from '@/assets/images/ivf-booking/location.svg'
import likelogo from '@/assets/images/ivf-booking/like1.svg'
import star from '@/assets/images/ivf-booking/star.svg'
import fireworks from '@/assets/images/ivf-bookingfirework.svg'
import axiosWithoutAuth from '@/lib/axiosAPIwithoutAuth';
import Spinner from '@/components/common/Spinner';

type Props = {}

export type AppointmentDataType = {
    id: string;
    logo_image: string;
    name: string;
    description: string;
    clinic: ClinicType;
    appointmentDate: string;
    appointmentTime: string;
};

export type ClinicType = {
    id: string;
    hospital_name: string;
    rating: string;
    fee: string;
    address: {
        area: string;
        city: string;
        state: string;
    };
};


const index = (props: Props) => {

    const [appointmentData, setAppointmentData] = useState<AppointmentDataType>({
        id: 'novo',
        logo_image: '/IVF_Specialist.png',
        name: 'Nova IVF Clinic',
        description: 'Nova IVF clinic one of the best in karnataka',
        clinic: {
            id: "novo-hsr",
            hospital_name: 'Nova - HSR',
            rating: '5',
            fee: "FREE Appointment",
            address: {
                area: 'HSR Layout',
                city: 'Banglore',
                state: 'Karnataka'
            },

        },
        appointmentDate: moment().format('DD MMM YYYY'),
        appointmentTime: '10:00 AM - 11:00 AM'

    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();
    const toast = useToast();
    useEffect(() => {
        if (router.isReady) { // to ensure all the query parameters are available
            const date = router.query.id; // 'id' is the name of the query parameter you want to get
            console.log(date); // Outputs: "2023-07-14T13:00:00+05:30"
        }
    }, [router.isReady, router.query]);

    const getSpecificLead = async () => {
        try {
            const lead_id = router.query.id;
            const res = await axiosWithoutAuth.get(`/leads/ivf/get-lead?lead_id=${lead_id}`)
            console.log(res.data);
            const responseFromDB = res.data;
            setAppointmentData(prevState => ({
                ...prevState, // spread previous state
                id: responseFromDB.lead_id, // update id with lead_id
                clinic: {
                    ...prevState.clinic, // spread previous clinic
                    id: responseFromDB.branch_location, // update clinic id with branch_location
                    hospital_name: `Nova - ${responseFromDB.branch_location}`, // update hospital_name with branch_location
                    address: {
                        ...prevState.clinic.address, // spread previous address
                        area: responseFromDB.branch_location, // update area with branch_location
                    }
                },
                appointmentDate: moment(responseFromDB.event_time).format('DD MMM YYYY'), // update appointmentDate with event_time
                appointmentTime: moment(responseFromDB.event_time).format('h:mm A') + " - " + moment(responseFromDB.event_time).add(1, 'hours').format('h:mm A'), // update appointmentTime with event_time
            }));
        }
        catch (err) {
            console.log(err)
        }
    }
    const confirmAppointment = async () => {
        setIsSubmitting(true);
        try {
            const lead_id = router.query.id;
            const res = await axiosWithoutAuth.post('/leads/ivf/confirm-lead', {
                lead_id: lead_id
            })
            toast.addToast("success", "Appointment confirmed successfully");
            router.push('/ivf/finish');
        }
        catch (err) {
            toast.addToast("error", "Error while confirming appointment");
        }
        setIsSubmitting(false);
    }
    useEffect(() => {
        if (router.query.id) {
            getSpecificLead();
        }
    }, [router.query.id])
    return (
        <>

            <section className={"w-full px-6 md:px-8 lg:px-48 pt-7 pb-32 bg-gray-100/20 bg-[url('/background.png')] bg-no-repeat bg-[length:100vw_55vh]	 min-w-screen min-h-screen"}
                style={{ fontFamily: "'Manrope', sans-serif" }}>

                <div className=' w-full px-4 md:px-8 py-5 bg-white rounded-md flex items-center justify-between  shadow-md' >
                    <Image src={NovaLogo} className='bg-white text-white w-24' alt='' />
                    <Image src={IVF} alt='' />
                </div>
                <div className='text-center my-5 md:mt-7  md:mb-10 text-[#0A2550]'>
                    <h2 className='text-2xl md:text-3xl	font-bold	'>Nova IVF Clinic</h2>
                    <h3 className='text-sm md:text-lg font-medium mt-2'>Nova IVF. Best IVF Specialist & Clinic in Karnataka</h3>
                </div>



                <div className='bg-white rounded-md py-4 lg:py-9 shadow-md '>
                    <div className='flex px-5 lg:px-12  items-center justify-between pb-4 lg:pb-9 border-b border-slate-200'>
                        <div className='flex  items-center'>
                            <div className='bg-[#2F80ED] rounded-full w-fit h-fit p-2 text-[#2F80ED] mr-3 md:mr-5'>
                                <Image src={briefcase} className=' w-5 bg-[#2F80ED] ' alt='' />
                            </div>
                            <p className='lg:text-[22px] font-bold'>Clinic Appointment</p>
                        </div>
                        <span className='rounded-full px-4 py-1 bg-[#08B652] text-white text-sm lg:text-base'>
                            Free
                        </span>
                    </div>
                    <div className='px-5 lg:px-12 py-5 flex flex-col md:flex-row justify-between lg:items-center border-dashed border-b-2 border-gray-200 	'>
                        <div>
                            <p className='font-semibold'>{appointmentData.name}</p>
                            <p className='text-sm text-gray-400 font-medium '>{appointmentData.clinic.hospital_name ? appointmentData.clinic.hospital_name : "Hopistal Name"}</p>
                        </div>
                        <p className='text-sm text-gray-400 font-medium mt-2 md:mt-0'>
                            <strong className='font-bold text-[#2F80ED]'>•</strong> Max. 15 min wait + Verified Details
                        </p>
                    </div>
                    <div className='px-5 lg:px-12 pt-5 flex flex-wrap lg:flex-nowrap gap-8 justify-between 
                    [&>div]:w-full
                    [&>div]:md:w-[45%]
                    [&>div]:lg:w-full'
                    >
                        <div className='flex gap-3 font-medium' >
                            <div className='flex bg-blue-100 shrink-0 w-fit h-fit p-2 rounded-md'>
                                <Image src={stethoscope} alt='' />
                            </div>
                            <div>
                                <p className='text-sm text-[#a1a1a1]'>Doctor</p>
                                <p>Resident</p>
                            </div>
                        </div>
                        <div className='flex gap-3 font-medium' >
                            <div className='flex bg-blue-100 shrink-0 w-fit h-fit p-2 rounded-md'>
                                <Image src={Calender} alt='' />
                            </div>
                            <div>
                                <p className='text-sm text-[#a1a1a1]'>Date</p>
                                <p>{appointmentData.appointmentDate}</p>
                            </div>
                        </div>
                        <div className='flex gap-3 font-medium' >
                            <div className='flex bg-blue-100 shrink-0 w-fit h-fit p-2 rounded-md'>
                                <Image src={clock} alt='' />
                            </div>
                            <div>
                                <p className='text-sm text-[#a1a1a1]'>Time</p>
                                <p>{appointmentData.appointmentTime}</p>
                            </div>
                        </div>
                        <div className='flex gap-3 font-medium ' >
                            <div className='flex bg-blue-100 shrink-0 w-fit h-fit p-2 rounded-md'>
                                <Image src={location} alt='' />
                            </div>
                            <div>
                                <p className='text-sm text-[#a1a1a1]'>Address</p>
                                <p className='w-[235px]'>{appointmentData.clinic.address.city ? appointmentData.clinic.address.city : "Bengaluru, KA"}</p>
                                <button className='text-sm px-4 py-1.5 text-green-900 bg-green-200 mt-2 rounded-full'>Open</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2 md:gap-7  flex-col md:flex-row
                [&>div]:flex 
                [&>div]:items-center 
                [&>div]:w-full
                [&>div]:px-4
                [&>div]:lg:px-8
                [&>div]:lg:py-5
                [&>div]:py-2.5 
                [&>div]:lg:gap-7 
                [&>div]:gap-4
                [&>div]:md:gap-6 
                [&>div]:bg-white
                [&>div]:rounded-md
                [&>div]:shadow-md
                mt-7
                '
                >
                    <div  >
                        <div className='flex flex-col items-center justify-between'>
                            <Image src={likelogo} alt='' className='w-7 h-7 lg:w-10 lg:h-10 ' />
                            <p className='mt-2 text-base lg:text-lg font-medium'>96%</p>
                        </div>
                        <div className=''>
                            <p className='text-base md:text-lg font-semibold'>Patients Recommendation</p>
                            <p>62 Patient Stories</p>
                        </div>
                    </div>
                    <div >
                        <div className='flex flex-col items-center justify-between'>
                            <Image src={star} alt='' className='w-7 h-7 lg:w-10 lg:h-10 ' />
                            <p className='mt-2 text-base lg:text-lg font-medium'>5/5</p>
                        </div>
                        <div className=''>
                            <p className='text-base md:text-lg font-semibold'>Hospital excellence rating</p>
                            <p>Based on Audit</p>
                        </div>
                    </div>
                </div>
                <div className='fixed bottom-0 left-0 w-full px-5  py-4 bg-white text-center drop-shadow-md shadow-lg border-t boder-slate-100 z-10'>
                    <button className='px-5 py-3 bg-blue-600 w-full md:w-[229px] text-white rounded-md '
                        disabled={isSubmitting}
                        onClick={async () => {
                            await confirmAppointment()
                        }}>
                        <div className="text-center">{isSubmitting ? (
                            <div className='flex'>
                                <div>
                                    <Spinner color="text-indigo-500" />
                                </div>
                                <div>
                                    Confirming...
                                </div>
                            </div>

                        ) : <span>Confirm Free Booking</span>}
                        </div></button>
                </div>
            </section>
        </>
    )
}

export default index