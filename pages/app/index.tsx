import Spinner from "@/components/common/Spinner";
import { RoleTypes, useAuth } from "@/components/contexts/AuthContext";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function AppIndexPage() {
  const router = useRouter();

  const { authState } = useAuth();


  useEffect(() => {
    if (authState.isAuthenticated && (authState.current_org?.roles.includes(RoleTypes.ADMIN) || authState.current_org?.roles.includes(RoleTypes.TEAM_MEMBER))) {
      window.location.href = "/app/org-project";

    }

  }
    , [authState]);

  return (
    <div>
      <Spinner color="text-indigo-600" />
    </div>
  )

}

export default AppIndexPage;
