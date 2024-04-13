import DescriptionOne from "./DescriptionOne";
import DescriptionThree from "./DescriptionThree";
import DescriptionTwo from "./DescriptionTwo";

const ServiceDescription = () => {
  return (
    <div className="flex flex-col space-y-6 px-4">
      <h1 className="text-3xl font-semibold text-center">
        중개랜드<span className="text-[#ff9f1c]"> 서비스</span>
      </h1>
      <div className="grid grid-cols-1 gap-7">
        <DescriptionOne />
        <DescriptionTwo />
        <DescriptionThree />
      </div>
    </div>
  );
};

export default ServiceDescription;
