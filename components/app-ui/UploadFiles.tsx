
import Spinner from "@/components/common/Spinner";
import { getPresignedUrl, uploadToS3 } from "@/lib/common";
import React, { useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";
import axiosAPIWithAuth from "@/lib/axiosAPIWithAuth";

interface UploadFiles {
  notifyUploaded?: () => void;
}

function UploadFiles(props: UploadFiles) {
  const { notifyUploaded } = props;
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const toast = useToast();

  const startEmbedding = async (doc_id: string) => {
    try {
      const startRes = await axiosAPIWithAuth.get(`/data-storage/start-embedding/${doc_id}`);

      toast.addToast("success", "Embedding started")
    }
    catch (err) {
      console.log(err)
      toast.addToast("error", "Error embedding files")
    }
  }

  const UploadFilesToS3AndParse = async () => {
    setIsUploading(true);

    for (let i = 0; i < uploadedFiles.length; i++) {
      const presignedUrl = await getPresignedUrl(
        uploadedFiles[i].name,
        uploadedFiles[i].type
      );
      const uploadFile = await uploadToS3(presignedUrl.url, uploadedFiles[i]);
      if (uploadFile) {
        console.log("Upload successful");
        await startEmbedding(presignedUrl.doc_id)
        toast.addToast("success", `File uploaded: ${uploadedFiles[i].name}`);

      }
    }
    if (notifyUploaded) {
      notifyUploaded()
    }
    setIsUploading(false);
  };
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      UploadFilesToS3AndParse();
    }
  }, [uploadedFiles]);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      const filteredFiles = newFiles.filter(
        (file) =>
          file.type === "application/pdf" ||
          file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      setUploadedFiles([...filteredFiles]);
    }
  };
  return (
    <div className="relative border-4 border-dashed border-gray-400 p-10">
      <input
        type="file"
        id="file"
        multiple
        accept=".pdf, .docx"
        onChange={handleFileUpload}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
      />
      <label
        htmlFor="file"
        className=" text-center cursor-pointer"
      // You can add more styles here to make it look like a dropzone
      >
        <div className="text-lg font-medium text-gray-600">Drop your files here, or click to select</div>
        {
          isUploading &&
          <div className="text-center mt-4">
            <Spinner color="text-indigo-500" />
          </div>
        }
      </label>
    </div>
  );
}

export default UploadFiles;
