import ContactContent from "../ContactContent";
import { Dialog, DialogTrigger } from "../ui/dialog";

const DescriptionContact = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md text-center transition-colors">
          문의하기
        </button>
      </DialogTrigger>
      <ContactContent />
    </Dialog>
  );
};

export default DescriptionContact;
