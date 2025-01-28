import PhotoIcon from '@mui/icons-material/Photo';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import SendIcon from '@mui/icons-material/Send';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';


export const SIDEBAR_DATA = [
    {
        name:"inbox" ,
        title:"Inbox" ,
        icon : PhotoIcon
    },
    {
        name:"stared" ,
        title : "Stared" ,
        icon : StarOutlineIcon
    },
    {
        name:"sent" ,
        title : "Sent" ,
        icon : SendIcon
    },
    {
        name:"draft" ,
        title : "Drafts" ,
        icon : InsertDriveFileOutlinedIcon
    },
    {
        name:"bin" ,
        title : "Bin" ,
        icon : DeleteOutlineOutlinedIcon
    },
    {
        name:"allmail" ,
        title : "All Mail" ,
        icon : MailOutlineOutlinedIcon
    }
    
]