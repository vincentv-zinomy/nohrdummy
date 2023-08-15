import { Head } from 'next/document'
import Image from 'next/image'
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import LeadfixLogo from '@/assets/images/ivf-booking/LeadfixLogo.png'
import NovaLogo from '@/assets/images/ivf-booking/nova_logo.png'
import IVF from "@/assets/images/ivf-booking/IVF_Specialist 1.png";
import briefcase from "@/assets/images/ivf-booking/doctor-bag1.svg";
import stethoscope from "@/assets/images/ivf-booking/stethoscope.svg";
import Calender from "@/assets/images/ivf-booking/Calender.svg";
import clock from "@/assets/images/ivf-booking/clock.svg";
import location from "@/assets/images/ivf-booking/location.svg";
import likelogo from "@/assets/images/ivf-booking/like1.svg";
import star from "@/assets/images/ivf-booking/star.svg";
import fireworks from "@/assets/images/ivf-booking/firework.svg";
import { AppointmentDataType } from './novo';
import { useToast } from '@/components/hooks/useToast';
import axiosWithoutAuth from '@/lib/axiosAPIwithoutAuth';

type Props = {};

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

    useEffect(() => {
        if (router.query.id) {
            // getSpecificLead();
        }
    }, [router.query.id])
    return (
        <>
            <section
                className={
                    "w-full px-6 md:px-8 lg:px-48 pt-7 pb-32 bg-gray-100/20 bg-[url('/background.png')] bg-no-repeat bg-[length:100vw_65vh]	 min-w-screen min-h-screen"
                }
                style={{ fontFamily: "'Manrope', sans-serif" }}
            >
                <div className=" w-full px-4 md:px-8 py-5 bg-white rounded-md flex items-center justify-between  shadow-md">
                    <Image src={NovaLogo} className="bg-white text-white w-24" alt="" />
                    <Image src={IVF} alt="" />
                </div>
                {/* Congratulation */}
                <div className="my-6 lg:my-10">

                    <div className="  mb-4  ">
                        <Image
                            src={fireworks}
                            alt="fireworks"
                            className="w-22 h-22 mx-auto "
                        />
                    </div>
                    <div className="mx-auto text-center  ">
                        <h4 className="text-xl md:text-2xl font-bold">Congratulation</h4>
                        <p className="text-sm md:text-lg mt-1">
                            Appointment confirmed. Please go back to your whatsapp chat to continue.
                        </p>
                    </div>
                </div>

                {/* <div className="bg-white rounded-md py-4 lg:py-9 shadow-md ">


                    <div
                        className="px-5 lg:px-12 pt-5 flex flex-wrap lg:flex-nowrap gap-8 justify-between 
                    [&>div]:w-full
                    [&>div]:md:w-[45%]
                    [&>div]:lg:w-full"
                    >
                        <div className="flex gap-3 font-medium">
                            <div className="flex bg-blue-100 w-fit h-fit p-2 rounded-md">
                                <Image src={stethoscope} alt="" />
                            </div>
                            <div>
                                <p className="text-sm text-[#a1a1a1]">Doctor</p>
                                <p>Resident</p>
                            </div>
                        </div>
                        <div className="flex gap-3 font-medium">
                            <div className="flex bg-blue-100 w-fit h-fit p-2 rounded-md">
                                <Image src={Calender} alt="" />
                            </div>
                            <div>
                                <p className="text-sm text-[#a1a1a1]">Date</p>
                                <p>{appointmentData.appointmentDate}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 font-medium">
                            <div className="flex bg-blue-100 w-fit h-fit p-2 rounded-md">
                                <Image src={clock} alt="" />
                            </div>
                            <div>
                                <p className="text-sm text-[#a1a1a1]">Time</p>
                                <p>{appointmentData.appointmentTime}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 font-medium">
                            <div className="flex shrink-0 bg-blue-100 w-fit h-fit p-2 rounded-md">
                                <Image src={location} alt="" />
                            </div>
                            <div>
                                <p className="text-sm text-[#a1a1a1]">Address</p>
                                <p className="w-[230px]">
                                    {appointmentData.clinic.address.area}, {appointmentData.clinic.address.city}, {appointmentData.clinic.address.state}
                                </p>
                                <button className="text-sm px-4 py-1.5 text-green-900 bg-green-200 mt-2 rounded-full">
                                    Open
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}


            </section>
        </>
    );
};

export default index;
