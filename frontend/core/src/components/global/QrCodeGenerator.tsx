"use client";

import React, { useEffect, useState, useRef, type ChangeEvent } from "react";

//components
import { Button } from "@/components/ui/button";

//SVGs
import { Check, Copy, Download } from "lucide-react";

//libraries
import QRCodeStyling, { Options, FileExtension } from "qr-code-styling";
import { cn } from "@/lib/utils";
import { useTactileAnimation } from "@/app/hooks/useTactileAnimation";

export default function QrCodeGenerator({ url }: { url: string }) {
  const [options, setOptions] = useState<Options>({
    width: 180,
    height: 180,
    type: "svg",
    data: url,
    image: "",
    margin: 0,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
      crossOrigin: "anonymous",
      saveAsBlob: true,
    },
    dotsOptions: {
      color: "#222222",
    },
    backgroundOptions: {
      color: "#FFFF",
    },
  });
  const [fileExt, setFileExt] = useState<FileExtension>("svg");
  const [qrCode, setQrCode] = useState<QRCodeStyling>();
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const downloadBtnRef = useRef<HTMLButtonElement>(null);

  useTactileAnimation(copyBtnRef, {});
  useTactileAnimation(downloadBtnRef, {});

  useEffect(() => {
    setQrCode(new QRCodeStyling(options));
  }, []);

  useEffect(() => {
    if (ref.current) {
      qrCode?.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode?.update(options);
  }, [qrCode, options]);

  const onDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOptions((options) => ({
      ...options,
      data: event.target.value,
    }));
  };

  const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFileExt(event.target.value as FileExtension);
  };

  const onDownloadClick = () => {
    if (!qrCode) return;
    qrCode.download({
      extension: fileExt,
    });
  };

  const onCopyClick = () => {
    if (!qrCode) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleQRclick = () => {
    if (!qrCode) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        onClick={handleQRclick}
        className="border-2 p-1 border-sad-blue rounded-xl  hover:border-royal-green transition-all duration-300 cursor-pointer"
      >
        <div ref={ref} />
      </div>
      <div className="gap-2 flex justify-between">
        <Button
          ref={downloadBtnRef}
          onClick={onDownloadClick}
          className="rounded-full bg-soft-blue border-sad-blue border-2 text-royal-green/50 hover:text-royal-green hover:border-royal-green scale-pro"
        >
          <Download className="w-5 h-5" />
          دانلود QR کد
        </Button>
        <Button
          ref={copyBtnRef}
          disabled={copied}
          onClick={onCopyClick}
          className="rounded-full bg-soft-blue border-sad-blue border-2 text-royal-green/50 hover:text-royal-green hover:border-royal-green scale-pro"
        >
          {copied ? (
            <Check className="w-5 h-5"></Check>
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
