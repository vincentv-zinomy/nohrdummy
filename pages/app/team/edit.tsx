import Spinner from "@/components/common/Spinner";
import { RoleTypes } from "@/components/contexts/AuthContext";
import { useToast } from "@/components/hooks/useToast";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { OrgAgentDataTypes } from "@/lib/types/ui";
import { useRouter as navRouter } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function EditTeamMember() {
  const navR = navRouter();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([RoleTypes.TEAM_MEMBER]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [availableOrgAgents, setAvailableOrgAgents] = useState<OrgAgentDataTypes[]>([]);
  const [allowedOrgAgents, setAllowedOrgAgents] = useState<string[]>([]);

  const getOrgAgentData = async () => {
    setLoading(true);
    try {
      const res = await axiosAPIWithAuth.get("/org-agent/all");
      const data = await res.data;

      setAvailableOrgAgents(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    getOrgAgentData();
  }, [])
  const getData = async () => {
    try {
      const res = await axiosAPIWithAuth.get(
        `/users/team-members/detail/${router.query.id}`
      );
      const data = await res.data;
      console.log(data);
      setName(data.name);
      setEmail(data.email);
      setRoles(data.roles);
      setAllowedOrgAgents(data.org_agents_ids);
      toast.addToast("success", "Member loaded successfully");
    } catch (err: any) {
      console.log(err);

      let errorMsg = "Something went wrong.";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }
  };
  useEffect(() => {
    if (router.query.id) {
      getData();
    }
  }, [router.query.id]);
  const editMember = async () => {
    setIsSubmitting(true);
    try {
      await axiosAPIWithAuth.put(`/users/team-members/update/${router.query.id}`, {
        email,
        name,
        roles,
        org_agent_ids: allowedOrgAgents
      });

      // Reset form fields
      setName("");
      setEmail("");
      toast.addToast("success", "Member updated successfully");
      navR.push("/app/team");
    } catch (err: any) {
      console.log(err);

      let errorMsg = "Something went wrong.";

      // Check if err object has response data and it has a message property
      if (err.response && err.response.data && err.response.data.message) {
        errorMsg = err.response.data.message;
      }

      toast.addToast("error", errorMsg);


    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 m-4">
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
        <div>
          <div className="mt-3 text-center sm:mt-5">
            <p className="text-lg leading-6 font-medium text-gray-900">
              Edit Member
            </p>
            <div className="text-left">
              <div className="sm:col-span-6 sm:w-full mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="sm:col-span-6 sm:w-full mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500
                     block w-full sm:text-sm border border-gray-300 rounded-md
                     disabled:opacity-50 disabled:bg-gray-100
                     "
                    disabled={true}
                  />
                </div>
              </div>
              <div className="sm:col-span-6 sm:w-full mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Access Level
                </label>
                <div className="mt-1">
                  {
                    Object.values(RoleTypes).filter((sr) => sr !== RoleTypes.ADMIN).map((tRole, d_ind) => {
                      return (
                        <div className="relative flex items-start mr-1 ml-1" key={`${tRole}-${d_ind}`}>
                          <div className="flex h-5 items-center">
                            <input

                              name={tRole}
                              type="checkbox"
                              checked={roles.includes(tRole)}
                              onChange={() => {
                                if (roles.includes(tRole)) {
                                  setRoles(roles.filter((r) => r !== tRole))
                                } else {
                                  setRoles([...roles, tRole])

                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="font-medium text-gray-700">
                              <span>
                                {tRole === RoleTypes.TEAM_MEMBER && "Team Member"}
                                {tRole === RoleTypes.ADMIN && "Admin"}
                              </span>
                              <span className="text-xs text-slate-500">

                                {tRole === RoleTypes.ADMIN && " (Can access everything)"}
                                {tRole === RoleTypes.TEAM_MEMBER && " (Can create and manage leads data & send messages.)"}
                              </span>

                            </label>
                          </div>
                        </div>
                      )
                    })
                  }

                </div>
              </div>
              <div className="sm:col-span-6 sm:w-full mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Select Org Agents For Access
                </label>
                <div className="mt-1">
                  {
                    availableOrgAgents.map((org_agent, t_id) => {
                      return (
                        <div className="relative flex items-start mr-1 ml-1" key={`${org_agent._id}-${t_id}-org-agent-access`}>
                          <div className="flex h-5 items-center">
                            <input

                              name={org_agent.title}
                              type="checkbox"
                              checked={allowedOrgAgents.includes(org_agent._id.toString())}
                              onChange={() => {
                                setAllowedOrgAgents((prevOrgAgents) => {
                                  if (prevOrgAgents.includes(org_agent._id.toString())) {
                                    return prevOrgAgents.filter((r) => r !== org_agent._id.toString());
                                  } else {
                                    return [...prevOrgAgents, org_agent._id.toString()];
                                  }
                                });
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="font-medium text-gray-700">
                              <span>
                                {org_agent.title}
                              </span>


                            </label>
                          </div>
                        </div>
                      )
                    })
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <div className="flex">
            <button
              type="button"
              disabled={isSubmitting}
              className="w-1/2 m-2 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                router.push("/app/team");
              }}
            >
              Go Back
            </button>
            <button
              type="button"
              className="w-1/2 m-2 inline-flex 
                      justify-center w-full rounded-md 
                      border border-transparent shadow-sm px-4 py-2 bg-indigo-600
                       text-base font-medium text-white 
                       hover:bg-indigo-700 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 
                       focus:ring-indigo-500 sm:text-sm
                       disabled:opacity-50
                       disabled:cursor-not-allowed
                       "
              onClick={editMember}
              disabled={name === "" || email === "" || isSubmitting}
            >
              Edit Member
            </button>
            {isSubmitting && <Spinner color="text-indigo-500" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTeamMember;
