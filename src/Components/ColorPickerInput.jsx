import { Box, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import { ChromePicker } from "react-color";

const ColorPickerInput = ({ name, control, watch, setValue }) => {
  const [state, setState] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setState(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setState(false);
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  function closePicker(color) {
    setValue("color", color);
  }

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 800);
    };
  };

  const debounceFn = useCallback(debounce(closePicker), []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        width: "100%",
        border: "2px solid #e1e1e1",
        height: "40px",
        position: "relative",
        borderRadius: "4px",
        minHeight: "56px",
      }}
      onClick={(e) => handleClick(e)}
    >
      <Typography variant="body1">{watch(name)}</Typography>

      {state ? (
        <div style={popover}>
          <div style={cover} onClick={(e) => handleClose(e)} />
          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, onBlur, ...field } }) => (
              <Box
                style={{
                  position: "absolute",
                  left: 0,
                  top: "-13rem",
                  zIndex: 60,
                }}
              >
                <ChromePicker
                  color={value}
                  onChange={({ hex }) => onChange(hex)}
                  onChangeComplete={({ hex }) => {
                    onBlur(hex);
                    debounceFn(hex);
                  }}
                  styles={{ zIndex: 50 }}
                  {...field}
                />
              </Box>
            )}
          />
        </div>
      ) : null}

      <Box
        sx={{
          background: watch(name),
          height: "22px",
          width: "22px",
          borderRadius: "50px",
          border: "1px solid black",
        }}
      ></Box>
    </Box>
  );
};

export default ColorPickerInput;
