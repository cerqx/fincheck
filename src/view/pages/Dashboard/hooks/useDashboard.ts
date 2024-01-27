import { useContext } from "react";
import { DashboardContext } from "../components/DashboardContext";

 export function useDashboard() {
    return useContext(DashboardContext)
 } 