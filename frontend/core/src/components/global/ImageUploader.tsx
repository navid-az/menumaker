"use client";

//SVGs
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

import { useFileUpload } from "@/app/hooks/useFileUpload";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { uploadImage } from "@/app/actions";

export default function ImageUploader({
  defaultFiles = [],
  maxFiles = 5,
  maxSizeMB = 5,
  value,
  onChange,
}: {
  value: { tempId: string; url: string }[];
  onChange: (value: { tempId: string; url: string }[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  defaultFiles?: { tempId: string; url: string }[];
}) {
  const maxSize = maxSizeMB * 1024 * 1024;

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept:
      "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif/webp,image/webp",
    maxSize,
    multiple: true,
    maxFiles,
    onFilesAdded: async (newFiles) => {
      const formData = new FormData();
      newFiles.forEach((file) => {
        if (file.file instanceof File) {
          formData.append("images", file.file);
        } else {
          console.log(files);
        }
      });

      const res = await uploadImage(formData);

      if (res?.success) {
        const newUploaded = res.imageRefs.map(
          (img: { id: number; image: string; temp_id: string }) => ({
            tempId: img.temp_id,
            url: img.image,
          })
        );

        // Combine with previous images
        const updated = [...value, ...newUploaded];

        onChange?.(updated);
      } else {
        console.log(res.error);
      }
    },
  });

  return (
    <div className="flex w-full flex-col gap-2">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 min-h-52 not-data-[files]:justify-center has-[input:focus]:ring-[3px] relative flex flex-col items-center overflow-hidden rounded-xl border border-dashed border-primary/60 p-4 transition-colors data-[dragging=true]:bg-accent/50"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
        />
        {files.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-medium">
                تصاویر آپلود شده ({files.length})
              </h3>
              <Button
                size="sm"
                onClick={openFileDialog}
                disabled={files.length >= maxFiles}
                className="flex gap-2"
              >
                <UploadIcon className="h-4 w-4" aria-hidden="true" />
                اضافه کن
              </Button>
            </div>

            <div className="flex gap-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="relative aspect-square h-24 w-24 rounded-md bg-accent"
                >
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="h-full w-full rounded-[inherit] object-cover"
                  />
                  <Button
                    onClick={() => removeFile(file.id)}
                    size="icon"
                    className="size-6 absolute -right-2 -top-2 rounded-full border-[3.5px] border-background shadow-none focus-visible:border-background"
                    aria-label="Remove image"
                  >
                    <XIcon className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <div
              className="size-11 mb-2 flex shrink-0 items-center justify-center rounded-full"
              aria-hidden="true"
            >
              <ImageIcon className="opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">
              تصاویر خود را اینجا بیاندازید
            </p>
            <p className="text-xs text-muted-foreground">
              (حداکثر . {maxSizeMB}MB) SVG, PNG, JPG or GIF
            </p>
            <Button className="mt-4 flex gap-2" onClick={openFileDialog}>
              <UploadIcon className="h-4 w-4" aria-hidden="true" />
              انتخاب تصاویر
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-xs text-destructive"
          role="alert"
        >
          <AlertCircleIcon className="h-3 w-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
