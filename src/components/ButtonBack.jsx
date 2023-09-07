import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1); // navigate to 1 step before arriving at Form
      }}
    >
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
