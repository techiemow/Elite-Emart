import axios from "axios";
import { apiurl } from "../../Constants/apiurl";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();




 
    const response = await axios.post(`${apiurl}/AdditionToCart/${id}`, {}, { withCredentials: true });
 

    if (response.data.success) {
      toast.success(response.data.message);
    } 
    
    if(response.data.error) {
     toast.error(response.data.message);
    }

    return response.data;
  
 
};

export default AddToCart;
