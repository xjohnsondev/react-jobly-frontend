import { useParams } from "react-router-dom";

const Company = () => {
  const company = useParams();
  return (
    <div>
      <h1>{company.company} page</h1>
    </div>
  );
};

export default Company;
