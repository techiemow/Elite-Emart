export const apiurl =
  import.meta.env.VITE_LOCAL_URL === "production"
    ? "https://elite-emart-backend.onrender.com"
    : `http://localhost:4000`;

  const Roles = {
      ADMIN : "Admin",
      User : "User"
  }
  
  export default Roles