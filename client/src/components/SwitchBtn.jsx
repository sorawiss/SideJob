import { Switch } from "rizzui";
import React from "react";

function SwitchBtn({ isOn, onRequestChange, disabled }) {
  return (
    <Switch
      checked={!isOn}
      size="lg"
      label="ปิดโพสต์"
      switchClassName="bg-secondary"
      disabled={disabled}
      onChange={onRequestChange}
    />
  );
}

export default SwitchBtn;