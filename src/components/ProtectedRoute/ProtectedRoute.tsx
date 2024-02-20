import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { PropsWithChildren } from "react";
import paths from "../../paths/paths";

const ProtectedRoute = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate to={paths.homepage} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
