import axios from "axios";
import { API_URL } from "../services/global";

function View()
{
    const FetchData=async () => {
        const response=await axios.get(API_URL);
        return response.data;
    };
    
    return(<>
    </>);
}
export default View;