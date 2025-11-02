import React, { useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export const ImageWithFallback: React.FC<Props> = ({
  fallbackSrc = "https://placehold.co/800x400?text=Image",
  onError,
  ...rest
}) => {
  const [errored, setErrored] = useState(false);
  return (
    <img
      {...rest}
      onError={(e) => {
        if (!errored) {
          setErrored(true);
          if (fallbackSrc) (e.currentTarget as HTMLImageElement).src = fallbackSrc;
        }
        if (onError) onError(e);
      }}
    />
  );
};

export default ImageWithFallback;
