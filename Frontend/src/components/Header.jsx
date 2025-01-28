import {AppBar , Toolbar , styled , InputBase , Box} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { logo } from "../constants/constant";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const StyledAppBar = styled(AppBar)({
    backgroundColor:'#F5F5F5',
    boxShadow:"none",
    height : 60,
    display:"flex" ,
    flexWrap : "wrap",
    flexDirection:"row",
    color:"gray",
    paddingTop:10,
    justifyContent:"space-between"

})

const SearchWrapper = styled(Box)({
    background:"#EAF1FB",
    height:25,
    width:"50%",
    display:"flex" ,
    flexWrap : "wrap",
    flexDirection:"row",
    justifyContent:"space-between",
    padding:10,
    borderRadius:4,
     
})

const BoxWrapper = styled(Box)({
    width:200,
    display:"flex" ,
    flexWrap:"wrap",
    flexDirection:"row" ,
    justifyContent:"space-evenly" , 
    alignItems:"center",
    marginBottom:20 ,
    '& > svg' :{
        cursor:"pointer"
    }
})


const Header =({toggelDrawer}) =>{
    return (
        <div>
            <StyledAppBar position="static">
                <div style={{width : 100 , display: "flex"  , marginLeft:"1rem"}}>
                    <MenuIcon onClick ={toggelDrawer} color="action" fontSize="medium" style={{marginTop:7 , fontSize:25 , cursor:"pointer"}}  />
                    <img src={logo} alt="logo" style={{width:40 , height:40 ,marginLeft:"15px" ,cursor:"pointer"  }} />
                    <h4 style={{marginTop : "10px" , color:"#484b4a",cursor:"pointer" , fontSize:"1.2rem"}}>Mail</h4>
                </div>
                <SearchWrapper>
                    <SearchIcon style={{cursor:"pointer"}}/>
                    <InputBase placeholder="Search Mail" style={{width:"90%"  }}/>
                    <TuneIcon style={{cursor:"pointer"}}/>
                </SearchWrapper>
                <Toolbar></Toolbar>
                <BoxWrapper>
                    <HelpOutlineOutlinedIcon color="action"/>
                    <SettingsOutlinedIcon color="action"/>
                    <AppsOutlinedIcon color="action"/>
                    <AccountCircleOutlinedIcon color="action"/>
                </BoxWrapper>
            </StyledAppBar>
            
        </div>
    )
}


export default Header ;