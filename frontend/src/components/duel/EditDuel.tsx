"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Calendar as CalendarIcon } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { DUEL_URL } from "@/lib/apiEndPoints";
import { CustomUser } from "@/app/api/auth/[...nextauth]/route";
import { clearCache } from "@/actions/commonActions";

type DuelFormType = {
  title?: string;
  description?: string;
};

export default function EditDuel({ token, duel, open, setOpen }: { token: string, duel: DuelTypes, open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) {
  const [date, setDate] = useState<Date | null>(new Date(duel.expire_at));
  const [duelData, setDuelData] = useState<DuelFormType>({
    title: duel?.title,
    description: duel?.description
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<DuelFormTypeError>({})

  // - Image handle
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) setImage(file);
  };

  // - Submit handle
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        // - Adding data
        const formData = new FormData();
        formData.append("title", duelData?.title ?? "");
        formData.append("description", duelData?.description ?? "");
        formData.append("expire_at", date?.toISOString() ?? "");
        if(image) formData.append("image", image);

        const { data } = await axios.put(`${DUEL_URL}/${duel?.id}`, formData, {
            headers: {
                Authorization: token
            }
        });

        setLoading(false);

        if(data?.message) {
            clearCache("dashboard");
            setDuelData({});
            setDate(null);
            setImage(null);
            setErrors({});
            toast.success(data?.message);
            setOpen(false);
        }
    } catch (error) {
        setLoading(false);

        if(error instanceof AxiosError) {
            if(error.response?.status === 422) {
                setErrors(error.response?.data?.errors);
            };
        } else {
            toast.error("Something went wrong, please try again.")
        };
    }

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Duel</Button>
      </DialogTrigger>

      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Duel</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Add title"
              value={duelData?.title ?? ""}
              onChange={(e) =>
                setDuelData({ ...duelData, title: e.target.value })
              }
            />
            <span className="text-red-500">{ errors?.title }</span>
          </div>

          <div className="mt-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add Description"
              value={duelData?.description ?? ""}
              onChange={(e) =>
                setDuelData({ ...duelData, description: e.target.value })
              }
            />
            <span className="text-red-500">{ errors?.description }</span>
          </div>

          <div className="mt-4">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" placeholder="Add image" onChange={handleImageChange}/>
            <span className="text-red-500">{ errors?.image }</span>
          </div>

          <div className="mt-4">
            <Label className="block mb-1" htmlFor="expire_at">
              Expire at
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-md shadow-lg">
                <Calendar
                  mode="single"
                  selected={date ?? new Date()}
                  onSelect={(date) => setDate(date!)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <span className="text-red-500">{ errors?.expire_at }</span>
          </div>

          {/* submit button */}
          <div className="mt-4">
            <Button disabled={loading} className="w-full bg-gradient-to-r from-blue-950 to-blue-900">
                { loading ? "Processing..." : "Submit" }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
