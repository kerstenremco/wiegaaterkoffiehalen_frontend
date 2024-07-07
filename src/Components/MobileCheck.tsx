import React from "react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import useScreenSize from "../hooks/useScreenSize";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";
import { together } from "../assets/lottie";

const MobileCheck: React.FC<{ children: React.ReactNode }> = (props) => {
  const screenSize = useScreenSize();
  if (screenSize.width < 1080)
    return (
      <div className="w-screen h-screen flex items-center">
        <Card classNames={{ header: "justify-center text-xl", body: "text-center" }}>
          <CardHeader>Nog niet beschikbaar op mobiel</CardHeader>
          <Divider />
          <CardBody>
            <p>wiegaaterkoffiehalen.nl werkt nog niet op mobiele apparaten.</p>
            <p>Gebruik een desktop of verbreed het scherm.</p>
            <Lottie loop animationData={together} play speed={0.1} />
          </CardBody>
        </Card>
      </div>
    );
  else return props.children;
};

export default MobileCheck;
