import { ConnectWallet, useStorageUpload, MediaRenderer } from "@thirdweb-dev/react";
import { useCallback, useState } from "react"
import {useDropzone} from 'react-dropzone'
import "./styles/Home.css";

export default function Home() {

  const [uris, setUris] = useState<string []>([]);
  const {mutateAsync: upload} = useStorageUpload();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const _uris = await upload({data:acceptedFiles});
      setUris(_uris);
    },
    [upload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container">
      <h1>This is a trial application to see if Thirdweb-based React App can upload images to IPFS</h1>
      <div {...getRootProps()}>
      <input {...getInputProps()} />
      <button>Drop files here to upload them to IPFS</button>
    </div>
    <div>
    {uris.map(uri => {
      return (
      <MediaRenderer 
          key={uri}
          src={uri}
          alt="Image"
          width="400px"
        />)
    })}
      </div>
    </div>
  );
}
