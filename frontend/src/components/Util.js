import axios from "axios";

function comparePasswords(password, confirmPassword) {
  if (password !== confirmPassword) {
    window.alert("Passwords do not match");
    return false;
  } else if (password === confirmPassword) {
    return true;
  }
}

export async function createAccount(
  name,
  email,
  password,
  confirmPassword,
  setLoading,
  setSuccess,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setError
) {
  const account = {
    name,
    email,
    password,
    confirmPassword,
  };
  try {
    setLoading(true);
    const result = await axios.post("/api/accounts/join", account);
    setLoading(false);
    setSuccess(true);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  } catch (error) {
    console.log(error);
    setLoading(false);
    setError(true);
  }
}
export default comparePasswords;
