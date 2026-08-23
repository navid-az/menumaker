"use client";

import { useEffect, useRef } from "react";

//components
import { Button } from "@/components/ui/button";

//SVGs
import {
  AlertCircleIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";

//hooks
import { useFormContext, useWatch } from "react-hook-form";
import { useFileUpload } from "@/app/hooks/useFileUpload";

//actions
import { uploadImage, deleteImage } from "@/app/actions";

//types
type ImageRef = {
  id: number;    // MediaAsset pk - used for deletion
  url: string;
};

import { type MediaAssetCollection } from "@/app/types/api/asset";
type ImageUploaderProps = {
  value: ImageRef[];
  onChange: (value: ImageRef[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  collection: MediaAssetCollection
};

export default function ImageUploader({
  value,
  onChange,
  maxFiles = 5,
  maxSizeMB = 5,
  collection,
}: ImageUploaderProps) {

  const { control } = useFormContext();
  // Reads frontend_only.temp_id without subscribing to re-renders on every keystroke elsewhere in the form.
  const tempId: string = useWatch({
    control,
    name: "frontend_only.temp_id",
  });

  const maxSize = maxSizeMB * 1024 * 1024;

  // Maps the uploader's local file.id -> the server's MediaAsset id,
  // since deletion needs the real pk, not any client-side identifier.
  const idMap = useRef<Record<string, number>>({});

  // Keep latest controlled value available to async callbacks.
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

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
      "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif,image/webp",
    maxSize,
    multiple: true,
    maxFiles,
    initialFiles: value.map((image) => ({
      id: String(image.id),
      name: String(image.id),
      size: 0,
      type: "image/*",
      url: image.url,
    })),

    onFilesAdded: async (newFiles) => {
      const formData = new FormData();
      formData.append("collection", collection);
      formData.append("temp_id", tempId);

      newFiles.forEach((file) => {
        if (file.file instanceof File) {
          formData.append("images", file.file);
        }
      });

      const res = await uploadImage(formData);

      if (!res?.success) {
        console.error(res?.error);
        return;
      }

      const newUploaded: ImageRef[] = res.assets.map((asset) => ({
        id: asset.id,
        url: asset.url,
      }));

      // Map each local file to its server-assigned id so deletion works.
      newFiles.forEach((file, index) => {
        const uploaded = res.assets[index];
        if (uploaded) {
          idMap.current[file.id] = uploaded.id;
        }
      });

      const nextValue = [...valueRef.current, ...newUploaded];
      valueRef.current = nextValue;
      onChange(nextValue);
    },
  });

  const handleFileRemove = async (fileId: string) => {
    // idMap bridges local-file-id -> server asset id for files uploaded
    // during this mount. For files restored from RHF state after a
    // remount, initialFiles already sets file.id = String(asset.id) - so
    // fileId itself IS the asset id, and this fallback covers that case
    // without needing any new persisted state.
    const assetId = idMap.current[fileId] ?? Number(fileId);

    removeFile(fileId);

    if (!assetId || Number.isNaN(assetId)) {
      console.error("Could not resolve asset id for file:", fileId);
      return;
    }

    try {
      const res = await deleteImage(assetId);

      if (!res?.success) {
        console.error(res?.error);
        return;
      }

      delete idMap.current[fileId];

      const nextValue = valueRef.current.filter((image) => image.id !== assetId);
      valueRef.current = nextValue;
      onChange(nextValue);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex h-max w-full flex-col gap-2 rounded-xl">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="has-[input:focus]:border-ring bg-white has-[input:focus]:ring-ring/50 not-data-files:justify-center has-[input:focus]:ring-[3px] relative flex flex-col items-center overflow-hidden rounded-xl border border-dashed border-primary/60 p-4 transition-colors data-[dragging=true]:bg-accent/50"
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
                type="button"
                size="sm"
                onClick={openFileDialog}
                disabled={files.length >= maxFiles}
                className="flex gap-2"
              >
                <UploadIcon className="h-4 w-4" aria-hidden="true" />
                اضافه کن
              </Button>
            </div>

            <div className="flex h-24 gap-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="relative size-24 aspect-square rounded-md border-2 bg-accent transition-all duration-300 border-primary"
                >
                  <img
                    src={file.preview}
                    alt={
                      file.file instanceof File
                        ? file.file.name
                        : file.file.name
                    }
                    className="h-full w-full rounded-sm object-cover"
                  />

                  <Button
                    type="button"
                    onClick={() => handleFileRemove(file.id)}
                    size="icon"
                    className="absolute -right-2 -top-2 size-5 rounded-full bg-primary"
                    aria-label="Remove image"
                  >
                    <XIcon className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <div
              className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-md bg-gray-100"
              aria-hidden="true"
            >
              <ImageIcon />
            </div>

            <p className="mb-1.5 text-sm font-medium">
              تصاویر خود را اینجا بیاندازید
            </p>

            <p className="text-xs text-muted-foreground">
              (حداکثر . {maxSizeMB}MB) SVG, PNG, JPG, WebP یا GIF
            </p>

            <Button
              type="button"
              className="mt-4 flex gap-2"
              onClick={openFileDialog}
            >
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