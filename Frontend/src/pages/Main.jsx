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
    let [Login, setShowDialog] = useState(true);

    const toggelDrawer = () => {
        setOpenDrawer((prevState) => !prevState);
    };

    useEffect(() => {
        const getIsLogin = async () => {
            try {
                const response = await axios.get('http://localhost:8080/isLogin');
                if (response.status === 200) {
                    setShowDialog(false);
                    localStorage.setItem('isLoggedIn', 'true');
                } else {
                    setShowDialog(true);
                    localStorage.setItem('isLoggedIn', 'false');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setShowDialog(true);
                    localStorage.setItem('isLoggedIn', 'false');
                } else {
                    console.error("Error checking login status:", error);
                }
            }
        };

        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const hasShownDialog = localStorage.getItem('hasShownDialog');

        if (isLoggedIn === 'true') {
            setShowDialog(false);
        } else if (!hasShownDialog) {
            getIsLogin();
            localStorage.setItem('hasShownDialog', 'true');
        } else {
            setShowDialog(false);
        }
    }, []);

    return (
        <div>
            <LoginSignupDialog showDialog={Login} onClose={setShowDialog} />
            {!Login && (
                <>
                    <Header toggelDrawer={toggelDrawer} />
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
