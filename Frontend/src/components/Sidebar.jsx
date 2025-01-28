
import { Drawer , styled } from "@mui/material";
import SideBarContaint from "./SideBarContant";

import ComposeMail from "./ComposeMail";
import { useState } from "react";



const Sidebar = ({openDrawer , setShowTab})=>{
    let [viewStatus , setViewStatus ] = useState(false) ;

    const statusChanger = ()=>{
        setViewStatus(prev => !prev)
    }
    return(
        <Drawer
            anchor="left"
            open={openDrawer}
            hideBackdrop={true}
            ModalProps={{
                keepMounted:true,
            }}
            variant="persistent"
            sx={{
                '&  .MuiDrawer-paper' :{
                    marginTop:"60px",
                    width:250,
                    borderRight:"none",
                    background:"#F5F5F5",
                }
            }}
        >

            <SideBarContaint statusChanger ={statusChanger} setShowTab={setShowTab} />
            <ComposeMail statusChanger ={statusChanger} viewStatus={viewStatus}/>
        </Drawer>
    )
}


export default Sidebar ; 