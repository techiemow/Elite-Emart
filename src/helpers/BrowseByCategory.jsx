import axios from 'axios';
import { apiurl } from '../../Constants/apiurl';

const BrowseByCategory = async (category) => {
  try {
    const response = await axios.get(`${apiurl}/ProductsViaCategory`, {
      params: { category }
    });
   
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return { data: [], success: false, error: true };
  }
};

export default BrowseByCategory;
