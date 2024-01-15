import { Button } from "antd";
import React, { useEffect, useRef } from "react";

const UploadWidget = (props) => {
  const { handleGetUrl } = props;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "di0a7yqfm",
        uploadPreset: "lhfkny1h",
        // multiple: true,
      },
      function (error, results) {
        if (results && results.event === "success" && results.info) {
          const files = Array.isArray(results.info) ? results.info : [results.info];
          const imageUrls = files.map((file) => file.url);
          handleGetUrl(imageUrls, files);
          widgetRef.current.close();
        }
      }
    );
  }, [handleGetUrl]);

  return (
    <div>
      <Button onClick={() => widgetRef.current.open()}>Upload</Button>
    </div>
  );
};

export default UploadWidget;
