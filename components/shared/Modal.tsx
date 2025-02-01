"use client";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../ui/animated-modal";
import { Input } from "../ui/input";
import { Edit2 } from "lucide-react";
import EditBrandButton from "./Brands/EditBrandButton";
import { Button } from "../ui/button";
import { useState } from "react";

export default function EditModal({
  brandName,
  brandID,
}: {
  brandName: string;
  brandID: string;
}) {
  const [newBrandName, setNewBrandName] = useState<string>(brandName);

  return (
    <Modal>
      <ModalTrigger>
        <Button className="bg-blue-500">
          <Edit2 />
        </Button>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h2 className="text-lg font-semibold mb-4">Edit Brand</h2>
          <Input
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
          />
        </ModalContent>
        <ModalFooter className="gap-4">
          <ModalTrigger>
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
          </ModalTrigger>
          <EditBrandButton brandID={brandID} newBrandName={newBrandName} />
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
