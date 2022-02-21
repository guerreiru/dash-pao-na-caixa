import React from 'react'
import { getUserConfig } from '../../../utils/Functions/Auth';
import PlanListResident from "./PlanListResident";
import PlanListAdmin from "./PlanListAdmin";

const SubscriptionPlanList = () => {
  const [loading, setLoading] = React.useState(true)
  const [role, setRole] = React.useState("true")

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      setRole(getUserConfig().roles[0]);
      setLoading(false);
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (<p>Carregando...</p>)
  } else {
    if (role === "ROLE_RESIDENT") {
      return <PlanListResident />
    } else {
      return <PlanListAdmin />
    }
  }
}

export default SubscriptionPlanList