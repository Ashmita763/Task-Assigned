import React, { useEffect, useRef, useState } from "react";

const Assessment = () => {
  // 
  // Assessment stage
  //
  const [stage, setStage] = useState("instructions");

  // -----------------------------
  // Camera / microphone states
  // -----------------------------
  const [cameraStatus, setCameraStatus] = useState("pending");
  const [microphoneStatus, setMicrophoneStatus] = useState("pending");

  // Store camera + microphone stream
  const [mediaStream, setMediaStream] = useState(null);

  // Reference to video element
  const videoRef = useRef(null);

  // -----------------------------
  // Connect stream to video
  // -----------------------------
  useEffect(() => {

    
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  // -----------------------------
  // Stop camera when component
  // is removed
  // -----------------------------
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [mediaStream]);

  // -----------------------------
  // Start camera + microphone
  // -----------------------------
  const checkCameraAndMicrophone = async () => {
    setCameraStatus("checking");
    setMicrophoneStatus("checking");

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      setMediaStream(stream);

      // Check camera
      const videoTracks = stream.getVideoTracks();

      if (videoTracks.length > 0) {
        setCameraStatus("passed");
      } else {
        setCameraStatus("failed");
      }

      // Check microphone
      const audioTracks = stream.getAudioTracks();

      if (audioTracks.length > 0) {
        setMicrophoneStatus("passed");
      } else {
        setMicrophoneStatus("failed");
      }

    } catch (error) {
      console.error("Camera/microphone error:", error);

      setCameraStatus("failed");
      setMicrophoneStatus("failed");
    }
  };

  // -----------------------------
  // Continue to device check
  // -----------------------------
  const continueToDeviceCheck = () => {
    setStage("device-check");

    checkCameraAndMicrophone();
  };

  // -----------------------------
  // Instructions
  // -----------------------------
  if (stage === "instructions") {
    return (
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-3xl font-bold text-slate-900">
            Free Assessment
          </h1>

          <p className="text-slate-600 mt-2">
            Complete the assessment to unlock courses and counselling.
          </p>

          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6">

            <h2 className="text-xl font-bold text-slate-900">
              Assessment Instructions
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Please read the following instructions carefully.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

              <div className="border border-slate-200 rounded-xl p-4">
                <h3 className="font-semibold">
                  Duration
                </h3>

                <p className="text-sm text-slate-600 mt-1">
                  30 minutes
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <h3 className="font-semibold">
                  Passing Score
                </h3>

                <p className="text-sm text-slate-600 mt-1">
                  60%
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <h3 className="font-semibold">
                  Camera
                </h3>

                <p className="text-sm text-slate-600 mt-1">
                  Camera must remain enabled.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <h3 className="font-semibold">
                  Microphone
                </h3>

                <p className="text-sm text-slate-600 mt-1">
                  Microphone access is required.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <h3 className="font-semibold">
                  Screen Sharing
                </h3>

                <p className="text-sm text-slate-600 mt-1">
                  Screen sharing will be required.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4">
                <h3 className="font-semibold">
                  Warning System
                </h3>

                <p className="text-sm text-slate-600 mt-1">
                  Maximum 3 warnings are allowed.
                </p>
              </div>

            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">

              <h3 className="font-semibold text-amber-800">
                Important
              </h3>

              <p className="text-sm text-amber-700 mt-1">
                The assessment will monitor your camera,
                microphone, screen sharing, and assessment activity.
              </p>

            </div>

            <button
              onClick={continueToDeviceCheck}
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Continue to Device Check
            </button>

          </div>

        </div>

      </main>
    );
  }

  // -----------------------------
  // Device Check
  // -----------------------------
  if (stage === "device-check") {
    const deviceReady =
      cameraStatus === "passed" &&
      microphoneStatus === "passed";

    return (
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl font-bold text-slate-900">
            Device Check
          </h1>

          <p className="text-slate-600 mt-2">
            Check your camera and microphone before starting.
          </p>

          <div className="mt-6 grid lg:grid-cols-2 gap-6">

            {/* Camera Preview */}

            <div className="bg-slate-900 rounded-2xl overflow-hidden">

              <div className="px-4 py-3 flex justify-between items-center">

                <h2 className="text-white font-semibold">
                  Camera Preview
                </h2>

                <span className="text-xs text-emerald-400">
                  Live
                </span>

              </div>

              <div className="aspect-video bg-black">

                {mediaStream ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    Camera preview
                  </div>
                )}

              </div>

            </div>

            {/* Device Status */}

            <div className="bg-white border border-slate-200 rounded-2xl p-6">

              <h2 className="text-xl font-bold text-slate-900">
                Device Status
              </h2>

              <div className="mt-6 space-y-4">

                {/* Camera */}

                <DeviceItem
                  name="Camera"
                  status={cameraStatus}
                />

                {/* Microphone */}

                <DeviceItem
                  name="Microphone"
                  status={microphoneStatus}
                />

              </div>

              {/* Error */}

              {cameraStatus === "failed" ||
              microphoneStatus === "failed" ? (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">

                  <p className="font-semibold text-red-700">
                    Device check failed
                  </p>

                  <p className="text-sm text-red-600 mt-1">
                    Please allow camera and microphone
                    permissions and try again.
                  </p>

                  <button
                    onClick={checkCameraAndMicrophone}
                    className="mt-3 text-sm font-semibold text-red-700"
                  >
                    Try Again
                  </button>

                </div>
              ) : null}

              {/* Continue */}

              <button
                disabled={!deviceReady}
                onClick={() => setStage("assessment")}
                className={`mt-8 w-full py-3 rounded-xl font-semibold transition ${
                  deviceReady
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Start Assessment
              </button>

            </div>

          </div>

        </div>

      </main>
    );
  }

  // -----------------------------
  // Temporary Assessment screen
  // -----------------------------
  if (stage === "assessment") {
    return (
      <main className="min-h-screen bg-slate-50 p-6">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-3xl font-bold">
            Proctored Assessment
          </h1>

          <p className="text-slate-600 mt-2">
            Camera and microphone are active.
          </p>

          <div className="mt-6 bg-white rounded-2xl border p-6">

            <p className="text-slate-700">
              Assessment questions will be added in the next step.
            </p>

          </div>

        </div>

      </main>
    );
  }

  return null;
};


// 
// Reusable Device Status Component
// 

const DeviceItem = ({ name, status }) => {

  let text = "Pending";
  let textColor = "text-slate-500";

  if (status === "checking") {
    text = "Checking...";
    textColor = "text-amber-600";
  }

  if (status === "passed") {
    text = "Ready";
    textColor = "text-emerald-600";
  }

  if (status === "failed") {
    text = "Failed";
    textColor = "text-red-600";
  }

  return (
    <div className="flex items-center justify-between border border-slate-200 rounded-xl p-4">

      <span className="font-medium text-slate-800">
        {name}
      </span>

      <span className={`font-semibold text-sm ${textColor}`}>
        {text}
      </span>

    </div>
  );
};


export default Assessment;