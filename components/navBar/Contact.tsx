import {
  Dialog,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import ContactContent from "../ContactContent";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

interface IProps {
  isDesktop?: boolean;
}

const Contact = ({isDesktop}: IProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {!isDesktop ? (<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <EnvelopeIcon className="w-6 h-6 mr-2" />
          <span>문의하기</span>
        </DropdownMenuItem>) : (
            <button className="text-lg font-bold">문의하기</button>
        )}
      </DialogTrigger>
      <ContactContent />
    </Dialog>
  );
};

export default Contact;
