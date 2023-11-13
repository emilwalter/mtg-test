"use client";

import React from "react";

export default function BackButton() {
  function goBack() {
    return window.history.back();
  }

  return (
    <button className="font-bold underline" onClick={goBack}>
      Go back
    </button>
  );
}
