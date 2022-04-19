import { useNavigate, useLocation } from "react-router-dom";

const DistinctTaskPage = ({ task }) => {
    const location = useLocation();
    console.log("location", location);

    return (
        <p>Hello from distinct task</p>
    )
}

export default DistinctTaskPage;