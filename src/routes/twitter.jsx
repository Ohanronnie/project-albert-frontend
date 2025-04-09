import { useEffect, useState, useRef } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { axios } from "../utils/axios";

const TwitterCallback = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const hasRun = useRef(false);
  useEffect(() => {
    const authenticateUser = async () => {
      console.log(window.location.href)
      const oauth_token  = searchParams.get("oauth_token");
      const oauth_verifier = searchParams.get("oauth_verifier");
      if (!oauth_token || !oauth_verifier) {
        setError("Invalid or missing authentication details.");
        setLoading(false);
        return;
      }
      try {
        // Send code to backend
        const response = await axios.post("/product/auth/twitter/callback", { oauth_token, oauth_verifier });
        setUser(response.data); // Store user data
      } catch (err) {
        setError(err.response?.data || "Authentication failed.");
      } finally {
        setLoading(false);
      }
    };
    if(hasRun.current) return;

    authenticateUser();
    hasRun.current = true;
  }, [searchParams]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: </p>;

  return (
    <div>
      <h2>Welcome, {user?.name}!</h2>
      <Navigate  to='/product/content/manage' replace />
    </div>
  );
};

export default TwitterCallback;
