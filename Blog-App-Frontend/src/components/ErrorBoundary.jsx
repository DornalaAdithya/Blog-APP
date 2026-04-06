import { useRouteError } from "react-router";
import { errorClass } from "../styles/common";

function ErrorBoundary() {
  const { data, status, statusText } = useRouteError();
  return (
    <div className={`${errorClass} text-center`}>
      <p>{data}</p>
      <p>
        {status} : {statusText}
      </p>
    </div>
  );
}

export default ErrorBoundary;
