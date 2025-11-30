import Header from "../Header";

export default function HeaderExample() {
  return (
    <Header
      isLoggedIn={false}
      onLogin={(email, password) => console.log("Login:", email)}
      onSignup={(name, email, password) => console.log("Signup:", name, email)}
      onLogout={() => console.log("Logout")}
    />
  );
}
