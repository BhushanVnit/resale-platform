import axios from "axios";

export const validateToken = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await axios.post("http://localhost:8000/api/v1/users/auth", { token });

      if (response.data.message === 1) {
        return true;
      } else {
        localStorage.removeItem("token");
        console.log("Token has been removed");
      }
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
