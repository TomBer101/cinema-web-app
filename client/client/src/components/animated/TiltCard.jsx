import { Card } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const [bounds, setBounds] = useState({ width: 1, height: 1 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to rotation values
  const rotateX = useTransform(y, [-bounds.height / 2, bounds.height / 2], [10, -10]);
  const rotateY = useTransform(x, [-bounds.width / 2, bounds.width / 2], [-10, 10]);

  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setBounds({ width, height });
      console.log("Bounds updated:", width, height);
    }
  }, []);

  const handleMouseMove = (event) => {
    if (!bounds.width || !bounds.height) return;

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();

    const mouseX = event.clientX - (left + width / 2);
    const mouseY = event.clientY - (top + height / 2);

    x.set(mouseX);
    y.set(mouseY);
  };

  return (
    <motion.div
      ref={ref}
      className="tilt-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        perspective: 1000,
        width: '100%'
      }}
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d", // Essential for 3D effect
          rotateX,
          rotateY,
        }}
      >
        <Card
          raised
          sx={{
            p: "1rem",
            width: "100%",
            height: "100%",
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
