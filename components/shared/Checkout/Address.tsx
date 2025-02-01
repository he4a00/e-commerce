"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Add_Address } from "@/types";
import { useEffect, useState } from "react";
import SavedAddresses from "./SavedAddresses";
import {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetAddressByUserQuery,
} from "@/app/store/slices/api/address/addressSlice";
import { toast } from "@/hooks/use-toast";

const initialFormState: Add_Address = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  phoneNumber: "",
  country: "",
  addressLine2: "",
};

const Address = () => {
  const { data: userAddresses } = useGetAddressByUserQuery({});
  const [formData, setFormData] = useState<Add_Address>(initialFormState);
  const [showForm, setShowForm] = useState(false);

  const [addAddress, { isLoading, isSuccess: isAddingSuccess }] =
    useAddAddressMutation();
  const [deleteAddress, { isSuccess: isDeletingSuccess }] =
    useDeleteAddressMutation({});

  useEffect(() => {
    if (isAddingSuccess) {
      toast({
        title: "Address added successfully",
      });
    }
  }, [isAddingSuccess]);

  useEffect(() => {
    if (isDeletingSuccess) {
      toast({
        title: "Address deleted successfully",
      });
    }
  }, [isDeletingSuccess]);

  useEffect(() => {
    // Show form if no addresses exist after loading
    if (!isLoading && userAddresses?.result?.length === 0) {
      setShowForm(true);
    }
  }, [isLoading, userAddresses]);

  if (isLoading) return <div>Loading addresses...</div>;

  if (showForm || userAddresses?.result?.length === 0) {
    return (
      <div className="grid gap-4">
        {userAddresses?.result.length > 0 && (
          <Button variant="outline" onClick={() => setShowForm(false)}>
            Back to Saved Addresses
          </Button>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              id="firstName"
              placeholder="John"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>

            <Input
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              id="lastName"
              placeholder="Doe"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="address">Street Address</Label>
          <Input
            value={formData.street}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
            id="address"
            placeholder="123 Main St"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              id="city"
              placeholder="City"
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>

            <Input
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              id="state"
              placeholder="State"
            />
          </div>
          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>

            <Input
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
              id="zipCode"
              placeholder="ZIP Code"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            id="phone"
            placeholder="(123) 456-7890"
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
            id="country"
            placeholder="Egypt"
          />
        </div>
        <div>
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input
            value={formData.addressLine2}
            onChange={(e) =>
              setFormData({ ...formData, addressLine2: e.target.value })
            }
            id="country"
            placeholder="Egypt"
          />
        </div>
        <Button
          className="bg-green-700"
          onClick={async () => {
            await addAddress(formData);
            setShowForm(false);
          }}
          disabled={isLoading}
        >
          Add Address
        </Button>
      </div>
    );
  }

  return (
    <SavedAddresses
      addresses={userAddresses?.result || []}
      onAddNew={() => {
        setShowForm(true);
      }}
      onDelete={async (addressId: string) => {
        await deleteAddress(addressId);
      }}
    />
  );
};

export default Address;
