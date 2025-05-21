"use client";

import { useState, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";

//components
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

//libraries
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  name: string;
  label?: string;
  accept?: string;
  maxSize?: number;
  className?: string;
}

export default function Uploader({
  name,
  label = "تصویر",
  accept = "image/jpeg,image/png,image/gif",
  maxSize = 5 * 1024 * 1024, // 5MB
  className,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection
  const handleImageChange = (
    file: File | null,
    onChange: (value: any) => void
  ) => {
    if (file) {
      // Validate file type and size
      if (!accept.split(",").includes(file.type)) {
        toast.error("فقط فرمت‌های JPEG، PNG یا GIF مجاز هستند.");
        return;
      }
      if (file.size > maxSize) {
        toast.error(
          `حجم فایل باید کمتر از ${maxSize / 1024 / 1024} مگابایت باشد.`
        );
        return;
      }
      // Set file in form
      onChange(file);
      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onChange(undefined);
      setPreview(null);
    }
  };

  const handleImageRemove = (onChange: (value: any) => void) => {
    setPreview(null);
    onChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Drag-and-drop event handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop =
    (onChange: (value: any) => void) =>
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      handleImageChange(file, onChange);
    };

  // Handle click to open file picker
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file input change
  const handleFileInputChange =
    (onChange: (value: any) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageChange(file, onChange);
      }
    };

  // Accessibility: Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <Controller
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div
              className={cn(
                "cursor-pointer select-none rounded-md border-2 border-dashed bg-secondary p-2 transition-colors duration-300",
                isDragging ? "border-primary" : "hover:border-primary/50",
                preview ? "border-primary" : "flex items-center justify-center"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop(onChange)}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
            >
              {preview ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering handleClick
                  }}
                  className="group relative flex h-20 w-20 cursor-auto items-center justify-center"
                >
                  <Button
                    size="icon"
                    className="absolute z-10 h-7 w-7 bg-transparent opacity-0 backdrop-blur-lg transition-opacity duration-300 hover:backdrop-blur-3xl group-focus-within:opacity-100 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering handleClick
                      handleImageRemove(onChange);
                    }}
                  >
                    <X className="h-4 w-4 text-secondary"></X>
                  </Button>
                  <Image
                    className="rounded-md object-cover"
                    src={preview}
                    alt="Image preview"
                    fill
                  ></Image>
                </div>
              ) : (
                <div className="flex h-20 flex-col justify-center text-center text-sm font-normal text-primary/30">
                  {!isDragging ? (
                    <>
                      <p>برای آپلود عکس اینجا بندازید یا کلیک کنید</p>
                      <p>حداکثر حجم فایل {maxSize / 1024 / 1024} مگابایت</p>
                    </>
                  ) : (
                    <p>فایل را رها کنید</p>
                  )}
                </div>
              )}
              <Input
                type="file"
                accept={accept}
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileInputChange(onChange)}
              />
            </div>
          </FormControl>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
