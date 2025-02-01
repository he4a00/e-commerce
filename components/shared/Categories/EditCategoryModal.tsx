"use client";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@/components/ui/animated-modal";
import { Input } from "@/components/ui/input";
import { Edit2 } from "lucide-react";
import EditCategoryButton from "./EditCategoryButton";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function EditCategoryModal({
  CategoryName,
  CategoryID,
  CategoryImage,
  ParentCategoryID,
}: {
  CategoryName: string;
  CategoryID: string;
  CategoryImage: string;
  ParentCategoryID: string;
}) {
  const [newCategoryName, setNewCategoryName] = useState<string>(CategoryName);
  const [newCategoryImage, setNewCategoryImage] =
    useState<string>(CategoryImage);
  const [newParentCategoryID, setNewParentCategoryID] =
    useState<string>(ParentCategoryID);

  return (
    <Modal>
      <ModalTrigger>
        <Button className="bg-blue-500">
          <Edit2 />
        </Button>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
          <div className="space-y-4">
            <Input
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              required
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setNewCategoryImage(base64String);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <Input
              placeholder="Parent Category ID"
              value={newParentCategoryID}
              onChange={(e) => setNewParentCategoryID(e.target.value)}
            />
          </div>
        </ModalContent>
        <ModalFooter className="gap-4">
          <EditCategoryButton
            CategoryID={CategoryID}
            newCategoryName={newCategoryName}
            newCategoryImage={newCategoryImage}
            newParentCategoryID={newParentCategoryID}
          />
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
