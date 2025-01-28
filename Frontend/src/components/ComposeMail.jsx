import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Dialog, InputBase, styled, Typography ,TextField, Button} from "@mui/material";
import { useState , useEffect} from 'react';
import useApi from '../hooks/useApi';
import { API_URL } from '../services/api.url';
const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
const dialogStyle =    {
    height:"90%",
    maxWidth:"100%" ,
    maxHeight:"100%",
    width:"80%" ,
    boxShadow : "none" , 
    borderRadius : "10px 10px 0  0",

}

const Header = styled(Box)({
    width:"99%" ,
    display : 'flex',
    flexWrap :  "wrap",
    flexDirection : "row",
    justifyContent:"space-between",
    background:"#f2f6fc",
    padding:"5px",
})

const SubjectWrapper = styled(Box)({
    fontSize:14 , 
    display :"flex" , 
    flexDirection  : "column" , 
    width:"99%",
    marginLeft: "10px" ,

    "& > div" : {
        width:"100%" ,
        fontSize : 14,
        borderBottom : '1px solid #F5F5F5',
        marginTop: 10
    }

})


const Footer = styled(Box)({
    display : "flex" , 
    flexDirection : "row" , 
    justifyContent : "space-between"
})


const config = {
            Host : "smtp.elasticemail.com",
            Username : username,
            Password : password,
            Port : 2525,
}

const ComposeMail =({statusChanger , viewStatus})=>{

    const [sendTo , setSendTo] = useState("") ;
    const [subject , setSubject] = useState("") ;
    const [mailBody , setMailBody] = useState("") ; 



    const sentEmailService = useApi(API_URL.saveSentEmail) ;


    
    const closeMail = (e)=>{
            e.preventDefault() ;
            statusChanger() ;
    }

    const sendMail = (e)=>{
        e.preventDefault() ;
        


       if(window.Email){
        window.Email.send({
                ...config ,
                To : sendTo,
                From : "roshanadhav02@gmail.com",
                Subject : subject,
                Body : mailBody
            }).then(
            message => alert(message)
            );

            
       }

       
       const payLoad = {
        to: sendTo ,
        from : 'roshanadhav02@gmail.com' ,
        subject : subject ,
        body : mailBody ,
        date :  Date.now() ,
        image : '' ,
        stared : false ,
        type : 'sent' ,
        bin : false ,
        name : "Roshan Adhav"
    }

     sentEmailService.call(payLoad)

     if(!sentEmailService.err){
        setMailBody("");
        setSendTo("");
        setSubject("")
     }

     statusChanger();
       
    }
    return(

        

        <Dialog
            open={viewStatus}
            PaperProps={{sx : dialogStyle}}
        >


            <Header>
               <Typography style={{fontSize:14 ,fontWeight : 500}}>New Message</Typography>
               <CloseIcon onClick={closeMail}  
                fontSize='small'style={{cursor : "pointer" , marginRight : 2}} />
            </Header>
            <SubjectWrapper>
                <InputBase onChange={(data) =>{
                    setSendTo(data.target.value)
                    
                }} placeholder='Recipients' ></InputBase>
                <InputBase
                 placeholder='Subject' 
                 onChange={(e)=>{
                    setSubject(e.target.value)
                }}
                value = {subject}
                
                ></InputBase>
            </SubjectWrapper>
            <TextField multiline={true} 

            onChange={(e)=>{
                setMailBody(e.target.value)
            }}

            value={mailBody}
                rows={21}
                style={{width: "98%" , marginLeft:10}}
                sx={{
                    "& .MuiOutlinedInput-notchedOutline" : {
                        border : "none"
                    }
                }}
            ></TextField>
            <Footer>
                <Button onClick={sendMail}>Send</Button>
                <DeleteOutlineIcon 
                    onClick = {statusChanger}
                style={{cursor : "pointer" , marginRight : 2}}/>
            </Footer>
        </Dialog>
    )
}


export default ComposeMail ;