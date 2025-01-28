import { Box, Button , styled , List , ListItem} from "@mui/material";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { SIDEBAR_DATA } from "../config/sidebar.config";


const CompooseButton = styled(Button)({
    background:'#c2e7ff' ,
    color : '#001d35',
    padding:"15px",
    borderRadius:16,
    textTransform:"none",
    marginTop:10,
    marginLeft:10,
    maxWidth : 140
})


const Cointainar = styled(Box)({
    padding:8,
    '& > ul' :{
        padding:"10px 0 0 5px" ,
        fontSize : 14 , 
        fontWeight : 500,
        cursor:"pointer"
    },
    "& > ul > li > svg" :{
        marginRight:20
    }
})




const SideBarContaint = ({statusChanger , setShowTab})=>{
    return(
        <Cointainar>
            <CompooseButton onClick={statusChanger}  variant="text"><CreateOutlinedIcon style={{marginRight:10}}  />  Compose</CompooseButton>
            <List>
                {
                    SIDEBAR_DATA.map( (data, index) =>(
                        <ListItem key={index} onClick={() => setShowTab(data.name)}>
                            < data.icon fontSize="small"/>  { data.title}
                        </ListItem>
                    ))
                }
            </List>
        </Cointainar>
    )
}


export default SideBarContaint ;