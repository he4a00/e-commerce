"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Add_Address } from "@/types";
import { Building, MapPin, Phone, Plus, Trash2 } from "lucide-react";

interface SavedAddressesProps {
  addresses: Add_Address[];
  onAddNew: () => void;
  onDelete: (addressId: string) => void;
}

const SavedAddresses = ({
  addresses,
  onAddNew,
  onDelete,
}: SavedAddressesProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <Card
            key={address.addressID}
            className="group relative overflow-hidden transition-all hover:shadow-md"
          >
            <CardContent className="p-6">
              {/* Actions */}
              <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                {/* {onEdit && (
                <Button variant="ghost" size="icon" onClick={() => onEdit(address.id)} className="h-8 w-8">
                  <Edit2 className="h-4 w-4" />
                </Button>
              )} */}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(address.addressID || "")}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Address Content */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-semibold leading-none tracking-tight">
                    {address.fullName}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="mr-1 h-3 w-3" />
                    {address.phoneNumber}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p>{address.street}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <p>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    {address.country}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={onAddNew} className="w-full gap-2">
        <Plus className="h-4 w-4" />
        Add New Address
      </Button>
    </div>
  );
};

export default SavedAddresses;
