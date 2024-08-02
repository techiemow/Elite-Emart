import axios from "axios";
import { apiurl } from "../../Constants/apiurl";
import { toast } from "react-toastify";

const AddToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  
    const response = await axios.post(`${apiurl}/AdditionToCart/${id}`, {}, { withCredentials: true });
 

    console.log("ADD to cart",response);
    if (response.data.success) {
      toast.success(response.data.message);
    } 
    
    if(response.error) {
    
      
      toast.error(response.message);
    }

    return response.data;
  
 
};

export default AddToCart;
