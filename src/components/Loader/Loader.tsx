import { Spinner } from "react-bootstrap";
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <Spinner animation="grow" variant="orange" className="loader-spinner" style={{ borderWidth: "0.3em" }}/>
    </div>
  );
}

export default Loader;