import {
  Dialog,
  DialogTrigger,
} from "../ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import ContactContent from "../ContactContent";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Contact = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <EnvelopeIcon className="w-6 h-6 mr-2" />
          <span>문의하기</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <ContactContent />
    </Dialog>
  );
};

export default Contact;
