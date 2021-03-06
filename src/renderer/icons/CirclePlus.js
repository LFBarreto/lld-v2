// @flow

import React from "react";

const path = (
  <path
    fill="currentColor"
    d="M12 7.5v1a.376.376 0 0 1-.375.375h-2.75v2.75A.376.376 0 0 1 8.5 12h-1a.376.376 0 0 1-.375-.375v-2.75h-2.75A.376.376 0 0 1 4 8.5v-1c0-.206.169-.375.375-.375h2.75v-2.75c0-.206.169-.375.375-.375h1c.206 0 .375.169.375.375v2.75h2.75c.206 0 .375.169.375.375zm3.75.5A7.749 7.749 0 0 1 8 15.75 7.749 7.749 0 0 1 .25 8 7.749 7.749 0 0 1 8 .25 7.749 7.749 0 0 1 15.75 8zm-1.5 0A6.248 6.248 0 0 0 8 1.75 6.248 6.248 0 0 0 1.75 8 6.248 6.248 0 0 0 8 14.25 6.248 6.248 0 0 0 14.25 8z"
  />
);

const CirclePlus = ({ size }: { size: number }) => (
  <svg viewBox="0 0 16 16" height={size} width={size}>
    {path}
  </svg>
);

export default CirclePlus;
