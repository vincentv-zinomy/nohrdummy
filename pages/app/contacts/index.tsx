import Spinner from '@/components/common/Spinner'
import { useAuth } from '@/components/contexts/AuthContext';
import axiosAPIWithAuth from '@/lib/axiosAPIWithAuth';
import { OrgAgentDataTypes } from '@/lib/types/ui';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function ViewLeads() {

    const { authState } = useAuth();
    const router = useRouter()

    useEffect(() => {

        if (authState.isAuthenticated) {
            getAgentsData()
        }
    }, [authState])
    const getAgentsData = async () => {


        try {
            const res = await axiosAPIWithAuth.get(`/org-project/all`);
            const data = await res.data as OrgAgentDataTypes[];

            if (data && data.length > 0) {
                router.push(`/app/contacts/${data[0]._id}`)
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Spinner color="text-indigo-600" />
        </div>
    )
}

export default ViewLeads