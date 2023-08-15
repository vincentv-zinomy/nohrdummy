import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { OrgLevelData, RoleTypes, useAuth } from "@/components/contexts/AuthContext";
import Spinner from "@/components/common/Spinner";
import { LocalStorageKeys } from "@/lib/static-common-data";
export interface jwtPayload {
  email: string;
  orgs: OrgLevelData[];
}

export default function LoginSuccess() {
  const router = useRouter();
  const { triggerAuth } = useAuth();

  useEffect(() => {
    const { jwt } = router.query;

    if (jwt) {
      let jwt_token = jwt as string;
      const payload = JSON.parse(
        Buffer.from(jwt_token.split(".")[1], "base64").toString()
      ) as jwtPayload;
      localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, jwt as string);
      localStorage.setItem(LocalStorageKeys.PAYLOAD_DATA, JSON.stringify(payload));
      localStorage.setItem(LocalStorageKeys.CURRENT_ORG_ID, payload.orgs[0].org_id);

      triggerAuth();

      router.push("/app");
    }
  }, [router]);

  // Render a loading spinner or some other placeholder content here
  return (
    <div>
      <Spinner color="text-green-500" />
    </div>
  );
}
