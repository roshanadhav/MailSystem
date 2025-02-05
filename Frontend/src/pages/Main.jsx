import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Email from "../components/Email";
import { SIDEBAR_DATA } from "../config/sidebar.config";
import LoginSignupDialog from "../components/LoginSignupDialog";

const Main = () => {
    let [openDrawer, setOpenDrawer] = useState(true);
    let [showTab, setShowTab] = useState("inbox");
    let [isLogin, setIsLogin] = useState(false); // Renamed to lowercase for better practice
    let [loading, setLoading] = useState(true);  // Show loading before checking login

    const toggleDrawer = () => {
        setOpenDrawer((prevState) => !prevState);
    };

    useEffect(() => {
        const getIsLogin = async () => {
            try {
                const response = await axios.get('http://localhost:8080/isLogin', { withCredentials: true });
                
                if (response.status === 200) {
                    setIsLogin(true);
                    localStorage.setItem('isLoggedIn', 'true');
                } else {
                    setIsLogin(false);
                    localStorage.setItem('isLoggedIn', 'false');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setIsLogin(false);
                    localStorage.setItem('isLoggedIn', 'false');
                } else {
                    console.error("Error checking login status:", error);
                }
            } finally {
                setLoading(false);  // Hide loading after login check
            }
        };

        getIsLogin();
    }, []);

    if (loading) return <p>Loading...</p>; // Show loading message while checking login

    return (
        <div>
            <LoginSignupDialog showDialog={!isLogin} onClose={() => setIsLogin(true)} />
            {isLogin && (
                <>
                    <Header toggleDrawer={toggleDrawer} />
                    <Sidebar openDrawer={openDrawer} setShowTab={setShowTab} />
                    {showTab === SIDEBAR_DATA[0].name && <Email openDrawer={openDrawer} endpoint="inbox" />}
                    {showTab === SIDEBAR_DATA[1].name && <Email openDrawer={openDrawer} endpoint="stared" />}
                    {showTab === SIDEBAR_DATA[2].name && <Email openDrawer={openDrawer} endpoint="sent" />}
                    {showTab === SIDEBAR_DATA[3].name && <Email openDrawer={openDrawer} endpoint="draft" />}
                    {showTab === SIDEBAR_DATA[4].name && <Email openDrawer={openDrawer} endpoint="bin" />}
                    {showTab === SIDEBAR_DATA[5].name && <Email openDrawer={openDrawer} endpoint="allmail" />}
                </>
            )}
        </div>
    );
};

export default Main;
