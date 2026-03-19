import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router";
import { LogOut } from 'lucide-react'

export default function Logout() {

    const navigate = useNavigate();
    const logout = () => {

        localStorage.removeItem("token");
        navigate('/')
    }

    return (
        <div>

            <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
            </Button>
        </div>
    )
}
