
import axios from "axios";
import axiosAPIWithAuth from "./axiosAPIWithAuth";

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export async function getPresignedUrl(fileName: string, contentType: string) {
  const response = await axiosAPIWithAuth.post("/data-storage/get-presigned-url", {
    fileName,
    contentType,
  });

  return response.data;
}

export async function uploadToS3(presignedUrl: string, file: Blob) {
  const result = await axios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  return result.status === 200;
}

export const allowedCountryCodes = [

  {

    name: "United States",
    dialCode: "+1",
    isoCode: "US",
  },
  {

    name: "CANADA",
    dialCode: "+1",
    isoCode: "CA",
  },
  {

    name: "United Kingdom",
    isoCode: "GB",
    dialCode: "+44",
  },
  {

    name: "India",
    isoCode: "IN",
    dialCode: "+91",
  }
];