import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
export const Signin = ()=>{

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios
            .get(`${BACKEND_URL}/api/v1/user/verifyToken`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                if (response.data.success) {
                navigate("/blogs"); // Redirect if token is valid
                }
            })
            .catch(() => {
                localStorage.removeItem("token"); // Remove invalid token
            });
        }
    }, [navigate]);

    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth  type="signin"/>
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    </div>
}