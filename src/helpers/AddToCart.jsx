import axios from "axios";
import { apiurl } from "../../Constants/apiurl";
import { toast } from "react-toastify";

const AddToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    const response = await axios.post(`${apiurl}/AdditionToCart/${id}`, {}, { withCredentials: true });
 

    console.log(response);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

    return response.data;
  } catch (error) {
    toast.error("An error occurred while adding the product to the cart.");
    console.error("Add to Cart Error:", error);
    return { error: true, message: error.message };
  }
 
};

export default AddToCart;
