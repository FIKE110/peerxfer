import {  Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { AppContext, AppContextType } from "../App";

const QRCodeScanner = ({setIsModalOpen}:{isModalOpen:boolean,setIsModalOpen:Dispatch<SetStateAction<boolean>>}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const {connectToPeer}=useContext(AppContext) as AppContextType

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let stream: MediaStream | null = null;
    let controls:IScannerControls;

    const startScan = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();

          controls=await codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
            if(scannedResult) return
            if (result) {
                if(stream) stream.getTracks().forEach(track => track.stop());
                setScannedResult(result.getText());
                setIsModalOpen(false)
                connectToPeer(result.getText())
                controls.stop()
            }
          });
          
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startScan();

    return () => {
        if(controls) controls.stop()
      if (stream) {
        stream.getTracks().forEach(track => track.stop()); // Stop camera on unmount
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Scan a QR Code</h2>
    

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <video ref={videoRef} className="w-[300px] h-[300px] rounded-md" />
      </div>

      {scannedResult && (
        <div className="mt-3 p-2 bg-green-100 text-green-800 rounded">
          <p>Scanned QR Code: <strong>{scannedResult}</strong></p>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
